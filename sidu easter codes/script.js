document.addEventListener("DOMContentLoaded", function() {
    let amountInput = document.getElementById("loanAmount");
    let durationInput = document.getElementById("loanDuration");
    let monthlyPaymentDisplay = document.getElementById("monthlyPayment");

    function calculateLoan() {
        let amount = parseFloat(amountInput.value) || 0;
        let duration = parseInt(durationInput.value) || 1;
        let interestRate = 0.1; // 10% per month
        let monthlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -duration));
        monthlyPaymentDisplay.textContent = monthlyPayment.toFixed(2);
    }

    amountInput.addEventListener("input", calculateLoan);
    durationInput.addEventListener("input", calculateLoan);
});