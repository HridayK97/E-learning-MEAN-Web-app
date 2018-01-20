var myApp=angular.module('sampleApp', ['ui.router','MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService','ngMaterial']);
 
myApp.config(function($stateProvider, $urlRouterProvider){
$stateProvider
        .state('nerd', {
            url: '/nerd',
            templateUrl: 'views/nerd.html'
        })
        .state('geek', {
            url: '/geek',
            templateUrl: 'views/geek.html'
        });
 
    //$urlRouterProvider.otherwise('/nerd');
});