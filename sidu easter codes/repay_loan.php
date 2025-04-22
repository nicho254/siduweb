<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $loan_id = $_POST['loan_id'];
    $payment_amount = $_POST['payment_amount'];
    $payment_method = $_POST['payment_method'];

    // Insert repayment
    $sql = "INSERT INTO loan_repayments (loan_id, payment_amount, payment_method) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ids", $loan_id, $payment_amount, $payment_method);

    if ($stmt->execute()) {
        // Update outstanding balance
        $sql_balance = "UPDATE outstanding_balances SET amount_paid = amount_paid + ?, balance = total_loan - amount_paid WHERE loan_id = ?";
        $stmt_balance = $conn->prepare($sql_balance);
        $stmt_balance->bind_param("di", $payment_amount, $loan_id);
        $stmt_balance->execute();
        $stmt_balance->close();

        echo "Payment recorded successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>