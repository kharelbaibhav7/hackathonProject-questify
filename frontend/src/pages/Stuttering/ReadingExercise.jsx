import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ReadingExercise = () => {
  const [prompt, setPrompt] = useState("");
  const [exerciseContent, setExerciseContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [next, setNext] = useState(false);
  const navigate = useNavigate()

    
  const handleClick = async () => {
    // let result = await axios({
    //     method: 'post',
    //     url: `http://localhost:8000/api/users/journals`,
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`
    //     }
    // })
    await axios({
      method: 'post',
      url: `http://localhost:8000/api/users/update-score`,
      data: { score: 50 },
  })
    navigate('/add-journal')
  }
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setExerciseContent("");
    setNext(false); // Reset next state when generating new content
    
    try {
      // Using the original API endpoint as in your code
      const response = await axios.post("http://localhost:8000/api/reading-exercises", { prompt });
      // Use the data directly as in your original code
      setExerciseContent(response.data);
      setNext(true); // Show the next button once content is loaded
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to format text with proper line breaks
  const formatContent = (content) => {
    if (!content) return "";
    
    // Split the content by newlines and render each paragraph separately
    return content.split("\n").map((paragraph, index) => (
      // Skip empty paragraphs
      paragraph.trim() ? (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      ) : <br key={index} />
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-6 text-teal-600"
      >
        Reading Exercise Generator
      </motion.h1>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a topic or prompt..."
            className="w-full h-12 border border-gray-300 rounded-full px-5 pl-6 pr-36 text-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating...
              </div>
            ) : (
              "Generate"
            )}
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
        >
          {error}
        </motion.div>
      )}

      {exerciseContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated Exercise</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {formatContent(exerciseContent)}
          </div>
        </motion.div>
      )}

      {next && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition"
          >
            <button onClick={handleClick}>
                Next
            </button>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ReadingExercise;



// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const ReadingExercise = () => {
//   const [prompt, setPrompt] = useState("");
//   const [exerciseContent, setExerciseContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [next, setNext] = useState(false);

//   const handleGenerate = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     setError("");
//     setExerciseContent("");
//     setNext(false); // Reset next state when generating new content
    
//     try {
//       // Using the original API endpoint as in your code
//       const response = await axios.post("http://localhost:8000/api/reading-exercises", { prompt });
//       // Use the data directly as in your original code
//       setExerciseContent(response.data);
//       setNext(true); // Show the next button once content is loaded
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <motion.h1 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-center mb-6 text-teal-600"
//       >
//         Reading Exercise Generator
//       </motion.h1>
      
//       <div className="mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter a topic or prompt..."
//             className="w-full h-12 border border-gray-300 rounded-full px-5 pl-6 pr-36 text-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleGenerate}
//             disabled={loading || !prompt.trim()}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition"
//           >
//             {loading ? (
//               <div className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
//                 </svg>
//                 Generating...
//               </div>
//             ) : (
//               "Generate"
//             )}
//           </motion.button>
//         </div>
//       </div>

//       {error && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
//         >
//           {error}
//         </motion.div>
//       )}

//       {exerciseContent && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200"
//         >
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated Exercise</h2>
//           <div className="prose max-w-none">
//             {exerciseContent}
//           </div>
//         </motion.div>
//       )}

//       {next && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex justify-end"
//         >
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition"
//           >
//             Next
//           </motion.button>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ReadingExercise;



// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const ReadingExercise = () => {
//     const [prompt, setPrompt] = useState("");
//     const [exerciseContent, setExerciseContent] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [next, setNext] = useState(false);

//     const handleGenerate = async () => {
//         if (!prompt.trim()) return;
//         setLoading(true);
//         setError("");
//         setExerciseContent("");
//         try {
//             // Sending the prompt to the API to generate the reading exercise.
//             const response = await axios.post("http://localhost:8000/api/reading-exercises", { prompt });
//             // Assume the API returns an object with a "content" property.
//             // console.log(response.data)
//             setExerciseContent(response.data);
//             setNext(true);
//         } catch (err) {
//             setError("Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
//             <h1 className="text-4xl font-bold mb-8 text-teal-600">Reading Exercise</h1>
//             <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">
//                 <input
//                     type="text"
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                     placeholder="Enter a topic or prompt..."
//                     className="w-full h-12 border border-gray-300 rounded-full px-5 text-lg focus:outline-none focus:border-teal-500 transition mb-4"
//                 />
//                 <button
//                     onClick={handleGenerate}
//                     className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-full font-semibold transition"
//                     disabled={loading}
//                 >
//                     {loading ? "Generating..." : "Generate Reading Exercise"}
//                 </button>
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//                 {exerciseContent && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="mt-8 p-6 border border-gray-300 rounded-xl bg-gray-50 text-gray-800"
//                     >
//                         <h2 className="text-2xl font-bold mb-4">Generated Exercise</h2>
//                         <p className="text-lg whitespace-pre-wrap">{exerciseContent}</p>
//                     </motion.div>
//                 )}
//             </div>
//             <button
//                 onClick={handleGenerate}
//                 className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-full font-semibold transition"
//                 disabled={loading}
//             >
//                 {next ? "" : "Next"}
//             </button>
//         </div>
//     );
// };

// export default ReadingExercise;
