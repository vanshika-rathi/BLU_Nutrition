import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("public")); // folder with your index.html, css, js

app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [], system } = req.body;

    const groqMessages = system
      ? [{ role: "system", content: system }, ...messages]
      : messages;

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
       model: "openai/gpt-oss-120b",
       messages: groqMessages,
       max_tokens: 2000,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      console.error("Groq error:", data);
      return res.status(r.status).json(data);
    }

    // Convert Groq's response to the shape your frontend reads
    const text = data.choices?.[0]?.message?.content || "";
    res.json({ content: [{ type: "text", text }] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
