'use strict';
angular.module('loginModule')

.factory("loginService", ['$http', '$cookieStore', '$rootScope', function($http, $cookieStore, $rootScope){
	
	var service = {};

        service.login = function (username, password, callback) {
			
			$http.post('login/api/login_fetch.php', { username: username, password: password })
                .success(function (data) {
					
					 var response =data;
                    callback(response);
                }).error(function(error){
			//console.log(error);
		});
				
		}
		
		service.SetCredentials = function (username, password) {
            var authdata = username + ':' + '1111';
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
		
		 service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
		
	return service;	
}]);