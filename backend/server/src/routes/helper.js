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


async function generateFlashcards(documentText) {
    const prompt = `
    Create 6–10 flashcards from the following content.

    Rules:
    - Each flashcard must have:
        - question: a short question or key concept
        - answer: a clear, simple explanation
    - Use simple, student-friendly language
    - Avoid long paragraphs
    - Do NOT add extra text

    Return ONLY valid JSON in this format:
    [
        { "question": "...", "answer": "..." }
    ]

    Content:
    ${documentText}
    `;

    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
    });

    return completion.choices[0].message.content;
}


async function generateChatAnswer(documentText, userQuestion) {
    const prompt = `
    You are an AI tutor for hearing-impaired students.

    Rules:
    - Answer ONLY using the document content below
    - Use simple, clear language
    - If the answer is not found in the document, say:
    "I cannot find this information in the document."

    Document:
    ${documentText}

    Question:
    ${userQuestion}
    `;

    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
    });

    return completion.choices[0].message.content;
}



module.exports = {
    generateQuiz, generateFlashcards, generateChatAnswer
}