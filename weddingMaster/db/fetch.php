<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));
$userId = _nullify($data,'user');

// mysqli query to fetch all data from database
$query = "SELECT * from $db_name.wedding_master WHERE createdById ='$userId' ORDER BY uuid DESC";
if($userId== 1)
	$query = "SELECT * from $db_name.wedding_master ORDER BY uuid DESC";
//echo $query;
$result = $conn->query($query);

$arr = array();

 if($result){
	if($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
				$arr[] = $row;
		}
	}
}
// Return json array containing data from the database
echo $json_info = json_encode($arr);

$conn->close();
?>



