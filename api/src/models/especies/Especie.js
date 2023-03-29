const {Schema,model} = require("mongoose");

const especie = new Schema({
    animal: {
     type:String
 }
});

module.exports = model("Especie", especie);
