import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';

const UserDashboard = () => {
  const [mine, setMine] = useState([]);
  const [donations, setDonations] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName') || 'Friend';
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        if (token) {
          const [reqs, dons, petList] = await Promise.all([
            setAuthToken.get('/api/adoption/me'),
            setAuthToken.get('/api/donations/me'),
            setAuthToken.get('/api/pets/'),
          ]);
          setMine(reqs.data);
          setDonations(dons.data);

          const availablePets = petList.data.filter(
            (p) => p.status === 'available'
          );
          setPets(availablePets.sort(() => 0.5 - Math.random()).slice(0, 3));
        }
      } catch (e) {
        console.error(e);
        Swal.fire('Error', 'Failed to load dashboard data', 'error');
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
      {/* Personalized greeting */}
      <section className='dashboard-welcome mb-8'>
        <h2>Welcome back, {userName}</h2>
        <p>Your journey of love and compassion continues here.</p>
      </section>

      {/* Quick stats */}
      <section className='stats mb-8'>
        <div className='stat-card'>
          <h3>My Requests 📋</h3>
          <p>{mine.length}</p>
        </div>
        <div className='stat-card'>
          <h3>Pending ⏳</h3>
          <p>{pendingCount}</p>
        </div>
        <div className='stat-card'>
          <h3>Total Donated ❤️</h3>
          <p>${donations.reduce((s, d) => s + d.amount, 0).toFixed(2)}</p>
        </div>
      </section>

      {/* Recent activity */}
      <section className='mb-8'>
        <h3>📌 Recent Activity</h3>
        {mine.slice(0, 2).map((req) => (
          <p key={req._id}>
            🐶 Adoption request for <strong>{req.pet?.name}</strong> —{' '}
            <em>{req.status}</em>
          </p>
        ))}
        {donations.length > 0 && (
          <p>
            💵 Last Donation: ${donations[donations.length - 1].amount} (
            {new Date(
              donations[donations.length - 1].createdAt
            ).toLocaleDateString()}
            )
          </p>
        )}
        {mine.length === 0 && donations.length === 0 && (
          <p>No recent activity yet. Start by browsing pets! 🐕🐈</p>
        )}
      </section>

      {/* Suggested pets */}
      <section className='mb-8'>
        <h3>🐕 Suggested Pets for You</h3>
        <div className='suggested-pets'>
          {pets.map((pet) => (
            <div
              key={pet._id}
              className='suggested-card'
              onClick={() => navigate(`/pets/${pet._id}`)}
            >
              <img
                src={`http://localhost:4000${pet.image}`}
                alt={pet.name}
                className='suggested-img'
              />
              <div className='suggested-info'>
                <h4>{pet.name}</h4>
                <p>
                  {pet.breed} • {pet.age}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adoption guide */}
      <section className='mb-8'>
        <h3>How Adoption Works</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Browse pets available for adoption.</li>
          <li>Submit an adoption request with your details.</li>
          <li>Our team reviews your request and updates you via email.</li>
          <li>If approved, you’ll be contacted to finalize the adoption.</li>
        </ul>
      </section>

      {/* Support */}
      <section className='mb-8'>
        <h3>Support Our Mission</h3>
        <p>
          Every donation helps us provide food, shelter, and medical care for
          pets while they wait for their forever homes.
        </p>
        <button onClick={() => navigate('/user/donate')} className='add-btn'>
          Donate Now
        </button>
      </section>

      {/* Quote */}
      <section>
        <blockquote className='dashboard-quote'>
          “Saving one pet won’t change the world, but for that one pet, the
          world will change forever.”
        </blockquote>
      </section>
    </main>
  );
};

export default UserDashboard;
