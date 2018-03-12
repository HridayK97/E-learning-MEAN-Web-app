angular.module('CourseService', []).factory('CourseService', ['$http', function($http) {

	

	var getCourse = function(id){
		var courseId=id;
		/*$http.get('/api/users/'+name).then(success,error);success(function(response){
			var user = response;
			return user;
		});*/

		return $http({
		      method: 'GET',
		      url: '/api/courses/'+courseId
		   }).then(function (response){
		   		var course = response;
		   		//console.log( course);
				return response;

		   },function (error){
		   	console.log('can not get data.');
		   		return;

		   });
	}



	var getCourses = function(){
		return $http({
		      method: 'GET',
		      url: '/api/courses/'
		   }).then(function (response){
		   		//console.log( course);
				return response;

		   },function (error){
		   	console.log('can not get data.');
		   		return;

		   });
	}



	return {
	getCourses:getCourses,
    getCourse:getCourse
    };


}]);