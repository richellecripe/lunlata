angular.module('gameApp', [])


angular.module('gameApp').controller('gameController', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http){

		
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
	
	medium : ['#00FFFF', '#7FFFD4', '#000000', '#0000FF', '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0',
	'#7FFF00', '#D2691E', '#6495ED', '#FF7F50', '#DC143C', '#00FFFF', '#008B8B', '#B8860B', '#006400', 
	'#BDB76B', '#556B2F', '#FF8C00', '#8B008B', '#9932CC', '#8B0000', '#E9967A', '#483D8B', '#8FBC8F', 
	'#2F4F4F', '#FF1493', '#00BFFF', '#228B22', '#DAA520', '#1E90FF', '#FF00FF', '#B22222', '#ADFF2F', 
	'#CD5C5C', '#4B0082', '#ADD8E6', '#F08080', '#E0FFFF', '#90EE90', '#FFB6C1', '#FFA07A', '#20B2AA', 
	'#87CEFA', '#32CD32', '#66CDAA', '#BA55D3', '#7B68EE', '#00FA9A', '#C71585', '#808000', '#FFA500', 
	'#FF4500', '#DA70D6', '#98FB98', '#DB7093', '#800080', '#BC8F8F'],


	hard : ['#00008B', '#0000FF', '#008000', '#008B8B', '#00BFFF', '#00CED1', '#00FA9A', '#00FFFF', 
	'#1E90FF', '#228B22', '#3CB371', '#40E0D0', '#4169E1', '#4682B4', '#4B0082', '#556B2F', '#5F9EA0',
	'#6A5ACD', '#6B8E23', '#7FFF00', '#7FFFD4', '#808000', '#87CEFA', '#8A2BE2', '#800080', '#8B0000',
	'#8B4513', '#9370DB', '#A52A2A', '#B8860B', '#9ACD32', '#BA55D3', '#BC8F8F', '#BDB76B', '#C71585',
	'#CD5C5C', '#CD853F', '#D2691E', '#D8BFD8', '#DA70D6', '#DB7093', '#DC143C', '#DEB887', '#EEE8AA',
	'#F08080', '#F4A460', '#FF0000', '#FF1493', '#FF4500', '#FF69B4', '#FF7F50', '#FF8C00', '#FFB6C1',
	'#FFD700', '#FFFF00']
	
	
	}
		// initialize empty array for new game deck
		var gameDeck = []
		var points = 0
		var misses = 0

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
			this.points = points
			this.misses = misses
			
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

						if ($scope.level === 'easy') {
							this.points+=2
						}
						
							else if ($scope.level === 'medium') {
								this.points+=2.5
							}

							else if ($scope.level === 'hard') {
								this.points+=3
							}

						// disabled matched pair
						this.flippedCards[0].disabled = true
						this.flippedCards[1].disabled = true
						// clear flippedCards array
						this.flippedCards = []
					}

					// if cards are not a match
					else {
						this.misses++
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
						// call timeout function after 0.5 seconds
						$timeout(timeout, 500)


					}	

					if (this.unmatchedPairs === 0){
								$('#myModal').modal('show')
								$scope.points = this.points - this.misses
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
		$scope.points = points


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


		$scope.test = function(){

			$http({
				method	: 'get',
				url		: '/test',
			}).then(function(returnData){
				console.log(returnData.data)
			})
		}


		// user login
		$scope.submitlogin = function(){
			console.log($scope.username, $scope.password)
			$http({
				method	: 'post',
				url		: '/login',
				data 	: {username: $scope.username, password: $scope.password},
			})
		}

		// user sign up
		$scope.register = function(){
			$http({
				method	: 'post',
				url		: '/register',
				data 	: {username: $scope.username, password: $scope.password},
			})
		}


		// show leaderboard
		$scope.showLeaders = function(){

			$http({
				method	: 'get',
				url		: '/leaderboard',

			}).then(function(returnData){
				console.log(returnData.data)
			})
		}
}])


