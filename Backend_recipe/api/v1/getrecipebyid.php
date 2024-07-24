<?php

include("./connection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['recipe_id'])) {
        $recipe_id = $_GET['recipe_id'];
        
        try {
            // Prepare and execute the SELECT statement
            $stmt = $conn->prepare("SELECT DISTINCT r.*, s.star  FROM recipe r JOIN stars s ON r.recipe_id = s.recipe_id WHERE r.recipe_id = ?");
            $stmt->bind_param("i", $recipe_id);
            $stmt->execute();
            
            // Get the result
            $result = $stmt->get_result();
            
            // Fetch all results
            $results = $result->fetch_all(MYSQLI_ASSOC);
            
            // Return the results as JSON
            echo json_encode($results);
        } catch (mysqli_sql_exception $e) {
            // Handle any errors
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Recipe ID not provided";
    }
} else {
    echo "Invalid request method";
}

?>
