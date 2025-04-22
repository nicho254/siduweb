// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  kyc: {
    idNumber: String,
    kraPin: String,
    selfie: String,
    logbook: String,
    carColor: String,
    numberPlate: String,
    mileage: String
  },
  mpesaPaymentVerified: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);