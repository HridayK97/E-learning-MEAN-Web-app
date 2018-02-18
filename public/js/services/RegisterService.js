
angular.module('RegisterService', []).factory('RegisterService', ['$http', function($http) { 
  

  var DisplayRegisterToast;


  set_display_reg_toast = function(data){
    DisplayRegisterToast=data;
  }

  check_display_reg_toast = function(){
    return DisplayRegisterToast;
  }

  return {
    set_display_reg_toast:set_display_reg_toast,
    check_display_reg_toast:check_display_reg_toast
    };

}]);