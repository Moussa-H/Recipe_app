<?php
session_start();

include("./connection.php");
if (isset($_SESSION['user_id'])) {
    echo true;
} else {
    echo false;
}
