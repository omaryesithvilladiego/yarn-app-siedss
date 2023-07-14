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
            token:null,
            data:data
           
        }
        if(data !== null){
            console.log(data)
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
        pass: hashedpass,
        estudianteId:req.body.estudianteId
    })
    let response = {
        msg: "",
        exito:false
    
    }

    

    try {
        const userVeri = await Usuario.findOne({usuario: req.body.usuario})
        console.log(userVeri)
        if(userVeri === null) {
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

        } else {
            response.msg = "El usuario que intenta registrar ya existe"
            res.send(response)
        }
    } catch (error) {
        console.log(error)
    }
    

    

   
    

}

exports.updatePassword  = async function(req,res) {
    let response = {
        msg: "",
        exito:false
    }

    
    let hashedpass = crypto.createHash("sha512").update(req.body.newPassword).digest("hex")
   
    const filter = { estudianteId: req.params.id};
    
    const update = { pass: hashedpass,
    usuario:req.body.newUser};

    try {
        const userCheck = Usuario.findOne({usuario:req.body.newUser})
        if(!(userCheck === null)) {
            response.msg="No puede usar este nombre de usuario",
            response.exito = false
            res.send(response)
        } else {
            try {
                const change = await Usuario.findOneAndUpdate(filter,update)
               
                response.msg = "Contraseña actualizada con exito"
                response.exito = true
                res.json(response)
                
            } catch (error) {
                console.log(error)
                response.msg = "Error al intentar actualizar la contraseña"
                response.exito = false
                res.json(response)
            }
            
        }
    } catch (error) { 
        console.log(error)
    }

   
   

    




}