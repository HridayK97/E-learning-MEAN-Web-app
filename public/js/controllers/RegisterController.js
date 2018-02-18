angular.module('RegisterController', ['RegisterService']).controller('RegisterController', function($scope,$state,RegisterService) {

		
		$scope.user = {
     	 type : 'Student',
    };
		$scope.submit=function(){

			RegisterService.set_display_reg_toast(true);
			$state.go('login');

	}

});