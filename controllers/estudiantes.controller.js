const Estudiante = require('../models/estudiante.model')

let response = {
    msg: "",
    exito:false
}

exports.create = async (req,res) =>
{
    let estudiante = new Estudiante({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        diaNacimiento: req.body.diaNacimiento,
        mesNacimiento: req.body.mesNacimiento,
        anioNacimiento: req.body.anioNacimiento,
        correoInstitucional: req.body.correoInstitucional,
        campus: req.body.campus,
        telefono: req.body.telefono
    })

    try {
        await estudiante.save()
        response.exito = true
        response.msg = "Guardado con exito"
        res.send(response)
    } catch (error) {
        console.error(err),
            response.exito = false,
            response.msg = "Error al intentar Guardar el estudiante"
            res.send(response)
            return;
    }



}