<?php
// Connect to Database
$conn = new mysqli("localhost", "root", "", "sidu_db");

// Check Connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get Form Data
$name = $_POST['name'];
$phone = $_POST['phone'];
$loan_type = $_POST['loan_type'];

// Upload Files
$id_file = $_FILES['id_upload']['name'];
$kra_file = $_FILES['kra_upload']['name'];
$extra_file = $_FILES['extra_doc']['name'];

$target_dir = "uploads/";
move_uploaded_file($_FILES['id_upload']['tmp_name'], $target_dir.$id_file);
move_uploaded_file($_FILES['kra_upload']['tmp_name'], $target_dir.$kra_file);
move_uploaded_file($_FILES['extra_doc']['tmp_name'], $target_dir.$extra_file);

// Insert into Database
$sql = "INSERT INTO loans (name, phone, loan_type, id_file, kra_file, extra_file) VALUES ('$name', '$phone', '$loan_type', '$id_file', '$kra_file', '$extra_file')";

if ($conn->query($sql) === TRUE) {
    echo "Loan application submitted successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>