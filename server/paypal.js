const paypal = require('@paypal/checkout-server-sdk');

function paypalClient() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = (process.env.PAYPAL_MODE || 'sandbox').toLowerCase();

  const Environment =
    mode === 'live'
      ? paypal.core.LiveEnvironment
      : paypal.core.SandboxEnvironment;

  const env = new Environment(clientId, clientSecret);
  return new paypal.core.PayPalHttpClient(env);
}

module.exports = { paypalClient };
