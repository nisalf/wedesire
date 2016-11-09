<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$name = mysqli_real_escape_string($conn, $data->username);
$password = mysqli_real_escape_string($conn, $data->password);
$md5_pass = md5($password);
// mysqli query to fetch all data from database
$query = "SELECT * from $db_name.user where userName='$name' and password='$password' ORDER BY id ASC";

$result = $conn->query($query);

$isUserIn = false;
$userId = null;

 if($result){
	if($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
				//echo $json_info = json_encode($row);
				$isUserIn = true;
				$userId = $row['id'];
		}
	}
}
// Return json array containing data from the database
echo $json_info = json_encode(array("success" =>$isUserIn, "userId" =>$userId));


$conn->close();
?>



