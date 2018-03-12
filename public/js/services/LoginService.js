angular.module('LoginService', []).factory('LoginService', ['$http', function($http) {

	
	var currentUser={};
	var setCurrentUser= function(user)
	{
				currentUser._id=user._id;
                currentUser.username=user.username;
                currentUser.type=user.type;
                console.log("set current user in service: ")
                console.log(currentUser);
	}

	var getUser = function(username){
		var name=username;
		/*$http.get('/api/users/'+name).then(success,error);success(function(response){
			var user = response;
			return user;
		});*/

		return $http({
		      method: 'GET',
		      url: '/api/users/'+name
		   }).then(function (response){
		   		var user = response;
		   		console.log( user);
				return response;

		   },function (error){
		   	console.log('can not get data.');
		   		return;

		   });
	}



	return {
	setCurrentUser:setCurrentUser,
    getUser:getUser
    };


}]);