<!--LINK TO RUN : http://localhost/rams-shuttle-app/signup.php-->
<!--Start of PHP-->
<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$error = "";

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "signup_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['email'], $_POST['password'], $_POST['confirmPassword'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirmPassword'];
        // to make sure password and confirm password are the same
        if ($password !== $confirmPassword) {
            $error = "❌ Passwords do not match. ❌";
        } else {
            $checkStmt = $conn->prepare("SELECT id FROM users WHERE apc_email = ?");
            $checkStmt->bind_param("s", $email);
            $checkStmt->execute();
            $checkStmt->store_result();

            if ($checkStmt->num_rows > 0) {
                $error = "❌ Email already registered. Use another email. ❌";
            }
            $checkStmt->close();
            
            if (!$error) {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $role = $_POST['role'];
                $stmt = $conn->prepare("INSERT INTO users (apc_email, password, role) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $email, $hashedPassword, $role);

                     
                if ($stmt->execute()) {
                  $_SESSION['email'] = $email;
                  $_SESSION['role'] = $role;
                  $stmt->close();
                  $conn->close();
                  // for directing the driver / passenger to the right homepage, depending on their role.
                  if ($role === 'driver') {
                    header("Location: driver_home.html");
                  } else {
                    header("Location: home.html");
                  }
                  exit();
                }


                $stmt->close();
            }
        }
    } else {
        $error = "❌ Missing email or password POST data.";
    }
}

$conn->close();
?>
<!--End of PHP-->

<!--Start of HTML-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tRAMSport - Sign Up</title>
    <link rel="stylesheet" href="css/styles.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div class="app-container signup-page">
      <div class="header-background">
        <img src="images/tramsport_top.png" alt="Background" />
      </div>
      <div class="form-container">
        <center><h2 class="page-title">Sign up, <span class="yellow">Rams!</span></h2></center>
        <img src="images/ram-steps.png" alt="ram footsteps" class="center" />
        &nbsp;
        <!-- PHP to Show the error message if an error exists (email already registered, passwords don't match, etc.) -->
        <?php if ($error): ?>
          <p style="color: red; text-align: center;"><?php echo htmlspecialchars($error); ?></p>
        <?php endif; ?>
        &nbsp;
        <!-- Form to fill up when signing up -->
        <form id="signupForm" method="post" action="signup.php">
        <div class="form-group">
          <input type="email" id="email" name="email" placeholder="APC E-mail" required value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>" />
        </div>
        <div class="form-group password-group">
          <input type="password" id="password" name="password" placeholder="Password" required />
          <button type="button" class="toggle-password" onclick="togglePassword('password')">
            <img src="images/eye.png" alt="Show password" class="eye-icon" />
          </button>
        </div>
        <div class="form-group password-group">
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter Password" required />
          <button type="button" class="toggle-password" onclick="togglePassword('confirmPassword')">
            <img src="images/eye.png" alt="Show password" class="eye-icon" />
          </button>
        </div>
        <div class="form-group">
          <!-- For choosing their role -->
          <label><input type="radio" name="role" value="passenger" required> Passenger</label>
          &nbsp;
          <label><input type="radio" name="role" value="driver" required> Driver</label>
        </div>
        &nbsp;
        <!-- Submit Button -->
        <button type="submit" class="button primary-button signup-button" name="signUp">Sign Up</button>
        </form>
      </div>
    </div>
    <!--Javascript connection-->
    <script src="js/script.js"></script>
  </body>
</html>