<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sidu_loans_db";

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$full_name = $_POST['full_name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$id_number = $_POST['id_number'];

// Insert into database
$sql = "INSERT INTO customers (full_name, phone, email, id_number) VALUES ('$full_name', '$phone', '$email', '$id_number')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Customer Registered Successfully!'); window.location.href='register_customer.html';</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>