// /utils/sms.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID; // or use from +1234567

const client = new twilio(accountSid, authToken);

async function sendSMS(to, message) {
  try {
    const msg = await client.messages.create({
      to,
      body: message,
      messagingServiceSid
    });
    console.log('SMS sent:', msg.sid);
    return msg;
  } catch (err) {
    console.error('Failed to send SMS:', err.message);
    throw err;
  }
}

module.exports = sendSMS;