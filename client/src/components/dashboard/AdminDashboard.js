import React, { useEffect, useState } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [adoptionTrends, setAdoptionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await setAuthToken.get('/api/admin/dashboard');
        setStats(statsRes.data);

        const usersRes = await setAuthToken.get('/api/admin/users');
        setUsers(usersRes.data.slice(0, 5));

        const trendsRes = await setAuthToken.get('/api/admin/adoption-trends');
        setAdoptionTrends(trendsRes.data);
      } catch (err) {
        console.error(
          'Error fetching dashboard:',
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
      <section className='dashboard-welcome mb-8'>
        <h2>Welcome back, Admin 👋</h2>
        <p>Here’s a quick overview of the system stats.</p>
      </section>

      <section className='stats mb-8'>
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
          <p>{stats.totalAdoptions}</p>
        </div>
        <div className='stat-card'>
          <h3>Pending Requests</h3>
          <p>{stats.pendingRequests}</p>
        </div>
        <div className='stat-card'>
          <h3>Total Funds Collected</h3>
          <p>€{stats.totalDonations}</p>
        </div>
      </section>

      <section className='stats breakdown mb-8'>
        <div className='stat-card'>
          <h3>Approved</h3>
          <p>{stats.approvedRequests}</p>
        </div>
        <div className='stat-card'>
          <h3>Rejected</h3>
          <p>{stats.rejectedRequests}</p>
        </div>
      </section>

      <section className='adoption-trends mb-8'>
        <h3>Adoption Trends</h3> <br />
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={adoptionTrends}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='pending' stroke='#f0ad4e' />
            <Line type='monotone' dataKey='approved' stroke='#5cb85c' />
            <Line type='monotone' dataKey='rejected' stroke='#d9534f' />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className='latest-users mb-8'>
        <h3>Newly Registered Users</h3>
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default AdminDashboard;
