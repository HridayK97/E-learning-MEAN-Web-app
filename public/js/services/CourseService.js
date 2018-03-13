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

	var addCourse = function(courseData){
   
    return $http({
          method: 'POST',
          url: '/api/courses/',
          headers: {"Content-Type": "application/json;charset=UTF-8"},
          data: courseData
       }).then(function (response){
          console.log('POST suscces??');


          return response;

       },function (error){
        console.log('error did not post course');
          return;

       });
  }


  var updateCourse = function(courseData){
		//var userData=getCurrentUser();
		var id=courseData._id;
		/*$http.get('/api/users/'+name).then(success,error);success(function(response){
			var user = response;
			return user;
		});*/
		//var userData=getCurrentUser();
		//userData.password="lol";
		return $http({
		      method: 'PUT',
		      url: '/api/courses/'+id,
		      headers: {"Content-Type": "application/json;charset=UTF-8"},
		      data: courseData
		   }).then(function (response){
		   		console.log('put suscces??');


		   		return;

		   },function (error){
		   	console.log('can not get data.');
		   		return;

		   });
	}



	return {
	getCourses:getCourses,
    getCourse:getCourse,
    addCourse:addCourse,
    updateCourse:updateCourse
    };


}]);