import React, { useEffect, useState } from 'react';
import setAuthToken from '../../utils/setAuthToken';

const UserDashboard = () => {
  const [mine, setMine] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      try {
        if (token) {
          const [reqs, dons] = await Promise.all([
            setAuthToken.get('/api/adoption/me'),
            setAuthToken.get('/api/donations/me'),
          ]);
          setMine(reqs.data);
          setDonations(dons.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  if (loading) return <p>Loading...</p>;

  const pendingCount = mine.filter((m) => m.status === 'pending').length;

  return (
    <main className='main-content'>
      <section className='dashboard-welcome mb-8'>
        <h2>Welcome 👋</h2>
        <p>
          Find your new best friend, track your adoption requests, and support
          our mission.
        </p>
      </section>

      {/* Quick stats */}
      <section className='stats mb-8'>
        <div className='stat-card'>
          <h3>My Requests</h3>
          <p>{mine.length}</p>
        </div>
        <div className='stat-card'>
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>
        <div className='stat-card'>
          <h3>Total Donated</h3>
          <p>${donations.reduce((s, d) => s + d.amount, 0).toFixed(2)}</p>
        </div>
      </section>

      {/* Adoption guide */}
      <section className='mb-8'>
        <h3>🐾 How Adoption Works</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Browse pets available for adoption.</li>
          <li>Submit an adoption request with your details.</li>
          <li>Our team reviews your request and updates you via email.</li>
          <li>If approved, you’ll be contacted to finalize the adoption.</li>
        </ul>
      </section>

      {/* Pending requests summary */}
      <section className='mb-8'>
        <h3>📌 Pending Requests</h3>
        {pendingCount > 0 ? (
          <p>
            You currently have <strong>{pendingCount}</strong> pending request
            {pendingCount > 1 ? 's' : ''}. We’ll notify you once there’s an
            update.
          </p>
        ) : (
          <p>You don’t have any pending requests right now.</p>
        )}
      </section>

      {/* Donation info */}
      <section className='mb-8'>
        <h3>❤️ Support Our Mission</h3>
        <p>
          Every donation helps us provide food, shelter, and medical care for
          pets while they wait for their forever homes.
        </p>
        <button
          onClick={() => (window.location.href = '/user/donate')}
          className='add-btn'
        >
          Donate Now
        </button>
      </section>
    </main>
  );
};

export default UserDashboard;
