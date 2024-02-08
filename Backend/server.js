const express = require("express")
const mongoose = require("mongoose")
const app = express()
const DR = require('./models/dr')


app.use(express.json());
app.use(express.urlencoded({extended : false}))

const session = require('express-session');


mongoose.connect("mongodb://localhost:27017/test")
app.set("view engine", "ejs")

app.use(session({
    path    : '/',
    secret: "add a random secret string here",
    resave: false,
    saveUninitialized: true
}));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

//   app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
//);
const userRouter = require('./routes/users')
const studentRouter = require('./routes/student')
const facultyRouter = require('./routes/faculty')
const drRouter = require('./routes/dr')
// const adminRouter = require('./routes/admin')

app.use('/users', userRouter)
app.use('/students', studentRouter)
app.use('/faculty', facultyRouter)
app.use('/dr',drRouter)
// app.use('/admin',adminRouter)



app.post("/", async (req, res) => 
{
    console.log("Here")
  // await DR.dropIndexes();
    // const student1 = new DR({

    //         userId :"hostel_admin@nitc.ac.in",
    //         name:"Kalyan",
    //         department:"Hostels",
    //          studentRequests:[],
    //          approvedRequests:[],
    //          rejectedRequests:[],
    //         index:2
        
    //      });
        
    //  await student1.save();

    res.send("Saved successfuly")
    
})

//App listening on port 300
app.listen(3001) 