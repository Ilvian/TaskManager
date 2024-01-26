import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const token = localStorage.getItem('jwtToken');
    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error.response.data.error);
            }
        };

        fetchUserProfile();
    }, [token]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <strong>Name:</strong> {userProfile.Name}
            </div>
            <div>
                <strong>Email:</strong> {userProfile.Email}
            </div>
            <div>
                <strong>Is Admin:</strong> {userProfile.isAdmin ? 'Yes' : 'No'}
            </div>
        </div>
    );
};

export default UserProfile;