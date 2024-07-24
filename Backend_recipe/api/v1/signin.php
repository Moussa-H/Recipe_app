<?php

include('./connection.php');

session_start();  

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $data = file_get_contents("php://input");
    $params = json_decode($data, true);

    $username = $params["username"];
    $password = $params["password"];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
    $stmt->bind_param('s', $username);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $userData = $result->fetch_assoc();
        if ($password == $userData['password']) {  
            $_SESSION['user_id'] = $userData['user_id'];
            echo json_encode(["success" => true, "userid" => $userData['user_id']]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid username"]);
    }
}
?>
