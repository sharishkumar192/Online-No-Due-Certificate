const mongoose = require('mongoose');
const Student = require('./student')

const facultyDetails = new mongoose.Schema({
    userId :{
        type:String,
        required:true,
        unique:true
      },
      name:{
        type:String,
        required:true
      },

    department : {
        type:String,
        required:true
      },

    studentRequests:
      [{ type: mongoose.Types.ObjectId, ref: 'Student','default':[] }]
    ,

    approvedRequests:[{ type: mongoose.Types.ObjectId, ref: 'Student' ,'default':[]}]

    

    

    
  
})

//    const Faculty = new mongoose.model("Faculty",facultyDetails)
//    const student1 = new Faculty({

//     userId :"madhu@nitc.ac.in",
//     name:"Madhu Kumar",
//     department:"CSE",
//     studentRequests:[],
//     approvedRequests:[]

// });

//  student1.save();




module.exports = mongoose.model("Faculty",facultyDetails)
