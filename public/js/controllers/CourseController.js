angular.module('CourseController', []).controller('CourseController', function($scope,$state,$stateParams) {

	

	//console.log($stateParams.course.name);
	$scope.content=$stateParams.course;
	//$scope.theBestVideo = 'N0lxfilGfak';

});