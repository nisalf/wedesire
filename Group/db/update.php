<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/angular/weddingApp/api/db_connect.php'); 

$data = json_decode(file_get_contents("php://input"));

$uuid = $data->uuid;
$groupName = $data->groupName;
$groupType = $data->groupType;
$groupParty = $data->groupParty;
$status = $data->status;
$remarks = _nullify($data,'remarks');
$inviteOnPriority = $data->inviteOnPriority;


$sql = "UPDATE $db_name.group SET groupName=?, groupType=?, groupParty=?, status=?, remarks=?, inviteOnPriority=? WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssi",$groupName,$groupType,$groupParty,$status,$remarks,$inviteOnPriority,$uuid);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



