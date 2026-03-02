import { NextRequest, NextResponse } from "next/server";

export type RsvpPayload = {
  nome: string;
  presenca: "accept" | "decline";
  restricoes_alimentares?: string;
  data_envio: string;
};

/**
 * POST /api/rsvp
 * Recebe os dados do formulário de RSVP e encaminha para o webhook (Make/Zapier)
 * configurado em RSVP_WEBHOOK_URL. O webhook adiciona uma linha no Google Sheets.
 */
export async function POST(request: NextRequest) {
  const webhookUrl = process.env.RSVP_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        error: "Webhook não configurado",
        detail:
          "Defina RSVP_WEBHOOK_URL no .env.local com o link do webhook do Make ou Zapier.",
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido (JSON esperado)." },
      { status: 400 }
    );
  }

  const { nome, presenca, restricoes_alimentares } = body as Record<
    string,
    unknown
  >;

  if (!nome || typeof nome !== "string" || !nome.trim()) {
    return NextResponse.json(
      { error: "O campo nome é obrigatório." },
      { status: 400 }
    );
  }

  if (
    presenca !== "accept" &&
    presenca !== "decline"
  ) {
    return NextResponse.json(
      { error: "Selecione se aceita ou não comparecer." },
      { status: 400 }
    );
  }

  const payload: RsvpPayload = {
    nome: nome.trim(),
    presenca,
    data_envio: new Date().toISOString(),
  };

  if (
    restricoes_alimentares != null &&
    typeof restricoes_alimentares === "string" &&
    restricoes_alimentares.trim()
  ) {
    payload.restricoes_alimentares = restricoes_alimentares.trim();
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          error: "Falha ao enviar para o webhook",
          detail: res.statusText || text.slice(0, 200),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { error: "Erro ao conectar com o webhook", detail: message },
      { status: 502 }
    );
  }
}
