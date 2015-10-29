var mongoose = require('mongoose')


var playerSchema = mongoose.Schema ({

	alias  		: {type	: String},
	highScore	: {type	: Number},

})


module.exports = mongoose.model('Player', playerSchema)