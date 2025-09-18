import { Link, useNavigate } from 'react-router-dom';

const AdminAdoptMgmt = () => {
  const navigate = useNavigate();

  return (
    <main class='main-content'>
      <h2>Manage Adoption Requests</h2>

      <table class='admin-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Pet</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>201</td>
            <td>john@example.com</td>
            <td>Mina (Cat)</td>
            <td>Pending</td>
            <td>
              <button class='approve-btn'>Approve</button>
              <button class='reject-btn'>Reject</button>
            </td>
          </tr>
          <tr>
            <td>202</td>
            <td>emma@example.com</td>
            <td>Zazu (Dog)</td>
            <td>Approved</td>
            <td>
              <button class='reject-btn'>Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default AdminAdoptMgmt;
