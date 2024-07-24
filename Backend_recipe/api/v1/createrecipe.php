<?php
include('./connection.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = file_get_contents("php://input");
    $params = json_decode($data, true);

    $user_id = $params["user_id"];
    $name = $params["name"];
    $ingredients = $params["ingredients"];
    $steps = $params["steps"];
    $image_url = $params["image_url"];

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO recipe (user_id, name, ingredients, steps, image_url) VALUES (?, ?, ?, ?, ?)");
    
    // Check if prepare() succeeded
    if ($stmt === false) {
        echo "Failed to prepare statement: " . $conn->error;
        exit;
    }

    // Bind parameters
    $stmt->bind_param('issss', $user_id, $name, $ingredients, $steps, $image_url);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Successfully added";
    } else {
        echo "Failed to execute statement: " . $stmt->error;
    }
}
