const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo:Zj4zIGBVGZqdee6mK3WO@containers-us-west-204.railway.app:7641", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("la base de datos esta conectada"))
    .catch(err => console.log(err))
    

// mongoose.connect("mongodb://mongo:Zj4zIGBVGZqdee6mK3WO@containers-us-west-204.railway.app:7641", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("la base de datos esta conectada"))
//     .catch(err => console.log(err))
    
