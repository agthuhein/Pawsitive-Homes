// client/src/components/admin/AdminDonationMgmt.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDonationMgmt = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalAmount, setTotalAmount] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get('/api/donations/all', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Assuming server returns { donations, total }
        setDonations(res.data.donations || []);
        setTotalAmount(res.data.total || 0);
      } catch (err) {
        console.error('Error fetching donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations(); // ✅ Call it!
  }, [token]);

  // ✅ Search filter
  const filteredDonations = donations.filter((d) => {
    const donorName = d.user
      ? `${d.user.firstName || ''} ${d.user.lastName || ''}`.toLowerCase()
      : 'guest donor';

    return (
      donorName.includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ✅ Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentDonations = filteredDonations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDonations.length / perPage);

  if (loading) return <p>Loading donations...</p>;

  return (
    <main className='main-content'>
      <h2>View Donations</h2>

      {/* Total Donations Card */}
      <div className='stat-card highlight'>
        <h3>Total Funds Collected</h3>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#28a745' }}>
          €{totalAmount.toFixed(2)}
        </p>
      </div>

      {/* Controls Row */}
      <div className='controls-row'>
        <div className='filters'>
          <input
            type='text'
            placeholder='Search by donor name or email...'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page on new search
            }}
          />
        </div>
      </div>

      {/* Table */}
      <table className='admin-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Donor</th>
            <th>Email</th>
            <th>Amount (€)</th>
            <th>Status</th>
            <th>Donated At</th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.map((d) => (
            <tr key={d._id}>
              <td data-label='ID'>
                <code className='pet-id'>
                  {'DOR_' + d._id.slice(-6).toUpperCase()}
                </code>
              </td>
              <td>
                {d.user
                  ? `${d.user.firstName || ''} ${d.user.lastName || ''}`.trim()
                  : 'Guest Donor'}
              </td>
              <td>{d.email}</td>
              <td>€{d.amount.toFixed(2)}</td>
              <td>
                {d.status === 'completed' ? (
                  <span className='badge badge-approved'>Completed</span>
                ) : (
                  <span className='badge badge-rejected'>Failed</span>
                )}
              </td>
              <td>{new Date(d.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {currentDonations.length === 0 && (
            <tr>
              <td colSpan='6' style={{ textAlign: 'center', padding: '20px' }}>
                No donations found
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

export default AdminDonationMgmt;
