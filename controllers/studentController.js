
const Student= require('../models/student');

module.exports.newStudent= function(req,res){
    return res.render("newStudent", {
        title: "Add student"
    })
}
module.exports.create = async function(req, res){
    try{
        let student=await Student.create({
            email: req.body.email,
            college: req.body.college,
            name: req.body.name,
            batch: req.body.batch,
            status: req.body.status,
        });
        let students = await Student.find({});
        let interviews = await Interview.find({});
        return res.render("user-profile",{
            title: 'profile',
            students: students,
            interviews: interviews
        });
    }
    catch(err){
        req.flash('error','Student not created',err);
        return res.redirect('back');
    }
}