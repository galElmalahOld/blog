const User = require('../models/user');

function messagePassingAndRedirect(res, msg, path){
  res.error(msg);
  res.redirect(path);
}

const adminArea = (req, res) => {
  if(req.session.admin){
    res.render('adminArea',{title:'Gal\'s blog'})
  }
  else{
    res.error("Access denied!");
    res.redirect('back');
  }
};

const form = (req, res) => {
  res.render('login',{
    title:'Login',
    locals:res.locals
  })
};

const registerForm = (req, res) => {
  res.render('register',{
    title:'Register',
    locals:res.locals
  })
};


const login = (req, res, next) => {
  const username = req.body.name;
  const pass = req.body.pass;

  if (username && pass) {
    User.findOne({'name':username}, (err, user) => {
      if (err) return next(err);
      // check the password
      if(user){
        user.authenticate(pass, (err, isMatch) => {
          if (err) return next(err);
          // the user is authenticated 
          if(isMatch){
            req.session.uid = user._id;
            req.session.admin = user.admin;
            console.log("user Logged in");
            res.redirect('/');
          } else {
            messagePassingAndRedirect(res,"Bad credentials", "back");
          }
        });
      } else {
        //user name dosent exist
        messagePassingAndRedirect(res,"Bad credentials", "back");

      }
    });
  } else {
    messagePassingAndRedirect(res, "Bad credentials", "back");
  }
};
  
const register = (req, res, next) => {
  const username = req.body.name;
  const pass = req.body.pass;
  if(!username || !pass){
    messagePassingAndRedirect(res,"Username and password are mendatory fields", "back");
  }
  User.findOne({'name':username}, (err, user) => {
    if (user){
      messagePassingAndRedirect(res,'Username already taken :/', "back");
    } else {
      if (username && pass) {
        let user = new User({
          name:username,
          pass:pass
        });
        user.save(err => {
          if (err) return next(err);
          req.session.uid = user._id;
          req.session.admin = user.admin;          
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