angular.module('RegisterController', ['RegisterService']).controller('RegisterController', function($scope,$state,RegisterService) {

		
		$scope.user = {
     	 type : 'Student',
     	 courses:[]
    };

		$scope.submit=function(){


			//RegisterService.addUser($scope.user);
			var promise = RegisterService.addUser($scope.user);
    //console.log(promise);
    promise.then(
      function(payload) {
        if(payload.data==null)
        {
          //$scope.showUserErrorToast();
          console.log("Register Failed");
        }
        else
        {
         	console.log("Register Success");
			RegisterService.set_display_reg_toast(true);
			$state.go('login');   
        }


    },
      function(error){
        console.log("error");
    });



			RegisterService.set_display_reg_toast(true);
			$state.go('login');

	}

});