// /routes/adminApplications.js const express = require('express'); const router = express.Router(); const authenticateAdmin = require('../middleware/authAdmin'); const LoanApplication = require('../models/LoanApplication'); const sendSMS = require('../utils/sms');

// Get all loan applications router.get('/applications', authenticateAdmin, async (req, res) => { try { const loans = await LoanApplication.find(); res.json(loans); } catch (err) { res.status(500).json({ error: 'Server error' }); } });

// Update application status router.post('/applications/:id/status', authenticateAdmin, async (req, res) => { const { id } = req.params; const { status } = req.body; try { const loan = await LoanApplication.findByIdAndUpdate(id, { status }, { new: true }); if (loan) { await sendSMS(loan.phone, Hello ${loan.name}, your loan application has been ${status}.); res.json({ message: 'Status updated', loan }); } else { res.status(404).json({ error: 'Loan not found' }); } } catch (err) { res.status(500).json({ error: 'Server error' }); } });

module.exports = router;