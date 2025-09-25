import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../App";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Login = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(GlobalVariableContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post("http://localhost:8000/api/users/login", formData);
            localStorage.setItem("token", result.data.token);
            setToken(result.data.token);
            toast.success("Login Success");
            navigate("/");
        } catch (error) {
            console.log(error.message);
            toast.error("Login Failed");
        }
    };

    return (
        <div className="mt-5 min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl shadow-xl rounded-lg bg-white flex overflow-hidden"
            >
                {/* Left side - Image placeholder */}
                <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
                    <img
                        src="https://thumbs.dreamstime.com/b/ego-self-confident-girl-character-satisfied-her-appearance-vector-illustration-egoistic-teenager-having-narcissistic-feeling-282550222.jpg"
                        alt="image2"
                        className="max-w-full max-h-full object-cover"
                    />
                </div>

                {/* Right side - Login form */}
                <div className="w-full md:w-1/2 p-8">
                    <div className="text-center">
                        <motion.div className="flex justify-center mb-4" whileHover={{ scale: 1.05 }}>
                            <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Mail className="size-8 text-teal-400" />
                            </div>
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-muted-foreground mb-6">
                            Sign in to continue to your account
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
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

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
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
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-muted-foreground" size={16} />
                                    ) : (
                                        <Eye className="text-muted-foreground" size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full p-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign in
                        </motion.button>
                    </form>

                    {/* Signup Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <a href="/register" className="text-teal-400 font-medium hover:underline">
                                Create account
                            </a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
