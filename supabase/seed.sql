-- CC Project Manager - Seed Data
-- Correr após schema.sql no SQL Editor do Supabase

-- ==========================================
-- STREAMS
-- ==========================================
INSERT INTO streams (id, name, color, display_order) VALUES
(1,  'Apresentação Novo Modelo', '#3B82F6', 1),   -- blue-500
(2,  'Recrutamento',             '#EF4444', 2),   -- red-500
(3,  'Formação',                 '#F59E0B', 3),   -- amber-500
(4,  'Qualidade',                '#10B981', 4),   -- emerald-500
(5,  'AI',                       '#8B5CF6', 5),   -- violet-500
(6,  'Tecnologia',               '#06B6D4', 6),   -- cyan-500
(7,  'Instalações',              '#F97316', 7),   -- orange-500
(8,  'Recursos Humanos',         '#EC4899', 8),   -- pink-500
(9,  'Reporting',                '#6366F1', 9),   -- indigo-500
(10, 'Billing',                  '#14B8A6', 10),  -- teal-500
(11, 'Governance',               '#A855F7', 11),  -- purple-500
(12, 'Gestão Operacional',       '#78716C', 12);  -- stone-500

-- ==========================================
-- TASKS
-- Datas distribuídas uniformemente: 16 abril - 30 junho 2026
-- Fase 1 (Análise/Planeamento): 16 abr - 10 mai
-- Fase 2 (Implementação): 11 mai - 10 jun
-- Fase 3 (Testes/Validação): 11 jun - 30 jun
-- ==========================================

-- Stream 1 - Apresentação Novo Modelo
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('1.1', 1, 'Apresentação do novo modelo de negócio às Equipas (Cartão + COL)', 'MNP', 'Sugestão', false, NULL, '2026-04-16', '2026-04-24', 8, 0, false, 'Not Started'),
('1.2', 1, 'Obtenção de inputs (identificação de potenciais contras)', 'MNP', 'Sugestão', false, NULL, '2026-04-20', '2026-04-30', 10, 0, false, 'Not Started'),
('1.3', 1, 'Identificação de requisitos necessários para cada nível (1, 2, 3)', 'Cliente/MNP', 'Sugestão', true, 'Financeiro', '2026-04-27', '2026-05-08', 11, 0, false, 'Not Started'),
('1.4', 1, 'Identificação prévia de elementos a alocar em cada nível', 'MNP', 'Desafio', false, NULL, '2026-05-04', '2026-05-15', 11, 0, false, 'Not Started'),
('1.5', 1, 'Identificação dos temas a tratamento por parte do Cliente no nível 3', 'Cliente/MNP', 'Sugestão', false, NULL, '2026-05-11', '2026-05-22', 11, 0, false, 'Not Started'),
('1.6', 1, 'Modelo de faturação chamada/tarefa', 'Cliente/MNP', 'Sugestão', true, 'Financeiro', '2026-05-18', '2026-06-05', 18, 0, false, 'Not Started'),
('1.7', 1, 'Revisão trimestral ou semestral dos TMOs', 'Cliente/MNP', 'Sugestão', true, 'Financeiro', '2026-06-08', '2026-06-30', 22, 0, true, 'Not Started');

-- Stream 2 - Recrutamento
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('2.1', 2, 'Novo modelo com possibilidade de desistências', 'MNP', 'Desafio', true, 'Operacional/Financeiro', '2026-04-16', '2026-04-28', 12, 0, false, 'Not Started'),
('2.2', 2, 'Dimensionar a bolsa de recrutamento', 'MNP', 'Desafio', false, NULL, '2026-04-20', '2026-05-04', 14, 0, false, 'Not Started'),
('2.3', 2, 'Definir timings para recrutamento', 'MNP', 'Sugestão', false, NULL, '2026-04-27', '2026-05-08', 11, 0, false, 'Not Started'),
('2.4', 2, 'Redefinição da proposta contratual com base na nova estrutura', 'MNP', 'Desafio', false, NULL, '2026-05-04', '2026-05-20', 16, 0, false, 'Not Started'),
('2.5', 2, 'Marcar reunião com recrutamento para apresentação da nova estrutura', 'MNP', 'Sugestão', false, NULL, '2026-05-11', '2026-05-15', 4, 0, false, 'Not Started'),
('2.6', 2, 'Definição de tempo expectável para formação', 'MNP', 'Desafio', false, NULL, '2026-05-18', '2026-05-29', 11, 0, false, 'Not Started'),
('2.7', 2, 'Re-análise do AF atual', 'MNP', 'Sugestão', false, NULL, '2026-06-01', '2026-06-12', 11, 0, false, 'Not Started'),
('2.8', 2, 'Capacidade de atração com base num novo modelo formativo', 'MNP', 'Sugestão', true, 'Operacional', '2026-06-15', '2026-06-30', 15, 0, true, 'Not Started');

-- Stream 3 - Formação
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('3.1',  3, 'Sessão MNP-Sonae para calibração de temas formativos', 'Cliente/MNP', 'Sugestão', false, NULL, '2026-04-16', '2026-04-22', 6, 0, false, 'Not Started'),
('3.2',  3, 'Identificação de modelo formativo (Novos Colaboradores)', 'MNP', 'Desafio', false, NULL, '2026-04-20', '2026-05-01', 11, 0, false, 'Not Started'),
('3.3',  3, 'Identificação de necessidades formativas para cada nível', 'MNP', 'Desafio', false, NULL, '2026-04-27', '2026-05-08', 11, 0, false, 'Not Started'),
('3.4',  3, 'Quantificar tempos de formação para migração multiskill', 'MNP', 'Desafio', false, NULL, '2026-05-04', '2026-05-15', 11, 0, false, 'Not Started'),
('3.5',  3, 'Desenvolvimento de novos manuais de formação (COL <-> Cartão)', 'MNP', 'Desafio', false, NULL, '2026-05-11', '2026-05-29', 18, 0, false, 'Not Started'),
('3.6',  3, 'Desenvolvimento de manuais de formação Equipa Sugestões e Reclamações', 'MNP', 'Desafio', false, NULL, '2026-05-18', '2026-06-05', 18, 0, false, 'Not Started'),
('3.7',  3, 'Desenvolvimento de novos elementos formativos (Quickguide, etc)', 'MNP', 'Desafio', false, NULL, '2026-05-25', '2026-06-10', 16, 0, false, 'Not Started'),
('3.8',  3, 'Identificação do formador (PT ou LX)', 'MNP', 'Sugestão', false, NULL, '2026-05-04', '2026-05-11', 7, 0, false, 'Not Started'),
('3.9',  3, 'Definir modelo de avaliação de impacto da formação', 'MNP', 'Sugestão', false, NULL, '2026-06-01', '2026-06-12', 11, 0, false, 'Not Started'),
('3.10', 3, 'Avaliação de esforço e definição de plano de conversão', 'MNP', 'Sugestão', false, NULL, '2026-06-08', '2026-06-19', 11, 0, false, 'Not Started'),
('3.11', 3, 'Avaliar possibilidade de formação em módulos', 'MNP', 'Desafio', false, NULL, '2026-06-01', '2026-06-15', 14, 0, false, 'Not Started'),
('3.12', 3, 'Disponibilização de users de formação para plataforma Perto', 'MNP', 'Sugestão', false, NULL, '2026-06-15', '2026-06-22', 7, 0, false, 'Not Started'),
('3.13', 3, 'Turnover em formação e capacidade de resposta a picos', 'MNP', 'Sugestão', true, 'Financeiro', '2026-06-15', '2026-06-30', 15, 0, false, 'Not Started'),
('3.14', 3, 'Modelo de pricing da formação', 'MNP', 'Sugestão', true, 'Financeiro', '2026-06-22', '2026-06-30', 8, 0, false, 'Not Started');

-- Stream 4 - Qualidade
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('4.1',  4, 'Redefinição da grelha de avaliação / Criação de grelhas de monitorização', 'Cliente', 'Desafio', false, NULL, '2026-04-16', '2026-05-08', 22, 0, false, 'Not Started'),
('4.2',  4, 'Redefinição dos processos de Qualidade', 'Cliente', 'Sugestão', false, NULL, '2026-04-27', '2026-05-15', 18, 0, false, 'Not Started'),
('4.3',  4, 'Redefinição de escala de avaliação', 'Cliente/MNP', 'Sugestão', false, NULL, '2026-05-04', '2026-05-18', 14, 0, false, 'Not Started'),
('4.4',  4, 'Partilha dos indicadores do NPS', 'Cliente', 'Sugestão', false, NULL, '2026-05-11', '2026-05-22', 11, 0, false, 'Not Started'),
('4.5',  4, 'Estabelecimento de timings e metodologias de avaliação do impacto', 'Cliente', 'Sugestão', false, NULL, '2026-05-18', '2026-05-29', 11, 0, false, 'Not Started'),
('4.6',  4, 'Medição do impacto no NPS', 'Cliente', 'Sugestão', false, NULL, '2026-06-01', '2026-06-19', 18, 0, false, 'Not Started'),
('4.7',  4, 'Identificação de elemento de Qualidade', 'MNP', 'Sugestão', false, NULL, '2026-05-04', '2026-05-11', 7, 0, false, 'Not Started'),
('4.8',  4, 'Redefinição da equipa de formação', 'MNP', 'Sugestão', false, NULL, '2026-05-11', '2026-05-22', 11, 0, false, 'Not Started'),
('4.9',  4, 'SRS - Reincidência (2ª linha através de reencaminhamento)', 'Cliente/MNP', 'Sugestão', false, NULL, '2026-06-01', '2026-06-15', 14, 0, false, 'Not Started'),
('4.10', 4, 'Multiskill - Avaliar impacto na Qualidade', 'Cliente/MNP', 'Sugestão', false, NULL, '2026-06-08', '2026-06-22', 14, 0, false, 'Not Started'),
('4.11', 4, 'Redefinição do modelo bónus/penalidade indexado à Qualidade', 'Cliente/MNP', 'Sugestão', true, 'Financeiro', '2026-06-15', '2026-06-30', 15, 0, false, 'Not Started');

-- Stream 5 - AI
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('5A.1', 5, 'Levantamento de atividades repetitivas para automação', 'MNP', 'Sugestão', false, NULL, '2026-04-16', '2026-05-01', 15, 0, false, 'Not Started'),
('5A.2', 5, 'Implementação do modelo de Agent Assist', 'MNP', 'Sugestão', false, NULL, '2026-05-04', '2026-05-29', 25, 0, false, 'Not Started'),
('5A.3', 5, 'Implementação do modelo de Quality Assurance Automation', 'MNP', 'Sugestão', false, NULL, '2026-05-18', '2026-06-12', 25, 0, false, 'Not Started'),
('5A.4', 5, 'Implementação do modelo de Post Call AI', 'MNP', 'Sugestão', false, NULL, '2026-06-01', '2026-06-22', 21, 0, false, 'Not Started'),
('5A.5', 5, 'Implementação do modelo de Mailbots', 'MNP', 'Sugestão', false, NULL, '2026-06-08', '2026-06-30', 22, 0, false, 'Not Started');

-- Stream 6 - Tecnologia
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('5B.1',  6, 'Necessidade de redefinir IVR', 'Cliente', 'Sugestão', false, NULL, '2026-04-16', '2026-05-01', 15, 0, false, 'Not Started'),
('5B.2',  6, 'Necessidade de redefinir Ring Groups', 'Cliente', 'Desafio', false, NULL, '2026-04-20', '2026-05-08', 18, 0, false, 'Not Started'),
('5B.3',  6, 'Redefinição de canais de entrada de casos', 'Cliente', 'Desafio', false, NULL, '2026-04-27', '2026-05-15', 18, 0, false, 'Not Started'),
('5B.4',  6, 'Unificação de perfis Cartão - COL', 'Cliente', 'Desafio', false, NULL, '2026-05-04', '2026-05-22', 18, 0, false, 'Not Started'),
('5B.5',  6, 'Reajuste dos painéis do wallboard', 'Cliente', 'Desafio', false, NULL, '2026-05-18', '2026-06-01', 14, 0, false, 'Not Started'),
('5B.6',  6, 'Colocar prioridades de tratamento em Talkdesk', 'Cliente', 'Sugestão', false, NULL, '2026-05-25', '2026-06-08', 14, 0, false, 'Not Started'),
('5B.7',  6, 'Definir quais os níveis onde existe canal Voz', 'Cliente', 'Sugestão', false, NULL, '2026-06-01', '2026-06-12', 11, 0, false, 'Not Started'),
('5B.8',  6, 'IVR evoluído', 'Cliente', 'Sugestão', false, NULL, '2026-06-08', '2026-06-22', 14, 0, false, 'Not Started'),
('5B.9',  6, 'Perfis unificados sem segregação LOC-Cartão', 'Cliente', 'Sugestão', true, 'Operacional', '2026-06-15', '2026-06-26', 11, 0, false, 'Not Started'),
('5B.10', 6, 'Sistema de tracking IVR', 'Cliente', 'Sugestão', true, 'Operacional/Financeiro', '2026-06-22', '2026-06-30', 8, 0, true, 'Not Started');

-- Stream 7 - Instalações
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('6.1', 7, 'Definir local de formação', 'MNP', 'Desafio', false, NULL, '2026-04-16', '2026-04-30', 14, 0, false, 'Not Started'),
('6.2', 7, 'Definir deslocações dos TLs Cartão <-> COL', 'MNP', 'Desafio', false, NULL, '2026-04-27', '2026-05-11', 14, 0, false, 'Not Started'),
('6.3', 7, 'Definir novos acessos dos cartões de acesso', 'MNP', 'Desafio', false, NULL, '2026-05-04', '2026-05-18', 14, 0, false, 'Not Started'),
('6.4', 7, 'Clarificação do modelo de escalonamento (3ª linha)', 'Cliente', 'Sugestão', false, NULL, '2026-05-11', '2026-05-25', 14, 0, false, 'Not Started');

-- Stream 8 - Recursos Humanos
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('7.1', 8, 'Análise MNP: Identificação dos termos de contrato (migração MCH)', 'MNP', 'Sugestão', false, NULL, '2026-04-16', '2026-04-30', 14, 0, false, 'Not Started'),
('7.2', 8, 'Custo migração e definição de compensação cedência/transferência', 'MNP', 'Desafio', false, NULL, '2026-04-20', '2026-05-08', 18, 0, false, 'Not Started'),
('7.3', 8, 'Definição do sistema de incentivos com base no grau de desafio', 'MNP', 'Sugestão', false, NULL, '2026-05-04', '2026-05-22', 18, 0, false, 'Not Started'),
('7.4', 8, 'Elaboração de dimensionamento novo modelo vs momento atual', 'MNP', 'Desafio', false, NULL, '2026-04-16', '2026-05-15', 29, 50, false, 'In Progress'),
('7.5', 8, 'Alocação dos elementos com maior capacidade FCR', 'MNP', 'Desafio', false, NULL, '2026-05-18', '2026-06-05', 18, 0, false, 'Not Started'),
('7.6', 8, 'Alocação dos elementos com maiores conhecimentos ao 2º nível', 'MNP', 'Desafio', false, NULL, '2026-05-25', '2026-06-12', 18, 0, false, 'Not Started'),
('7.7', 8, 'Tempos médios de duração de curva de aprendizagem', 'MNP', 'Desafio', false, NULL, '2026-06-01', '2026-06-19', 18, 0, false, 'Not Started'),
('7.8', 8, 'Dimensionamento e sub-áreas', 'MNP', 'Desafio', false, NULL, '2026-04-16', '2026-05-15', 29, 50, false, 'In Progress'),
('7.9', 8, 'Redistribuição das áreas atuais', 'Cliente', 'Opinião', false, NULL, '2026-05-18', '2026-06-15', 28, 50, false, 'In Progress');

-- Stream 9 - Reporting
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('8.1', 9, 'Análise de KPIs atuais para identificar peso FCR vs fecho (Cartão)', 'MNP', 'Desafio', false, NULL, '2026-04-16', '2026-05-01', 15, 0, false, 'Not Started'),
('8.2', 9, 'Análise de KPIs atuais para identificar peso FCR vs fecho (COL)', 'MNP', 'Desafio', false, NULL, '2026-04-20', '2026-05-08', 18, 0, false, 'Not Started'),
('8.3', 9, 'Análise da complexidade dos casos', 'Cliente', 'Sugestão', false, NULL, '2026-05-04', '2026-05-22', 18, 0, false, 'Not Started'),
('8.4', 9, 'Analisar potenciais impactos no billing', 'MNP', 'Desafio', false, NULL, '2026-05-11', '2026-05-29', 18, 0, false, 'Not Started'),
('8.5', 9, 'Mitigação de potenciais impactos no billing', 'Cliente', 'Sugestão', false, NULL, '2026-05-25', '2026-06-12', 18, 0, false, 'Not Started'),
('8.6', 9, 'Redefinição de relatórios em Perto', 'Cliente', 'Sugestão', false, NULL, '2026-06-08', '2026-06-22', 14, 0, false, 'Not Started'),
('8.7', 9, 'Redefinição dos relatórios da Talkdesk', 'Cliente', 'Sugestão', false, NULL, '2026-06-15', '2026-06-30', 15, 0, false, 'Not Started');

-- Stream 10 - Billing
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('9.1', 10, 'Medição de tempos de tarefa por tipologia de caso', 'MNP', 'Desafio', false, NULL, '2026-04-16', '2026-05-08', 22, 0, false, 'Not Started'),
('9.2', 10, 'Criação de mecanismo de medição TMO (COL e Cartão)', 'MNP', 'Desafio', false, NULL, '2026-04-27', '2026-05-18', 21, 0, false, 'Not Started'),
('9.3', 10, 'Análise de billing atual Cartão e evolução RH vs revenue', 'MNP', 'Desafio', false, NULL, '2026-05-04', '2026-05-25', 21, 0, false, 'Not Started'),
('9.4', 10, 'Repensar Bónus e penalizações', 'MNP', 'Desafio', false, NULL, '2026-05-18', '2026-06-08', 21, 0, false, 'Not Started'),
('9.5', 10, 'Tema de medição de tempos', 'Interno', 'Desafio', false, NULL, '2026-05-25', '2026-06-12', 18, 0, false, 'Not Started'),
('9.6', 10, 'Analisar "novo pricing" mediante estabelecimento de tempos', 'MNP', 'Desafio', false, NULL, '2026-06-08', '2026-06-26', 18, 0, false, 'Not Started'),
('9.7', 10, 'Multiskill - Avaliar impacto na Qualidade', 'MNP', 'Desafio', false, NULL, '2026-06-15', '2026-06-30', 15, 0, false, 'Not Started');

-- Stream 11 - Governance
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('10.1', 11, 'Estabelecimento de reuniões iniciais MNP-Sonae para alinhamento', 'MNP', 'Sugestão', false, NULL, '2026-04-16', '2026-04-22', 6, 0, false, 'Not Started'),
('10.2', 11, 'Estabelecimento de reuniões operacionais entre TLs Cartão <-> COL', 'MNP', 'Sugestão', false, NULL, '2026-04-20', '2026-05-01', 11, 0, false, 'Not Started'),
('10.3', 11, 'Estabelecimento dos interlocutores Sonae', 'Cliente', 'Sugestão', false, NULL, '2026-04-27', '2026-05-11', 14, 0, false, 'Not Started'),
('10.4', 11, 'Estabelecimento do modelo de governance/reuniões operacionais', 'Cliente/MNP', 'Sugestão', false, NULL, '2026-05-04', '2026-05-22', 18, 0, false, 'Not Started'),
('10.5', 11, 'Necessidade de análise dos SLAs', 'MNP', 'Sugestão', false, NULL, '2026-05-18', '2026-06-08', 21, 0, false, 'Not Started');

-- Stream 12 - Gestão Operacional
INSERT INTO tasks (id, stream_id, name, owner, type, has_risk, risk_impact, start_date, end_date, duration_days, completion_pct, is_milestone, status) VALUES
('11.1', 12, 'Clarificação do modelo de escalonamento (3ª linha)', 'Cliente', 'Desafio', false, NULL, '2026-04-16', '2026-05-08', 22, 0, false, 'Not Started'),
('11.2', 12, 'Necessário redefinir árvore de tipificações', 'Cliente', 'Sugestão', false, NULL, '2026-05-04', '2026-05-25', 21, 0, false, 'Not Started'),
('11.3', 12, 'Avaliar necessidade de Equipas segregadas Motoristas/Lojas', 'Cliente/MNP', 'Opinião', false, NULL, '2026-05-18', '2026-06-12', 25, 0, false, 'Not Started');

-- ==========================================
-- QUESTÕES EM ABERTO
-- ==========================================
INSERT INTO questions (stream_id, text, status) VALUES
-- Apresentação Novo Modelo
(1, 'Quais são os temas/tipificações a tratar no nível 1 e nível 2?', 'Aberta'),
(1, 'Quais os temas do nível 3 (Cliente)?', 'Aberta'),

-- Formação
(3, 'Quais são os temas formativos para nível 1 vs nível 2?', 'Aberta'),

-- Qualidade
(4, 'Existe uma grelha de avaliação Cartão + grelha COL — vão fundir?', 'Aberta'),
(4, 'Reincidência na 2ª linha?', 'Aberta'),
(4, 'Impacto multiskill na qualidade?', 'Aberta'),

-- Tecnologia
(6, 'Redefinição de IVR?', 'Aberta'),
(6, 'Redefinição de Ring Groups?', 'Aberta'),
(6, 'Canais de entrada?', 'Aberta'),
(6, 'Perfis unificados?', 'Aberta'),
(6, 'Wallboard?', 'Aberta'),
(6, 'Prioridades Talkdesk?', 'Aberta'),
(6, 'Níveis com canal voz?', 'Aberta'),
(6, 'IVR evoluído?', 'Aberta'),

-- RH
(8, 'Segmentação das áreas — Equipa Inbound, Equipa Lojas e Motoristas?', 'Aberta'),

-- Reporting
(9, 'Medição de complexidade dos casos?', 'Aberta'),
(9, 'Impacto no billing?', 'Aberta'),
(9, 'Ficheiro comum Cartão+COL no Perto?', 'Aberta'),
(9, 'Cloud Talkdesk Cartão e COL associada?', 'Aberta'),

-- Governance
(11, 'Interlocutores Sonae?', 'Aberta'),
(11, 'Manter modelo atual de touchpoints (PDS diário, semanal, etc)?', 'Aberta'),

-- Gestão Operacional
(12, 'Faz sentido equipas segregadas Motoristas/Lojas?', 'Aberta');

-- ==========================================
-- Fix sequences after explicit ID inserts
-- ==========================================
SELECT setval('streams_id_seq', (SELECT MAX(id) FROM streams));
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
