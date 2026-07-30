/**
 * Dados centrais do casamento — Marcelle & Pedro.
 * Única fonte de verdade para textos e informações do site.
 */

export const WEDDING = {
  couple: {
    bride: "Marcelle",
    groom: "Pedro",
    display: "Marcelle e Pedro Lucas",
  },
  blessingVerse: {
    quote: "Portanto, o que Deus uniu, ninguém separe.",
    reference: "Mateus 19:6",
  },
  blessing: "Com a bênção de Deus e de seus pais",
  parents: {
    groom: {
      name: "Pedro Lucas",
      role: "Noivo",
      names: ["Anderson Costa de Freitas", "Juliana de Fátima de Ornelas Araújo de Freitas"],
    },
    bride: {
      name: "Marcelle",
      role: "Noiva",
      names: ["Marcelo da Camara Albuquerque", "Marcia Vieira dos Santos Albuquerque"],
    },
  },
  opening: "Convidam para a celebração do seu casamento",
  date: {
    /** ISO com fuso de Brasília */
    iso: "2026-09-25T19:00:00-03:00",
    weekdayLine: "Sexta-feira, 25 de setembro",
    yearLine: "Dois mil e vinte e seis",
    timeLine: "Às 19h",
    short: "25 . 09 . 2026",
  },
  ceremony: {
    slug: "cerimonia",
    label: "Cerimônia",
    name: "Paróquia Santa Rita de Cássia",
    street: "Rua Professor Eduardo Vianna, 551",
    neighborhood: "Carolina, Nova Iguaçu — RJ",
    full: "Rua Professor Eduardo Vianna, 551 — Carolina, Nova Iguaçu — RJ",
    time: "19h",
    mapsUrl: "https://maps.app.goo.gl/V3x28cyVVkErZihe9",
  },
  reception: {
    slug: "festa",
    label: "Festa",
    name: "Espaço 277",
    street: "Rua do Imperador, 277",
    neighborhood: "Viga, Nova Iguaçu — RJ",
    full: "Rua do Imperador, 277 — Viga, Nova Iguaçu — RJ",
    time: "21h",
    mapsUrl: "https://maps.app.goo.gl/e8YXAWwjyV2pmqSd7",
  },
  rsvp: {
    title: "Confirmação de convite",
    deadline: "Responda até 1º de setembro de 2026",
    namePlaceholder: "Nome completo do convidado",
    addGuest: "Adicionar outro convidado",
    accept: "Aceito com alegria",
    decline: "Não poderei comparecer",
    send: "Enviar resposta",
    success: "Resposta enviada! Obrigado por confirmar.",
    error: "Não foi possível enviar. Tente novamente.",
  },
  manual: {
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
    ],
  },
  dressCode: {
    title: "Traje sugerido",
    dress: "Esporte fino",
    avoidTitle: "Pedimos apenas que evitem as seguintes cores",
    colors: [
      { name: "Verde oliva", hex: "#75976F", note: "Cor das madrinhas" },
      { name: "Branco", hex: "#FFFFFF", note: "Cor da noiva" },
    ],
    comfort:
      "Vistam-se da forma que se sentirem mais confortáveis, mas não se esqueçam que vão dançar bastante",
    disclaimer: "Cores meramente ilustrativas",
  },
  location: {
    title: "Localização",
    subtitle: "Encontre o caminho até nós",
    cta: "Como chegar",
  },
  giftList: {
    title: "Lista de presentes",
    subtitle: "Sua presença já é o maior presente, mas se quiser nos ajudar a começar essa nova fase",
    cta: "Ver lista de presentes",
    url: "https://presentixx.vercel.app/lista/y9dj6mmz",
  },
} as const;

export const WEDDING_META = {
  title: "Marcelle & Pedro — Convite de Casamento",
  description:
    "Convite de casamento de Marcelle e Pedro — 25 de setembro de 2026. Celebre conosco!",
} as const;
