'use strict';

angular.module("loginModule")

.controller("loginController", ['$scope', '$rootScope', '$location', 'loginService', function ($scope, $rootScope, $location, loginService) 
{
	$scope.error = "";
	
	loginService.ClearCredentials();
	
	 $scope.login = function () {
		
		loginService.login($scope.username, $scope.password, function(response){
							
			if(response.success == true) {
			
						loginService.SetCredentials($scope.username,response.userId);
						$location.path('/');
			} else {
						$scope.error = "Username or password is incorrect";
						//$scope.dataLoading = false;
			}
		
		});
	 }
	 
	 $scope.logout = function () {
		$location.path('/');
		$route.reload();
	 }
}]);