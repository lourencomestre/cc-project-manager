import type { Stream, Task, Question } from "@/lib/types";

export const streams: Stream[] = [
  { id: 1, name: "Apresentação Novo Modelo", color: "#3B82F6", display_order: 1 },
  { id: 2, name: "Recrutamento", color: "#EF4444", display_order: 2 },
  { id: 3, name: "Formação", color: "#F59E0B", display_order: 3 },
  { id: 4, name: "Qualidade", color: "#10B981", display_order: 4 },
  { id: 5, name: "AI", color: "#8B5CF6", display_order: 5 },
  { id: 6, name: "Tecnologia", color: "#06B6D4", display_order: 6 },
  { id: 7, name: "Instalações", color: "#F97316", display_order: 7 },
  { id: 8, name: "Recursos Humanos", color: "#EC4899", display_order: 8 },
  { id: 9, name: "Reporting", color: "#6366F1", display_order: 9 },
  { id: 10, name: "Billing", color: "#14B8A6", display_order: 10 },
  { id: 11, name: "Governance", color: "#A855F7", display_order: 11 },
  { id: 12, name: "Gestão Operacional", color: "#78716C", display_order: 12 },
];

const now = new Date().toISOString();

function t(
  id: number,
  streamId: number,
  position: number,
  name: string,
  owner: string,
  type: Task["type"],
  hasRisk: boolean,
  riskImpact: string | null,
  startDate: string | null,
  endDate: string | null,
  durationDays: number,
  completionPct: number,
  isMilestone: boolean,
  status: Task["status"] = "Not Started"
): Task {
  return {
    id,
    stream_id: streamId,
    position,
    name,
    owner,
    type,
    has_risk: hasRisk,
    risk_impact: riskImpact,
    start_date: startDate,
    end_date: endDate,
    duration_days: durationDays,
    completion_pct: completionPct,
    is_milestone: isMilestone,
    notes: null,
    status,
    created_at: now,
    updated_at: now,
  };
}

let _id = 0;
function nextId() { return ++_id; }

export const tasks: Task[] = [
  // Stream 1 - Apresentação Novo Modelo
  t(nextId(), 1, 1, "Apresentação do novo modelo de negócio às Equipas (Cartão + COL)", "MNP", "Sugestão", false, null, "2026-04-16", "2026-04-24", 8, 0, false),
  t(nextId(), 1, 2, "Obtenção de inputs (identificação de potenciais contras)", "MNP", "Sugestão", false, null, "2026-04-20", "2026-04-30", 10, 0, false),
  t(nextId(), 1, 3, "Identificação de requisitos necessários para cada nível (1, 2, 3)", "Cliente/MNP", "Sugestão", true, "Financeiro", "2026-04-27", "2026-05-08", 11, 0, false),
  t(nextId(), 1, 4, "Identificação prévia de elementos a alocar em cada nível", "MNP", "Desafio", false, null, "2026-05-04", "2026-05-15", 11, 0, false),
  t(nextId(), 1, 5, "Identificação dos temas a tratamento por parte do Cliente no nível 3", "Cliente/MNP", "Sugestão", false, null, "2026-05-11", "2026-05-22", 11, 0, false),
  t(nextId(), 1, 6, "Modelo de faturação chamada/tarefa", "Cliente/MNP", "Sugestão", true, "Financeiro", "2026-05-18", "2026-06-05", 18, 0, false),
  t(nextId(), 1, 7, "Revisão trimestral ou semestral dos TMOs", "Cliente/MNP", "Sugestão", true, "Financeiro", "2026-06-08", "2026-06-30", 22, 0, true),

  // Stream 2 - Recrutamento
  t(nextId(), 2, 1, "Novo modelo com possibilidade de desistências", "MNP", "Desafio", true, "Operacional/Financeiro", "2026-04-16", "2026-04-28", 12, 0, false),
  t(nextId(), 2, 2, "Dimensionar a bolsa de recrutamento", "MNP", "Desafio", false, null, "2026-04-20", "2026-05-04", 14, 0, false),
  t(nextId(), 2, 3, "Definir timings para recrutamento", "MNP", "Sugestão", false, null, "2026-04-27", "2026-05-08", 11, 0, false),
  t(nextId(), 2, 4, "Redefinição da proposta contratual com base na nova estrutura", "MNP", "Desafio", false, null, "2026-05-04", "2026-05-20", 16, 0, false),
  t(nextId(), 2, 5, "Marcar reunião com recrutamento para apresentação da nova estrutura", "MNP", "Sugestão", false, null, "2026-05-11", "2026-05-15", 4, 0, false),
  t(nextId(), 2, 6, "Definição de tempo expectável para formação", "MNP", "Desafio", false, null, "2026-05-18", "2026-05-29", 11, 0, false),
  t(nextId(), 2, 7, "Re-análise do AF atual", "MNP", "Sugestão", false, null, "2026-06-01", "2026-06-12", 11, 0, false),
  t(nextId(), 2, 8, "Capacidade de atração com base num novo modelo formativo", "MNP", "Sugestão", true, "Operacional", "2026-06-15", "2026-06-30", 15, 0, true),

  // Stream 3 - Formação
  t(nextId(), 3, 1, "Sessão MNP-Sonae para calibração de temas formativos", "Cliente/MNP", "Sugestão", false, null, "2026-04-16", "2026-04-22", 6, 0, false),
  t(nextId(), 3, 2, "Identificação de modelo formativo (Novos Colaboradores)", "MNP", "Desafio", false, null, "2026-04-20", "2026-05-01", 11, 0, false),
  t(nextId(), 3, 3, "Identificação de necessidades formativas para cada nível", "MNP", "Desafio", false, null, "2026-04-27", "2026-05-08", 11, 0, false),
  t(nextId(), 3, 4, "Quantificar tempos de formação para migração multiskill", "MNP", "Desafio", false, null, "2026-05-04", "2026-05-15", 11, 0, false),
  t(nextId(), 3, 5, "Desenvolvimento de novos manuais de formação (COL <-> Cartão)", "MNP", "Desafio", false, null, "2026-05-11", "2026-05-29", 18, 0, false),
  t(nextId(), 3, 6, "Desenvolvimento de manuais de formação Equipa Sugestões e Reclamações", "MNP", "Desafio", false, null, "2026-05-18", "2026-06-05", 18, 0, false),
  t(nextId(), 3, 7, "Desenvolvimento de novos elementos formativos (Quickguide, etc)", "MNP", "Desafio", false, null, "2026-05-25", "2026-06-10", 16, 0, false),
  t(nextId(), 3, 8, "Identificação do formador (PT ou LX)", "MNP", "Sugestão", false, null, "2026-05-04", "2026-05-11", 7, 0, false),
  t(nextId(), 3, 9, "Definir modelo de avaliação de impacto da formação", "MNP", "Sugestão", false, null, "2026-06-01", "2026-06-12", 11, 0, false),
  t(nextId(), 3, 10, "Avaliação de esforço e definição de plano de conversão", "MNP", "Sugestão", false, null, "2026-06-08", "2026-06-19", 11, 0, false),
  t(nextId(), 3, 11, "Avaliar possibilidade de formação em módulos", "MNP", "Desafio", false, null, "2026-06-01", "2026-06-15", 14, 0, false),
  t(nextId(), 3, 12, "Disponibilização de users de formação para plataforma Perto", "MNP", "Sugestão", false, null, "2026-06-15", "2026-06-22", 7, 0, false),
  t(nextId(), 3, 13, "Turnover em formação e capacidade de resposta a picos", "MNP", "Sugestão", true, "Financeiro", "2026-06-15", "2026-06-30", 15, 0, false),
  t(nextId(), 3, 14, "Modelo de pricing da formação", "MNP", "Sugestão", true, "Financeiro", "2026-06-22", "2026-06-30", 8, 0, false),

  // Stream 4 - Qualidade
  t(nextId(), 4, 1, "Redefinição da grelha de avaliação / Criação de grelhas de monitorização", "Cliente", "Desafio", false, null, "2026-04-16", "2026-05-08", 22, 0, false),
  t(nextId(), 4, 2, "Redefinição dos processos de Qualidade", "Cliente", "Sugestão", false, null, "2026-04-27", "2026-05-15", 18, 0, false),
  t(nextId(), 4, 3, "Redefinição de escala de avaliação", "Cliente/MNP", "Sugestão", false, null, "2026-05-04", "2026-05-18", 14, 0, false),
  t(nextId(), 4, 4, "Partilha dos indicadores do NPS", "Cliente", "Sugestão", false, null, "2026-05-11", "2026-05-22", 11, 0, false),
  t(nextId(), 4, 5, "Estabelecimento de timings e metodologias de avaliação do impacto", "Cliente", "Sugestão", false, null, "2026-05-18", "2026-05-29", 11, 0, false),
  t(nextId(), 4, 6, "Medição do impacto no NPS", "Cliente", "Sugestão", false, null, "2026-06-01", "2026-06-19", 18, 0, false),
  t(nextId(), 4, 7, "Identificação de elemento de Qualidade", "MNP", "Sugestão", false, null, "2026-05-04", "2026-05-11", 7, 0, false),
  t(nextId(), 4, 8, "Redefinição da equipa de formação", "MNP", "Sugestão", false, null, "2026-05-11", "2026-05-22", 11, 0, false),
  t(nextId(), 4, 9, "SRS - Reincidência (2ª linha através de reencaminhamento)", "Cliente/MNP", "Sugestão", false, null, "2026-06-01", "2026-06-15", 14, 0, false),
  t(nextId(), 4, 10, "Multiskill - Avaliar impacto na Qualidade", "Cliente/MNP", "Sugestão", false, null, "2026-06-08", "2026-06-22", 14, 0, false),
  t(nextId(), 4, 11, "Redefinição do modelo bónus/penalidade indexado à Qualidade", "Cliente/MNP", "Sugestão", true, "Financeiro", "2026-06-15", "2026-06-30", 15, 0, false),

  // Stream 5 - AI
  t(nextId(), 5, 1, "Levantamento de atividades repetitivas para automação", "MNP", "Sugestão", false, null, "2026-04-16", "2026-05-01", 15, 0, false),
  t(nextId(), 5, 2, "Implementação do modelo de Agent Assist", "MNP", "Sugestão", false, null, "2026-05-04", "2026-05-29", 25, 0, false),
  t(nextId(), 5, 3, "Implementação do modelo de Quality Assurance Automation", "MNP", "Sugestão", false, null, "2026-05-18", "2026-06-12", 25, 0, false),
  t(nextId(), 5, 4, "Implementação do modelo de Post Call AI", "MNP", "Sugestão", false, null, "2026-06-01", "2026-06-22", 21, 0, false),
  t(nextId(), 5, 5, "Implementação do modelo de Mailbots", "MNP", "Sugestão", false, null, "2026-06-08", "2026-06-30", 22, 0, false),

  // Stream 6 - Tecnologia
  t(nextId(), 6, 1, "Necessidade de redefinir IVR", "Cliente", "Sugestão", false, null, "2026-04-16", "2026-05-01", 15, 0, false),
  t(nextId(), 6, 2, "Necessidade de redefinir Ring Groups", "Cliente", "Desafio", false, null, "2026-04-20", "2026-05-08", 18, 0, false),
  t(nextId(), 6, 3, "Redefinição de canais de entrada de casos", "Cliente", "Desafio", false, null, "2026-04-27", "2026-05-15", 18, 0, false),
  t(nextId(), 6, 4, "Unificação de perfis Cartão - COL", "Cliente", "Desafio", false, null, "2026-05-04", "2026-05-22", 18, 0, false),
  t(nextId(), 6, 5, "Reajuste dos painéis do wallboard", "Cliente", "Desafio", false, null, "2026-05-18", "2026-06-01", 14, 0, false),
  t(nextId(), 6, 6, "Colocar prioridades de tratamento em Talkdesk", "Cliente", "Sugestão", false, null, "2026-05-25", "2026-06-08", 14, 0, false),
  t(nextId(), 6, 7, "Definir quais os níveis onde existe canal Voz", "Cliente", "Sugestão", false, null, "2026-06-01", "2026-06-12", 11, 0, false),
  t(nextId(), 6, 8, "IVR evoluído", "Cliente", "Sugestão", false, null, "2026-06-08", "2026-06-22", 14, 0, false),
  t(nextId(), 6, 9, "Perfis unificados sem segregação LOC-Cartão", "Cliente", "Sugestão", true, "Operacional", "2026-06-15", "2026-06-26", 11, 0, false),
  t(nextId(), 6, 10, "Sistema de tracking IVR", "Cliente", "Sugestão", true, "Operacional/Financeiro", "2026-06-22", "2026-06-30", 8, 0, true),

  // Stream 7 - Instalações
  t(nextId(), 7, 1, "Definir local de formação", "MNP", "Desafio", false, null, "2026-04-16", "2026-04-30", 14, 0, false),
  t(nextId(), 7, 2, "Definir deslocações dos TLs Cartão <-> COL", "MNP", "Desafio", false, null, "2026-04-27", "2026-05-11", 14, 0, false),
  t(nextId(), 7, 3, "Definir novos acessos dos cartões de acesso", "MNP", "Desafio", false, null, "2026-05-04", "2026-05-18", 14, 0, false),
  t(nextId(), 7, 4, "Clarificação do modelo de escalonamento (3ª linha)", "Cliente", "Sugestão", false, null, "2026-05-11", "2026-05-25", 14, 0, false),

  // Stream 8 - Recursos Humanos
  t(nextId(), 8, 1, "Análise MNP: Identificação dos termos de contrato (migração MCH)", "MNP", "Sugestão", false, null, "2026-04-16", "2026-04-30", 14, 0, false),
  t(nextId(), 8, 2, "Custo migração e definição de compensação cedência/transferência", "MNP", "Desafio", false, null, "2026-04-20", "2026-05-08", 18, 0, false),
  t(nextId(), 8, 3, "Definição do sistema de incentivos com base no grau de desafio", "MNP", "Sugestão", false, null, "2026-05-04", "2026-05-22", 18, 0, false),
  t(nextId(), 8, 4, "Elaboração de dimensionamento novo modelo vs momento atual", "MNP", "Desafio", false, null, "2026-04-16", "2026-05-15", 29, 50, false, "In Progress"),
  t(nextId(), 8, 5, "Alocação dos elementos com maior capacidade FCR", "MNP", "Desafio", false, null, "2026-05-18", "2026-06-05", 18, 0, false),
  t(nextId(), 8, 6, "Alocação dos elementos com maiores conhecimentos ao 2º nível", "MNP", "Desafio", false, null, "2026-05-25", "2026-06-12", 18, 0, false),
  t(nextId(), 8, 7, "Tempos médios de duração de curva de aprendizagem", "MNP", "Desafio", false, null, "2026-06-01", "2026-06-19", 18, 0, false),
  t(nextId(), 8, 8, "Dimensionamento e sub-áreas", "MNP", "Desafio", false, null, "2026-04-16", "2026-05-15", 29, 50, false, "In Progress"),
  t(nextId(), 8, 9, "Redistribuição das áreas atuais", "Cliente", "Opinião", false, null, "2026-05-18", "2026-06-15", 28, 50, false, "In Progress"),

  // Stream 9 - Reporting
  t(nextId(), 9, 1, "Análise de KPIs atuais para identificar peso FCR vs fecho (Cartão)", "MNP", "Desafio", false, null, "2026-04-16", "2026-05-01", 15, 0, false),
  t(nextId(), 9, 2, "Análise de KPIs atuais para identificar peso FCR vs fecho (COL)", "MNP", "Desafio", false, null, "2026-04-20", "2026-05-08", 18, 0, false),
  t(nextId(), 9, 3, "Análise da complexidade dos casos", "Cliente", "Sugestão", false, null, "2026-05-04", "2026-05-22", 18, 0, false),
  t(nextId(), 9, 4, "Analisar potenciais impactos no billing", "MNP", "Desafio", false, null, "2026-05-11", "2026-05-29", 18, 0, false),
  t(nextId(), 9, 5, "Mitigação de potenciais impactos no billing", "Cliente", "Sugestão", false, null, "2026-05-25", "2026-06-12", 18, 0, false),
  t(nextId(), 9, 6, "Redefinição de relatórios em Perto", "Cliente", "Sugestão", false, null, "2026-06-08", "2026-06-22", 14, 0, false),
  t(nextId(), 9, 7, "Redefinição dos relatórios da Talkdesk", "Cliente", "Sugestão", false, null, "2026-06-15", "2026-06-30", 15, 0, false),

  // Stream 10 - Billing
  t(nextId(), 10, 1, "Medição de tempos de tarefa por tipologia de caso", "MNP", "Desafio", false, null, "2026-04-16", "2026-05-08", 22, 0, false),
  t(nextId(), 10, 2, "Criação de mecanismo de medição TMO (COL e Cartão)", "MNP", "Desafio", false, null, "2026-04-27", "2026-05-18", 21, 0, false),
  t(nextId(), 10, 3, "Análise de billing atual Cartão e evolução RH vs revenue", "MNP", "Desafio", false, null, "2026-05-04", "2026-05-25", 21, 0, false),
  t(nextId(), 10, 4, "Repensar Bónus e penalizações", "MNP", "Desafio", false, null, "2026-05-18", "2026-06-08", 21, 0, false),
  t(nextId(), 10, 5, "Tema de medição de tempos", "Interno", "Desafio", false, null, "2026-05-25", "2026-06-12", 18, 0, false),
  t(nextId(), 10, 6, "Analisar \"novo pricing\" mediante estabelecimento de tempos", "MNP", "Desafio", false, null, "2026-06-08", "2026-06-26", 18, 0, false),
  t(nextId(), 10, 7, "Multiskill - Avaliar impacto na Qualidade", "MNP", "Desafio", false, null, "2026-06-15", "2026-06-30", 15, 0, false),

  // Stream 11 - Governance
  t(nextId(), 11, 1, "Estabelecimento de reuniões iniciais MNP-Sonae para alinhamento", "MNP", "Sugestão", false, null, "2026-04-16", "2026-04-22", 6, 0, false),
  t(nextId(), 11, 2, "Estabelecimento de reuniões operacionais entre TLs Cartão <-> COL", "MNP", "Sugestão", false, null, "2026-04-20", "2026-05-01", 11, 0, false),
  t(nextId(), 11, 3, "Estabelecimento dos interlocutores Sonae", "Cliente", "Sugestão", false, null, "2026-04-27", "2026-05-11", 14, 0, false),
  t(nextId(), 11, 4, "Estabelecimento do modelo de governance/reuniões operacionais", "Cliente/MNP", "Sugestão", false, null, "2026-05-04", "2026-05-22", 18, 0, false),
  t(nextId(), 11, 5, "Necessidade de análise dos SLAs", "MNP", "Sugestão", false, null, "2026-05-18", "2026-06-08", 21, 0, false),

  // Stream 12 - Gestão Operacional
  t(nextId(), 12, 1, "Clarificação do modelo de escalonamento (3ª linha)", "Cliente", "Desafio", false, null, "2026-04-16", "2026-05-08", 22, 0, false),
  t(nextId(), 12, 2, "Necessário redefinir árvore de tipificações", "Cliente", "Sugestão", false, null, "2026-05-04", "2026-05-25", 21, 0, false),
  t(nextId(), 12, 3, "Avaliar necessidade de Equipas segregadas Motoristas/Lojas", "Cliente/MNP", "Opinião", false, null, "2026-05-18", "2026-06-12", 25, 0, false),
];

export const questions: Question[] = [
  { id: 1, stream_id: 1, text: "Quais são os temas/tipificações a tratar no nível 1 e nível 2?", status: "Aberta", created_at: now },
  { id: 2, stream_id: 1, text: "Quais os temas do nível 3 (Cliente)?", status: "Aberta", created_at: now },
  { id: 3, stream_id: 3, text: "Quais são os temas formativos para nível 1 vs nível 2?", status: "Aberta", created_at: now },
  { id: 4, stream_id: 4, text: "Existe uma grelha de avaliação Cartão + grelha COL — vão fundir?", status: "Aberta", created_at: now },
  { id: 5, stream_id: 4, text: "Reincidência na 2ª linha?", status: "Aberta", created_at: now },
  { id: 6, stream_id: 4, text: "Impacto multiskill na qualidade?", status: "Aberta", created_at: now },
  { id: 7, stream_id: 6, text: "Redefinição de IVR?", status: "Aberta", created_at: now },
  { id: 8, stream_id: 6, text: "Redefinição de Ring Groups?", status: "Aberta", created_at: now },
  { id: 9, stream_id: 6, text: "Canais de entrada?", status: "Aberta", created_at: now },
  { id: 10, stream_id: 6, text: "Perfis unificados?", status: "Aberta", created_at: now },
  { id: 11, stream_id: 6, text: "Wallboard?", status: "Aberta", created_at: now },
  { id: 12, stream_id: 6, text: "Prioridades Talkdesk?", status: "Aberta", created_at: now },
  { id: 13, stream_id: 6, text: "Níveis com canal voz?", status: "Aberta", created_at: now },
  { id: 14, stream_id: 6, text: "IVR evoluído?", status: "Aberta", created_at: now },
  { id: 15, stream_id: 8, text: "Segmentação das áreas — Equipa Inbound, Equipa Lojas e Motoristas?", status: "Aberta", created_at: now },
  { id: 16, stream_id: 9, text: "Medição de complexidade dos casos?", status: "Aberta", created_at: now },
  { id: 17, stream_id: 9, text: "Impacto no billing?", status: "Aberta", created_at: now },
  { id: 18, stream_id: 9, text: "Ficheiro comum Cartão+COL no Perto?", status: "Aberta", created_at: now },
  { id: 19, stream_id: 9, text: "Cloud Talkdesk Cartão e COL associada?", status: "Aberta", created_at: now },
  { id: 20, stream_id: 11, text: "Interlocutores Sonae?", status: "Aberta", created_at: now },
  { id: 21, stream_id: 11, text: "Manter modelo atual de touchpoints (PDS diário, semanal, etc)?", status: "Aberta", created_at: now },
  { id: 22, stream_id: 12, text: "Faz sentido equipas segregadas Motoristas/Lojas?", status: "Aberta", created_at: now },
];
