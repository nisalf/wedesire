<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$weddingId = _nullify($data, 'weddingId');
$groupParty = _nullify($data, 'groupParty');
$groupType = _nullify($data, 'groupType');
$inviteOnPriority = _nullify($data, 'inviteOnPriority');

// mysqli query to fetch all data from database
$query = "SELECT g.*, ifnull(m.memberCount, 0) as memberCount from $db_name.group as g LEFT OUTER JOIN(SELECT groupId,status,count(*) as memberCount FROM $db_name.group_member where status = 'ACTIVE' group by groupId) as m on m.groupId = g.uuid 
WHERE g.weddingId = '$weddingId' AND g.status = 'ACTIVE' AND g.groupParty LIKE '$groupParty%' AND g.groupType LIKE '$groupType%' AND g.inviteOnPriority LIKE '$inviteOnPriority%' ORDER BY g.groupName";
//echo $query ;
$result = $conn->query($query);

$arr = array();

 if($result){
	if($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
				$arr[] = $row;
		}
	}
}
// Return json array containing data from the database
echo $json_info = json_encode($arr);

$conn->close();
?>



