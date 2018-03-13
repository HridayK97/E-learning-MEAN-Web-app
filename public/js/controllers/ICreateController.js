angular.module('ICreateController', ['CourseService','AppUserService']).controller('ICreateController', function($scope,$state,$mdToast,$stateParams,CourseService,AppUserService) {




$scope.isUpdate=false;

if($stateParams.course!=null){
    $scope.course=$stateParams.course;
    $scope.isUpdate=true;
  }






var last = {
      bottom: true,
      top: false,
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
        .textContent('Course Created!')
        .position(pinTo )
        .hideDelay(3000)
    );
  };

  $scope.showEditedToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Changes Saved.')
        .position(pinTo )
        .hideDelay(3000)
    );
  };

$scope.submitcourse= function(){

  if($scope.isUpdate==true)
  {
      CourseService.updateCourse($scope.course);
      $scope.showEditedToast();
      $state.reload('instructor.mycourses');
  }
  else{
  var currentUser= AppUserService.getCurrentUser();

  var courseData=$scope.course;
  courseData.instructor_name=currentUser.name;
  courseData.instructor_id=currentUser._id;
  var promise = CourseService.addCourse(courseData);
    //console.log(promise);
    promise.then(
      function(payload) {
        if(payload.data==null)
        {
          //$scope.showUserErrorToast();
          console.log("Course creation failed");
        }
        else
        {
          console.log("Course Creation Success");
          //currentUser= AppUserService.getCurrentUser();
          currentUser.courses.push(payload.data._id);
          AppUserService.updateUser(currentUser);
          AppUserService.setCurrentUser(currentUser);
          $state.reload('instructor.mycourses');
          $scope.showSimpleToast();
          //$state.go('instructor.mycourses');   
        }


    },
      function(error){
        console.log("error");
    });

}



		//$scope.showSimpleToast();

}
	
});