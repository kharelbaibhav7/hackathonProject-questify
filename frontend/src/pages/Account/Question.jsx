
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Question = () => {
    const [stutteringLevel, setStutteringLevel] = useState(1);
    const navigate = useNavigate();

    const descriptionMap = {
        1: "Level 1: Very mild stuttering. Speech is mostly smooth with only occasional minor repetitions.",
        2: "Level 2: Mild stuttering. There may be occasional repetitions or prolongations during speech.",
        3: "Level 3: Moderate stuttering. Repetitions and prolongations are noticeable and may affect fluency.",
        4: "Level 4: Severe stuttering. Frequent blocks and repetitions significantly disrupt the flow of speech.",
        5: "Level 5: Very severe stuttering. Speech is heavily disrupted with constant repetitions and struggles to communicate.",
    };

    const handleSliderChange = (event) => {
        setStutteringLevel(Number(event.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.success("Stuttering level saved successfully");

        console.log(stutteringLevel);

        // const result = await axios.put("http://localhost:8000/api/users/sttuterlevel/", { stutteringLevel });
        const result = await axios({
            method: "put",
            url: "http://localhost:8000/api/users/stutter-level/",
            data: { stutteringLevel },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })

        navigate('/');
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
                        </div>
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-2">Rate Your Stuttering Level</h2>
                    <p className="text-muted-foreground mb-6">
                        How would you describe your stuttering level?
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="stuttering-level" className="block text-sm font-medium">
                            Stuttering Level (1 - Mild to 5 - Severe)
                        </label>
                        <div className="relative">
                            <input
                                id="stuttering-level"
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={stutteringLevel}
                                onChange={handleSliderChange}
                                className="w-full appearance-none bg-transparent focus:outline-none"
                                style={{
                                    WebkitAppearance: "none",
                                    appearance: "none",
                                    cursor: "pointer",
                                    height: "6px",
                                    background: `linear-gradient(to right, #5c74ed ${((stutteringLevel - 1) / 4) * 100}%, #d1d5db ${((stutteringLevel - 1) / 4) * 100}%)`,
                                    borderRadius: "5px",
                                    transition: "background 0.3s ease",
                                }}
                            />

                            <div className="flex justify-between text-sm mt-1">
                                <span>1 - Mild</span>
                                <span>5 - Severe</span>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-4 p-4 bg-gray-100 rounded-md text-sm text-gray-700">
                        <p>{descriptionMap[stutteringLevel]}</p>
                    </div>

                    {/* Next Button */}
                    <motion.button
                        type="submit"
                        className="w-full p-2 bg-[#8798eb] text-white rounded-md hover:bg-[#5c74ed] transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Next
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Question;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Question = () => {
//     const [stutteringLevel, setStutteringLevel] = useState(1);
//     const navigate = useNavigate();

//     const descriptionMap = {
//         1: "Level 1: Very mild stuttering. Speech is mostly smooth with only occasional minor repetitions.",
//         2: "Level 2: Mild stuttering. There may be occasional repetitions or prolongations during speech.",
//         3: "Level 3: Moderate stuttering. Repetitions and prolongations are noticeable and may affect fluency.",
//         4: "Level 4: Severe stuttering. Frequent blocks and repetitions significantly disrupt the flow of speech.",
//         5: "Level 5: Very severe stuttering. Speech is heavily disrupted with constant repetitions and struggles to communicate.",
//     };

//     const handleSliderChange = (event) => {
//         setStutteringLevel(Number(event.target.value));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         toast.success("Stuttering level saved successfully");
//         navigate("/question3");
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-6">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-full max-w-md shadow-2xl rounded-lg bg-white p-8"
//             >
//                 <div className="text-center">
//                     <motion.div className="flex justify-center mb-4" whileHover={{ scale: 1.05 }}>
//                         <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                         </div>
//                     </motion.div>
//                     <h2 className="text-3xl font-bold mb-2">Rate Your Stuttering Level</h2>
//                     <p className="text-muted-foreground mb-6">
//                         How would you describe your stuttering level?
//                     </p>
//                 </div>

//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div className="space-y-2">
//                         <label htmlFor="stuttering-level" className="block text-sm font-medium">
//                             Stuttering Level (1 - Mild to 5 - Severe)
//                         </label>
//                         <div className="relative">
//                             <input
//                                 id="stuttering-level"
//                                 type="range"
//                                 min="1"
//                                 max="5"
//                                 step="1"
//                                 value={stutteringLevel}
//                                 onChange={handleSliderChange}
//                                 className="w-full appearance-none bg-transparent focus:outline-none"
//                                 style={{
//                                     WebkitAppearance: "none",
//                                     appearance: "none",
//                                     cursor: "pointer",
//                                     height: "6px",
//                                     background: `linear-gradient(to right, #5c74ed ${((stutteringLevel - 1) / 4) * 100}%, #d1d5db ${((stutteringLevel - 1) / 4) * 100}%)`,
//                                     borderRadius: "5px",
//                                     transition: "background 0.3s ease",
//                                 }}
//                             />

//                             <div className="flex justify-between text-sm mt-1">
//                                 <span>1 - Mild</span>
//                                 <span>5 - Severe</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Description Section */}
//                     <div className="mt-4 p-4 bg-gray-100 rounded-md text-sm text-gray-700">
//                         <p>{descriptionMap[stutteringLevel]}</p>
//                     </div>

//                     {/* Next Button */}
//                     <motion.button
//                         type="submit"
//                         className="w-full p-2 bg-[#8798eb] text-white rounded-md hover:bg-[#5c74ed] transition-colors"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                     >
//                         Next
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default Question;