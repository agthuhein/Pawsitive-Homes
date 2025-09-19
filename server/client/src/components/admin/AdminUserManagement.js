import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminUserMgmt = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promoteUser = async (id) => {
    try {
      await axios.put(
        `/api/users/${id}/promote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire('Success', 'User promoted to admin', 'success');
      fetchUsers();
    } catch (err) {
      Swal.fire(
        'Error',
        err.response?.data?.msg || 'Failed to promote',
        'error'
      );
    }
  };

  const demoteUser = async (id) => {
    try {
      await axios.put(
        `/api/users/${id}/demote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire('Success', 'User demoted to user', 'success');
      fetchUsers();
    } catch (err) {
      Swal.fire(
        'Error',
        err.response?.data?.msg || 'Failed to demote',
        'error'
      );
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You can only delete users inactive for 2 years!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Deleted!', 'User deleted successfully', 'success');
        fetchUsers();
      } catch (err) {
        Swal.fire(
          'Error',
          err.response?.data?.msg || 'Failed to delete',
          'error'
        );
      }
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <main className='main-content'>
      <h2>Manage Users</h2>
      <table className='admin-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id.slice(-6).toUpperCase()}</td>
              <td>{u.email}</td>
              <td>
                {u.firstName} {u.lastName}
              </td>
              <td>{u.role}</td>
              <td>{new Date(u.lastLogin).toLocaleDateString()}</td>
              <td>
                {u.role === 'user' && (
                  <button
                    className='promote-btn'
                    onClick={() => promoteUser(u._id)}
                  >
                    Promote
                  </button>
                )}
                {u.role === 'admin' && (
                  <button
                    className='demote-btn'
                    onClick={() => demoteUser(u._id)}
                  >
                    Demote
                  </button>
                )}
                <button
                  className='delete-btn'
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan='6' style={{ textAlign: 'center' }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default AdminUserMgmt;
