const estudiantesController = require("../controllers/estudiantes.controller")

const express = require("express")
const router = express.Router()

router.get('/obtener-estudiante-login/:id', estudiantesController.getEstudiantes)
router.post('/create-estudiante/:email/:usuario/:pass', estudiantesController.create)

module.exports = router