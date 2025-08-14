import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post("/suggest", async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 50
            })
        });

        const data = await response.json();
        const suggestion = data.choices?.[0]?.message?.content?.trim() || "";
        res.json({ suggestion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch suggestion" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
