<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$weddingId = $data->weddingId;
$groupName = $data->groupName;
$groupType = $data->groupType;
$groupParty = $data->groupParty;
$status = $data->status;
$inviteOnPriority = $data->inviteOnPriority;
$remarks = _nullify($data,'remarks');


$sql = "INSERT into $db_name.group (weddingId,groupName,groupType,groupParty,status, remarks, inviteOnPriority) VALUES (?, ?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("issssss",$weddingId,$groupName,$groupType,$groupParty,$status, $remarks, $inviteOnPriority);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



