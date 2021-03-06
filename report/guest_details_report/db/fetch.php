<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$weddingId = _nullify($data, 'weddingId');
$groupParty = _nullify($data, 'groupParty');
$cardRequiredStatus = _nullify($data, 'cardRequiredStatus');
$groupType = _nullify($data, 'groupType');
$liquorType = _nullify($data, 'liquorType');
$inviteOnPriority = _nullify($data, 'inviteOnPriority');

// mysqli query to fetch all data from database
$query = "select gm.uuid, CONCAT(gm.title, ' ', gm.memberName) as `GuestName`, gm.gender, gm.memberCategory, gm.liquorType, gm.participationLevel, gm.cardRequiredType, gm.cardinvitationType, g.groupName, g.inviteOnPriority from $db_name.group_member as gm inner join(select * from $db_name.`group`) as g on g.uuid = gm.groupId 
WHERE g.weddingId = '$weddingId' AND gm.`status` = 'ACTIVE' AND g.`status` = 'ACTIVE' AND g.groupParty LIKE '$groupParty%' AND gm.cardRequiredType LIKE '$cardRequiredStatus%' AND g.groupType LIKE '$groupType%' AND gm.liquorType LIKE '$liquorType%' AND g.inviteOnPriority LIKE '$inviteOnPriority%' ORDER BY g.groupName";
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



