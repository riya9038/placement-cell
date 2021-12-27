const mongoose = require("mongoose");
const PasswordManager= require('../services/passwordManager');
const StudentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    score:{
        dsa_score:{
            type: Number,
            required: true,
        },
        webD_score:{
            type: Number,
            required: true,
        },
        react_score:{
            type: Number,
            required: true,
        }
    },
    status:{
        type: String,
        required: true,
        enum:['placed','not placed']
    },
    batch:{
        type: String,
        required: true
    },
    interview:[
        {
            company:
            {
                type: String,
                required: true
            },
            result: 
            {
                type: String,
                required: true,
                enum:['PASS','FAIL','ON HOLD','DID NOT ATTEMPT']
            },
            date:
            {
                type: String,
                required: true,
            }
        },
    ],
  },
  {
    timestamps: true,
  }
);


const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
