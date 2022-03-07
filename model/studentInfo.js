const { type } = require('express/lib/response');
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({

    name:{
        type : String,
         required : true

    },

    email: {
        type : String,
        require :true
    }

})
 







module.exports = mongoose.model("Student", studentSchema);