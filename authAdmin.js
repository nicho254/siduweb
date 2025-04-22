// /routes/authAdmin.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const session = require('express-session');

// Register admin
router.post('/admin-register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Username already exists' });

    const admin = new Admin({ username, password });
    await admin.save();
    res.json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login admin
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    req.session.adminId = admin._id;

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;