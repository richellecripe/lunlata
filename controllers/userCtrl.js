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
	User.findOne({username : req.body.username}).exec(function(err, docs){
		res.send(docs)
	})
}

var setScore = function(req, res){
	User.findOne({username : req.body.username}, function(err, doc){
		// doc.highScore = req.body.highScore
        if (err) {
        	console.log('setScore', err)
        }
		doc.highScore = 100
		doc.save()
	})
}

module.exports = {
	findLeaders	: findLeaders,
	getScore	: getScore,
	setScore	: setScore,
}



