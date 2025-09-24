import React from 'react';

function CancelPayment() {
  return (
    <main style={{ textAlign: 'center', marginTop: '60px', padding: '20px' }}>
      <h2 style={{ fontSize: '28px', color: '#d32f2f', marginBottom: '20px' }}>
        ❌ Payment Canceled
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
        It looks like your donation wasn’t completed. That’s okay — sometimes
        plans change. But remember, every small contribution helps us provide{' '}
        <strong>food, shelter, and medical care</strong>
        to the pets who need it most. 🐾
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
        If you’d like, you can try again anytime and become part of our mission
        to give these animals
        <em>a second chance at life and love</em>. ❤️
      </p>

      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <a
          href='/user/donate'
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'blue',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Try Again
        </a>

        <a
          href='/user/dashboard'
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#1a083d',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Back to Dashboard
        </a>
      </div>
    </main>
  );
}

export default CancelPayment;
