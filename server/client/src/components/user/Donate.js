import React, { useEffect, useRef } from 'react';

const Donate = () => {
  const paypalRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=YOUR_REAL_SANDBOX_CLIENT_ID&currency=USD';
    script.addEventListener('load', () => {
      console.log('✅ PayPal script loaded');

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: '10.00' },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            alert(`Transaction completed by ${details.payer.name.given_name}`);
          },
        })
        .render(paypalRef.current);
    });
    document.body.appendChild(script);
  }, []);

  return (
    <main className='main-content'>
      <h2>Support Our Mission ❤️</h2>
      <p>Your donations help us feed, shelter, and care for our pets.</p>
      <div ref={paypalRef} style={{ marginTop: '20px' }} />
    </main>
  );
};

export default Donate;
