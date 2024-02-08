const express = require("express")
const router = express.Router()
const User = require('../models/users')
const Student = require('../models/student')

const mongoose = require('mongoose');
const Faculty = require("../models/faculty");
const DR = require("../models/dr");



acceptRequest = async function(req,res,next){
    try {
        console.log(req.body.studentId)
        console.log("body.user")

        console.log(req.body)

        if(req.body.userData){
            
            console.log("hello")
            const studentId = req.body.studentId;
            const student = await Student.findOneAndUpdate({userId:studentId},{$set:{isAllFAApproved:true}},{new:true});
            console.log("student updated",student)
            //const facultyDetails = await Faculty.findOne({userId:req.session.user.username});
            console.log("userData username",req.body.userData.user.username)
            const updatedFacultyResult1 = await Faculty.updateOne({userId:req.body.userData.user.username},
                {$push:
                        {approvedRequests:student._id
                        }      
                }
                )
            console.log(updatedFacultyResult1);

            const updatedFacultyResult2 = await Faculty.updateOne({userId:req.body.userData.user.username},
                {$pull:
                        {studentRequests:student._id
                        }
                },
                {new:true}
                )    

                for(let i=0;i<5;i++){
                    var dr = await DR.updateOne({index:i},{
                        $push:{
                            studentRequests:student._id
                        },
                    },{new:true})
                    console.log(dr)

                    await Student.updateOne({userId:studentId },{$set: { [`DRApproval.${i}`]: 1 } 
                });

                }
           
            res.send("Request Accepted SuccessFully and sent request to DR");



        }
        else{
            res.status(400).send("User not loggedin")
            

        }
    } catch (error) {
        next(error)
    }

}

getfacultyDetails = async function(req,res,next){
    try {
        if(req.session.user){
            const facultyDetails = await Faculty.findOne({userId:req.session.user.username});
            console.log(facultyDetails)
            res.status(200).send(facultyDetails);

        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        next(error)
    }
}
/*
change as faculty details
getfacultyDetails = async function(req,res,next){
    try {
        if(req.session.user){
            const studentDetails = await Student.findOne({userId:req.session.user.userId});
            //populate and send
            res.status(200).send(studentDetails);
        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        
    }
}
*/
getPendingRequests = async function(req,res,next){
    try {
        if(req.session.user){
            const facultyDetails = await Faculty.findOne({userId:req.session.user.username});
            console.log(facultyDetails);
            const PendingRequests =await facultyDetails.populate({path:"studentRequests"})
             //await facultyDetails.populate()
            console.log(facultyDetails)
            res.status(200).send(PendingRequests);

        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        next(error)
    }
}

getApprovedRequests = async function(req,res,next){
    try {
        if(req.session.user){
            const facultyDetails = await Faculty.findOne({userId:req.session.user.username});
            const ApprovedRequests =await facultyDetails.populate({path:"approvedRequests"})
             //await facultyDetails.populate()
            console.log(facultyDetails)
            res.status(200).send(ApprovedRequests);

        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        next(error)
    }
}

postfacultyDetails = async function(req,res,next){
    try {
        console.log(req.body)
     //   a = req.body
        if(req.body.user){
            const facultyDetails = await Faculty.findOne({userId:req.body.user.username});
            const PendingRequests =await facultyDetails.populate({path:"studentRequests"});
            const ApprovedRequests =await facultyDetails.populate({path:"approvedRequests"});
            const mergedObject = { 'PendingRequests': PendingRequests , 'ApprovedRequests': ApprovedRequests  };

            console.log(PendingRequests)
            console.log("mergedObject")
            console.log(mergedObject)

            res.status(200).send(mergedObject);

        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        next(error)
    }
}


router.get("/",getfacultyDetails) ;
router.post("/post",postfacultyDetails) ;

router.post("/accept",acceptRequest);
router.get("/getPendingRequests",getPendingRequests);
router.get("/getApprovedRequests",getApprovedRequests);


module.exports = router

