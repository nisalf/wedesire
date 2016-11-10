var snfApp = angular.module("guestGroupReportModule", ['ui.bootstrap']);

snfApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

var guestGroupReportController = ['$scope', '$cookieStore', '$rootScope','$http', function ($scope, $cookieStore,$rootScope,$http) 
{
	$rootScope.globals = $cookieStore.get('globals') || {};
	
	//setFormVisibility();
	$scope.pageSize = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 10;
	$scope.printingAllowed = true;
	

	$scope.fetch = function()
	{
	
		// Sending request to fetch.php files 
		$http.post('report/guest_group_report/db/fetch.php',{"weddingId":$rootScope.globals.selectedWedding.uuid,"groupParty":$scope.groupParty, "groupType":$scope.groupType, "inviteOnPriority":$scope.inviteOnPriority}).success(function(data){
		
		// Stored the returned data into scope 
		
		$scope.details = data;
		$scope.arraySize = data.length;
		
		if(data.length>0)
			$scope.printingAllowed = false;
		else
			$scope.printingAllowed = true;
		
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

snfApp.controller("guestGroupReportController", guestGroupReportController);