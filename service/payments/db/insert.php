<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$serviceMasterId = _nullify($data,'serviceMasterId');
$description = _nullify($data, 'description');
$paymentParty = _nullify($data, 'paymentParty');
$amount = _nullify($data, 'amount');
$status = _nullify($data, 'status');
$paymentDate = _nullify($data, 'paymentDate');


$sql = "INSERT into $db_name.payments (serviceId,description,paymentParty,amount, status, paymentDate) VALUES (?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("isssss",$serviceMasterId,$description,$paymentParty, $amount, $status, $paymentDate);
//$stmt->execute();
if ($stmt->execute() == TRUE) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



