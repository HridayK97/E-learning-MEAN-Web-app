angular.module('MyProfileController', ['AppUserService']).controller('MyProfileController', function($scope,$state,AppUserService) {


	$scope.showSave=false;
	$scope.profileDisabled=true;
	$scope.user=AppUserService.getCurrentUser();

	console.log($scope.user);

	$scope.edit=function(){
		$scope.showSave=true;
		$scope.profileDisabled=false;

	}


	$scope.submit=function(){
	  AppUserService.updateUser($scope.user);
      AppUserService.setCurrentUser($scope.user);
      $state.reload('student.myprofile');
	}
});