<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$serviceMasterId = mysqli_real_escape_string($conn, $data->serviceMasterId);
$displayName = mysqli_real_escape_string($conn, $data->displayName);
$isFree = mysqli_real_escape_string($conn, $data->isFree);
$service_rate = mysqli_real_escape_string($conn, $data->service_rate);
$rateType = mysqli_real_escape_string($conn, $data->rateType);
$status = mysqli_real_escape_string($conn, $data->status);


$sql = "INSERT into $db_name.service_rates (serviceMasterId,displayName,isFree,service_rate,rateType, status) VALUES (?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("isisss",$serviceMasterId,$displayName,$isFree,$service_rate,$rateType,$status);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



