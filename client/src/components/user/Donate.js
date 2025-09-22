import React, { useState } from 'react';

function DonateButton() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(10); // default donation $10

  const handleDonate = async () => {
    if (!email) {
      alert('Please enter your email so we can send you a receipt.');
      return;
    }

    try {
      const res = await fetch(
        'http://localhost:4000/api/create-checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, email }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      alert('Error creating checkout session');
    }
  };

  return (
    <main style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🐾 Support Our Mission ❤️</h2>
      <p>Your donations help us feed, shelter, and care for our pets.</p>

      <div style={{ marginTop: '20px' }}>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '250px',
          }}
        />
      </div>

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
        <span style={{ marginLeft: '8px' }}>USD</span>
      </div>

      <button
        onClick={handleDonate}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          background: '#635bff', // Stripe purple
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Donate
      </button>
    </main>
  );
}

export default DonateButton;
