require('dotenv').config();
const mongoose = require('mongoose');
const { date } = require('zod');

mongoose.connect(process.env.MONGODB_URI)


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const documentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        source: {
            type: String,
            enum: ["text", "pdf", "audio"],
            default: "text",
        },

        flashcards: [
            {
                question: String,
                answer: String,
            }
        ],

        quiz: [
            {
                question: String,
                options: [String],
                correctAnswer: Number,
                explanation: String,
            }
        ],
    },
    {
        timestamps: true, // ✅ auto adds createdAt & updatedAt
    }
);


const User = mongoose.model('User', userSchema)
const Document = mongoose.model('Document',documentSchema)

module.exports = {
    User,Document
};