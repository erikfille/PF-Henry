const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/PetCare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
})
.then(() => console.log("la base de datos esta conectada"))
.catch(err => console.log(err))