import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // ✅ Fetch current user profile
        const profileRes = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileRes.data);

        // ✅ Fetch user’s adoption requests
        const adoptionRes = await axios.get('/api/adoptions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdoptions(adoptionRes.data);
      } catch (err) {
        console.error('Error fetching user dashboard data', err);
      }
    };

    fetchData();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className='dashboard'>
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>

      <h3>Your Adoption Requests</h3>
      {adoptions.length === 0 ? (
        <p>No adoption requests yet.</p>
      ) : (
        <ul>
          {adoptions.map((req) => (
            <li key={req._id}>
              Pet: {req.pet?.name || 'Unknown'} | Status: {req.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
