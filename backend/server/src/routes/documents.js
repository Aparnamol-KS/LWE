const express = require('express')
const multer = require('multer')
const fs = require('fs')
const pdfParse = require('pdf-parse');


const router = express.Router()

const { authMiddleware } = require('../middleware')
const { Document } = require('../models')

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only pdf files are allowed!"))
        }
        cb(null, true)
    }
})

router.post('/paste', authMiddleware, async (req, res) => {
    try {
        const title = req.body.title?.trim();
        const content = req.body.content?.trim();

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        if (content.length > 100000) {
            return res.status(413).json({
                message: "Content too large"
            });
        }

        const doc = await Document.create({
            userId: req.user.id,
            title,
            content,
            source: "text"
        });

        return res.status(201).json({
            message: "Document created successfully",
            document: doc
        });

    } catch (err) {
        console.error("Paste document error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const docs = await Document.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            docs
        });
    } catch (err) {
        console.error("Fetch documents error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const documentId = req.params.id;

        const doc = await Document.findOne({
            _id: documentId,
            userId: userId
        });

        if (!doc) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        return res.status(200).json({
            doc
        });

    } catch (err) {
        console.error("Fetch document error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const documentId = req.params.id;

        const result = await Document.deleteOne({
            _id: documentId,
            userId: userId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Document not found"
            });
        }


        return res.status(200).json({
            message: "Document deleted successfully"
        });

    } catch (err) {
        console.error("Delete document error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


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