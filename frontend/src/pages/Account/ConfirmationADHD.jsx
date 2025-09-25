import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, HelpCircle } from 'lucide-react';

const ConfirmationADHD = () => {
    const navigate = useNavigate();

    const handleYes = () => {
        navigate("/");
    };

    const handleNo = () => {
        navigate("/doctors");
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
                    <motion.div className="flex justify-center mb-4" whileHover={{ scale: 1.05 }}>
                        <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <HelpCircle className="w-10 h-10 text-primary" />
                        </div>
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-2">ADHD Confirmation</h2>
                    <p className="text-muted-foreground mb-6">
                        Are you sure you have ADHD, and has this been confirmed by a doctor?
                    </p>
                </div>

                <div className="space-y-4">
                    <motion.button
                        onClick={handleYes}
                        className="w-full p-2 bg-[#8798eb] text-white rounded-md hover:bg-[#5c74ed] transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <CheckCircle className="w-5 h-5" />
                        Yes, I am sure
                    </motion.button>

                    <motion.button
                        onClick={handleNo}
                        className="w-full p-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <HelpCircle className="w-5 h-5" />
                        No, take me to the specialist
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default ConfirmationADHD;

// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const ConfirmationADHD = () => {
//     let navigate = useNavigate()
//     const handleYes = () => {
//         navigate("/")
//     }

//     const handleNo = () => {
//         navigate("/doctors")
//     }

//     return (
//         <div>
//             <h1>Are you sure you have ADHD, and has this been confirmed by a doctor?</h1>
//             <button onClick={handleYes}>Yes, I am sure</button>
//             <button onClick={handleNo}>No, take me to the specialist</button>
//         </div>
//     )
// }

// export default ConfirmationADHD