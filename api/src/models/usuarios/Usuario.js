const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  id_mascota:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
  }],
  productosComprados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productoVendido',
  }],
  image: {
    type: String,
   
  },
  status: {
    type: Number,
    default:1

  }
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt); 
  return hashed;
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  const result = await bcrypt.compare(password, receivedPassword); 
  return result;
};

module.exports = mongoose.model('Usuario', userSchema);
