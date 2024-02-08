const mongoose = require('mongoose');

const userDetails = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true
      },
      password : {
        type:String,
        required:true
    
      },

    userType:{
        type:String,
        required:true
    }
  
})



// const User = new mongoose.model("User",userDetails)
// const user1 = new User({
//     username :"harish_m232512cs@nitc.ac.in",
//     password : "harish_m232512cs",
//     userType : "Student"
// });

// user1.save();

module.exports = mongoose.model("User",userDetails)


