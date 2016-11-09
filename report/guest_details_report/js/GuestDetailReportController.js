var snfApp = angular.module("guestDetailReportModule", ['ui.bootstrap']);

snfApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

var guestDetailReportController = ['$scope', '$cookieStore', '$rootScope','$http', function ($scope, $cookieStore,$rootScope,$http) 
{
	$rootScope.globals = $cookieStore.get('globals') || {};
	
	//setFormVisibility();
	$scope.pageSize = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 10;
	
	

	$scope.fetch = function()
	{
	
		// Sending request to fetch.php files 
		$http.post('report/guest_details_report/db/fetch.php',{"groupParty":$scope.groupParty, "cardRequiredStatus":$scope.cardRequiredStatus}).success(function(data){
		
		// Stored the returned data into scope 
		
		$scope.details = data;
		$scope.arraySize = data.length;
		
		//console.log(data);
		}).error(function(error){
			console.error(error);
		});
	}
	
	$scope.printContent = function (el){
	var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
}
	


	

	
			
}];

snfApp.controller("guestDetailReportController", guestDetailReportController);