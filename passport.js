var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../authModel/user.js');


// create local strategy 
var localStrategy = new LocalStrategy(function(username, password, done){

  // Given a username and password, let's try to authenticate this user.
  User.findOne({username: username}, function(err, user){

    // If there was an error, allow execution to move to the next middleware
    if(err) return done(err);

    // If no user was found with that username, continue to the next middleware
    // and tell passport authentication failed.
    if(!user) return done(null, false, { message: 'Incorrect username or password'} );

    // A user has been found if we make it here, so let's check if the password
    // they gave matches the one in the database. We are using the method defined
    // on our user schema in models/user.js
    user.comparePassword(password, function(err, isMatch){

      // If there was an error, allow execution to move to the next middleware
      if(err) return done(err);

      // isMatch is true if the passwords match, and false if they don't
      if(isMatch){
        // Success! Tell passport we made it.
        return done(err, user);
      } else {
        // Password was not correct. Tell passport the login failed.
        return done(null, false, { message: 'Incorrect username or password'} );
      }
    });
  });
});


passport.use(localStrategy);


var ensureAuth = function(req, res, next){
	if(req.isAuthenticated()) return next()

	// send to location that is login route
	res.redirect('/#/auth/login')
}

var ensureAuthAjax = function(req, res, next){
	if (req.isAuthenticated()) return next()

	res.send({error: "session not authenticated"})
}


module.exports = {
	ensureAuth 		: ensureAuth,
	ensureAuthAjax  : ensureAuthAjax,
}















