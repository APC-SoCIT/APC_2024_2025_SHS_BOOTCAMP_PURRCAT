<!--LINK TO RUN : http://localhost/rams-shuttle-app/login.php-->
<!-- Start of PHP -->
<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "signup_system";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['email'], $_POST['password'])) {
        $email = trim($_POST['email']);
        $pass = $_POST['password'];

        $stmt = $conn->prepare("SELECT email, password, role FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            if (password_verify($pass, $row['password'])) {
                $_SESSION['email'] = $row['email'];
                $_SESSION['role'] = $row['role'];

                $stmt->close();
                $conn->close();

                // Based on the role, go to passenger_home.html or driver_home.html
                if ($row['role'] === 'driver') {
                    header("Location: driver_interface/driver_home.html");
                } else {
                    header("Location: passenger_interface/passenger_home.html");
                }
                exit();
            } else {
                $error = "❌ Invalid password. ❌";
            }
        } else {
            $error = "❌ APC - Email not found. ❌";
        }
        $stmt->close();
    } else {
        $error = "❌ Please fill in both APC - email and password. ❌";
    }
}

$conn->close();
?>
<!-- End of PHP -->

<!-- Start of HTML -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>tRAMSport - Log In</title>
        <!-- Css connection -->
        <link rel="stylesheet" href="css/styles.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </head>
    <body>
        <div class="app-container signup-page">
            <div class="header-background">
                <img src="images/tramsport_top.png" alt="Background" />
            </div>
            <div class="form-container">
                <center><h2 class="page-title">Ride safe, <span class="yellow">Rams!</span></h2></center>
                <img src="images/ram-steps.png" alt="ram footsteps" class="center" />
                &nbsp;
                <!-- PHP to Show the error message if an error exists (missing email, password, wrong password) -->
                <?php if ($error): ?>
                    <p style="color: red; text-align: center; font-weight: bold; margin-bottom: 1em;">
                        <?php echo htmlspecialchars($error); ?>
                    </p>
                <?php endif; ?>
                <!-- Form to fill up when logging in -->
                <form id="loginForm" method="POST" action="login.php">
                    <div class="form-group">
                        <input type="email" id="loginEmail" name="email" placeholder="APC E-mail" required value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '' ?>" />
                    </div>
                    <div class="form-group password-group">
                        <input type="password" id="loginPassword" name="password" placeholder="Password" required />
                        <button type="button" class="toggle-password" onclick="togglePassword('loginPassword')">
                            <img src="images/eye.png" alt="Show password" class="eye-icon" />
                        </button>
                    </div>
                    <!-- Submit Button -->
                    <button type="submit" class="button primary-button login-button">Log In</button>
                </form>
            </div>
        </div>
        <!-- Javascript connection -->
        <script src="js/eye.js"></script>
    </body>
</html>