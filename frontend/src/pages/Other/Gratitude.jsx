import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Heart, Send, BookHeart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Gratitude = () => {
    const [gratitude, setGratitude] = useState('');
    const [gratitudeList, setGratitudeList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    let navigate = useNavigate()

    // Load saved gratitude entries on component mount
    useEffect(() => {
        const fetchGratitude = async () => {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8000/api/users/gratitude`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (result.data && Array.isArray(result.data)) {
                    setGratitudeList(result.data);
                }
            } catch (error) {
                console.error("Error fetching gratitude entries:", error);
            }
        };

        fetchGratitude();
    }, []);

    const handleClick = async () => {
        if (!gratitude.trim()) return;

        setIsSubmitting(true);

        try {
            let result = await axios({
                method: 'post',
                url: `http://localhost:8000/api/users/gratitude`,
                data: { gratitude },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(result);
            setGratitudeList([...gratitudeList, { id: Date.now(), text: gratitude }]);
            setGratitude('');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);

            await axios({
                method: 'post',
                url: `http://localhost:8000/api/users/update-score`,
                data: { score: 25 },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            navigate("/meditation")
        } catch (error) {
            console.error("Error saving gratitude:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-6"
            >
                <div className="flex items-center mb-6">
                    <Heart className="w-6 h-6 text-rose-500 mr-2" />
                    <h1 className="text-2xl font-bold text-gray-800">Daily Gratitude</h1>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Today, I am grateful for...
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={gratitude}
                            onChange={(e) => setGratitude(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter something you're grateful for..."
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting || !gratitude.trim()}
                    onClick={handleClick}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${!gratitude.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                        }`}
                >
                    {isSubmitting ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                    ) : (
                        <>
                            <span>Next</span>
                            <Send className="ml-2 w-4 h-4" />
                        </>
                    )}
                </motion.button>

                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center"
                    >
                        <div className="mr-2">✓</div>
                        <div>Gratitude saved successfully!</div>
                    </motion.div>
                )}
            </motion.div>

            {gratitudeList.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
                >
                    <div className="flex items-center mb-4">
                        <BookHeart className="w-5 h-5 text-teal-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-800">Recent Entries</h2>
                    </div>

                    <div className="space-y-3">
                        {gratitudeList.slice(-3).map((item, index) => (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-3 bg-teal-50 rounded-lg flex items-start"
                            >
                                <Heart className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-700">{item.text}</p>
                            </motion.div>
                        ))}

                        {gratitudeList.length > 3 && (
                            <motion.button
                                whileHover={{ x: 5 }}
                                className="text-teal-600 font-medium flex items-center mt-2"
                            >
                                <span>View all entries</span>
                                <ArrowRight className="ml-1 w-4 h-4" />
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Gratitude;





// import React, { useState } from 'react'
// import axios from 'axios'

// const Gratitude = () => {

//     let [gratitude, setGratitude] = useState([])

//     const handleClick = async () => {
//         let result = await axios({
//             method: 'post',
//             url: `http://localhost:8000/api/users/gratitude`,
//             data: { gratitude },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         console.log(result)
//     }



//     return (
//         <div>
//             I am grateful for <input type="text" onChange={(e) => setGratitude(e.target.value)} />
//             <button onClick={handleClick}>next</button>
//         </div>
//     )
// }

// export default Gratitude