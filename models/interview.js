const mongoose = require("mongoose");
const interviewSchema = new mongoose.Schema(
    {
        student:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Student'
        }],
        // result: 
        // {
        //     type: String,
        //     required: true,
        // },
        company:
        {
            type: String,
            required: true,
        },
        date:
        {
            type: String,
            required: true
        }
    },
    {
      timestamps: true,
    }
  );
  const Interview = mongoose.model("Interview", interviewSchema);
  module.exports = Interview;