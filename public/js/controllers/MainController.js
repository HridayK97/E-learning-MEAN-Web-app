angular.module('MainController', ['AppUserService']).controller('MainController', function($scope,$state,AppUserService) {

$scope.currentNavItem = 'explore';

$scope.categories=['Science','Math','Computer Science','Art'];

$scope.showOptions=false;

$scope.searchParams={
	input:null,
	category:null,
	instructor_name:null
};

$scope.allCourses=[];
//$scope.allCategories=[];
$scope.allInstructors=[];

var promise = AppUserService.getInstructors();
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
            console.log(allUsers);
            for(i=0;i<allUsers.length;i++)
            {
            	$scope.allInstructors.push(allUsers[i].name);
              

            }

            console.log($scope.allInstructors);
        }


    },
      function(error){
        console.log("error didnt get all users");
    });


/*
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
                  //console.log($scope.allCourses);

                  
                  for(i=0;i<$scope.allCourses.length;i++){

                  			var categoryName= $scope.allCourse[i].
		                  var index = $scope.allCategories.indexOf(categoryName);
		              	  if (index !== -1) {
		             

		              		}

              		}

              		
            }
            


        },
          function(error){
            console.log("error");
        });


*/



$scope.searchEntered = function(keyEvent){

	 if (keyEvent.which === 13)
    {
    	//$scope.currentNavItem = 'explore';
    	//$state.reload('student.search');
    	//$state.go('student.explore');


    	//NEEDS TO SWITCH TAB OR RELOAD TO WORK AGAIN IDK WHY 
    	$state.go('student.search',{searchParams: $scope.searchParams});
    }
}

$scope.openOptions = function() {
      
	if($scope.showOptions==false)
      $scope.showOptions=true;
  	else{
  		$scope.showOptions=false;
  		$scope.searchParams.category=null;
  		$scope.searchParams.instructor_name=null;
  	}

    };



/*
$scope.openOptions = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

   */

	
});