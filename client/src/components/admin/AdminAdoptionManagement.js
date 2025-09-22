import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminAdoptMgmt = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const token = localStorage.getItem('token');

  // Fetch adoption requests
  const fetchAdoptions = async () => {
    try {
      const res = await axios.get('/api/adoption', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdoptions(res.data);
    } catch (err) {
      console.error('Error fetching adoptions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, [token]);

  // Show Details in SweetAlert2
  const handleDetails = (req) => {
    Swal.fire({
      title: `Adoption Request - ${req.pet?.name}`,
      html: `
        <strong>User:</strong> ${req.firstName} ${req.lastName} <br/>
        <strong>Email:</strong> ${req.email} <br/>
        <strong>Phone:</strong> ${req.phone} <br/>
        <strong>Address:</strong> ${req.address} <br/>
        <strong>Message:</strong> ${req.message || 'N/A'} <br/>
        <hr/>
        <strong>Pet:</strong> ${req.pet?.name} (${
        req.pet?.category?.name || 'N/A'
      }) <br/>
        <strong>Status:</strong> ${req.status} <br/>
        <strong>Requested At:</strong> ${new Date(
          req.createdAt
        ).toLocaleString()}
      `,
      confirmButtonText: 'Close',
    });
  };

  // Approve request
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `/api/adoption/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await Swal.fire('Approved!', 'Adoption request approved.', 'success');
      fetchAdoptions(); // refresh list
    } catch (err) {
      Swal.fire(
        'Error',
        err.response?.data?.msg || 'Failed to approve',
        'error'
      );
    }
  };

  // Reject request
  const handleReject = async (id) => {
    try {
      await axios.put(
        `/api/adoption/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await Swal.fire('Rejected!', 'Adoption request rejected.', 'info');
      fetchAdoptions(); // refresh list
    } catch (err) {
      Swal.fire(
        'Error',
        err.response?.data?.msg || 'Failed to reject',
        'error'
      );
    }
  };

  // ✅ Filtering
  const filteredAdoptions = adoptions.filter((req) => {
    const matchesSearch =
      req.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      req.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      req.email?.toLowerCase().includes(search.toLowerCase()) ||
      req.pet?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? req.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // ✅ Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentAdoptions = filteredAdoptions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAdoptions.length / perPage);

  if (loading) return <p>Loading adoption requests...</p>;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className='badge badge-approved'>Approved</span>;
      case 'rejected':
        return <span className='badge badge-rejected'>Rejected</span>;
      case 'canceled':
        return <span className='badge badge-canceled'>Canceled</span>;
      case 'pending':
      default:
        return <span className='badge badge-pending'>Pending</span>;
    }
  };

  return (
    <main className='main-content'>
      <h2>Manage Adoption Requests</h2>

      {/* Controls Row */}
      <div className='controls-row'>
        <p></p>
        <div className='filters'>
          <input
            type='text'
            placeholder='Search by user or pet...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value=''>All Status</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
      </div>
      {/* Table */}
      <table className='admin-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Pet</th>
            <th>Status</th>
            <th>Requested At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAdoptions.map((req) => (
            <tr key={req._id}>
              <td data-label='ID'>
                <code className='pet-id'>
                  {'REQ_' + req._id.slice(-6).toUpperCase()}
                </code>
              </td>

              <td data-label='User'>{req.email}</td>
              <td data-label='Pet'>
                {req.pet?.name} ({req.pet?.category?.name || 'N/A'})
              </td>
              <td data-label='Status'>{getStatusBadge(req.status)}</td>
              <td data-label='Requested At'>
                {new Date(req.createdAt).toLocaleDateString()}
              </td>
              <td data-label='Actions'>
                <div className='action-buttons'>
                  <button
                    className='details-btn'
                    onClick={() => handleDetails(req)}
                  >
                    Details
                  </button>
                  {req.status === 'pending' && (
                    <>
                      <button
                        className='approve-btn'
                        onClick={() => handleApprove(req._id)}
                      >
                        Approve
                      </button>
                      <button
                        className='reject-btn'
                        onClick={() => handleReject(req._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {currentAdoptions.length === 0 && (
            <tr>
              <td colSpan='6' style={{ textAlign: 'center', padding: '20px' }}>
                No adoption requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default AdminAdoptMgmt;
