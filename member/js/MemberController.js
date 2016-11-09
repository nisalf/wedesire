var snfApp = angular.module("memberModule", ['ui.bootstrap']);

snfApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

var memberController = ['$scope', '$cookieStore', '$rootScope','$http', function ($scope, $cookieStore,$rootScope,$http) 
{
	$rootScope.globals = $cookieStore.get('globals') || {};
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
		$http.post('member/db/fetch.php',{"groupId":$rootScope.globals.selectedGroup.uuid}).success(function(data){
		//alert(data);
		// Stored the returned data into scope 
		$scope.details   = data;
		$scope.arraySize = data.length;
		
		}).error(function(error){
			console.error(error);
		});
	}
	
	$scope.showAddForm = function()
	{
		$scope.formLabel = "Insert New Member";
		
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
		$rootScope.selectedGroup = obj;
		window.location = "#/member";
	}
	
	function insertItem(obj)
	{
		$http.post('member/db/insert.php',{"groupId":$rootScope.globals.selectedGroup.uuid,"title":obj.title,"memberName":obj.memberName,"gender":obj.gender,"memberCategory":obj.memberCategory,"liquorType":obj.liquorType,"participationLevel":obj.participationLevel,"status":obj.status,"cardRequiredType":obj.cardRequiredType,"bothFunctions":obj.bothFunctions,"cardinvitationType":obj.cardinvitationType,"location":obj.location}).success(function(data){
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
		$http.post('member/db/update.php',{"uuid":obj.uuid,"title":obj.title,"memberName":obj.memberName,"gender":obj.gender,"memberCategory":obj.memberCategory,"liquorType":obj.liquorType,"participationLevel":obj.participationLevel,"status":obj.status,"cardRequiredType":obj.cardRequiredType,"bothFunctions":obj.bothFunctions,"cardinvitationType":obj.cardinvitationType,"location":obj.location}).success(function(data){
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
		$http.post('member/db/delete.php',{"uuid":obj.uuid}).success(function(data){
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
		$scope.formLabel = "Update Member";
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

snfApp.controller("memberController", memberController);