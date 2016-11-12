<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 

$data = json_decode(file_get_contents("php://input"));

$uuid = mysqli_real_escape_string($conn, $data->uuid);
$displayName = mysqli_real_escape_string($conn, $data->displayName);
$isFree = mysqli_real_escape_string($conn, $data->isFree);
$service_rate = mysqli_real_escape_string($conn, $data->service_rate);
$rateType = mysqli_real_escape_string($conn, $data->rateType);
$status = mysqli_real_escape_string($conn, $data->status);
$maxPax = _nullify($data, 'maxPax');
$serviceRateType = _nullify($data, 'serviceRateType');

$sql = "UPDATE $db_name.service_rates SET displayName=?, isFree=?, service_rate=?, rateType=?, status=?, maxPax=?, serviceRateType=? WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sisssisi",$displayName,$isFree,$service_rate,$rateType, $status, $maxPax, $serviceRateType,$uuid);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



