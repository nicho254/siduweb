// /routes/admin.js
const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const { sendSMS, approvedMessage, rejectedMessage } = require('../utils/sms');
const authenticateAdmin = require('../middleware/authAdmin');

// Get all loan applications
router.get('/applications', authenticateAdmin, async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve or Reject loan application
router.post('/applications/:id/status', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    loan.status = status;
    await loan.save();

    const message = status === 'Approved'
      ? approvedMessage(loan.name)
      : rejectedMessage(loan.name);

    await sendSMS(loan.phone, message);

    res.json({ success: true, message: `Loan ${status.toLowerCase()} and user notified.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;