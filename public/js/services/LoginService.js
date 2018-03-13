angular.module('LoginService', ['ngCookies']).factory('LoginService', ['$http','$cookies', function($http,$cookies) {

	
	var currentUser={};
	var setCurrentUser= function(user)
	{
				currentUser._id=user._id;
				currentUser.password=user.password;
                currentUser.username=user.username;
                currentUser.type=user.type;
                currentUser.courses=user.courses;
                currentUser.email=user.email;
                currentUser.clg=user.clg;
                currentUser.phone=user.phone;
                currentUser.name=user.name;
                console.log("set current user in service: ")
                console.log(currentUser);
                $cookies.putObject('currentUser', currentUser);
	}

	var getCurrentUser= function()
	{			currentUser=$cookies.getObject('currentUser');
				return currentUser;
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
	getCurrentUser:getCurrentUser,
    getUser:getUser
    };


}]);