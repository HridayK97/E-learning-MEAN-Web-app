var myApp=angular.module('sampleApp', ['ui.router','MainCtrl','LoginController','MyCoursesController','MyProfileController'
	,'ExploreController','NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService','ngMaterial']);
 


myApp.config(function($stateProvider, $urlRouterProvider){
$stateProvider
		.state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: "LoginController"
        })
        .state('student', {
            url: '/student',
            templateUrl: 'views/student.html',
            controller: "MainController"
        })
        .state('student.explore', {
            url: '/explore',
            templateUrl: 'views/explore.html',
            controller: "ExploreController"
        })
        .state('student.mycourses', {
            url: '/mycourses',
            templateUrl: 'views/mycourses.html',
            controller: "MyCoursesController"
        })
        .state('student.myprofile', {
            url: '/myprofile',
            templateUrl: 'views/myprofile.html',
            controller: "MyProfileController"
        })
        .state('nerd', {
            url: '/nerd',
            templateUrl: 'views/nerd.html',
            controller: "NerdController"
        })
        .state('geek', {
            url: '/geek',
            templateUrl: 'views/geek.html'
        });
 
    $urlRouterProvider.otherwise('/login');
});

