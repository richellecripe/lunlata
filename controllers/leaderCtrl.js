// include the player model
var Player = require('../models/player')


// create a new player
var createPlayer = function(req, res){

	var newPlayer = new Player({

		alias		: req.body.alias,
		highScore	: req.body.highScore,

	})

	newPlayer.save( function(err, doc){
		res.send(doc)
	})

}


var findPlayers = function(req, res){

	if (req.params.player){
		Player.findOne({alias	: req.params.playerAlias}, function(err, doc){
			res.send(doc)
		})
	}
	else {
		Player.find({}, function(err, docs){
			res.send(docs)
		})
	}
}


module.exports = {
	createPlayer	: createPlayer,
	findPlayers		: findPlayers,
}





