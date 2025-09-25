import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileText, DollarSign, Phone, Target, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const AddFundraisingForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        target: "",
        phoneNumber: "",
        description: ""
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError("Title is required");
            return false;
        }
        if (!formData.target || formData.target <= 0) {
            setError("Target amount must be greater than 0");
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            setError("Phone number is required");
            return false;
        }
        if (!formData.description.trim()) {
            setError("Description is required");
            return false;
        }
        if (!image) {
            setError("Image is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("target", formData.target);
        submitData.append("phoneNumber", formData.phoneNumber);
        submitData.append("description", formData.description);
        submitData.append("image", image);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please login to create a fundraising campaign");
                setLoading(false);
                return;
            }

            await axios.post("http://localhost:8000/api/fundraising", submitData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess(true);
            setTimeout(() => {
                navigate("/fundraisings");
            }, 2000);
        } catch (error) {
            console.error("Error creating fundraising:", error);
            setError(error.response?.data?.message || "Failed to create fundraising campaign");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Campaign Created!</h2>
                    <p className="text-gray-600 mb-4">Your fundraising campaign has been created successfully.</p>
                    <p className="text-sm text-gray-500">Redirecting to campaigns...</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={() => navigate("/fundraisings")}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-3xl font-bold">Create Fundraising Campaign</h1>
                        </div>
                        <p className="text-teal-100">Share your cause and start raising funds today</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700"
                            >
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Campaign Title *
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter a compelling title for your campaign"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Target Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Target Amount (NPR) *
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="number"
                                        name="target"
                                        value={formData.target}
                                        onChange={handleInputChange}
                                        placeholder="Enter target amount"
                                        min="1"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contact Number *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your contact number"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Campaign Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Tell your story and explain why people should support your cause..."
                                    rows="4"
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Campaign Image *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-colors">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                        id="image-upload"
                                        required
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        {imagePreview ? (
                                            <div className="space-y-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-lg mx-auto"
                                                />
                                                <p className="text-sm text-gray-600">Click to change image</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                                <div>
                                                    <p className="text-lg font-medium text-gray-700">Upload Campaign Image</p>
                                                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Creating Campaign...
                                    </>
                                ) : (
                                    <>
                                        <Target className="w-5 h-5" />
                                        Create Campaign
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AddFundraisingForm;

