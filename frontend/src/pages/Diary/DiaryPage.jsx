import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Heart, PenTool, Smile, Star, Calendar } from 'lucide-react';

const DiaryPage = () => {
    const [journals, setJournals] = useState([]);
    const [gratitude, setGratitude] = useState([]);
    const token = localStorage.getItem('token');

    const getJournalData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:8000/api/users/journals',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setJournals(response.data);
        } catch (error) {
            console.error('Error fetching journal data:', error);
        }
    };

    const getGratitudeData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:8000/api/users/gratitude',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGratitude(response.data);
        } catch (error) {
            console.error('Error fetching gratitude data:', error);
        }
    };

    useEffect(() => {
        getJournalData();
        getGratitudeData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-teal-600 mb-4">Your Diary & Gratitude Entries</h1>
                <p className="text-lg text-gray-600">
                    Reflect on your thoughts and express gratitude for the little things in life.
                </p>
            </div>

            {/* Journal Entries Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-teal-600 mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" /> Journal Entries
                </h2>
                <div className="space-y-4">
                    {journals.map((journal, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-2 text-gray-700 mb-2">
                                <PenTool className="w-5 h-5" />
                                <span className="font-medium">Entry {index + 1}</span>
                            </div>
                            <p className="text-gray-600">{journal}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gratitude Entries Section */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-teal-600 mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6" /> Gratitude Entries
                </h2>
                <div className="space-y-4">
                    {gratitude.map((entry, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-2 text-gray-700 mb-2">
                                <Smile className="w-5 h-5" />
                                <span className="font-medium">Gratitude {index + 1}</span>
                            </div>
                            <p className="text-gray-600">{entry}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiaryPage;
