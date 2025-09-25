import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircleDollarSign, Phone, ArrowLeft, Heart, Target, CheckCircle, AlertCircle, Share2 } from 'lucide-react';

const SpecificFundraisings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fundraising, setFundraising] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState("");
    const [donationLoading, setDonationLoading] = useState(false);
    const [donationSuccess, setDonationSuccess] = useState(false);

    useEffect(() => {
        const fetchFundraising = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/fundraising/${id}`);
                console.log('API Response:', response.data);
                setFundraising(response.data);
            } catch (error) {
                console.error('Error fetching fundraising details:', error);
                setError('Error fetching fundraising details');
            } finally {
                setLoading(false);
            }
        };

        fetchFundraising();
    }, [id]);

    const handleDonate = async () => {
        if (!amount || amount <= 0) {
            alert('Please enter a valid donation amount');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert('Please login to make a donation');
            return;
        }

        setDonationLoading(true);

        try {
            const result = await axios.post(
                `http://localhost:8000/api/fundraising/${id}/donate`,
                { amount: Number(amount) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setDonationSuccess(true);
            setFundraising(prev => ({
                ...prev,
                currentAmount: result.data.currentAmount
            }));
            setAmount("");
            setShowForm(false);

            setTimeout(() => {
                setDonationSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Error making donation:', error);
            alert(error.response?.data?.message || 'Donation failed. Please try again.');
        } finally {
            setDonationLoading(false);
        }
    };

    const shareCampaign = () => {
        if (navigator.share) {
            navigator.share({
                title: fundraising.title,
                text: fundraising.description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Campaign link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading campaign details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => navigate("/fundraisings")}
                        className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        Back to Campaigns
                    </button>
                </div>
            </div>
        );
    }

    if (!fundraising) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Campaign not found</p>
                </div>
            </div>
        );
    }

    const progressPercentage = Math.min(100, (fundraising.currentAmount / fundraising.target) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="relative">
                        <img
                            src={`http://localhost:8000${fundraising.image}`}
                            alt={fundraising.title}
                            className="w-full h-64 md:h-80 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <button
                                onClick={() => navigate("/fundraisings")}
                                className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={shareCampaign}
                                className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-sm font-semibold text-gray-700">
                                {Math.round(progressPercentage)}% Funded
                            </span>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Title and Organizer */}
                        <div className="mb-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{fundraising.title}</h1>
                            <p className="text-lg text-gray-600">
                                by <span className="font-semibold text-teal-600">{fundraising.organizer ? fundraising.organizer.fullName : 'Unknown Organizer'}</span>
                            </p>
                        </div>

                        {/* Progress Section */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <CircleDollarSign className="text-green-500 w-6 h-6" />
                                        <span className="text-sm font-semibold text-gray-600">Raised</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        NPR {fundraising.currentAmount.toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Target className="text-blue-500 w-6 h-6" />
                                        <span className="text-sm font-semibold text-gray-600">Target</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        NPR {fundraising.target.toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Heart className="text-red-500 w-6 h-6" />
                                        <span className="text-sm font-semibold text-gray-600">Progress</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        {Math.round(progressPercentage)}%
                                    </div>
                                </div>
                            </div>

                            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                                <motion.div
                                    className="bg-gradient-to-r from-teal-400 to-green-500 h-3 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex items-center gap-2 mb-6 p-4 bg-blue-50 rounded-lg">
                            <Phone className="text-blue-500 w-5 h-5" />
                            <span className="text-gray-700">
                                <span className="font-semibold">Contact:</span> {fundraising.phoneNumber}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">About This Campaign</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">{fundraising.description}</p>
                        </div>

                        {/* Donation Section */}
                        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-6 text-white">
                            <h3 className="text-2xl font-bold mb-4">Support This Cause</h3>

                            {donationSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-4 bg-green-500/20 border border-green-400 rounded-lg flex items-center gap-2"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Thank you for your donation! 🙏</span>
                                </motion.div>
                            )}

                            {!showForm ? (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Heart className="w-5 h-5" />
                                        Donate Now
                                    </button>
                                    <button
                                        onClick={shareCampaign}
                                        className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        Share Campaign
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Donation Amount (NPR)</label>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            min="1"
                                            className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleDonate}
                                            disabled={donationLoading}
                                            className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {donationLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Heart className="w-4 h-4" />
                                                    Donate
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => setShowForm(false)}
                                            className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SpecificFundraisings;
