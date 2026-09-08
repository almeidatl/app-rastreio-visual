import { Hono } from "hono";
import { handle } from "hono/vercel";

// Iniciamos o app Hono indicando o caminho base que a Vercel vai usar
const app = new Hono().basePath("/api");

// Rota de teste
app.get("/teste", (c) => {
  return c.json({ mensagem: "Hono está rodando perfeitamente na Vercel!" });
});

// Rota onde você futuramente salvará o tempo de reação
app.post("/sessao", async (c) => {
  const body = await c.req.json();
  // Aqui entrará a lógica de salvar no Supabase depois
  console.log("Dados recebidos:", body);
  return c.json({ sucesso: true, tempoSalvo: body.tempoReacao });
});

// O export 'handle' adapta o Hono para o formato que a Vercel exige
export default handle(app);
