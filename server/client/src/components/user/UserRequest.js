import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/adoption/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to load your requests', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cancelRequest = async (id) => {
    const confirm = await Swal.fire({
      title: 'Cancel Request?',
      text: 'Are you sure you want to cancel this adoption request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/adoption/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire('Canceled', 'Your request was canceled', 'success');
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not cancel request', 'error');
    }
  };

  if (loading) return <p>Loading your requests...</p>;

  // ✅ Filtering
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.pet?.name?.toLowerCase().includes(search.toLowerCase()) ||
      req.status?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? req.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // ✅ Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / perPage);

  // ✅ Status badge
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
      <h2>My Adoption Requests</h2>

      {/* Controls Row */}
      <div className='controls-row'>
        <p></p>
        <div className='filters'>
          <input
            type='text'
            placeholder='Search by pet or status...'
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
            <option value='canceled'>Canceled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className='admin-table'>
        <thead>
          <tr>
            <th>Pet</th>
            <th>Status</th>
            <th>Requested On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.length > 0 ? (
            currentRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.pet?.name || '—'}</td>
                <td>{getStatusBadge(req.status)}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>
                  {req.status === 'pending' && (
                    <button
                      className='delete-btn'
                      onClick={() => cancelRequest(req._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='4'>You have no adoption requests yet.</td>
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

export default UserRequest;
