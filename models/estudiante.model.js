const mongoose = require("mongoose")
const Schema = mongoose.Schema

const estudianteSchema = new Schema({
    nombres: {
        type:String,
        require:true,
        max:120
    },
    apellidos: {
        type: String,
        require: true,
        max:120
    },
    diaNacimiento: {
        type:Number,
        require: true,
     
    },
    mesNacimiento: {
        type:Number,
        require: true,
        
    },
    anioNacimiento: {
        type:Number,
        require: true,
        
    },
    correoInstitucional: {
        type: String,
        require:true,
        max: 120
    },
    campus: {
        type: String,
        require:true
    },
    telefono: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('estudiante',estudianteSchema)

