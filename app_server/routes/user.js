const User = require('../models/user');

const adminArea = (req, res) => {
  res.render('adminArea',{title:'Gal\'s blog'})
};

const form = (req, res) => {
  res.render('login',{title:'Login'})
};

const registerForm = (req, res) => {
  res.render('register',{title:'Register'})
};


const login = (req, res, next) => {
  const username = req.body.name;
  const pass = req.body.pass;
  if (username && pass) {
    User.findOne({'name':username}, (err, user) => {
      if (err) return next(err);
      console.log(user);
      console.log(pass);
      // check the password
      if(user){
        user.authenticate(pass, (err, isMatch) => {
          if (err) return next(err);
          // the user is authenticated 
          req.session.uid = user._id;
          console.log("user Logged in");
          res.redirect('/');
        });
      } else {
        //user name dosent exist
        res.json("bad credsdj");
      }
    });
  }
};
  
const register = (req, res, next) => {
  const username = req.body.name;
  const pass = req.body.pass;
  User.findOne({'name':username}, (err, user) => {
    if (user){
      console.log(user);
      res.error('Username already taken :/');
      res.redirect('back');
    } else {
      if (username && pass) {
        let user = new User({
          name:username,
          pass:pass
        });
        user.save(err => {
          if (err) return next(err);
          req.session.uid = user._id;
          console.log("user Logged in");
          console.log(req.session);
          res.redirect('/');
        });
        
      }
    }
  })
};
 
const logout = (req, res) => {
  req.session.destroy(err => {
    if(err) throw err;
    res.redirect('/');
  })
}

module.exports = {
  adminArea,
  form,
  login,
  logout,
  register,
  registerForm  
}