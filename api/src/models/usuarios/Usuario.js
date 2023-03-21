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
  rol: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rol",
}],
  password: {
    type: String,
    required: true
},
  address: {
    type: String,
    required: true,
},
  productsVisited: {
    type: String,
    required: true
},
});

module.export = mongoose.model('User', userSchema);


