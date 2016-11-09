<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$weddingName = mysqli_real_escape_string($conn, $data->weddingName);
$weddingDate = mysqli_real_escape_string($conn, $data->weddingDate);
$startTime = mysqli_real_escape_string($conn, $data->startTime);
$status = mysqli_real_escape_string($conn, $data->status);


$sql = "INSERT into $db_name.wedding_master (weddingName,weddingDate,startTime,status) VALUES (?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss",$weddingName,$weddingDate,$startTime,$status);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



