const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://PetCare:HenryVip@petcare.krjtdtk.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
})
.then(() => console.log("la base de datos esta conectada"))
    .catch(err => console.log(err))
    