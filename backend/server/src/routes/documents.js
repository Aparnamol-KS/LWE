const express = require('express')
const multer = require('multer')
const fs = require('fs')
const pdfParse = require('pdf-parse');


const router = express.Router()

const { authMiddleware } = require('../middleware')
const { User, Document } = require('../models')

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only pdf files are allowed!"))
        }
        cb(null, true)
    }
})

//add document via copy & paste
router.post('/', authMiddleware, async (req, res) => {
    

})

//get all documents filter by user
router.get('/', authMiddleware, async (req, res) => {

})

//get a specific document filter by user , filter by id
router.get('/:id', authMiddleware, async (req, res) => {

})

//delete a specific document 
router.delete('/:id', authMiddleware, async (req, res) => {

})

//add document via upload
router.post('/upload', authMiddleware, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        console.log("pdfParse:", pdfParse);

        const pdfData = await pdfParse(dataBuffer);





        const extractedText = pdfData.text

        if (!extractedText || extractedText.trim().length === 0) {
            return res.status(400).json({
                message: "Unable to extract text from the PDF"
            })
        }

        const document = await Document.create({
            userId: req.user.id,
            title: req.body.title || req.file.originalname,
            content: extractedText,
            source: "pdf"
        })

        fs.unlinkSync(req.file.path)

        res.status(201).json(document)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message || "PDF Upload Failed!!"
        });
    }

})

module.exports = router