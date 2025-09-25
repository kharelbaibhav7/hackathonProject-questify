import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserPlus, MessageSquare, Home } from 'lucide-react';

const MentalIllness = () => {
    const navigate = useNavigate();

    const handleChange = () => {
        navigate("/doctors");
    };

    const handleAI = () => {
        navigate("/chat-ai");
    };

    const handleNormal = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-teal-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md shadow-2xl rounded-lg bg-white p-8"
            >
                <div className="text-center">
                    <motion.div className="flex justify-center mb-4" whileHover={{ scale: 1.05 }}>
                        <div className="size-16 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                            <UserPlus className="w-10 h-10 text-teal-500" />
                        </div>
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-2">Mental Health Support</h2>
                    <p className="text-muted-foreground mb-6">
                        We highly recommend talking to a specialist first.
                    </p>
                </div>

                <div className="space-y-4">
                    <motion.button
                        onClick={handleChange}
                        className="w-full p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <UserPlus className="w-5 h-5" />
                        Talk to a Specialist
                    </motion.button>

                    <motion.button
                        onClick={handleAI}
                        className="w-full p-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Chat with AI
                    </motion.button>

                    <motion.button
                        onClick={handleNormal}
                        className="w-full p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Home className="w-5 h-5" />
                        Return to Home Page
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default MentalIllness;



// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const MentalIllness = () => {

//     let navigate = useNavigate()


//     const handleChange = () => {
//         navigate("/doctors")
//     }

//     const handleAI = () => {
//         navigate("/chat-ai")
//     }

//     const handleNormal = () => {
//         navigate("/")
//     }

//     return (
//         <div>
//             <h1>We first highly recommend you to talk to a specialist</h1>
//             <button onClick={handleChange}>Click here to talk to a specialist</button>
//             <button onClick={handleAI}>Click here to talk to a specialist</button>
//             <button onClick={handleNormal}>Get to home page</button>
//         </div>
//     )
// }

// export default MentalIllness