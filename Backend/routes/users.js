const express = require("express")
const router = express.Router()
const User = require('../models/users');
const mongoose = require('mongoose');
const Student = require('../models/student');
const Faculty = require('../models/faculty');
const DR = require('../models/dr');



login = async function(req,res,next){
    try{
        console.log(req.session.user)
        if(req.session.user) {
            
            req.session.user=null;
            
            res.redirect(307,"/users/login")
        }
        else{
        //const t = await User.find({});
        // await User.find({})
       //   console.log(t)
        if(!(req.body.username && req.body.password)){
            var err = new Error("Username and password are required to login")
            err.status = 400
            throw err
        }

        const user = await User.findOne({username:req.body.username});
        console.log("hi");
        if(!user){
             return res.status(400).send("User not present with given email")
        }
        else{
            if( user.password === req.body.password){
                console.log('logged in!'); 
                 req.session.user = user;
                 console.log(req.session.user)
                 console.log("checked if condition");
                res.send(req.session)
                // const student_regex = /[A-Za-z]\d{2}/
                // const m = username.match(student_regex)
                
                // if(user.userType==="Student"){
                //     const studentDetails = await Student.findOne({userId:req.session.user.username});
                //     console.log("Backend");
                //     console.log(studentDetails)
                //     res.status(200).send(studentDetails);
                //    // res.redirect("/students");

                // }
                // else if(user.userType==="DR"){
                //   //  const drDetails = await DR.findOne({userId:user.username})

                //   const facultyDetails = await Faculty.findOne({userId:req.session.user.username});
                //   console.log(facultyDetails)
                //   res.status(200).send(facultyDetails);
                //     //return res.render("dr",{drDetails});
                //  //   res.redirect("/dr");
                // }
                // else{
                //     console.log("hello")
                //     const DRDetails = await DR.findOne({userId:req.session.user.username});
                //     console.log(DRDetails);
                //     res.status(200).send(DRDetails);
                //   //  const facultyDetails = await Faculty.findOne({userId:user.username})
                //   //  console.log(facultyDetails.department)
                //   ///  return res.render("faculty",{facultyDetails});
                //   //  res.redirect("/faculty");

                // }


            }
            else{
                return res.status(400).send("status:401")
            }
        }
    }
    }
    catch(err){
        next(err)
    }
}

logout = function (req,res,next) {
    if(req.session.user){
        console.log(req.session.user)
        req.session.user=null;
        return res.send("Logged out successfully");
    }
    else{
        return res.send("Not loggedin");
    }
    
}



router.post("/login", login)
router.post("/logout",logout)

router.get("/test", (req, res) => 
{
    if(!req.session.user){
        res.send("Not logged in")
    }
    else{
        res.send("loggedin")
    }
} )

router.get("/", (req, res) => 
{
    res.send("Users List")
} )

module.exports = router