<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$weddingId = _nullify($data, 'weddingId');

$memberCoubntArr = getMemberCounts($conn, $db_name, $weddingId);

// mysqli query to fetch all data from database
$query = "SELECT * FROM $db_name.service_master WHERE weddingId = '$weddingId'";
//echo $query ;
$result = $conn->query($query);


$arr = array();

 if($result){
	if($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
				
			
			$object = array('costMasterName' => $row['serviceName'], 'items' => getServiceItems($conn, $row['uuid'], $memberCoubntArr, $row['seviceParty'], $db_name));
			
			$arr[] = $object;
		}
	}
}
// Return json array containing data from the database
echo $json_info = json_encode($arr);

$conn->close();

function getServiceItems($conn, $serviceId, $memberCoubntArr, $groupParty, $db_name)
{
	$query = "SELECT * FROM $db_name.service_rates WHERE serviceMasterId = '$serviceId'";
	//echo $query ;
	$result = $conn->query($query);
	$arr = array();

	if($result){
	if($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
				
				$rate = $row['service_rate'];
				$maxPax = $row['maxPax'];
				$costType = $row['serviceRateType'];
				$rateType = $row['rateType'];
				
				
				$groomPax = getPaxCount($costType, 'GROOM', $memberCoubntArr);
				$briePax  = getPaxCount($costType, 'BRIDE', $memberCoubntArr);
				
				$groomUnits = 0;
				$groomCost  = 0;
				
				if($groupParty == 'GROOM' || $groupParty == 'BOTH')
				{
					$groomUnits = calculateUnits($costType, $rateType, $groomPax, $maxPax);
					$groomCost = calculateCost($costType, $rate, $groomUnits, $groupParty, $rateType);
				}
				
				$brideUnits = 0;
				$brideCost  = 0;
				
				if($groupParty == 'BRIDE' || $groupParty == 'BOTH')
				{
					$brideUnits = calculateUnits($costType, $rateType, $briePax, $maxPax);
					$brideCost = calculateCost($costType, $rate, $brideUnits, $groupParty, $rateType);
				}
				
				
				
				
				$object = array('description' => $row['displayName'], 'groomPax' => $groomPax, 'bridePax' => $briePax, 'groomCost' => $groomCost, 'bideCost' => $brideCost, 'groomUnits' => $groomUnits, 'brideUnits' => $brideUnits);
				$arr[] = $object;
			}
		}
	}
	return $arr;
}

function getPaxCount($cost_type, $groupParty, $arr)
{
	$count = 0;
	//echo $json_info = json_encode($arr);
	foreach($arr as $obj)
	{
		if($cost_type == 'BITES' && $obj['groupParty'] == $groupParty)
		{
			$count = $obj['totalPax'];
		}
		else if($cost_type == 'PLATE' && $obj['groupParty'] == $groupParty)
		{
			$count = $obj['totalPax'];
		}
		else if($cost_type == 'LIQUOR' && $obj['groupParty'] == $groupParty)
		{
			$count = $obj['liquorCount'];
		}
		else if($cost_type == 'OTHER' && $obj['groupParty'] == $groupParty)
		{
			$count = 0;
		}
	}
	
	return $count;
}

function calculateUnits($cost_type, $rate_type, $paxCount, $maxPax)
{
	$units = 0.0;
	if($rate_type == "PER_PAX")
		$units = $paxCount/1;
	else if($rate_type == "PER_KG")
	{
		$units = $paxCount/$maxPax;
		
	}
	else if($rate_type == "PER_L")
	{
		$units = $paxCount/$maxPax;
		
	}
	else if($rate_type == "PACKAGE_RATE")
	{
		$units = 1;
		
	}
	
	return $units;
}

function calculateCost($cost_type, $rate, $units, $groupParty, $rateType)
{
	$cost = 0.0;
	
	$cost = $rate * $units;
	
	if($groupParty == 'BOTH' && $rateType == 'PACKAGE_RATE')
		$cost = $cost/2;
	
	return $cost;
}

function getMemberCounts($conn, $db_name, $weddingId)
{
$arr = array();
	$query = "select g.uuid, g.status, g.weddingId, gm.cardRequiredType, gm.liquorType, count(gm.memberName) as totalPax, g.groupParty, sum(gm.cardRequiredType = 'YES')
				as 'cardCount', sum(gm.liquorType = 'HARD') as 'liquorCount'
				from $db_name.group_member as gm 
				inner join(select * from $db_name.`group`) as g on g.uuid = gm.groupId 
				WHERE gm.`status` = 'ACTIVE' AND g.`status` = 'ACTIVE' AND g.weddingId = '$weddingId' group by g.groupParty";
	//echo $query ;			
	$result = $conn->query($query);
	
	if($result){
	if($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			array_push($arr, $row);
			}
		}
	}
	
	return $arr;	
}

?>



