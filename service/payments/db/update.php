<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php'); 

$data = json_decode(file_get_contents("php://input"));

$serviceMasterId = _nullify($data,'serviceMasterId');
$description = _nullify($data, 'description');
$paymentParty = _nullify($data, 'paymentParty');
$amount = _nullify($data, 'amount');
$status = _nullify($data, 'status');
$uuid = _nullify($data, 'uuid');
$paymentDate = _nullify($data, 'paymentDate');

$sql = "UPDATE $db_name.payments SET description=?, paymentParty=?, amount=?, status=?, paymentDate=? WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi",$description,$paymentParty,$amount, $status, $paymentDate, $uuid);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



