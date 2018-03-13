
angular.module('RegisterService', []).factory('RegisterService', ['$http', function($http) { 
  

  var DisplayRegisterToast;


  set_display_reg_toast = function(data){
    DisplayRegisterToast=data;
  }

  check_display_reg_toast = function(){
    return DisplayRegisterToast;
  }


  var addUser = function(userData){
   
    return $http({
          method: 'POST',
          url: '/api/users/',
          headers: {"Content-Type": "application/json;charset=UTF-8"},
          data: userData
       }).then(function (response){
          console.log('put suscces??');


          return;

       },function (error){
        console.log('can not get data.');
          return;

       });
  }


  return {
    set_display_reg_toast:set_display_reg_toast,
    check_display_reg_toast:check_display_reg_toast,
    addUser:addUser
    };

}]);