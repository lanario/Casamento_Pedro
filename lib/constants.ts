/**
 * Constantes do convite de casamento — Pedro & Marcelle.
 * Centraliza nomes e textos para uso em todos os componentes.
 */

export const INVITE_COUPLE_NAMES = {
  groom: "Pedro",
  bride: "Marcelle",
  /** Exibição principal: "Pedro & Marcelle" */
  display: " Marcelle & Pedro",
  /** Formato curto para assinaturas ou rodapé */
  short: "Marcelle & Pedro",
} as const;

export const INVITE_TEXTS = {
  /** Bênção (ex.: "Com a bênção de Deus") */
  blessing: "Com a bênção de Deus",
  /** Frase de abertura do convite */
  opening:
    "Convidam para a celebração do seu casamento.",
  /** Texto com data/hora (ex.: "a realizar-se dia 15 de fevereiro de 2025 às 19h" ou placeholder) */
  dateTimeText: "a realizar-se em data e horário a definir",
  /** Instrução para o convidado */
  presence: "Sua presença é nosso presente.",
  /** Nota sobre cerimônia e recepção */
  receptionNote: "Cerimônia e recepção serão realizados no mesmo local.",
  /** R.S.V.P. / lista de presentes (ex.: "Confirmação de presença e lista de presentes no site") */
  rsvpLabel: "Confirmação de presença e lista de presentes no site",
  /** URL do site (placeholder ou real) */
  rsvpWebsite: "www.pedroemarcelle.com.br",
  /** Data e local — placeholders para preenchimento */
  datePlaceholder: "Data e horário a definir",
  venuePlaceholder: "Local a definir",
  /** Endereço completo (quando definido) */
  addressPlaceholder: "",
} as const;

export const INVITE_META = {
  title: "Pedro & Marcelle — Convite de Casamento",
  description: "Convite de casamento de Pedro e Marcelle. Celebre conosco!",
} as const;

/** Texto de interação para abrir o envelope */
export const INVITE_CTA = {
  openEnvelope: "Toque para abrir",
} as const;

/** Textos no estilo do template (hero, cerimônia, recepção, RSVP) */
export const INVITE_TEMPLATE = {
  heroInviteLine: "Você está cordialmente convidado",
  heroSubline: "Estão se casando",
  dateLine1: "Sexta-feira, 25 de setembro",
  dateLine2: "Dois mil e vinte e seis",
  dateLine3: "Às 19h",
  ceremonyTitle: "Cerimônia",
  ceremonyVenue: "Rua Paulo de Frontin, 36",
  ceremonyAddress: "Andrade de Araujo",
  /** URL do Google Maps para o local da cerimônia */
  ceremonyMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Paulo+de+Frontin+36+Andrade+de+Araujo",
  receptionTitle: "Recepção",
  receptionVenue: "Mesmo local",
  receptionNote: "Jantar e festa em seguida à cerimônia",
  rsvpTitle: "Confirmação de convite",
  rsvpBy: "Responda até 1º de setembro de 2026",
  rsvpNamePlaceholder: "Nome(s) do(s) convidado(s)",
  rsvpAccept: "Aceito com alegria",
  rsvpDecline: "Não poderei comparecer",
  rsvpSend: "Enviar resposta",
  rsvpDietNote: "Informe-nos sobre restrições alimentares, se houver.",
} as const;
