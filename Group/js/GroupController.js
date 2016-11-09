var snfApp = angular.module("groupModule", ['ui.bootstrap']);

snfApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

var groupController = ['$scope', '$cookieStore', '$rootScope','$http', function ($scope, $cookieStore,$rootScope,$http) 
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
		$http.post('Group/db/fetch.php',{"weddingId":$rootScope.globals.selectedWedding.uuid}).success(function(data){
		
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
		$scope.formLabel = "Insert New Group";
		
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
		console.log(obj.remarks);
		$http.post('Group/db/insert.php',{"weddingId":$rootScope.globals.selectedWedding.uuid,"groupName":obj.groupName,"groupType":obj.groupType,"groupParty":obj.groupParty,"status":obj.status,"remarks":obj.remarks,"inviteOnPriority":obj.inviteOnPriority}).success(function(data){
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
	
	function updateItem(obj)
	{
		$http.post('Group/db/update.php',{"uuid":obj.uuid,"groupName":obj.groupName,"groupType":obj.groupType,"groupParty":obj.groupParty,"status":obj.status,"remarks":obj.remarks, "inviteOnPriority":obj.inviteOnPriority}).success(function(data){
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
		$http.post('Group/db/delete.php',{"uuid":obj.uuid}).success(function(data){
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
		$scope.formLabel = "Update Group";
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

snfApp.controller("groupController", groupController);