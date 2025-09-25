import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircleDollarSign, Plus, Heart, Users, Target } from 'lucide-react';

const Fundraisings = () => {
  const [fundraisings, setFundraisings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFundraisings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/fundraising');
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setFundraisings(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching fundraisings:', error);
        setError('Error fetching fundraisings');
      } finally {
        setLoading(false);
      }
    };

    fetchFundraisings();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fundraising Campaigns
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Support meaningful causes and make a difference in people's lives
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/add-fundraising"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{fundraisings.length}</div>
            <div className="text-gray-600">Active Campaigns</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              NPR {fundraisings.reduce((sum, f) => sum + f.target, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Target</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <CircleDollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              NPR {fundraisings.reduce((sum, f) => sum + f.currentAmount, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Raised</div>
          </div>
        </motion.div>

        {/* Campaigns Grid */}
        {fundraisings.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No campaigns yet</h3>
            <p className="text-gray-500 mb-6">Be the first to create a fundraising campaign!</p>
            <Link
              to="/add-fundraising"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create First Campaign
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {fundraisings.map((fundraising, index) => (
              <motion.div
                key={fundraising._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <Link to={`/fundraisings/${fundraising._id}`} className="block">
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${fundraising.image}`}
                      alt={fundraising.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-700">
                        {Math.round((fundraising.currentAmount / fundraising.target) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{fundraising.title}</h2>
                    <p className="text-gray-600 text-sm mb-3">
                      by {fundraising.organizer ? fundraising.organizer.fullName : 'Unknown Organizer'}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CircleDollarSign className="text-green-500 w-5 h-5" />
                          <span className="text-sm text-gray-600">Raised</span>
                        </div>
                        <span className="font-semibold text-gray-800">
                          NPR {fundraising.currentAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="text-blue-500 w-5 h-5" />
                          <span className="text-sm text-gray-600">Target</span>
                        </div>
                        <span className="font-semibold text-gray-800">
                          NPR {fundraising.target.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-teal-400 to-green-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (fundraising.currentAmount / fundraising.target) * 100)}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <span className="text-sm text-gray-500">
                        {fundraising.description.length > 100
                          ? `${fundraising.description.substring(0, 100)}...`
                          : fundraising.description
                        }
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Fundraisings;