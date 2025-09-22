// client/src/components/user/Donate.js
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function DonateButton() {
  const [amount, setAmount] = useState(10);

  const token = localStorage.getItem('token'); // JWT from your login

  return (
    <main style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🐾 Support Our Mission ❤️</h2>
      <p>Your donations help us feed, shelter, and care for our pets.</p>

      <div style={{ marginTop: '15px' }}>
        <input
          type='number'
          min='1'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '120px',
            textAlign: 'center',
          }}
        />
        <span style={{ marginLeft: '8px' }}>EUR</span>
      </div>

      <div style={{ marginTop: '20px', display: 'inline-block' }}>
        <PayPalScriptProvider
          options={{
            'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: 'EUR',
            intent: 'capture',
          }}
        >
          <PayPalButtons
            style={{ layout: 'horizontal', tagline: false, height: 45 }}
            // 1) Ask your server to create the order
            createOrder={async () => {
              const res = await fetch('/api/donations/paypal/create-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount }),
              });
              const data = await res.json();
              if (!res.ok) {
                alert(data.msg || 'Failed to create PayPal order');
                throw new Error('create-order failed');
              }
              return data.orderID;
            }}
            // 2) On approval, ask your server to capture the order
            onApprove={async (data) => {
              try {
                const res = await fetch('/api/donations/paypal/capture-order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ orderID: data.orderID }),
                });
                const json = await res.json();

                if (!res.ok) {
                  console.error('Capture error:', json);
                  alert(json.msg || 'Payment capture failed');
                  return;
                }

                alert('🎉 Thank you! Your donation was successful.');
                window.location.href = '/user/success-payment';
              } catch (err) {
                console.error(err);
                alert('Unexpected error capturing donation.');
              }
            }}
            onCancel={() => {
              window.location.href = '/user/cancel-payment';
            }}
            onError={(err) => {
              console.error('PayPal Buttons error:', err);
              alert('PayPal error occurred.');
            }}
          />
        </PayPalScriptProvider>
      </div>
    </main>
  );
}

export default DonateButton;
