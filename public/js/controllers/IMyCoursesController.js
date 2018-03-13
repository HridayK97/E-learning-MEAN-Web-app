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

$scope.showConfirm = function(ev,selected) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete Course')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to delete';
      $scope.deletecourse(selected);
    }, function() {
      $scope.status = 'You decided to not delete';
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


  $scope.deletecourse = function(selected){
    var id=selected._id;
    CourseService.removeCourse(id);
    console.log("check if deleted");



    var promise = AppUserService.getUsers();
    //console.log(promise);
    var allUsers=[];
    promise.then(
      function(payload) {
        if(payload.data==null)
        {
          //console.log
        }
        else
        {
            allUsers = JSON.parse(JSON.stringify(payload.data));
            for(i=0;i<allUsers.length;i++)
            {

              var index = allUsers[i].courses.indexOf(id);
              if (index !== -1) {
                  allUsers[i].courses.splice(index, 1);
                  AppUserService.updateUser(allUsers[i]);

              }

            }
        }


    },
      function(error){
        console.log("error didnt get all users");
    });
    //console.log(allUsers);
    

     $state.reload('instructor.mycourses');
     $scope.showSimpleToast();


  }

  $scope.editcourse = function(selected){
    

      $state.go('instructor.createcourse',{course: selected});
    }

  $scope.viewcourse = function(selected){
    

      $state.go('instructor.viewcourse',{course: selected});
    }

});