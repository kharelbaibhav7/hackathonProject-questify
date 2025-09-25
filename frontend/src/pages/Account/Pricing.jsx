import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Choose Your Plan</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full relative">
                {/* Horizontal Ruler */}
                <div className="absolute left-0 right-0 top-[180px] h-px bg-gray-300 z-0"></div>

                {/* Free Plan */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-300 flex flex-col h-full relative z-10">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Free Plan</h3>
                    <p className="text-gray-600 mb-6">Best for mild cases manageable with self-help and sttuterin and many more</p>
                    {/* Pricing Section */}
                    <div className="flex items-center space-x-4 mb-6">
                        <span className="text-4xl font-bold ">NPR 0</span>
                        {/* <span className="text-xl text-gray-400 line-through">NPR 0</span> */}
                        <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            Free
                        </span>
                    </div>
                    <ul className="space-y-4 mb-6 flex-grow">
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-gray-500/50 mt-1" size={20} />
                            <span>AI-driven assessment to identify the issue</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-gray-500/50 mt-1" size={20} />
                            <span>Personalized self-help programs</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-gray-500/50 mt-1" size={20} />
                            <span>Daily therapy exercises (breathing, speaking, meditation)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-gray-500/50 mt-1" size={20} />
                            <span>Community support & peer interaction</span>
                        </li>
                        {/* Strikethrough Features */}
                        <li className="flex items-start space-x-2 line-through text-gray-400">
                            <XCircle className="text-gray-400 mt-1" size={20} />
                            <span>One-on-one therapy sessions with experts</span>
                        </li>
                        <li className="flex items-start space-x-2 line-through text-gray-400">
                            <XCircle className="text-gray-400 mt-1" size={20} />
                            <span>Live Q&A sessions with specialists</span>
                        </li>
                        <li className="flex items-start space-x-2 line-through text-gray-400">
                            <XCircle className="text-gray-400 mt-1" size={20} />
                            <span>Exclusive webinars and workshops</span>
                        </li>
                    </ul>
                    <button className="w-full bg-gray-300 text-gray-600 font-semibold py-2 rounded-xl cursor-not-allowed">
                        Current Plan
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-300 flex flex-col h-full relative z-10">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Premium Plan</h3>
                    <p className="text-gray-600 mb-6">Best for complex challenges requiring expert guidance.</p>
                    {/* Pricing Section */}
                    <div className="flex items-center space-x-4 mb-6">
                        <span className="text-4xl font-bold text-blue-600">NPR 799</span>
                        <span className="text-xl text-gray-500 line-through">NPR 999</span>
                        <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            Save 20%
                        </span>
                    </div>
                    <ul className="space-y-4 mb-6 flex-grow">
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-blue-500 mt-1" size={20} />
                            <span>AI-driven assessment to identify the issue</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-blue-500 mt-1" size={20} />
                            <span>Personalized therapy plans based on expert evaluation</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-blue-500 mt-1" size={20} />
                            <span>Daily therapy exercises (breathing, speaking, meditation)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-blue-500 mt-1" size={20} />
                            <span>One-on-one therapy sessions with experts</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-blue-500 mt-1" size={20} />
                            <span>Live Q&A sessions with specialists</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle className="text-blue-500 mt-1" size={20} />
                            <span>Brief report of the patient's progress and recommendations</span>
                        </li>
                    </ul>
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition">
                        <Link to="/">Upgrade to Premium</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
