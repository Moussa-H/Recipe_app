<?php

include("./connection.php");


if ($_SERVER["REQUEST_METHOD"]=="POST"){
$data=file_get_contents("php://input");
$params=json_decode($data,true);

$first_name=$params["first_name"];
$last_name=$params["last_name"];
$username=$params["username"];
$password=$params["password"];

if (!is_numeric($username)){

    $stmt=$conn->prepare("INSERT INTO users (first_name,last_name,username,password) VALUES (?,?,?,?)");    
  $stmt->bind_param(
            'ssss',
            $first_name,
            $last_name,
            $username,
            $password,
         
        );
        $stmt->execute();
        echo "succesfuly login";
        die;
    } else {
        return false;
    }
}