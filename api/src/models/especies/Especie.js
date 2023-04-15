const {Schema,model} = require("mongoose");

const especie = new Schema({
  animal: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
    validate: {
      validator: function (v) {
        return v === 0 || v === 1;
      },
      message: (props) =>
        `${props.value} debe ser 0 (Desactivado) o 1 (Activo).`,
    },
  },
});

module.exports = model("Especie", especie);
