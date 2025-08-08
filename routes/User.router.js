const express = require('express')
const {fetchAllUsers, fetchUserById } = require('../controllers/User.controller')
const app = express()
const router = express.Router()


router
    .get('/', fetchAllUsers)
    .get('/:userId',fetchUserById)
    // .put('/:id',updateUserAPI)


module.exports = router