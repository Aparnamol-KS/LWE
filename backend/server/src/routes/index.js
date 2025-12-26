const express = require('express')
const router = express.Router()


const authRouter = require('./auth')
const documentRouter = require('./documents')
const aiRouter = require('./controller')

router.use('/auth',authRouter)
router.use('/document',documentRouter)
router.use('/ai',aiRouter)


module.exports = router