const mongoose = require("mongoose");
const { Schema } = mongoose;

// definimos el schema del modelo
const orderSchema = new Schema({
  status: {
    type: String,
    enum: ["created", "processing", "cancelled", "completed"],
    required: true,
  },
  payment_id: {
    type: Number,
    default: 0,
  },
  payment_status: {
    type: String,
    default: "",
  },
  merchant_order_id: {
    type: Number,
    default: 0,
  },
});

// exportamos el modelo
module.exports = mongoose.model("Order", orderSchema);
