<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_system";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$pass = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE apc_email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    if (password_verify($pass, $row['password'])) {
        echo "Login successful! <a href='home.html'>Go to Home</a>";
    } else {
        echo "Incorrect password.";
    }
} else {
    echo "Email not found.";
}

$stmt->close(); // ✅ Close the statement here
$conn->close();
?>
