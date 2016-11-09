<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php'); 

$data = json_decode(file_get_contents("php://input"));

$uuid = mysqli_real_escape_string($conn, $data->uuid);
$weddingName = mysqli_real_escape_string($conn, $data->weddingName);
$weddingDate = mysqli_real_escape_string($conn, $data->weddingDate);
$startTime = mysqli_real_escape_string($conn, $data->startTime);
$status = mysqli_real_escape_string($conn, $data->status);


$sql = "UPDATE $db_name.wedding_master SET weddingName=?, weddingDate=?, startTime=?, status=? WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi",$weddingName,$weddingDate,$startTime,$status,$uuid);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



