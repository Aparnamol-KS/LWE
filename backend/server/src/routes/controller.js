const express = require('express')
const {authMiddleware} = require('../middleware')
const router = express.Router()



router.post('/chat',authMiddleware,async(req,res)=>{

})

router.post('/flashcards',authMiddleware,async(req,res)=>{

})

router.post('/quiz',authMiddleware,async(req,res)=>{

})


// Later
// router.post('/transcribe')


module.exports = router