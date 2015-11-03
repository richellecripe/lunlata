// We'll need access to passport in order to call authentication methods
var passport = require('passport');

// We also will be using our User model
var User = require('../auth/authModel/user.js');


var performLogin = function(req, res, next, user){

  req.login(user, function(err){
    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);

    // Otherwise, send the user to the homepage.
    return res.send({ success: 'Success' })
  });
};


var authenticationController = {

  // This is the post handler for any incoming login attempts.
  processLogin: function(req, res, next){

    var authFunction = passport.authenticate('local', function(err, user, info){

      // If there was an error, allow execution to move to the next middleware
      if(err) return next(err);

      if(!user) {
		    return res.send({error: 'Error logging in. Please try again.'});
      }
      
      performLogin(req, res, next, user);
    });

    // Now that we have the authentication method created, we'll call it here.
    authFunction(req, res, next);
  },


  processSignup: function(req, res, next){
  	console.log(req.body)
    var user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    // Now that the user is created, we'll attempt to save them to the
    // database.
    user.save(function(err, user){
      
      if(err) {
      	console.log(err)
        // If we encounter this error, the duplicate key error,
        // this means that one of our fields marked as "unique"
        // failed to validate on this object.
        if(err.code === 11000){
		      return res.send({error : 'This user already exists.'})
        }
		else{
			console.log(user)
			// Generic Error
		  return res.send({error : 'An error occured, please try again'})
			
		}
        
      }

      // If we make it this far, we are ready to log the user in.
      performLogin(req, res, next, user);
    });
  },

  // Handle logout requests
  logout: function(req, res){

    // Passport injects the logout method for us to call
    req.logout()

    // Redirect back to the login page
    res.redirect('/')
  }
};

// Export our controller methods
module.exports = authenticationController