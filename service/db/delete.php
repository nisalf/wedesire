<?php
// Including database connections
require_once ($_SERVER['DOCUMENT_ROOT'] . '/api/db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$uuid = mysqli_real_escape_string($conn, $data->uuid);

$sql = "DELETE FROM $db_name.service_master WHERE uuid=?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("i",$uuid);

$result = $stmt->execute();



if ($result) {
    echo true;
} else {
    echo mysql_error();
}



$stmt->close();
$conn->close();

?>



