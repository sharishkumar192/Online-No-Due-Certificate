// const User = require('../models/users');
// const mongoose = require('mongoose');
// const Student = require('../models/student');
// const Faculty = require('../models/faculty');
// const DR = require('../models/dr');
// const express = require("express")
// const router = express.Router()
// const csvtojson = require("csvtojson");
// const multer = require('multer');
// const csvParser = require('csv-parser');

// const adduser = async(req,res)=>{
//     console.log("hii")
    
//     const fileName = "sample.csv";
//     var array1ToInsert = [];
//   //  var array2ToInsert = [];
// csvtojson().fromFile(fileName).then(source => {
//     // Fetching the all data from each row
//     for (var i = 0; i < source.length; i++) {
//          var oneRow = {
//              username: source[i]["username"],
//              password: source[i]["password"],
//              city: source[i]["userType"],
//             // salary: source[i][“Salary”],
//          };
//         //  var userRow = {
//         //     userId: source[i]["username"],
//         //     name = source[i]["name"],

//         //  }
//          array1ToInsert.push(oneRow);
//      }
//      //inserting into the table “employees”
//      //var collectionName = ‘employees’;
//  //    var collection = dbConn.collection(collectionName);
//      User.insertMany(arrayToInsert, (err, result) => {
//          if (err) console.log(err);
//          if(result){
//              console.log("Import CSV into database successfully.");
//          }
//      });
// });
// //const User = new mongoose.model("User",userDetails)
// // const user1 = await User.create({
// //     username :"lokendra_m230023cs@nitc.ac.in",
// //     password : "lokendra_m230023cs",
// //     userType : "Student"
// // })
// // const user1 = new User({
// //     username :"allen_m234566ee@nitc.ac.in",
// //     password : "allen_m234566ee",
// //     userType : "Student"
// // });
// // await user1.save();
// // const student1 = await Student.create({
// //     name:"Lokendra",
    
// //     userId :"Lokendra_m230023cs@nitc.ac.in",
// //     passoutYear : 2025,
// //     programme:"CS",
// //     facultyId :"murali@nitc.ac.in"
// // })
// //    const Student = new mongoose.model("Student",studentDetails)
// //   const student1 = new Student({

    
// //     name:"Allen",
    
// //     userId :"allen_m234566ee@nitc.ac.in",
// //     passoutYear : 2025,
// //     programme:"Electrical",
// //     facultyId :"rangarajan@nitc.ac.in"
// //   });

// //await student1.save();

// //    const Faculty = new mongoose.model("Faculty",facultyDetails)
// //    const fac1 = new Faculty({

// //     userId :"madhu@nitc.ac.in",
// //     name:"Madhu Kumar",
// //     department:"CSE",
// //     studentRequests:[],
// //     approvedRequests:[]

// // });

// //  fac1.save();
// res.send("Successfully saved")
// }

// router.post("/adduser",upload.single('csvFile'),adduser);


//  module.exports = router
