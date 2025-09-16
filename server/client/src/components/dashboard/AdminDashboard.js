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
    <div className='dashboard'>
      <h2>Admin Dashboard</h2>

      <h3>Summary</h3>
      <p>Total Pets: {stats.totalPets}</p>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Adoptions: {stats.totalAdoptions}</p>

      <h3>All Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
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
      )}
    </div>
  );
};

export default AdminDashboard;
