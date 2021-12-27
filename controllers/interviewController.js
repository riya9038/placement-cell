
const Interview= require('../models/interview');
const Student = require('../models/student');

module.exports.newInterview= function(req,res){
    return res.render("newInterview", {
        title: "Interview"
    })
}
module.exports.create = async function(req, res){
    try{
        let isStudent= await Student.findOne({email: req.body.email});
        if(isStudent){
        let interview=await Interview.create({
            company: req.body.company,
            student: isStudent._id,
            date: req.body.date
        });
    }
    let check_interview= await Interview.findOne({company: req.body.company});
    if(isStudent){
        check_interview.student.push(isStudent);
        check_interview.save();
    }
        let interviews = await Interview.find({}).populate('student');
        console.log("interviews",interviews);
        let students = await Student.find({});
        return res.render("user-profile",{
            title: 'profile',
            interviews: interviews,
            students: students
        });
    }
    catch(err){
        req.flash('error','Interview not scheduled',err);
        return res.redirect('back');
    }
}