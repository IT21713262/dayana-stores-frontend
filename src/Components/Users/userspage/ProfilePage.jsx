import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import '../UserManagement.css';
import Footer from '../common/Footer';
import NavBar from '../../NavBar'

import UserNavbar from '../common/UserNavbar';
function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error('Error fetching profile information:', error);
    }
  };

  return (
    <>
    <NavBar/>
    <UserNavbar/>
    <div className="profile-page-container">
      <h2>Profile Information</h2>
      <p>Name: {profileInfo.name}</p>
      <p>Email: {profileInfo.email}</p>
      <p>City: {profileInfo.city}</p>
      {profileInfo.role === "ADMIN" && (
        <button className="profile-update-button">
          <Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link>
        </button>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default ProfilePage;
