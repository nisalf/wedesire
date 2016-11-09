<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php'); 

$data = json_decode(file_get_contents("php://input"));

$uuid = mysqli_real_escape_string($conn, $data->uuid);
$title = mysqli_real_escape_string($conn, $data->title);
$memberName = $data->memberName;
$gender = mysqli_real_escape_string($conn, $data->gender);
$memberCategory = mysqli_real_escape_string($conn, $data->memberCategory);
$liquorType = mysqli_real_escape_string($conn, $data->liquorType);
$participationLevel = mysqli_real_escape_string($conn, $data->participationLevel);
$status = mysqli_real_escape_string($conn, $data->status);
$cardRequiredType = mysqli_real_escape_string($conn, $data->cardRequiredType);
$bothFunctions = mysqli_real_escape_string($conn, $data->bothFunctions);
$cardinvitationType = mysqli_real_escape_string($conn, $data->cardinvitationType);
$location = _nullify($data,'location');


$sql = "UPDATE $db_name.group_member SET title=?, memberName=?, gender=?, memberCategory=?, liquorType=?, participationLevel=?, status=?, cardRequiredType=?, bothFunctions=?, cardinvitationType=?, location=? WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssssi",$title,$memberName,$gender,$memberCategory,$liquorType,$participationLevel,$status,$cardRequiredType,$bothFunctions,$cardinvitationType,$location,$uuid);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



