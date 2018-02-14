angular.module('LoginController', []).controller('LoginController', function($scope,$state) {

	$scope.submit=function(){
		$state.go('student');
	}
	
});