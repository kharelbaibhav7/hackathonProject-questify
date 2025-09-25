import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User, Book, Activity, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios({
                    method: "get",
                    url: "http://localhost:8000/api/users/profile",
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch user data");
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchUser();
        } else {
            navigate('/login');
        }
    }, [token, navigate]);

    const LoadingSpinner = () => (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }


    const ErrorMessage = ({ message }) => (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{message}</p>
            </div>
        </div>
    );

    const ProfileHeader = ({ user }) => (
        <motion.div
            className="bg-white shadow-lg rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <User size={50} className="text-blue-500" />
            </motion.div>

            <motion.h2
                className="text-2xl font-semibold text-gray-800 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                {user?.name}
            </motion.h2>

            <motion.p
                className="text-gray-600 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
            >
                {user?.email}
            </motion.p>
        </motion.div>
    );

    const PersonalInfo = ({ user }) => (
        <motion.div
            className="bg-white shadow-sm rounded-xl p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
                <InfoItem icon={<User size={20} />} label="Age" value={user?.age} />
                <InfoItem icon={<Activity size={20} />} label="Profession" value={user?.profession} />
            </div>
        </motion.div>
    );

    const AchievementsCard = ({ user }) => (
        <motion.div
            className="bg-white shadow-sm rounded-xl p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-4">
                <InfoItem icon={<Award size={20} />} label="Score" value={user?.score} />
                <InfoItem icon={<Clock size={20} />} label="Time Spent" value={`${user?.timeSpent || 0} minutes`} />
                <InfoItem
                    icon={<Activity size={20} />}
                    label="Meditation Sessions"
                    value={user?.meditation}
                />
            </div>
        </motion.div>
    );

    const InfoItem = ({ icon, label, value }) => (
        <div className="flex items-center space-x-3 text-gray-700">
            <span className="text-teal-500">{icon}</span>
            <span className="font-medium">{label}:</span>
            <span>{value || 'N/A'}</span>
        </div>
    );

    const DiaryButton = () => (
        <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <button
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-200"
                onClick={() => navigate('/my-diary')}>
                <Book className="mr-2" size={20} />
                Open Diary
            </button>
        </motion.div >
    );


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Profile Header */}
                <ProfileHeader user={user} />

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PersonalInfo user={user} />
                    <AchievementsCard user={user} />
                </div>

                {/* Diary Button */}
                <DiaryButton />
            </div>
        </div>
    );
};

export default MyProfilePage;
