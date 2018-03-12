angular.module('AppUserService', ['ngCookies']).factory('AppUserService', ['$http','$cookies', function($http,$cookies) {

	
	var currentUser={};
	var setCurrentUser= function(user)
	{
				currentUser._id=user._id;
				currentUser.password=user.password;
                currentUser.username=user.username;
                currentUser.type=user.type;
                currentUser.courses=user.courses;
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

	var updateUser = function(userData){
		//var userData=getCurrentUser();
		var id=userData._id;
		/*$http.get('/api/users/'+name).then(success,error);success(function(response){
			var user = response;
			return user;
		});*/
		//var userData=getCurrentUser();
		//userData.password="lol";
		return $http({
		      method: 'PUT',
		      url: '/api/users/'+id,
		      headers: {"Content-Type": "application/json;charset=UTF-8"},
		      data: userData
		   }).then(function (response){
		   		console.log('put suscces??');


		   		return;

		   },function (error){
		   	console.log('can not get data.');
		   		return;

		   });
	}



	return {
	setCurrentUser:setCurrentUser,
	getCurrentUser:getCurrentUser,
    getUser:getUser,
    updateUser:updateUser
    };


}]);