<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$groupId = $data->groupId;
$title = $data->title;
$memberName = $data->memberName;
$gender = $data->gender;
$memberCategory = $data->memberCategory;
$liquorType = $data->liquorType;
$participationLevel = $data->participationLevel;
$status = $data->status;
$cardRequiredType = $data->cardRequiredType;
$bothFunctions = $data->bothFunctions;
$cardinvitationType = $data->cardinvitationType;
$location = _nullify($data,'location');



$sql = "INSERT into $db_name.group_member (groupId,title,memberName,gender,memberCategory, liquorType, participationLevel, status, cardRequiredType, bothFunctions, cardinvitationType, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("isssssssssss",$groupId,$title,$memberName,$gender,$memberCategory,$liquorType,$participationLevel,$status,$cardRequiredType,$bothFunctions,$cardinvitationType,$location);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



