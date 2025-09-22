import React, { useEffect, useState } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#5cb85c', '#d9534f', '#f0ad4e']; // Approved, Rejected, Pending

// Helper to capitalize first letter
const formatName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [adoptionTrends, setAdoptionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await setAuthToken.get('/api/admin/dashboard');
        setStats(statsRes.data);

        const usersRes = await setAuthToken.get('/api/admin/users');
        setUsers(usersRes.data.slice(0, 5));

        const trendsRes = await setAuthToken.get('/api/admin/adoption-trends');
        setAdoptionTrends(trendsRes.data.slice(-3)); // ✅ last 3 months
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

  const pieData = [
    { name: 'Approved', value: stats.approvedRequests },
    { name: 'Rejected', value: stats.rejectedRequests },
    { name: 'Pending', value: stats.pendingRequests },
  ];

  return (
    <main className='main-content'>
      <section className='dashboard-welcome mb-8'>
        <h2>
          Welcome back,{' '}
          {stats?.admin?.firstName
            ? formatName(stats.admin.firstName)
            : 'Admin'}{' '}
          👋
        </h2>
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
        <div className='stat-card'>
          <h3>Total Funds Collected</h3>
          <p>€{stats.totalDonations}</p>
        </div>
      </section>

      {/* ✅ Adoption Trends Charts */}
      <section className='adoption-trends mb-8'>
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Adoption Trends (Last 3 Months)
        </h3>
        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Bar Chart */}
          <ResponsiveContainer width='60%' height={300}>
            <BarChart data={adoptionTrends}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis
                domain={[0, 'dataMax + 5']}
                ticks={[0, 5, 10, 15, 20, 25, 30]}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='pending'
                name='Pending'
                fill='#f0ad4e'
                barSize={30}
              />
              <Bar
                dataKey='approved'
                name='Approved'
                fill='#5cb85c'
                barSize={30}
              />
              <Bar
                dataKey='rejected'
                name='Rejected'
                fill='#d9534f'
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Pie Chart */}
          <ResponsiveContainer width='40%' height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
                <td>
                  {`${
                    u.firstName.charAt(0).toUpperCase() + u.firstName.slice(1)
                  } 
    ${u.lastName.charAt(0).toUpperCase() + u.lastName.slice(1)}`}
                </td>
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
