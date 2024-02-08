const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const studentDetails = new mongoose.Schema({
    userId :{
        type:String,
        required:true,
        unique:true
      },
      name:{
        type:String,
        required:true
      },
    passoutYear : {
        type:Number,
        required:true
      },

    programme:{
        type:String,
        required:true
    },
    isNoDueApplied:{
        type:Boolean,
        default:false
    },
    isAllDRApproved:{
        type:Number,
        default:0
    },
    isAllFAApproved:{
        type:Boolean,
        default:false
    },
    facultyId :{
        type:String,
        required:true,
    },
    noDueAmounts:{
        type:Array,
        'default':[0,0,0,0,0]
    },
    DRApproval:{
        type:Array,
        'default':[0,0,0,0,0]

    },
    rejectedComments:{
        type:[String],
        'default':["","","","",""]
    }

    

    
  
})

//    const Student = new mongoose.model("Student",studentDetails)
//   const student1 = new Student({

    
//     name:"Satya",
    
//     userId :"satya_m235656me@nitc.ac.in",
//     passoutYear : 2025,
//     programme:"Thermal Engg.",
//     facultyId :"murali@nitc.ac.in"
//   });

// student1.save();




module.exports = mongoose.model("Student",studentDetails)
