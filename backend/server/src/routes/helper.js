const Groq = require("groq-sdk")
require('dotenv').config()



const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

async function generateQuiz(documentText) {
    const prompt = `
    Create 5 multiple-choice questions from the following content.
    Each question must have:
    - question
    - options (4)
    - correctAnswer

    Return ONLY valid JSON.

    Content:
    ${documentText}
    `
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "user", content: prompt }
        ],
        temperature: 0.3,
    });

    return completion.choices[0].message.content
}

module.exports = {
    generateQuiz
}