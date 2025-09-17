import React, { useEffect, useState } from 'react';
import setAuthToken from '../../utils/setAuthToken';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch dashboard stats
        const statsRes = await setAuthToken.get('/api/admin/dashboard');
        setStats(statsRes.data);

        // ✅ Fetch users
        const usersRes = await setAuthToken.get('/api/admin/users');
        setUsers(usersRes.data);
      } catch (err) {
        console.error(
          '❌ Error fetching admin dashboard data:',
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>Failed to load dashboard data.</p>;

  return (
    <main className='main-content'>
      <section className='dashboard-welcome'>
        <h2>Welcome back, Admin 👋</h2>
        <p>Here’s a quick overview of the system stats.</p>
      </section>

      <section className='stats'>
        <div className='stat-card'>
          <h3>Total Pets</h3>
          <p>{stats.totalPets}</p>
        </div>
        <div className='stat-card'>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className='stat-card'>
          <h3>Total Adoptions</h3>
          <p>95</p>
        </div>
        <div className='stat-card'>
          <h3>Pending Requests</h3>
          <p>12</p>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
