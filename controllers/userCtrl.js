// include the player model
var User = require('../auth/authModel/user.js')


var findLeaders = function(req, res){
	User.find({}).sort('-highScore').limit(10).exec(function(err, docs){
		console.log(docs)
		res.send(docs)
	})
}


var getScore = function(req, res){
	console.log(req.body)
	User.find({}).exec(function(err, docs){
		res.send(docs)
	})

}

module.exports = {
	// createUser	: createUser,
	findLeaders	: findLeaders,
	getScore	: getScore,
}





