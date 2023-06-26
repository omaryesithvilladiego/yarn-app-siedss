const Estudiante = require('../models/estudiante.model')
const transporter = require('../helpers/mail')

let response = {
    msg: "",
    exito:false
}

exports.getEstudiantes = async function(req,res, next)
{
    const estudiante = await Estudiante.find({nombres:"Omar"})
    res.json(estudiante)  
    const deleted = await Estudiante.deleteOne()

        

}

exports.create = async (req,res) =>
{

    const mail = req.params.email
    const user = req.params.usuario
    const pass = req.params.pass

   

    const verificarCorreo = await Estudiante.find({correoInstitucional:mail})
    const checkCorreo = verificarCorreo === null ? false : true

    if(checkCorreo) {
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
            const result = await transporter.sendMail({
               from: "omar.villadiegoc@campusucc.edu.co",
               to:mail,
               subject:'Usuario y contraseña de incio de sesión',
               body:'Este es tu codigo',
               text: "Este es tu usuario y contraseña",
               html: `<div> Tu usuario es: ${user}, tu contraseña es: ${pass}, se sugiere cambiar la contraseña al iniciar sesión </div>`
           })
           console.log(result)
        } catch (error) {
            console.error(error),
                response.exito = false,
                response.msg = "Error al intentar Guardar el estudiante"
                res.send(response)
                return;
        }
    } else {
        response.exito = false,
        response.msg = "El correo que intenta registrar ya existe"
        res.send(response)
        return;
    }

    
     

   





}