var snfApp = angular.module("paymentModule", ['ui.bootstrap']);

snfApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

var paymentController = ['$scope', '$cookieStore', '$rootScope','$http', function ($scope, $cookieStore,$rootScope,$http) 
{
	$rootScope.globals = $cookieStore.get('globals') || {};
	//console.log($rootScope);
	fetch();
	$scope.isAddFormVisible  = false;
	$scope.isEditFormVisible = false;
	//setFormVisibility();
	$scope.pageSize = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 10;
	function fetch()
	{
		// Sending request to fetch.php files 
		$http.post('service/payments/db/fetch.php',{"serviceId":$rootScope.globals.selectedService.uuid}).success(function(data){
		
		// Stored the returned data into scope 
		$scope.details = data;
		$scope.arraySize = data.length;
		
		//console.log(data);
		}).error(function(error){
			console.error(error);
		});
	}
	
	$scope.showAddForm = function()
	{
		$scope.formLabel = "Insert New Payment";
		
		if(!$scope.isEditFormVisible)
		{
			setFormVisibility();
			$scope.isAddFormVisible = !$scope.isAddFormVisible;
		}
		else
		{
			$scope.isEditFormVisible= false;	
			$scope.isAddFormVisible = true;	
		}	
			
		clearForm();	
		
	}
	
	function clearForm()
	{
		var obj = {weddingName:"", weddingDate:"", startTime:"", status:""};
		$scope.obj = obj;
	}
	
	function setFormVisibility()
	{
		$('#empForm').slideToggle();
		//$scope.isAddFormVisible = !$scope.isAddFormVisible;
	}
	
	$scope.createItem = function(obj)
	{
		if($scope.isAddFormVisible)
			insertItem(obj);
		else if($scope.isEditFormVisible)
			updateItem(obj);
	}
	
	$scope.openItem = function(obj)
	{
		$rootScope.globals.selectedGroup = obj;
		$cookieStore.put('globals', $rootScope.globals);
		window.location = "#/member";
	}
	
	function insertItem(obj)
	{
	
		$http.post('service/payments/db/insert.php',{"uuid":obj.uuid, "serviceMasterId":$rootScope.globals.selectedService.uuid,"description":obj.description,"paymentParty":obj.paymentParty,"amount":obj.amount,"status":obj.status, "paymentDate":obj.paymentDate}).success(function(data){
			
			if (data == true) 
			{
				fetch();
				setFormVisibility();
				$scope.isAddFormVisible = !$scope.isAddFormVisible;
			}
			else
				console.log(data);
		}).err
	}
	
	function updateItem(obj)
	{
		$http.post('service/payments/db/update.php',{"uuid":obj.uuid,"description":obj.description,"paymentParty":obj.paymentParty,"amount":obj.amount,"status":obj.status, "paymentDate":obj.paymentDate}).success(function(data){
			console.log(data);
			if (data == true) 
			{
				fetch();
				setFormVisibility();
				$scope.isEditFormVisible = !$scope.isEditFormVisible;
			}
			else
				alert("error");
			
		}).error(function(error){
			console.error(error);
		});
	}
	
	$scope.deleteEmployee = function(obj)
	{
	console.log(obj);
		$http.post('service/payments/db/delete.php',{"uuid":obj.uuid}).success(function(data){
			if (data == 1) 
			{
				fetch();
				
			}
			else
				alert("error");
		})
	}
	
	$scope.prepareToDelete = function(detail)
	{
		$scope.emp = detail;
		console.log($scope.emp);
	}
	
	$scope.editItem = function(obj)
	{
		$scope.formLabel = "Update Payment";
		if(!$scope.isAddFormVisible)
		{
			setFormVisibility();
			$scope.isEditFormVisible = !$scope.isEditFormVisible;
		}
		else
		{
			$scope.isEditFormVisible= true;	
			$scope.isAddFormVisible = false;	
		}			
		$scope.obj = obj;
				
	}
		
}];

snfApp.controller("paymentController", paymentController);