'use strict';

angular.module('weddingModule', []);
angular.module('groupModule', []);
angular.module('loginModule', []);
angular.module('memberModule', []);
angular.module('serviceMasterModule', []);
angular.module('serviceRateModule', []);
angular.module('reportModule', []);
angular.module('guestDetailReportModule', []);
angular.module('guestGroupReportModule', []);
angular.module('costDistributionModule', []);

var app = angular.module("weddingApp", ['weddingModule', 'groupModule', 'memberModule', 'loginModule', 'serviceMasterModule', 'serviceRateModule', 'reportModule', 'guestDetailReportModule', 'guestGroupReportModule', 'costDistributionModule', 'ngRoute', 'ngCookies'])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'loginController',
            templateUrl: 'login/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'weddingController',
            templateUrl: 'weddingMaster/wedding.html',
			hideMenus: false
        })
		
		.when('/group', {
            controller: 'groupController',
            templateUrl: 'Group/group.html',
			hideMenus: false
        })
		
		.when('/member', {
            controller: 'memberController',
            templateUrl: 'member/member.html',
			hideMenus: false
        })
		
		.when('/service-master', {
            controller: 'serviceMasterController',
            templateUrl: 'service/service_master.html',
			hideMenus: false
        })
		
		.when('/service-rates', {
            controller: 'serviceRateController',
            templateUrl: 'service/service_rates/service_rates.html',
			hideMenus: false
        })
		
		.when('/reports', {
            controller: 'reportController',
            templateUrl: 'report/report.html',
			hideMenus: false
        })
		
		.when('/guest-detail-report', {
            controller: 'guestDetailReportController',
            templateUrl: 'report/guest_details_report/guest_detail.html',
			hideMenus: false
        })
		
		.when('/guest-group-report', {
            controller: 'guestGroupReportController',
            templateUrl: 'report/guest_group_report/guest_group.html',
			hideMenus: false
        })
		
		.when('/cost-distribution-report', {
            controller: 'costDistributionController',
            templateUrl: 'report/cost_distribution/cost_distribution.html',
			hideMenus: false
        })
 
        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
		
		$rootScope.loggedInUser = $rootScope.globals.currentUser;
    }])
	
.controller('navController', ['$scope', '$route', '$location', function ($scope, $route, $location) {
      $scope.$route = $route;
	  $scope.$watch("$route.current.$$route.hideMenus", function(v){
      $scope.hideMenus = v;
	  })
	  
	  $scope.hasSubMenu = function(arry)
	  {
		if(arry !== 'undefined')
		{
			if(arry.length>0)
				return true;
			else
				return false;
		}
		else
			return false;
	  }
	   
	   $scope.isManageServiceActive = function (viewUrl)
	   {
		  var temp = false;
		  if($location.path() != viewUrl)
				return temp = true;
		   else
				return temp = false;
	   }
	   
	   $scope.checkNavUrl = function(option)
	   {
		if(option.optionLink !="#")
			$scope.navEnabled = true;
		else
			$scope.navEnabled = false;
	   }
	   
	  
	  $scope.navBarOptions = [
	   {
		  optionText: "Manage Services & Cost Items", optionLink: "service-master" , suboptions:[]
	   },
	   {
		  optionText: 'Reports', optionLink: "#", suboptions:[
		  {optionText: "Guest Groups Report", optionLink: "guest-group-report"},
		  {optionText: "Guest Report", optionLink: "guest-detail-report"},
		  {optionText: "Guest Summery", optionLink: "guest-summery"},
		   {optionText: "Cost Distribution", optionLink: "cost-distribution-report"}]
	   }
	  
];
		 
 }]);