<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sidu_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve Form Data
$full_name = $_POST['full_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$location = $_POST['location'];
$next_kin = $_POST['next_kin'];
$next_kin_phone = $_POST['next_kin_phone'];
$loan_amount = $_POST['loan_amount'];
$loan_duration = $_POST['loan_duration'];

// File Upload Handling
$id_front = $_FILES['id_front']['name'];
$id_back = $_FILES['id_back']['name'];
$selfie = $_FILES['selfie']['name'];
$title_deed = $_FILES['title_deed']['name'];

$upload_dir = "uploads/";
move_uploaded_file($_FILES['id_front']['tmp_name'], $upload_dir . $id_front);
move_uploaded_file($_FILES['id_back']['tmp_name'], $upload_dir . $id_back);
move_uploaded_file($_FILES['selfie']['tmp_name'], $upload_dir . $selfie);
move_uploaded_file($_FILES['title_deed']['tmp_name'], $upload_dir . $title_deed);

// Store in Database
$sql = "INSERT INTO title_deed_loans (full_name, email, phone, location, next_kin, next_kin_phone, loan_amount, loan_duration, id_front, id_back, selfie, title_deed) 
VALUES ('$full_name', '$email', '$phone', '$location', '$next_kin', '$next_kin_phone', '$loan_amount', '$loan_duration', '$id_front', '$id_back', '$selfie', '$title_deed')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Loan Application Submitted Successfully!'); window.location.href='title-deed-loan.html';</script>";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>