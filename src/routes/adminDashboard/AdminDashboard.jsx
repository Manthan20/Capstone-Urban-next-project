import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.scss';

function AdminDashboard() {
  const { role } = useAuth();
  const [users, setUsers] = useState([]); // State to hold users
  const [loading, setLoading] = useState(true); // State to handle loading

  // Check if user is admin before fetching users
  useEffect(() => {
    if (role === 'admin') {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/users');
          setUsers(response.data); // Set users from the response
        } catch (error) {
          console.error('Error fetching users:', error);
          alert('Failed to fetch users.'); // Handle error
        } finally {
          setLoading(false); // Set loading to false once done
        }
      };

      fetchUsers();
    } else {
      setLoading(false); // If not admin, stop loading
    }
  }, [role]);

  // Loading state
  if (loading) {
    return <p>Loading users...</p>;
  }

  // Access denied if not admin
  if (role !== 'admin') {
    return <h2>Access denied: You do not have permission to view this page.</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
