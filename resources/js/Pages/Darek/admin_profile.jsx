import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import './style.css'
function AdminProfile({ adminData }) {


  return (
    <div className="container">
      <h1 id='adminh1'>Admin Profile</h1>
      <div id="profile-info">
        <p><strong>Name:</strong><span > {adminData.name}</span></p>
        <p><strong>Email:</strong> <span>{adminData.email}</span></p>
        <p><strong>Username:</strong> <span>{adminData.username}</span></p>
      </div>
    </div>
  );
}

export default AdminProfile;
