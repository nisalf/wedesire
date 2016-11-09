<?php
$servername = "182.50.133.170";
$username = "snfwedding089";
$password = "sf#89Np5";
$db_name  = "snfwedding089";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//echo "Connected successfully";


function _nullify($object, $key){
    if(property_exists($object, $key))
        return empty($object->$key) ? NULL : $object->$key;
    else
        return NULL;
}

?>