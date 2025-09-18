import { Link, useNavigate } from 'react-router-dom';

const AdminUserMgmt = () => {
  const navigate = useNavigate();

  return (
    <main class='main-content'>
      <h2>Manage Users</h2>

      <table class='admin-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>jane@example.com</td>
            <td>Jane Doe</td>
            <td>User</td>
            <td>
              <button class='promote-btn'>Promote to Admin</button>
              <button class='delete-btn'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>admin@example.com</td>
            <td>Admin User</td>
            <td>Admin</td>
            <td>
              <button class='demote-btn'>Demote to User</button>
              <button class='delete-btn'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
export default AdminUserMgmt;
