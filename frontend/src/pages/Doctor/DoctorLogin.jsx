import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../App";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const DoctorLogin = () => {
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
            const result = await axios.post("http://localhost:8000/api/doctors/login", formData);
            localStorage.setItem("token", result.data.token);
            setToken(result.data.token);
            toast.success("Login Successful");
            navigate("/");
        } catch (error) {
            console.log(error.message);
            toast.error("Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md shadow-2xl rounded-lg bg-white p-8"
            >
                <div className="text-center">
                    <motion.div
                        className="flex justify-center mb-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <User className="size-8 text-[#8798eb]" />
                        </div>
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-2">Doctor Login</h2>
                    <p className="text-muted-foreground mb-6">Dr Login</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                placeholder="doctor@example.com"
                                className="w-full pl-10 p-2 border rounded-md"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 p-2 border rounded-md"
                                required
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5 text-muted-foreground" />
                                ) : (
                                    <Eye className="size-5 text-muted-foreground" />
                                )}
                            </button>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full p-2 bg-[#8798eb] text-white rounded-md hover:bg-[#5c74ed] transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default DoctorLogin;
