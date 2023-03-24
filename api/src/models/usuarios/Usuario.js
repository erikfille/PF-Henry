const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
 
  name: {
    type: String,
    required: true
},
  surname: {
    type: String,
    required: true,
},
  email: {
    type: String,
    required: true,
    unique: true
},
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rol",
},
  password: {
    type: String,
    required: true
},
  address: {
    type: String,
},
  productsVisited: {
    type: Array,
    
  },
  pet: {
    type:String
  },
  id_mascota:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
  }
});


module.exports = mongoose.model('Usuario', userSchema);
