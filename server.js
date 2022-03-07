const express = require('express')

const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const cron = require("node-cron");
const fs = require("fs");
const bodyParser = require("body-parser");

 const Student = require("./model/studentInfo");
  
require('dotenv').config();


const port = 3003;
// Use the MONGO_URI from .env or use local mongodb
const db =
    process.env.MONGO_URI || MONGO_URI

//Connect the Express application to MongoDB
mongoose.connect(db, { useNewUrlParser: true });
console.log("db connect...")
 
app.use(bodyParser.json());

app.get("/", (req, res) => {

    res.render("server");
})


 

// node corn work 
cron.schedule("* * * * * ", () => {

    logFile();
});

function logFile() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    const data = "Sample data to be logged into the file " + dateTime + "\n";

    fs.appendFile("dklogs.txt", data, () => {

        console.log("Data is logged into the file every minute!");


    });

}
// app.use(bodyParser.json()); token verify 

const verifyToken = (req, res, next) => { //Middleware to verify JWT Token!

    const token = req.header("authtoken");
    if (!token) return res.status(401).send("No Token Found, Access Denied!");

    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {

        res.status(400).send("Token is invalid!")
    }
};



// // post method 
app.post("/postStudentInformation", (req, res) => {

    const students = new Student ({

        name: req.body.name,
        email: req.body.email
    })

    const createdstudents = students.save().
        then(result => {

            res.status(200).json({

                createdstudents: result
            });


        });
});



// app.post("/students", (req, res) => {

//     const student = await studentInfo.findOne({ email: req.body.email });
//     if (!student)
//         return res.status(400).send("No Account was found with this email!");

//     const token = jwt.sign({ _id: student._id }, process.env.TOKEN_SECRET);

//     res.header("authtoken", token)

//     res.send(`${student.name} is successfully logged in!`);
// });










// app.get("/privateroute", verifyToken, (req, res) => { //applying JWT Middleware before giving acces.

//     res.json({

//         posts: {

//             title: "Private Post!",
//             description: "This is a private post which can only be accessed with a valid JWT token!"
//         }
//     });

// });
 
















// server listening 
app.listen(port, () => {
    console.log(`Server work on  port ${port}`);
});


 