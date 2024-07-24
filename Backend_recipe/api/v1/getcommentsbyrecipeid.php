<?php

include("./connection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['recipe_id'])) {
        $recipe_id = $_GET['recipe_id'];
        
        try {
            // Prepare and execute the SELECT statement for comments
            $stmt = $conn->prepare("SELECT c.comment_id, c.comment_text, u.first_name, u.last_name 
                                    FROM comments c 
                                    JOIN users u ON c.user_id = u.user_id 
                                    WHERE c.recipe_id = ?");
            $stmt->bind_param("i", $recipe_id);
            $stmt->execute();
            
            // Get the result
            $result = $stmt->get_result();
            
            // Fetch all results
            $comments = $result->fetch_all(MYSQLI_ASSOC);
            
            // Return the results as JSON
            echo json_encode($comments);
        } catch (mysqli_sql_exception $e) {
            // Handle any errors
            echo json_encode(["error" => "Error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Recipe ID not provided"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>
