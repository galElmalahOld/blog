// definig the schema for noraml users and admin controller
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name:{type:String, required:true, unique:true,dropDups: true},
  pass: {type:String, required:true},
  admin: {type: Boolean, default:false},
  createdOn: {type:Date, "default": Date.now},
});

// custome user methods 
userSchema.pre('save', function(next){
  //only hash if midified or new user
  if (!this.isModified('pass')) return next();

  // generating salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password with the new salt
    bcrypt.hash(this.pass, salt, (err, hash) => {
      if (err) return next(err);

      // Replace the user plain text password with the hashed password
      this.pass = hash;
      // the middleware successfuly finished 
      next();
    });
  });
});

userSchema.methods.isAdmin = () => this.admin;

userSchema.methods.authenticate = function(candidatePass, cb){
  console.log(this);
  console.log("this");
  bcrypt.compare(candidatePass, this.pass, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  })
}


let User = mongoose.model('User', userSchema);

module.exports = User;