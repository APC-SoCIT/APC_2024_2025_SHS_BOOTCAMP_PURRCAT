<!--LINK TO RUN: http://localhost/rams-shuttle-app/passenger_interface/information.php-->

<!--start of php-->
<?php
$conn = new mysqli("localhost", "root", "", "shuttle_status_db");
$result = $conn->query("SELECT name, status FROM shuttles");

$statuses = [];
while ($row = $result->fetch_assoc()) {
    $statuses[$row['name']] = $row['status'];
}
$conn->close();
?>
<!--end of php-->

<!--start of html-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="5"> <!--para mag-auto refresh every 5 seconds since active / inactive won't load unless i-refresh-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>tRAMSport - Shuttle Information</title>
  <link rel="stylesheet" href="../css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    const shuttleStatus = <?php echo json_encode($statuses); ?>;
  </script>
</head>
<body>
  <div class="app-container info-page">
    <!-- Header -->
    <header class="app-header">
      <div class="logo-info"><img src="../images/tramsport-logo.png" alt="Logo"></div>
      <a href="passenger_home.html" class="home-icon">
        <img src="../images/home-button.png" alt="Home">
      </a>
    </header>
    <!-- Main content -->
    <main class="main-content">
      <div class="info-header">
        <header>Shuttle Status</header>
      </div>
      <div id="scene">
        <div id="left-zone">
          <ul class="list" id="selectionList">
          </ul>
        </div>
        <div id="middle-border"></div>
        <div id="right-zone">
          <div id="contentDisplay">
          </div>
        </div>
      </div>
      <div class="button-container">
        <span class="button-label"><b>Waiting for the shuttle?</b></span>
        <a href="gps.html" class="button primary-button active-button">Yes</a>
      </div>
    </main>
  </div>
  <script src="../js/information.js"></script>
</body>
</html>
<!--end of html-->