angular.module('RegisterController', ['RegisterService','AppUserService']).controller('RegisterController', function($scope,$state,$mdDialog,RegisterService,AppUserService) {

		
		$scope.user = {
     	 type : 'Student',
     	 courses:[]
    };


    $scope.showAlert = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Username already exists.')
        .textContent('Please enter a different username.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Okay')
    );
  };

		$scope.submit=function(){

      var canRegister=false;
      //check if username already exists
      var promise = AppUserService.getUser($scope.user.username);
       promise.then(
      function(payload) {
        if(payload.data==null)
        {
          //$scope.showUserErrorToast();
          console.log("Username doesnt exist");
          canRegister=true;
          //Register User if username doesnt exist in database already.

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
        else
        {
          console.log("Username already exists.");  
          $scope.showAlert(); 
        }


    },
      function(error){
        console.log("error");
    });


	}

});