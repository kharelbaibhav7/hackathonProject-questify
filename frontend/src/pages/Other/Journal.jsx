import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Book, Send, Sun, Moon, CloudRain, CloudLightning, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
    const [journal, setJournal] = useState('');
    const [mood, setMood] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    let navigate = useNavigate()

    const handleClick = async () => {
        if (!journal.trim()) return;
        await axios({
            method: 'post',
            url: `http://localhost:8000/api/users/update-score`,
            data: { score: 30 },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        navigate('/add-gratitude')


        setLoading(true);
        try {
            let result = await axios({
                method: 'post',
                url: `http://localhost:8000/api/users/journals`,
                data: { journal, mood }, // Including mood if selected
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(result);
            setSuccess(true);

            // Reset success message after 3 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        } catch (error) {
            console.error("Error saving journal:", error);
        } finally {
            setLoading(false);
        }
    };

    const moods = [
        { icon: <Sun size={24} />, label: 'Great', value: 'great' },
        { icon: <CloudRain size={24} />, label: 'Okay', value: 'okay' },
        { icon: <CloudLightning size={24} />, label: 'Rough', value: 'rough' },
        { icon: <ThumbsUp size={24} />, label: 'Productive', value: 'productive' },
        { icon: <ThumbsDown size={24} />, label: 'Unproductive', value: 'unproductive' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
        >
            <div className="flex items-center mb-6">
                <Book className="text-teal-600 mr-3" size={28} />
                <h1 className="text-2xl font-bold text-gray-800">Daily Journal</h1>
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                    How was your day today?
                </label>

                <div className="flex flex-wrap gap-2 mb-4">
                    {moods.map((item) => (
                        <motion.button
                            key={item.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMood(item.value)}
                            className={`flex items-center px-4 py-2 rounded-full border ${mood === item.value
                                ? 'bg-teal-100 border-teal-400 text-teal-700'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                                } transition-colors`}
                        >
                            <span className="mr-2">{item.icon}</span>
                            <span>{item.label}</span>
                        </motion.button>
                    ))}
                </div>

                <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    placeholder="Describe your day... What went well? What could have gone better? Any memorable moments?"
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    {journal.length > 0 ? `${journal.length} characters` : "Start writing to see character count"}
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    disabled={!journal.trim() || loading}
                    className="flex items-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2" size={18} />
                            Next
                        </>
                    )}
                </motion.button>
            </div>

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Journal entry saved successfully!
                </motion.div>
            )}
        </motion.div>
    );
};

export default Journal;


// import axios from 'axios'

// import React, { useState } from 'react'

// const Journal = () => {

//     const [journal, setJournal] = useState('')

//     const handleClick = async () => {
//         let result = await axios({
//             method: 'post',
//             url: `http://localhost:8000/api/users/journals`,
//             data: { journal },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         console.log(result)
//     }

//     return (
//         <div>
//             <label>How was your day today?</label>
//             <textarea name="" id="" onClick={handleClick} placeholder='Describe yuor day' onChange={(e) => setJournal(e.target.value)}></textarea>
//             <button onClick={handleClick}>Next</button>
//         </div>
//     )
// }

// export default Journal