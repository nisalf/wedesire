var snfApp = angular.module("costDistributionModule", ['ui.bootstrap']);

snfApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

var costDistributionController = ['$scope', '$cookieStore', '$rootScope','$http', function ($scope, $cookieStore,$rootScope,$http) 
{
	$rootScope.globals = $cookieStore.get('globals') || {};
	
	//setFormVisibility();
	$scope.pageSize = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 10;
	$scope.printingAllowed = true;
	$scope.costMasterList = [];
	
	fetch();
		
	function fetch()
	{
	
		// Sending request to fetch.php files 
		$http.post('report/cost_distribution/db/fetch.php',{"weddingId":$rootScope.globals.selectedWedding.uuid}).success(function(data){
		
		// Stored the returned data into scope 
		
		$scope.costMasterList = data;
		
				
		if(data.length>0)
			$scope.printingAllowed = false;
		else
			$scope.printingAllowed = true;
		
		//console.log(data);
		}).error(function(error){
			console.error(error);
		});
	}
	
	$scope.getGroomCost = function(obj){
		var total = 0;
		
			for(var j = 0; j<obj.items.length; j++)
			{
				item = obj.items[j];
				total += item.groomCost;
				
			}
			
		
		return total;
	}
	
	$scope.getTotalGroomCost = function(){
		var total = 0;
		
		for(var i =0; i<$scope.costMasterList.length; i++)
		{
			obj = $scope.costMasterList[i];
			for(var j = 0; j<obj.items.length; j++)
			{
				item = obj.items[j];
				total += item.groomCost;
				
			}
		}
		
		return total;
	}
	
	$scope.getTotalBrideCost = function(){
		var total = 0;
		
		for(var i =0; i<$scope.costMasterList.length; i++)
		{
			obj = $scope.costMasterList[i];
			for(var j = 0; j<obj.items.length; j++)
			{
				item = obj.items[j];
				total += item.bideCost;
				
			}
		}
		
		return total;
	}
	
	$scope.getTotalCost = function(){
		var total = 0;
		
		for(var i =0; i<$scope.costMasterList.length; i++)
		{
			obj = $scope.costMasterList[i];
			for(var j = 0; j<obj.items.length; j++)
			{
				item = obj.items[j];
				total += item.bideCost + item.groomCost;
				
			}
		}
		
		return total;
	}
	
	$scope.getBrideCost = function(obj){
		var total = 0;
		//console.log($scope.totalBrideCost);
		for(var j = 0; j<obj.items.length; j++)
		{
			item = obj.items[j];
			total += item.bideCost;
			
		}
			
		
		//console.log(total);
		return total;
	}
	
	$scope.getGroomUnits = function(obj){
		var total = 0;
	
		for(var j = 0; j<obj.items.length; j++)
		{
			item = obj.items[j];
			total += item.groomUnits;
			//console.log(total);
		}
		
		
		return total;
	}
	
	$scope.getBrideUnits = function(obj){
		var total = 0;
		
		for(var j = 0; j<obj.items.length; j++)
		{
			item = obj.items[j];
			total += item.brideUnits;
			//console.log(total);
		}
			
		
		return total;
	}
	
	$scope.printContent = function (el){
	var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
}
	


	

	
			
}];

snfApp.controller("costDistributionController", costDistributionController);