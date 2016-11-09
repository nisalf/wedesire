<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php'); 

$data = json_decode(file_get_contents("php://input"));

$uuid = mysqli_real_escape_string($conn, $data->uuid);
$displayName = mysqli_real_escape_string($conn, $data->displayName);
$isFree = mysqli_real_escape_string($conn, $data->isFree);
$service_rate = mysqli_real_escape_string($conn, $data->service_rate);
$rateType = mysqli_real_escape_string($conn, $data->rateType);
$status = mysqli_real_escape_string($conn, $data->status);


$sql = "UPDATE $db_name.service_rates SET displayName=?, isFree=?, service_rate=?, rateType=?, status=? WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sisssi",$displayName,$isFree,$service_rate,$rateType, $status,$uuid);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



