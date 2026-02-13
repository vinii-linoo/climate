export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { temperatura, umidade, cidade } = req.body;

  const prompt = `Me dê uma sugestão de roupa para usar em ${cidade}, 
  com a temperatura de ${temperatura}°C e com ${umidade}% de umidade.
  Me dê a resposta em 2 frases curtas.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  const respostaFinal = data.choices?.[0]?.message?.content || "Não consegui gerar uma sugestão.";

  res.status(200).json({ resposta: respostaFinal });
}
