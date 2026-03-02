/**
 * Tipos do convite de casamento.
 * Props e interfaces para componentes (Letter, Envelope, InviteContent).
 */

export interface LetterEnvelopeProps {
  /** Se o envelope está fechado (exibe envelope) ou aberto (exibe carta) */
  isOpen: boolean;
  /** Callback ao solicitar abertura (ex.: clique no envelope) */
  onOpen?: () => void;
  /** Classe CSS adicional */
  className?: string;
  /** Conteúdo a ser revelado quando aberto */
  children: React.ReactNode;
}

export interface InviteLetterProps {
  /** Conteúdo interno da carta (textos, foto, data/local) */
  children: React.ReactNode;
  className?: string;
}

export interface InviteContentProps {
  groomName: string;
  brideName: string;
  /** Bênção (ex.: "Com a bênção de Deus") */
  blessing?: string;
  openingText: string;
  /** Texto completo com data/hora (ex.: "a realizar-se dia 15 de fevereiro de 2025 às 19h") */
  dateTimeText?: string;
  dateTime?: string;
  venue?: string;
  /** Endereço completo do local */
  address?: string;
  receptionNote?: string;
  rsvpLabel?: string;
  rsvpWebsite?: string;
  coupleImageSrc?: string;
  presenceText?: string;
  className?: string;
}

export interface InviteMeta {
  title: string;
  description: string;
}
