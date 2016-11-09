var snfApp = angular.module("weddingModule", ['ui.bootstrap']);

snfApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});



var weddingController = ['$scope', '$cookieStore', '$rootScope','$http', function ($scope, $cookieStore, $rootScope,$http) 
{
	fetch();
	$scope.isAddFormVisible  = false;
	$scope.isEditFormVisible = false;
	//setFormVisibility();
	$scope.pageSize = 5;
	$scope.currentPage = 1;
	$scope.maxSize = 5;
	function fetch()
	{
		// Sending request to fetch.php files 
		$http.post('weddingMaster/db/fetch.php').success(function(data){
		//alert(data);
		// Stored the returned data into scope 
		$scope.details = data;
		
		}).error(function(error){
			console.error(error);
		});
	}
	
	$scope.showAddForm = function()
	{
		$scope.formLabel = "Insert New Wedding";
		
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
	
	$scope.createEmployee = function(obj)
	{
		if($scope.isAddFormVisible)
			insertEmployee(obj);
		else if($scope.isEditFormVisible)
			updateEmployee(obj);
	}
	
	$scope.openItem = function(obj)
	{
		$rootScope.globals.selectedWedding = obj;
		$cookieStore.put('globals', $rootScope.globals);
		window.location = "#/group";
		//console.log($rootScope);
	}
	
	function insertEmployee(obj)
	{
		$http.post('weddingMaster/db/insert.php',{"weddingName":obj.weddingName,"weddingDate":obj.weddingDate,"startTime":obj.startTime,"status":obj.status}).success(function(data){
			if (data == true) 
			{
				fetch();
				setFormVisibility();
				$scope.isAddFormVisible = !$scope.isAddFormVisible;
			}
			else
				alert(data);
		}).err
	}
	
	function updateEmployee(obj)
	{
		$http.post('weddingMaster/db/update.php',{"uuid":obj.uuid,"weddingName":obj.weddingName,"weddingDate":obj.weddingDate,"startTime":obj.startTime,"status":obj.status}).success(function(data){
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
	//console.log(obj);
		$http.post('weddingMaster/db/delete.php',{"uuid":obj.uuid}).success(function(data){
			
			if (data == 1) 
			{
				fetch();
				
			}
			else
				console.log(data);
		})
	}
	
	$scope.prepareToDelete = function(detail)
	{
		$scope.emp = detail;
		
	}
	
	$scope.editEmployee = function(obj)
	{
		$scope.formLabel = "Update Wedding";
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

snfApp.controller("weddingController", weddingController);