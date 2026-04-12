-- CC Project Manager - Schema
-- Correr este ficheiro no SQL Editor do Supabase

-- Streams
CREATE TABLE streams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INT NOT NULL
);

-- Tasks
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,              -- "1.1", "2.3", etc.
  stream_id INT REFERENCES streams(id),
  name TEXT NOT NULL,
  owner TEXT NOT NULL,              -- "MNP", "Cliente", "Cliente/MNP"
  type TEXT CHECK (type IN ('Sugestão', 'Desafio', 'Opinião')),
  has_risk BOOLEAN DEFAULT FALSE,
  risk_impact TEXT,                 -- "Financeiro", "Operacional", etc.
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

-- Questions
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  stream_id INT REFERENCES streams(id),
  text TEXT NOT NULL,
  status TEXT DEFAULT 'Aberta' CHECK (status IN ('Aberta', 'Em Discussão', 'Resolvida')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Desativar RLS (app interna, sem auth por agora)
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on streams" ON streams FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on questions" ON questions FOR ALL USING (true) WITH CHECK (true);
