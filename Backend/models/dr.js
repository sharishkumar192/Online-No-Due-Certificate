const mongoose = require('mongoose');

const drDetails = new mongoose.Schema({
    userId :{
        type:String,
        required:true,
        unique:true
      },
      name:{
        type:String,
        required:true
      },
      index:{
        type:Number
      },
    department : {
        type:String,
        required:true
      },

    studentRequests:[{ type: mongoose.Types.ObjectId, ref: 'Student','default':[]  }],

    approvedRequests:[{ type: mongoose.Types.ObjectId, ref: 'Student','default':[]  }],
     rejectedRequests:[{ type: mongoose.Types.ObjectId, ref: 'Student','default':[]  }]




    
  
})

 const DR = new mongoose.model("DR",drDetails)
const student1 = new DR({

    userId :"admission@nitc.ac.in",
    name:"Shiva",
    department:"Admission / Fees",
    studentRequests:[],
    approvedRequests:[],
    rejectedRequests:[],
    index:3

 });

// const student1 = new DR({

//   userId :"lab_admin@nitc.ac.in",
//   name:"Joseph",
//   department:"Lab",
//   studentRequests:[],
//   approvedRequests:[],
//   rejectedRequests:[],
//   index:0

// });

//student1.save();

// student1.save();

// {
//   "_id": {
//     "$oid": "654f70dac9910bfe57304ed8"
//   },
//   "userId": "library_admin@nitc.ac.in",
//   "name": "Rama Rao",
//   "department": "Library",
//   "studentRequests": [],
//   "approvedRequests": [],
//   "rejectedRequests": [],
//   "__v": 0,
//   "index": 1
// }


module.exports = mongoose.model("DR",drDetails)
