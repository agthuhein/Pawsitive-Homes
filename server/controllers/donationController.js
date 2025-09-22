const Donation = require('../models/Donation');
const { sendMail } = require('../utils/mailer');
const { paypalClient } = require('../paypal');
const paypal = require('@paypal/checkout-server-sdk');

// Create a PayPal order (server-side)
exports.createPaypalOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ msg: 'Invalid amount' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: 'Pet Donation 🐶',
          amount: {
            currency_code: 'EUR',
            value: Number(amount).toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'Pawsitive Home',
        user_action: 'PAY_NOW',
      },
    });

    const client = paypalClient();
    const order = await client.execute(request);

    return res.json({ orderID: order.result.id });
  } catch (err) {
    console.error('❌ PayPal create order error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Capture a PayPal order (server-side) -> save donation + send email
exports.capturePaypalOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    if (!orderID) return res.status(400).json({ msg: 'Missing orderID' });

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const client = paypalClient();
    const capture = await client.execute(request);

    const status = capture.result.status; // should be "COMPLETED"
    const unit = capture.result.purchase_units[0];
    const captureObj = unit.payments.captures[0];

    const amountValue = parseFloat(captureObj.amount.value); // string -> number
    const payerEmail =
      req.user?.email ||
      capture.result?.payer?.email_address ||
      unit?.payee?.email_address;

    if (status !== 'COMPLETED') {
      return res
        .status(400)
        .json({ msg: `Capture not completed. Status: ${status}` });
    }

    // Save to MongoDB
    const donation = await Donation.create({
      user: req.user?.id || null,
      email: payerEmail,
      amount: amountValue,
      paypalOrderId: orderID,
      status: 'completed',
    });

    // Send thank-you email from YOUR SMTP
    await sendMail({
      to: payerEmail,
      subject: 'Thank you for your donation 💛',
      html: `
        <p>Hi ${req.user?.firstName || 'there'},</p>
        <p>We received your donation of <strong>$${amountValue.toFixed(
          2
        )}</strong>.</p>
        <p>Your kindness helps us feed, shelter, and care for pets 🐾.</p>
        <p>With gratitude,<br/>The Pawsitive Homes Team</p>
      `,
    });

    return res.json({
      msg: 'Donation captured',
      donation,
      capture: capture.result,
    });
  } catch (err) {
    console.error('❌ PayPal capture error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// (Optional) keep if you want to see your own donations
exports.getMine = async (req, res) => {
  try {
    const list = await Donation.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(list);
  } catch (e) {
    console.error('❌ getMine error:', e.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
