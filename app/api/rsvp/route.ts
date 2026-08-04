import { NextRequest, NextResponse } from "next/server";

export type RsvpPayload = {
  convidados: string;
  presenca: "Sim" | "Não";
  data_envio: string;
};

/**
 * POST /api/rsvp
 * Recebe os dados do formulário de RSVP (um ou mais convidados da mesma família
 * em um único envio) e encaminha ao webhook configurado em RSVP_WEBHOOK_URL
 * (Google Apps Script, Make ou Zapier) uma requisição por convidado, para que
 * cada nome vire uma linha própria no Google Sheets em vez de ficar tudo
 * concatenado numa única célula.
 */
export async function POST(request: NextRequest) {
  const webhookUrl = process.env.RSVP_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        error: "Webhook não configurado",
        detail:
          "Defina RSVP_WEBHOOK_URL no .env.local com o link do Apps Script/Make/Zapier.",
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

  const { convidados, presenca } = body as Record<string, unknown>;

  const nomes = (Array.isArray(convidados) ? convidados : [])
    .filter((n): n is string => typeof n === "string")
    .map((n) => n.trim())
    .filter(Boolean);

  if (nomes.length === 0) {
    return NextResponse.json(
      { error: "Informe ao menos o nome de um convidado." },
      { status: 400 }
    );
  }

  if (presenca !== "accept" && presenca !== "decline") {
    return NextResponse.json(
      { error: "Selecione se aceita ou não comparecer." },
      { status: 400 }
    );
  }

  const presencaValue = presenca === "accept" ? "Sim" : "Não";
  const dataEnvio = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  try {
    for (const nome of nomes) {
      const payload: RsvpPayload = {
        convidados: nome,
        presenca: presencaValue,
        data_envio: dataEnvio,
      };

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
