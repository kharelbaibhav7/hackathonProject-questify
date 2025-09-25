import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';

const ForumsPage = () => {
    const [forums, setForums] = useState([]);
    const [error, setError] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/forums');
                if (Array.isArray(response.data)) {
                    setForums(response.data);
                    // Initialize likedPosts based on fetched data
                    const initialLikes = {};
                    response.data.forEach((forum) => {
                        initialLikes[forum._id] = forum.likes.length;
                    });
                    setLikedPosts(initialLikes);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                setError('Error fetching forums');
            }
        };

        fetchForums();
    }, []);

    const handleLike = async (id) => {
        try {
            const result = await axios({
                method: 'post',
                url: `http://localhost:8000/api/forums/${id}/like`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Toggle like count dynamically
            setLikedPosts(prev => ({
                ...prev,
                [id]: result.data.result.likes.length
            }));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <motion.div
            className="container mx-auto p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Post Button */}
            <div className="flex justify-center my-6">
                <Link
                    to="/add-forum"
                    className="w-full max-w-md bg-white text-gray-700 text-lg font-medium py-3 px-6 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-all duration-300 text-center"
                >
                    What's on your mind?
                </Link>
            </div>

            {/* Forums List */}
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Forums</h1>
            <div className="space-y-6">
                {forums.map((forum) => {
                    const isLiked = likedPosts[forum._id] > forum.likes.length; // Check if liked

                    return (
                        <motion.div
                            key={forum._id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between ${isLiked ? 'bg-gray-200' : 'bg-gray-100'
                                }`}
                        >
                            {/* Left Section - Title, Author, Description */}
                            <div className="flex-1">
                                <Link to={`/forums/${forum._id}`} className="block">
                                    <h2 className="text-2xl font-bold text-gray-800">{forum.title}</h2>
                                    <p className="text-gray-600 text-sm mt-1">
                                        <span className="font-semibold">{forum.postedBy ? forum.postedBy.fullName : 'Unknown Contributor'}</span>
                                    </p>
                                    <p className="text-gray-500 line-clamp-2 mt-2">{forum.description || 'No description available...'}</p>
                                </Link>
                            </div>

                            {/* Right Section - Like Button */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleLike(forum._id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${isLiked ? 'bg-blue-500 text-white border-blue-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <ThumbsUp size={20} />
                                {likedPosts[forum._id] || 0}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default ForumsPage;






// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const ForumsPage = () => {
//     const [forums, setForums] = useState([]);
//     const [error, setError] = useState(null);
//     const [likedPosts, setLikedPosts] = useState({});

//     useEffect(() => {
//         const fetchForums = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/forums');
//                 if (Array.isArray(response.data)) {
//                     setForums(response.data);
//                     // Initialize likedPosts based on fetched data
//                     const initialLikes = {};
//                     response.data.forEach((forum) => {
//                         initialLikes[forum._id] = forum.likes.length;
//                     });
//                     setLikedPosts(initialLikes);
//                 } else {
//                     setError('Unexpected response format');
//                 }
//             } catch (error) {
//                 setError('Error fetching forums');
//             }
//         };

//         fetchForums();
//     }, []);

//     const handleLike = async (id) => {
//         try {
//             const result = await axios({
//                 method: 'post',
//                 url: `http://localhost:8000/api/forums/${id}/like`,
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 }
//             });

//             // Update likes dynamically
//             setLikedPosts(prev => ({
//                 ...prev,
//                 [id]: result.data.result.likes.length
//             }));
//         } catch (error) {
//             console.error('Error liking post:', error);
//         }
//     };

//     return (
//         <motion.div
//             className="container mx-auto p-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//         >
//             {/* Post Button */}
//             <div className="flex justify-center my-6">
//                 <Link
//                     to="/forum/post"
//                     className="w-full max-w-md bg-white text-gray-700 text-lg font-medium py-3 px-6 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-all duration-300 text-center"
//                 >
//                     What's on your mind?
//                 </Link>
//             </div>

//             {/* Forums List */}
//             <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Community Forums</h1>
//             <div className="space-y-6">
//                 {forums.map((forum) => (
//                     <motion.div
//                         key={forum._id}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between"
//                     >
//                         {/* Left Section - Title, Author, Description */}
//                         <div className="flex-1">
//                             <Link to={`/forums/${forum._id}`} className="block">
//                                 <h2 className="text-2xl font-bold text-gray-800">{forum.title}</h2>
//                                 <p className="text-gray-600 text-sm mt-1">
//                                     By <span className="font-semibold">{forum.postedBy ? forum.postedBy.fullName : 'Unknown Contributor'}</span>
//                                 </p>
//                                 <p className="text-gray-500 line-clamp-2 mt-2">{forum.description || 'No description available...'}</p>
//                             </Link>
//                         </div>

//                         {/* Right Section - Like Button */}
//                         <motion.button
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => handleLike(forum._id)}
//                             className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 ${likedPosts[forum._id] ? 'bg-gray-200' : ''
//                                 }`}
//                         >
//                             👍 {likedPosts[forum._id] || 0}
//                         </motion.button>
//                     </motion.div>
//                 ))}
//             </div>
//         </motion.div>
//     );
// };

// export default ForumsPage;





// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const ForumsPage = () => {

//     const [forums, setForums] = useState([]);
//     const [error, setError] = useState(null);

//     let navigate = useNavigate()

//     useEffect(() => {
//         const fetchForums = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/forums');
//                 console.log('API Response:', response.data); // Log the response data for debugging
//                 // Ensure the response data is an array
//                 if (Array.isArray(response.data)) {
//                     setForums(response.data);
//                 } else {
//                     setError('Unexpected response format');
//                 }
//             } catch (error) {
//                 console.error('Error fetching forums:', error);
//                 setError('Error fetching forums');
//             }
//         };

//         fetchForums();
//     }, []);


//     return (
//         <div>
//             <ul>
//                 {/* <li><Link to="/forum/post"> What's on your mind </Link></li> */}
//                 <li className="flex justify-center my-4">
//                     <Link
//                         to="/forum/post"
//                         className="w-full max-w-md bg-white text-gray-700 text-lg font-medium py-3 px-6 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-all duration-300 text-center"
//                     >
//                         What's on your mind?
//                     </Link>
//                 </li>


//                 <h1 className="text-4xl font-bold mb-4">Forums</h1>
//                 <div className="grid grid-cols-1 gap-4">
//                     {forums.map(forum => (
//                         <Link to={`/forums/${forum._id}`} key={forum._id} className="bg-gray-200 p-4 rounded-4xl shadow">
//                             <h2 className="text-2xl font-bold">{forum.title}</h2>
//                             <p>Author: {forum.postedBy ? forum.postedBy.fullName : 'Unknown Contributor'}</p>
//                             <p>Likes: {forum.likes.length}</p>
//                             {/* <p>{forum.description}</p> */}
//                         </Link>
//                     ))}
//                 </div>

//             </ul>
//         </div>
//     )
// }

// export default ForumsPage