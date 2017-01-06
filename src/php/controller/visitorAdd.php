<?php
include_once "../common/conn.php";

$ip = $_SERVER["REMOTE_ADDR"];
$sql = "insert into visitor (ip,time) VALUES (?,now()) ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $ip);

$result = $stmt->execute();
if (!$result) {
    echo "error:" . $stmt->error;
} else {
    echo "success";
}


?>