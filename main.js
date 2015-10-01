angular.module('gameApp', [])


angular.module('gameApp').controller('gameController', ['$scope', '$timeout', function ($scope, $timeout){

		
			$('#easy').on('click', function () {
			    $(this).button('toggle') 
			  	}) 

			$('#medium').on('click', function(){
			 	$(this).button('toggle')
			 }) 


			 $('#hard').on('click', function(){
			 	$(this).button('toggle')
			 })
	
	$scope.level = 'easy'
	

	var decks = { 



		//deep pink, blue violet, indigo,    red,    dark orange, yellow, saddleBrown,  mediumSeaGreen, darkGreen, aqua
	easy : ['#FF1493', '#8A2BE2', '#4B0082', '#FF0000', '#FF8C00', '#FFFF00', '#8B4513',  '#3CB371', '#006400', '#00FFFF',
	// teal,   dodgerBlue,  hotPink,  violet, mediumSlateBlue, crimson, paleTurquoise, darkSlateGray
	'#008080', '#1E90FF',  '#FF69B4', '#EE82EE', '#7B68EE', '#DC143C', '#AFEEEE', '#2F4F4F'],
	
	


	hard : ['#000000', '#000080', '#00008B', '#0000CD', '#0000FF', '#006400', '#008000', '#008080', '#008B8B', '#00BFFF', '#00CED1', '#00FA9A',
	'#00FF00', '#00FF7F', '#00FFFF', '#191970', '#1E90FF', '#20B2AA', '#228B22', '#2E8B57', '#2F4F4F', '#32CD32', '#3CB371', '#40E0D0', '#4169E1', 
	'#4682B4', '#483D8B' ,'#48D1CC', '#4B0082', '#556B2F', '#5F9EA0', '#6495ED', '#663399', '#66CDAA', '#696969', '#6A5ACD', '#6B8E23', '#708090', 
	'#778899', '#7B68EE', '#7CFC00', '#7FFF00', '#7FFFD4', '#800000', '#800080', '#808000', '#808080', '#87CEEB', '#87CEFA', '#8A2BE2', '#8B0000', 
	'#8B008B' ,'#8B4513', '#8FBC8F', '#90EE90', '#9370DB', '#9400D3', '#98FB98', '#9932CC', '#9ACD32', '#A0522D', '#A52A2A', '#A9A9A9', '#ADD8E6', 
	'#ADFF2F', '#AFEEEE', '#B0C4DE', '#B0E0E6', '#B22222', '#B8860B', '#BA55D3', '#BC8F8F', '#BDB76B', '#C0C0C0', '#C71585', '#CD5C5C', '#CD853F',
	'#D2691E', '#D2B48C', '#D3D3D3', '#D8BFD8', '#DA70D6', '#DAA520', '#DB7093', '#DC143C', '#DCDCDC', '#DDA0DD', '#DEB887', '#E0FFFF', '#E6E6FA', 
	'#E9967A', '#EE82EE', '#EEE8AA', '#F08080', '#F0E68C', '#F0F8FF', '#F0FFF0', '#F0FFFF', '#F4A460', '#F5DEB3', '#F5F5DC', '#F5F5F5', '#F5FFFA',
	'#F8F8FF', '#FAEBD7', '#FAF0E6', '#FAFAD2', '#FDF5E6', '#FF0000', '#FF00FF', '#FF69B4', '#FF1493', '#FF4500', '#FA8072', '#FF6347', '#FF7F50',
	'#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FFA07A', '#FFB6C1', '#FFC0CB', '#FFDAB9', '#FFDEAD', '#FFEFD5']
	
	
	}
		// initialize empty array for new game deck
		var gameDeck = []

		var makeDeck = function(){
			gameDeck = []
			console.log($scope.level)


		var rand = (Math.floor(Math.random() * (decks[$scope.level].length - 12)))
		console.log(rand, decks[$scope.level].length)
		// make new gameDeck with 12 values from hexDeck array
		for ( var i = rand; i < rand + 12; i++ ){

			// populate new array
			gameDeck.push({color: decks[$scope.level][i], flipped: false, disabled: false})
			gameDeck.push({color: decks[$scope.level][i], flipped: false, disabled: false})
			}
		}	


		// shuffle deck - from Fisher-Yates shuffle
		var shuffleDeck = function(){
			var remainingCards = gameDeck.length, thisDeck, i

			// while there are remaining cards to shuffle
			while (remainingCards){

				// pick a random card
				i = Math.floor(Math.random() * remainingCards--)

				// swap the random card with the current card
				thisDeck = gameDeck[remainingCards]
				gameDeck[remainingCards] = gameDeck[i]
				gameDeck[i] = thisDeck
			}

			return gameDeck
		}


		// game constructor
		var Game = function(gameDeck){
			this.gameDeck = gameDeck
			this.unmatchedPairs = gameDeck.length / 2

			this.points = 0
			
			// initialize empty array for the flipped cards
			this.flippedCards = []

			
			this.flippedCardCheck = function(){

				// when 2 cards are in the flipped cards array
				if (this.flippedCards.length === 2){


					if (this.flippedCards[0].disabled && this.flippedCards[1].disabled){
						
					} 
					
				 	// check for a match
					if (this.flippedCards[0].color === this.flippedCards[1].color){
						//
						this.unmatchedPairs--
						this.points++

							if (this.unmatchedPairs === 11){
								$('#myModal').modal('show')
							}
						// disabled matched pair
						this.flippedCards[0].disabled = true
						this.flippedCards[1].disabled = true
						// clear flippedCards array
						this.flippedCards = []
					}

					// if cards are not a match
					else {
						// declare variable to bind this. inside the timeout function
						var self = this

						var timeout = function(){
							// after a second card has been flipped 
							if (!self.flippedCards[0].flipped || self.flippedCards[1].flipped){
									// flip cards 1 and 2 back over
									self.flippedCards[0].flipped = false
									self.flippedCards[1].flipped = false
									// clear flippedCards array
									self.flippedCards = []
							}
						}
						// call timeout function after 0.7 seconds
						$timeout(timeout, 700)
					}
				}
			}

			 

		

		} // end Game


		// start a new game 
		var newGameDeck = function(){
			makeDeck()
			shuffleDeck()
			return new Game(gameDeck)
		}

		var thisGame = newGameDeck()






		// deal cards
		$scope.cards = gameDeck

		$scope.setLevel = function(level) {
			$scope.level = level
			console.log(level)
			console.log($scope.level)
		}


		// toggle flip 
		$scope.toggle = function($index, card){
			if (!$scope.cards[$index].disabled){

				$scope.cards[$index].flipped = !$scope.cards[$index].flipped
				
					if ($scope.cards[$index].flipped){
						// referencing the flipped cards in this specific game
						// pushes the flipped cards into this.flippedCards[]
						thisGame.flippedCards.push(thisGame.gameDeck[$index])
					}

				thisGame.flippedCardCheck()
			
			}
					
			console.log(thisGame)
		}






		// restart the game/ start a new game
		$scope.restart = function(){
			thisGame = newGameDeck()
				console.log(thisGame)
			$scope.cards = gameDeck
		}





}])


