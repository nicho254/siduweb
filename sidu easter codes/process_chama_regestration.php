<?php
// Database connection
$servername = "localhost";
$username = "root";  // Change if using a different DB user
$password = "";  // Change if your DB has a password
$dbname = "sidu_db"; 

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get submitted Chama details
$member_names = $_POST['member_name'];
$member_ids = $_POST['member_id'];
$member_positions = $_POST['member_position'];

// Get Chama leader details (first member)
$chama_leader_name = $member_names[0];
$chama_leader_id = $member_ids[0];
$chama_leader_position = $member_positions[0];

// Insert members into the database
for ($i = 0; $i < count($member_names); $i++) {
    $name = $member_names[$i];
    $id_number = $member_ids[$i];
    $position = $member_positions[$i];

    $sql = "INSERT INTO chama_members (full_name, id_number, position) 
            VALUES ('$name', '$id_number', '$position')";

    $conn->query($sql);
}

// Email details
$admin_email = "siduinternational@gmail.com";  // Change to the real admin email
$chama_leader_email = "leader@example.com";  // Replace with actual input field for email

$subject_admin = "New Chama Registration - $chama_leader_name";
$message_admin = "Hello Sidu International,\n\nA new Chama has been registered. Here are the details:\n\n";
$message_admin .= "Chama Leader: $chama_leader_name\nID Number: $chama_leader_id\nPosition: $chama_leader_position\n\n";
$message_admin .= "Total Members: " . count($member_names) . "\n\nPlease log in to review the registration.";

$subject_leader = "Chama Registration Successful!";
$message_leader = "Dear $chama_leader_name,\n\nYour Chama registration has been received successfully.\n\n";
$message_leader .= "We will review and get back to you soon.\n\nThank you for choosing Sidu International!\n\n";

// Email headers
$headers = "From: no-reply@siduinternational.com\r\n";
$headers .= "Reply-To: siduinternational@gmail.com\r\n";

// Send emails
mail($admin_email, $subject_admin, $message_admin, $headers);
mail($chama_leader_email, $subject_leader, $message_leader, $headers);

// Success message
echo "<script>alert('Chama Registered Successfully! An email has been sent.'); window.location.href='chama-registration.html';</script>";

$conn->close();
?>