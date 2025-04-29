const mongoose = require('mongoose');

const BiasharaLoanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: String,
  businessType: String,
  amountRequested: Number,
  repaymentPeriod: String,
  documents: [String], // file paths or URLs
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BiasharaLoan', BiasharaLoanSchema);