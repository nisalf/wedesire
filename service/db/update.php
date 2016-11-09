<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 

$data = json_decode(file_get_contents("php://input"));

$uuid = mysqli_real_escape_string($conn, $data->uuid);
$serviceName = mysqli_real_escape_string($conn, $data->serviceName);
$serviceTypeId = mysqli_real_escape_string($conn, $data->serviceTypeId);
$contactPerson = mysqli_real_escape_string($conn, $data->contactPerson);
$contactNo = mysqli_real_escape_string($conn, $data->contactNo);
$seviceParty = mysqli_real_escape_string($conn, $data->seviceParty);
$remarks = mysqli_real_escape_string($conn, $data->remarks);
$status  = mysqli_real_escape_string($conn, $data->status);



$sql = "UPDATE $db_name.service_master SET serviceName=?, serviceTypeId=?, contactPerson=?, contactNo=?, seviceParty=?, remarks=?, status=? WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssi",$serviceName,$serviceTypeId,$contactPerson,$contactNo,$seviceParty,$remarks,$uuid);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



