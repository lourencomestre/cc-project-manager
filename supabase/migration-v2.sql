-- Migration: TEXT id → SERIAL id + position field
-- Correr no SQL Editor do Supabase ANTES de fazer deploy do novo código

-- 1. Criar nova tabela com SERIAL id e position
CREATE TABLE tasks_new (
  id SERIAL PRIMARY KEY,
  stream_id INT REFERENCES streams(id),
  position INT NOT NULL DEFAULT 0,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  type TEXT CHECK (type IN ('Sugestão', 'Desafio', 'Opinião')),
  has_risk BOOLEAN DEFAULT FALSE,
  risk_impact TEXT,
  start_date DATE,
  end_date DATE,
  duration_days INT DEFAULT 0,
  completion_pct REAL DEFAULT 0,
  is_milestone BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status TEXT DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Done', 'Blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Copiar dados com position calculado pela ordem do antigo id dentro de cada stream
INSERT INTO tasks_new (stream_id, position, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, notes, status, created_at, updated_at)
SELECT
  stream_id,
  ROW_NUMBER() OVER (PARTITION BY stream_id ORDER BY id) as position,
  name, owner, type, has_risk, risk_impact, start_date, end_date,
  duration_days, completion_pct, is_milestone, notes, status,
  created_at, updated_at
FROM tasks
ORDER BY stream_id, id;

-- 3. Drop old table and rename
DROP TABLE tasks;
ALTER TABLE tasks_new RENAME TO tasks;

-- 4. Recriar trigger
CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 5. RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
