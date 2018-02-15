var myApp=angular.module('sampleApp', ['ui.router','MainCtrl','LoginController','MyCoursesController','MyProfileController'
	,'ExploreController','CourseController','CourseController2',
	'IMainController','IMyCoursesController','IMyProfileController','ICreateController',
	'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService','ngMaterial','youtube-embed']);
 


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
        .state('student.viewcourse', {
            url: '/viewcourse',
            templateUrl: 'views/coursepage1.html',
            controller: "CourseController"
        })

        .state('student.viewcourse2', {
            url: '/viewcourse2',
            templateUrl: 'views/coursepage2.html',
            controller: "CourseController2"
        })


        .state('instructor', {
            url: '/instructor',
            templateUrl: 'views/instructor/instructor.html',
            controller: "IMainController"
        })
        .state('instructor.mycourses', {
            url: '/mycourses',
            templateUrl: 'views/instructor/imycourses.html',
            controller: "IMyCoursesController"
        })
        .state('instructor.myprofile', {
            url: '/myprofile',
            templateUrl: 'views/instructor/imyprofile.html',
            controller: "IMyProfileController"
        })
        .state('instructor.createcourse', {
            url: '/createcourse',
            templateUrl: 'views/instructor/icreate.html',
            controller: "ICreateController"
        })
        .state('instructor.viewcourse', {
            url: '/viewcourse',
            templateUrl: 'views/coursepage1.html',
            controller: "CourseController"
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

