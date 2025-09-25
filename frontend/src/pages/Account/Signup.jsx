import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../App";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Calendar,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(GlobalVariableContext);
  const { formData, setFormData } = useContext(GlobalVariableContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/api/users/", formData);
    localStorage.setItem("token", result.data.token);
    setToken(result.data.token);
    navigate("/problem");
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Image Area */}
        <div className="md:w-1/2 w-full relative">
          <img
            src="https://i.pinimg.com/736x/cd/7d/05/cd7d051375b93e84876fb3480e978ce4.jpg"
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Sign Up</h2>
            <p className="text-gray-500 mt-2">
              Get started with your free account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder="John Doe"
                    className="w-full pl-8 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="example@example.com"
                    className="w-full pl-8 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="••••••••"
                    className="w-full pl-8 pr-10 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-400" size={16} />
                    ) : (
                      <Eye className="text-gray-400" size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Age Input */}
              <div>
                <label htmlFor="age" className="block text-xs font-medium mb-1">
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    placeholder="Your age"
                    className="w-full pl-8 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Profession Input */}
            <div>
              <label htmlFor="profession" className="block text-xs font-medium mb-1">
                Profession
              </label>
              <div className="relative">
                <Briefcase className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  placeholder="Your profession (e.g., Developer, Teacher)"
                  className="w-full pl-8 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms and Privacy Policy */}
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-xs text-gray-500">
                I've read and agree with the terms of service and privacy policy
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create an Account
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-teal-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;