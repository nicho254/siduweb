// 📊 Loan Calculator Function
function calculateLoan() {
    let amount = document.getElementById('amount').value;
    let interest = document.getElementById('interest').value;
    let months = document.getElementById('months').value;
    
    if (amount && interest && months) {
        let monthlyRate = (interest / 100) / 12;
        let monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        document.getElementById('result').innerText = `Monthly Payment: Ksh ${monthlyPayment.toFixed(2)}`;
    } else {
        alert("Please fill all fields!");
    }
}

// 💬 Chat Toggle
document.getElementById('chat-toggle').addEventListener('click', function () {
    document.getElementById('chat-box').style.display = 'flex';
});

// ✖ Close Chat
document.getElementById('close-chat').addEventListener('click', function () {
    document.getElementById('chat-box').style.display = 'none';
});

// 📩 Send Chat Message
document.getElementById('send-chat').addEventListener('click', function () {
    let message = document.getElementById('chat-input').value;
    if (message.trim() !== '') {
        let chatBody = document.querySelector('.chat-body');
        let newMessage = document.createElement('p');
        newMessage.textContent = `You: ${message}`;
        chatBody.appendChild(newMessage);
        document.getElementById('chat-input').value = '';
    }
});