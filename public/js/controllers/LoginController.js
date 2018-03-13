angular.module('LoginController', ['RegisterService','LoginService']).controller('LoginController', function($scope,$state,$mdToast,RegisterService,LoginService) {

$scope.user={}
	

	var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }
  $scope.showSimpleToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Successfully Registered! Please log in.')
        .position(pinTo )
        .hideDelay(3000)
    );
  };

  $scope.showPassErrorToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Incorrect Password!')
        .position(pinTo )
        .hideDelay(3000)
    );
  };

  $scope.showUserErrorToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Incorrect Username/Password!')
        .position(pinTo )
        .hideDelay(3000)
    );
  };


	if(RegisterService.check_display_reg_toast()==true){
		 $scope.showSimpleToast();
		 RegisterService.set_display_reg_toast(false);
	}

	$scope.submit=function(){

    var currentUser={}
    var password;

    var promise = LoginService.getUser($scope.user.email);
    //console.log(promise);
    promise.then(
      function(payload) {
        if(payload.data==null)
        {
          $scope.showUserErrorToast();
        }
        else
        {
            console.log(payload.data._id);
            if(payload.data.password==$scope.user.pass)
             { console.log("success login");
                currentUser._id=payload.data._id;
                currentUser.username=payload.data.username;
                currentUser.password=payload.data.password;
                currentUser.type=payload.data.type;
                currentUser.courses=payload.data.courses;
                currentUser.email=payload.data.email;
                currentUser.phone=payload.data.phone;
                currentUser.clg=payload.data.clg;
                currentUser.name=payload.data.name;

                LoginService.setCurrentUser(currentUser);


                if(payload.data.type=="instructor")
                    $state.go('instructor.mycourses');
                else
                    $state.go('student.explore');


            }
            else
              {
               console.log("wrong pass");
               $scope.showPassErrorToast();
              }
        }


    },
      function(error){
        console.log("error");
    });

    //console.log(user);
/*
		if($scope.user.email==="instructor"){
			if($scope.user.pass=="password")
				$state.go('instructor.mycourses');
			else
			{
				 $scope.showPassErrorToast();
			}
		}
		else if($scope.user.email==="student"){
			if($scope.user.pass=="password")
				$state.go('student.explore');
			else
			{
				 $scope.showPassErrorToast();
			}
			
			
		}
		else{
			 $scope.showUserErrorToast();
		}

*/
	}

	$scope.register=function(){
		
			$state.go('register');

	}

});