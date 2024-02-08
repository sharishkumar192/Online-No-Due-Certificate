const express = require("express")
const router = express.Router()
const User = require('../models/users')
const Student = require('../models/student')

const mongoose = require('mongoose');
//const student = require("../models/student");
const Faculty = require("../models/faculty");
const pdfService = require('../service/pdf-service');

applyNoDue = async function(req,res,next){
    try {
        console.log("In applyNodue" , req.body)
        // console.log(req.session.user)
        
        if(req.body.user){
            // const l = Student.findAll({})
            const user = req.body.user
            console.log("in if statement")
            const student = await Student.findOne({userId:user.username})
            console.log("student details")
            console.log(student)

            if(student.isNoDueApplied){
                res.send("User already applied")
            }

            else{

                const updatedResult = await Student.findOneAndUpdate({userId:student.userId},{$set:{isNoDueApplied: true }},{new:true});

                console.log("Student Updated")
                const updatedFacultyResult = await Faculty.findOneAndUpdate({userId:student.facultyId},
                                                    {$push:
                                                            {studentRequests:student._id
                                                            }
                                                    }
                                                    )
                console.log("faculty updated")
                                        
                 console.log(updatedResult);
                // console.log("Added in Faculty Requests");
                // console.log(updatedFacultyResult);
                
                res.status(201).send(updatedResult)
            }
        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        next(error)
    }
    

};

trackProgress = async function(req,res,next){
    try {
        if(req.session.user){
            const userDetails = await Student.findOne({userId:req.session.user.userId});
            console.log("NoDue : ",userDetails.isNoDueApplied)
            console.log("FA : ",userDetails.isAllFAApproved)
            console.log("DR : ",userDetails.isAllDRApproved)
            res.status(200).send(userDetails);

        }
        else{
            res.status(400).send("User not loggedin")

        }
        
    } catch (error) {
        next(error)
    }
}

downloadNoDue = async function(req,res,next){
    try {
        if(req.session.user){
            const userDetails = await Student.findOne({userId:req.session.user.userId});
            
            console.log("FA : ",userDetails.isAllFAApproved)
            // console.log("DR : ",userDetails.isAllDRApproved)
            if(isAllFAApproved && isAllDRApproved === 5){
                const stream = res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment;filename=noDue.pdf`,
                  });
                  pdfService.buildPDF(
                    req.session.user,
                    (chunk) => stream.write(chunk),
                    () => stream.end()
                  );
        }
    }
        else{
            res.status(400).send("User not loggedin")
        }
    } catch (error) {
        next(error)
    }

}


 getstudentDetails = async function(req,res,next){
    try {
        console.log("req session from backend now2:06",req.body)
        if(req.body.user){
            const studentDetails = await Student.findOne({userId:req.body.user.username});
            console.log("Backend");
            console.log(studentDetails,"200")
            res.status(200).send(studentDetails);

        }
        else{
            res.status(400).send("User not loggedin")
        }
        
    } catch (error) {
        
    }
}

router.post("/",getstudentDetails) ;
router.get("/downloadNoDue",downloadNoDue);
router.post("/apply",applyNoDue);
router.get("/progressTracker",trackProgress);

module.exports = router

