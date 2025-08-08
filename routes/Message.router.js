const express = require('express')
const { fetchMessagesByUserId } = require('../controllers/Message.controller')
const app = express()
const router = express.Router()


router
    .get('/:userId', fetchMessagesByUserId)
    // .put('/:id',updateUserAPI)


module.exports = router