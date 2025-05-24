<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Make sure the POST data exists
if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (apc_email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $pass);

    if ($stmt->execute()) {
        // ✅ Redirect to home.html
        header("Location: home.html");
        exit(); // Always call exit after redirect
    } else {
        echo "❌ Error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "❌ Missing email or password POST data.";
}

$conn->close();
?>