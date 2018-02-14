angular.module('LoginController', []).controller('LoginController', function($scope,$state) {

$scope.user={}
	$scope.submit=function(){
		if($scope.user.email==="instructor")
			$state.go('instructor.mycourses');
		else
			$state.go('student.explore');

	}

});