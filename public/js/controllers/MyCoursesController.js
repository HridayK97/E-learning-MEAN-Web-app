angular.module('MyCoursesController', ['CourseService','LoginService','AppUserService']).controller('MyCoursesController', function($scope,$state,$mdDialog,$mdToast,CourseService,LoginService,AppUserService) {






  /*var promise = CourseService.getCourse($scope.user.email);
  //console.log(promise);
  promise.then(
    function(payload) {
      if(payload.data==null)
      {
        $scope.showUserErrorToast();
      }
      else{

      }
      


  },
    function(error){
      console.log("error");
  });
*/
  
$scope.showConfirm = function(ev,selected_id) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete Course')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to delete';
      $scope.deleteCourse(selected_id);
      //$scope.showSimpleToast();
    }, function() {
      $scope.status = 'You decided to not delete.';
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

  $scope.showNotifToast = function(name) {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent(name+ 'Course has been removed from instructor.')
        .position(pinTo )
        .hideDelay(3000)
    );
  };

  $scope.deleteCourse = function(course_id){
      currentUser=AppUserService.getCurrentUser();


      var index = currentUser.courses.indexOf(course_id);
      if (index !== -1) 
          currentUser.courses.splice(index, 1);
      AppUserService.updateUser(currentUser);
      AppUserService.setCurrentUser(currentUser);
      $state.reload('student.mycourses');
      $scope.showSimpleToast();
  }

  $scope.viewcourse = function(selected){
    /*if(num==1)
       $state.go('student.viewcourse');
    else if(num==2)
       $state.go('student.viewcourse2');

     */

      $state.go('student.viewcourse',{course: selected});
  };


  var currentUser= LoginService.getCurrentUser();

  if(currentUser.notif.length>0){
//NOTIFY USER INSTRUCTOR DELETED A COURSE HE SUBSCRIBED TO
      for(i=0;i<currentUser.notif.length;i++)
        $scope.showNotifToast(currentUser.notif[i]);


      currentUser.notif=[];
      //keeps repeatedly showing notification until logout.
      AppUserService.setCurrentUser(currentUser);
      AppUserService.updateUser(currentUser);

  }
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

});