const User = require('../app_server/models/user');

module.exports = (req, res, next) => {
  const uid = req.session.uid;
  //if there is no user in session
  if(!uid) return next();
  User.findById(uid, (err, user) => {
    if(err) return next(err);
    req.user = user;
    res.locals.user = user;
    next();
  });
};