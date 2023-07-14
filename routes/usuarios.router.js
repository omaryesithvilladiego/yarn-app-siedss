const express = require("express")
const router = express.Router()
const usuarioController = require("../controllers/usuarios.controller")

router.post('/login', usuarioController.login)
router.post('/create-user',usuarioController.create)
router.post('/update-pass-user/:id', usuarioController.updatePassword)

module.exports = router