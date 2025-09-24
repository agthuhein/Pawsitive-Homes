import React from 'react';

function SuccessPayment() {
  return (
    <main style={{ textAlign: 'center', marginTop: '60px', padding: '20px' }}>
      <h2 style={{ fontSize: '28px', color: '#2e7d32', marginBottom: '20px' }}>
        ✅ Thank You for Your Kindness!
      </h2>

      <p
        style={{
          fontSize: '18px',
          maxWidth: '650px',
          margin: '0 auto',
          lineHeight: '1.8',
          color: '#444',
        }}
      >
        Your generous donation has made a <strong>real difference</strong> in
        the lives of our rescued pets. Because of your support, they will
        receive <em>warm shelter, healthy meals, and vital medical care</em>
        while waiting for their forever homes. 🐾
      </p>

      <p
        style={{
          fontSize: '18px',
          maxWidth: '650px',
          margin: '20px auto 0',
          lineHeight: '1.8',
          color: '#444',
        }}
      >
        From wagging tails to gentle purrs, every happy moment is possible
        because of kind people like you. Thank you for being part of our mission
        to give these animals <strong>love and hope</strong>. ❤️
      </p>

      <div style={{ marginTop: '40px' }}>
        <a
          href='/user/dashboard'
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#1a083d',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Go to My Dashboard
        </a>
      </div>
    </main>
  );
}

export default SuccessPayment;
