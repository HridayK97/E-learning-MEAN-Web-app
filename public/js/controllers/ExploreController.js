angular.module('ExploreController', ['CourseService','AppUserService']).controller('ExploreController', function($scope,$state,$mdToast,CourseService,AppUserService) {






$scope.allCourses=[];

var promise = CourseService.getCourses();
        //console.log(promise);
        promise.then(
          function(payload) {


            console.log(payload.data);
            if(payload.data==null)
            {
                console.log('NO COURSES!!!!');
            }
            else{
                  $scope.allCourses=payload.data;
                  console.log($scope.allCourses);
            }
            


        },
          function(error){
            console.log("error");
        });




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




  $scope.showSimpleToast = function(course_id) {


    var pinTo = $scope.getToastPosition();
    var currentUser= AppUserService.getCurrentUser();

    if(currentUser.courses.indexOf(course_id) !=-1)
      {
          console.log("Already added.");
          $mdToast.show(
            $mdToast.simple()
              .textContent('You have already added the course.')
              .position(pinTo )
              .hideDelay(3000)
          );
      }

      else
      {
        currentUser.courses.push(course_id);
          AppUserService.updateUser(currentUser);
          AppUserService.setCurrentUser(currentUser);
          $state.reload('student.mycourses');

          $mdToast.show(
          $mdToast.simple()
        .textContent('Course Added! View course in My Courses.')
        .position(pinTo )
        .hideDelay(3000)
    );
      }


  };


	
});