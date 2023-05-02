const mongoose = require("mongoose");

// Production
mongoose
  .connect(
    "mongodb://mongo:Zj4zIGBVGZqdee6mK3WO@containers-us-west-204.railway.app:7641",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("la base de datos esta conectada"))
  .catch((err) => console.log(err));

// Development
// mongoose
//   .connect("mongodb+srv://PetCare:HenryVip@petcare.krjtdtk.mongodb.net/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("la base de datos esta conectada"))
//   .catch((err) => console.log(err));
