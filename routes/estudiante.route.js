const estudiantesController = require("../controllers/estudiantes.controller")

const express = require("express")
const router = express.Router()

router.post('/create-estudiante', estudiantesController.create)

module.exports = router