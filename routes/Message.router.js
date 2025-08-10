const express = require('express')
const { fetchMessagesByUserId } = require('../controllers/Message.controller')
const app = express()
const router = express.Router()


router
    .get('/user/:userId', fetchMessagesByUserId)

module.exports = router