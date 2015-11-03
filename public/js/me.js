angular.module('gameApp')
	.service('authService', ['$http', '$location', function($http){
		
		this.authCheck = function(cb){
			$http.get('/api/me')
				.then( function(returnData){
					cb(returnData.data)

				})
		}				
						
	}])
