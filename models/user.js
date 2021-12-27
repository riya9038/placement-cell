const mongoose = require("mongoose");
const PasswordManager= require('../services/passwordManager');
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save',async function(done){
  if(this.isModified('password')){
      const hashed=await PasswordManager.toHash(this.get('password'));
      this.set('password',hashed);
  }

  done();
})


const User = mongoose.model("User", UserSchema);
module.exports = User;
