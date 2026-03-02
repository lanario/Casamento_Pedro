# Integração RSVP com Google Sheets

O botão **"Enviar resposta"** do convite envia os dados para um **webhook**. Você pode usar **Google Apps Script**, **Make** ou **Zapier** para receber e gravar na planilha.

## Dados enviados (POST JSON)

Cada resposta envia um objeto com:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `nome` | string | Nome(s) do(s) convidado(s) |
| `presenca` | string | `"accept"` (aceita) ou `"decline"` (não comparecerá) |
| `restricoes_alimentares` | string (opcional) | Restrições alimentares, se preenchido |
| `data_envio` | string (ISO 8601) | Data/hora do envio (adicionada pelo servidor) |

## Opção 1: Google Apps Script (Web App)

Se você já criou um Web App no Apps Script e colocou a URL em `RSVP_WEBHOOK_URL`, o site envia **POST** com **Content-Type: application/json** e o corpo em JSON com os campos acima.

No seu script, use `doPost(e)` e leia o JSON assim:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    data.nome || '',
    data.presenca === 'accept' ? 'Sim' : 'Não',
    data.restricoes_alimentares || '',
    data.data_envio || new Date().toISOString()
  ]);
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- **Publicação:** Implantar → Novo implantação → Tipo: Aplicativo da Web → "Executar como: Eu" / "Quem tem acesso: Qualquer pessoa" (para o site poder chamar).
- A URL que você colou no `.env.local` é a URL desse implantação.

## Opção 2: Make ou Zapier

### Make (make.com)

1. Crie uma conta em [make.com](https://www.make.com).
2. **Novo cenário** → adicione o módulo **Webhooks** → **Custom webhook**.
3. Defina **Data structure** (opcional): pode usar os campos `nome`, `presenca`, `restricoes_alimentares`, `data_envio`.
4. Salve e copie a **URL do webhook** (algo como `https://hook.eu1.make.com/...`).
5. No cenário, adicione o módulo **Google Sheets** → **Add a row**.
6. Conecte sua conta Google e selecione a planilha e a aba.
7. Mapeie as colunas, por exemplo:
   - Coluna "Nome" ← `nome`
   - Coluna "Presença" ← `presenca` (ou use um módulo para converter "accept"/"decline" em "Sim"/"Não")
   - Coluna "Restrições" ← `restricoes_alimentares`
   - Coluna "Data envio" ← `data_envio`
8. Ative o cenário.

### Zapier

1. Crie um **Zap** em [zapier.com](https://zapier.com).
2. **Trigger**: **Webhooks by Zapier** → **Catch Hook** (ou **Catch Raw Hook** se preferir).
3. Copie a URL do webhook que o Zapier mostrar.
4. **Action**: **Google Sheets** → **Create Spreadsheet Row**.
5. Conecte o Google e escolha a planilha/aba; mapeie as colunas para os campos recebidos (`nome`, `presenca`, etc.).
6. Ative o Zap.

## Passo 2: Configurar o projeto

1. Na raiz do projeto, crie o arquivo `.env.local` (não versionado).
2. Adicione a variável com a URL do webhook:

```env
RSVP_WEBHOOK_URL=https://sua-url-do-webhook-aqui
```

3. Reinicie o servidor de desenvolvimento (`npm run dev`) para carregar a variável.

## Planilha sugerida

Na primeira linha, use cabeçalhos, por exemplo:

| Nome | Presença | Restrições alimentares | Data envio |
|------|----------|-------------------------|------------|
| ...  | ...      | ...                     | ...        |

Para um **painel** na mesma planilha (outra aba), você pode usar:

- Total de confirmados: `=CONT.SE(Respostas!B:B;"accept")` (ajuste "Respostas" para o nome da aba).
- Não comparecerão: `=CONT.SE(Respostas!B:B;"decline")`.

## Resumo

1. **Apps Script:** Criar Web App, implementar `doPost(e)` para ler o JSON e gravar na planilha, colar a URL em `RSVP_WEBHOOK_URL`. **Make/Zapier:** Criar webhook e conectar ao Google Sheets.
2. Colar a URL do webhook em `RSVP_WEBHOOK_URL` no `.env.local`.
3. Reiniciar o servidor (`npm run dev`).

Se algo não funcionar: confira a URL; no Apps Script, use "Quem tem acesso: Qualquer pessoa" na implantação.
