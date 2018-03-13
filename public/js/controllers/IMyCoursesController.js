angular.module('IMyCoursesController', ['AppUserService','CourseService']).controller('IMyCoursesController', function($scope,$state,$mdDialog,$mdToast,AppUserService,CourseService) {







var currentUser= AppUserService.getCurrentUser();
  //console.log(currentUser);
  var courses=currentUser.courses;
  $scope.mycourses=[];
  console.log(courses);
  //console.log(courses[0]);
  for(i=0;i<courses.length;i++){
    console.log(courses[i]);
  }
  for(i=0;i<courses.length;i++){

        var promise = CourseService.getCourse(courses[i]);
        //console.log(promise);
        promise.then(
          function(payload) {
            if(payload.data==null)
            {
                console.log('error in showing course, maybe doesnt exist??');
            }
            else{
                  $scope.mycourses.push(payload.data);
            }
            


        },
          function(error){
            console.log("error");
        });

        console.log($scope.mycourses);


  }

$scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete Course')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
      $scope.showSimpleToast();
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

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
        .textContent('Course Deleted!')
        .position(pinTo )
        .hideDelay(3000)
    );
  };



  $scope.editcourse = function(selected){
    

      $state.go('instructor.createcourse',{course: selected});
    }

  $scope.viewcourse = function(selected){
    

      $state.go('instructor.viewcourse',{course: selected});
    }

});