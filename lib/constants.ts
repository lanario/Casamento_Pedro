/**
 * Constantes do convite de casamento — Pedro & Marcelle.
 * Centraliza nomes e textos para uso em todos os componentes.
 */

export const INVITE_COUPLE_NAMES = {
  groom: "Pedro",
  bride: "Marcelle",
  /** Exibição principal: "Pedro & Marcelle" */
  display: " Marcelle  &  Pedro",
  /** Formato curto para assinaturas ou rodapé */
  short: "Marcelle  &  Pedro",
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
  /** URL do Google Maps para o local da cerimônia (abrir em nova aba) */
  ceremonyMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Paulo+de+Frontin+36+Andrade+de+Araujo",
  /** Endereço completo para embed do mapa (cerimônia e recepção no mesmo local) */
  locationAddress: "Rua Paulo de Frontin, 36 - Andrade de Araujo",
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

/** Textos da seção Localização */
export const LOCATION_SECTION = {
  title: "Localização",
  subtitle: "Encontre o caminho até nós",
  ctaButton: "Como chegar",
} as const;

/** Manual dos Convidados — regras/etiqueta (sem ícones) */
export const GUEST_MANUAL = {
  title: "Manual dos convidados",
  items: [
    "Confirme sua presença",
    "Branco é a cor da noiva",
    "Aguarde a liberação da mesa de doces",
    "Convidado não convida",
    "Não atrapalhe os fotógrafos",
    "Participe da cerimônia",
    "Aproveite bastante",
    "Não leve a decoração para casa",
    "Não atrase, seja pontual",
    "Não saia sem se despedir dos noivos",
  ] as const,
} as const;

/** Textos da seção Traje Sugerido */
export const DRESS_CODE = {
  title: "Traje sugerido",
  avoidInstruction: "Pedimos apenas que evitem as seguintes cores",
  whiteNote: "Bom, acho que dispensa-se dizer a respeito do branco kkkk",
  comfortAdvice:
    "Vistam-se da forma que se sentirem mais confortáveis, mas não se esqueçam que vão dançar bastante",
  disclaimer: "Cores meramente ilustrativas",
  colors: [
    { name: "Verde oliva", hex: "#6B805B" },
    { name: "Bege", hex: "#F0EDD1" },
    { name: "Marrom", hex: "#A14E0C" },
    { name: "Terracota", hex: "#DB5A3E" },
  ] as const,
} as const;
