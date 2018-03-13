var myApp=angular.module('sampleApp', ['ui.router','MainCtrl','LoginController','RegisterController','MyCoursesController','MyProfileController'
	,'ExploreController','CourseController',
	'IMainController','IMyCoursesController','IMyProfileController','ICreateController',

	'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService','ngMaterial','youtube-embed','ngMessages','ngCookies']);
 


myApp.config(function($stateProvider, $urlRouterProvider){
$stateProvider
		.state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: "LoginController"
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: "RegisterController"
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
            controller: "CourseController",
            params: {
                course: null
            }
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
            controller: "ICreateController",
            params: {
                course: null
            }
        })
        .state('instructor.viewcourse', {
            url: '/viewcourse',
            templateUrl: 'views/coursepage1.html',
            controller: "CourseController",
            params: {
                course: null
            }
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

