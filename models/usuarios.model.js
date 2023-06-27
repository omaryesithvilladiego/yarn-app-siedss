const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usuariosSchema = new Schema({
    usuario:{
        type:String,
        require:true,
        max:120
    },
    pass:{
        type:String,
        require:true,
        max:120
    },
    estudianteId:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('usuarios',usuariosSchema)