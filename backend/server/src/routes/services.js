const express = require('express')
const router = express.Router()
require('dotenv').config()



const { authMiddleware } = require('../middleware')
const { Document } = require('../models')
const { generateQuiz } = require('./helper')

router.post("/quiz/:documentId", authMiddleware, async (req, res) => {
    try {
        const docId = req.params.documentId;

        const doc = await Document.findOne({
            _id: docId,
            userId: req.user.id
        });

        if (!doc) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        if (doc.quiz && Array.isArray(doc.quiz) && doc.quiz.length > 0) {
            return res.status(200).json({
                quiz: { questions: doc.quiz },
                saved: true
            });
        }


        const text = doc.content.slice(0, 6000);
        const quizString = await generateQuiz(text);

        let quiz;
        try {
            quiz = JSON.parse(quizString);
        } catch (err) {
            return res.status(500).json({
                message: "AI returned invalid quiz JSON"
            });
        }

        return res.status(200).json({
            quiz: quiz,   // quiz = { questions: [...] }
            saved: false
        });


    } catch (err) {
        console.error("Quiz generation error:", err);
        return res.status(500).json({
            message: "Failed to generate quiz"
        });
    }
});

router.post("/quiz/:documentId/save", authMiddleware, async (req, res) => {
    try {
        const docId = req.params.documentId;
        const { quiz } = req.body;

        if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            return res.status(400).json({
                message: "Invalid quiz data"
            });
        }

        const doc = await Document.findOne({
            _id: docId,
            userId: req.user.id
        });

        if (!doc) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        const formattedQuiz = quiz.questions.map((q) => {
            const correctIndex = q.options.indexOf(q.correctAnswer);

            return {
                question: q.question,
                options: q.options,
                correctAnswer: correctIndex >= 0 ? correctIndex : 0,
                explanation: q.explanation || ""
            };
        });

        doc.quiz = formattedQuiz;

        await doc.save();

        return res.status(200).json({
            message: "Quiz saved successfully"
        });

    } catch (err) {
        console.error("Save quiz error:", err);
        return res.status(500).json({
            message: "Failed to save quiz"
        });
    }
});




module.exports = router