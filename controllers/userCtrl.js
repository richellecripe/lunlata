// include the player model
var User = require('../auth/authModel/user.js')


// create a new player
var createUser= function(req, res){

	var newUser = new User({

		username		: req.body.username,
		password		: req.body.password,
		highScore		: req.body.highScore,

	})

	newUser.save( function(err, doc){
		res.send(doc)
	})

}


var findLeaders = function(req, res){
	User.find({}).sort('-highScore').limit(10).exec(function(err, docs){
		console.log(docs)
		res.send(docs)
	})
}


module.exports = {
	createUser	: createUser,
	findLeaders	: findLeaders,
}





