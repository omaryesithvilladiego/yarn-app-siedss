const Usuario = require("../models/usuarios.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

exports.login = async function(req, res, next) {
    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex")
    
    try {
        const data = await Usuario.findOne({
            usuario:req.body.usuario, pass:hashedpass
        })
        let response = {
            token:null
        }
        if(data !== null){
            response.token = jwt.sign({
                id: data.usuario._id,
                usuario: data.usuario.usuario
            },"__recret__",
            {expiresIn:'12h'}
            )
        }
        res.json(response)
    } catch (error) {
        console.log(err)
        
    }
   
  

     
}

exports.create = async function(req,res) {

    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex")

    let usuarios = new Usuario({
        usuario: req.body.usuario,
        pass: hashedpass
    })

    let response = {
        msg: "",
        exito:false
    
    }


    try {
        await usuarios.save()
        response.exito = true
        response.msg = "Guardado con exito"
        res.json(response)
    } catch (error) {
        console.error(err),
            response.exito = false,
            response.msg = "Error al intentar Guardar el estudiante"
            res.send(response)
            return;
    }

   
    

}