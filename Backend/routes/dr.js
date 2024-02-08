const express = require("express")
const router = express.Router()
const User = require('../models/users')
const Student = require('../models/student')

const mongoose = require('mongoose');
const DR = require("../models/dr");

//DR default =0
//DR approve sent 1

// DR approved 2
//DR not approved -1


acceptRequest = async function(req,res,next){
    try {

        if(req.body.userData){
            
            console.log("hello")
            const studentId = req.body.studentId;
            const student = await Student.findOne({userId:studentId});
          //  console.log("student updated")
            const DRDetails = await DR.findOne({userId:req.body.userData.user.username});
            const updatedDRResult1 = await DR.updateOne({userId:req.body.userData.user.username},
                {$push:
                        {approvedRequests:student._id
                        }      
                }
                )
            console.log(updatedDRResult1);

            var index = DRDetails.index;
            var DRApproved = student.isAllDRApproved
            DRApproved= DRApproved+1
            const student_updated = await Student.findOneAndUpdate({userId:studentId},{$set: { [`DRApproval.${index}`]: 2 ,isAllDRApproved:DRApproved}},{new:true});
            console.log("student updated")
            const updatedDRResult2 = await DR.updateOne({userId:req.body.userData.user.username},
                {$pull:
                        {studentRequests:student._id
                        }
                },
                {new:true}
                )
            
           console.log(updatedDRResult2);


              

                        
            res.send("Request Accepted SuccessFully by DR");
        }
        else{
            res.status(400).send("User not loggedin")
        }
    } catch (error) {
        next(error)
    }
}



rejectRequest = async function(req,res,next){
    try {
        if(req.body.userData){
            
            console.log("hello")
            const comment = req.body.comment
            const studentId = req.body.studentId;
            const student = await Student.findOne({userId:studentId});
          //  console.log("student updated")
            const DRDetails = await DR.findOne({userId:req.body.userData.user.username});
            const updatedDRResult1 = await DR.updateOne({userId:req.body.userData.user.username},
                {$push:
                        {rejectedRequests:student._id
                        }      
                }
                )
            console.log(updatedDRResult1);

            var index = DRDetails.index;
            const student_updated = await Student.findOneAndUpdate({userId:studentId},{$set: { [`DRApproval.${index}`]: -1 , [`rejectedComments.${index}`]: comment}},{new:true});
            console.log("student updated")
            const updatedDRResult2 = await DR.updateOne({userId:req.body.userData.user.username},
                {$pull:
                        {studentRequests:student._id
                        }
                },
                {new:true}
                )
            
           console.log(updatedDRResult2);

              
            res.send("Request Rejected SuccessFully by DR");
        }
        else{
            res.status(400).send("User not loggedin")
        }
    } catch (error) {
        next(error)
    }
}





getDRDetails = async function(req,res,next){
    try {
        if(req.session.user){
            console.log("hello")
            const DRDetails = await DR.findOne({userId:req.session.user.username});
            console.log(DRDetails);
            res.status(200).send(DRDetails);
        }
        else{
            res.status(400).send("User not loggedin");
        }
        
    } catch (error) {
        next(error)
    }
}


getPendingRequests = async function(req,res,next){
    try {
        if(req.session.user){
            const DRDetails = await DR.findOne({userId:req.session.user.username});
            console.log(DRDetails);
            const PendingRequests =await DRDetails.populate({path:"studentRequests"})
             //await facultyDetails.populate()
            console.log(DRDetails)
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
            const DRDetails = await DR.findOne({userId:req.session.user.username});
           // console.log(DRDetails);
            const PendingRequests =await DRDetails.populate({path:"approvedRequests"})
             //await facultyDetails.populate()
            console.log(DRDetails)
            res.status(200).send(PendingRequests);
        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        next(error)
    }
}

getRejectedRequests = async function(req,res,next){
    try {
        if(req.session.user){
            const DRDetails = await DR.findOne({userId:req.session.user.username});
            //console.log(DRDetails);
            const PendingRequests =await DRDetails.populate({path:"rejectedRequests"})
             //await facultyDetails.populate()
            console.log(DRDetails)
            res.status(200).send(PendingRequests);
        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        next(error)
    }
}


postDRDetails = async function(req,res,next){
    try {
        console.log(req.body)
     //   a = req.body
        if(req.body.user){
            const DRDetails = await DR.findOne({userId:req.body.user.username});
        //   console.log(DRDetails);
            const PendingRequests =await DRDetails.populate({path:"studentRequests"})
            const ApprovedRequests =await DRDetails.populate({path:"approvedRequests"})
            const RejectedRequests =await DRDetails.populate({path:"rejectedRequests"})




            // const facultyDetails = await Faculty.findOne({userId:req.body.user.username});
            // const PendingRequests =await facultyDetails.populate({path:"studentRequests"});
            // const ApprovedRequests =await facultyDetails.populate({path:"approvedRequests"});
            const mergedObject = { 'PendingRequests': PendingRequests , 'ApprovedRequests': ApprovedRequests ,'RejectedRequests':RejectedRequests  };

           // console.log(PendingRequests)
           // console.log("mergedObject")
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


//router.get("/",getfacultyDetails) ;
router.post("/post",postDRDetails) ;

router.get("/",getDRDetails) ;
router.get("/getPendingRequests",getPendingRequests);
router.get("/getApprovedRequests",getApprovedRequests);
router.get("/getRejectedRequests",getRejectedRequests);
router.post("/accept",acceptRequest);
router.post("/reject",rejectRequest);



module.exports = router ;