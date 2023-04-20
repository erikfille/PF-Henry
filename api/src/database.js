const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo:EqR3j8jyRUEGOgBX7giZ@containers-us-west-2.railway.app:6213", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
})
.then(() => console.log("la base de datos esta conectada"))
    .catch(err => console.log(err))
    
