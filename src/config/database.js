const mongoose = require("mongoose");
let User

const connectDatabase = async () => {
    
    try {

    if (!User) {

        console.log(User)
        User = mongoose.model('users', require('../models/userModel').schema);
    }

    await mongoose.connect('mongodb+srv://danielestebanjimenezlopez:c6nZDMfbdQFEQ3gM@test.laxdtla.mongodb.net/')
    .then(() => console.log('mongoose connection'))
    .catch((err) => console.log(err))

    }catch(error){
        console.log('mongondb connection error',error);
        process.exit(1);
    }
}

module.exports = connectDatabase

