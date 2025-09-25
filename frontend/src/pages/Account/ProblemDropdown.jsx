import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalVariableContext } from "../../App";

const ProblemDropdown = () => {
    const [selectedProblem, setSelectedProblem] = useState("");
    const [description, setDescription] = useState("");
    const { majorProblem, setMajorProblem } = useContext(GlobalVariableContext);



    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedDetails = {
            majorProblem: selectedProblem,
            description: description,
        };

        setMajorProblem(selectedProblem);
        console.log(majorProblem)

        console.log({ updatedDetails });

        try {
            // const result = await axios.post("http://localhost:8000/api/users/details", updatedDetails);
            const result = await axios({
                method: "post",
                url: "http://localhost:8000/api/users/details",
                data: updatedDetails,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            console.log(result)
            if (selectedProblem === "stuttering") {

                navigate("/question");
            } else if (selectedProblem === "adhd") {
                navigate("/adhd-confirmation");
            } else if (selectedProblem === "mental-illness") {
                navigate("/mental-illness-confirmation");
            } else {
                navigate("/")
            }
        } catch (error) {
            console.error("Error submitting form:", error);
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
                        </div>
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-2">Select Your Problem</h2>
                    <p className="text-muted-foreground mb-6">Please choose an issue you're facing</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="problem" className="block text-sm font-medium">
                            Select a Problem
                        </label>
                        <div className="relative">
                            <select
                                id="problem"
                                name="problem"
                                value={selectedProblem}
                                onChange={(e) => setSelectedProblem(e.target.value)}
                                className="w-full pl-10 p-2 border rounded-md"
                                required
                            >
                                <option value="">-- Select a problem --</option>
                                <option value="stuttering">Stuttering</option>
                                <option value="adhd">ADHD</option>
                                <option value="mental-illness">Anxiety</option>
                                <option value="social-isolation">Social Isolation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium">
                            Describe Your Problem (Optional)
                        </label>
                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Please provide more details about your problem..."
                                className="w-full pl-10 p-2 border rounded-md"
                                rows="4"
                            />
                        </div>
                    </div>

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

export default ProblemDropdown;


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProblemDropdown = () => {
//     const [selectedProblem, setSelectedProblem] = useState("");
//     // const [details, setDetails] = useState({
//     //     major_problem: "",
//     //     description: "",
//     // });
//     const [description, setDescription] = useState("");

//     const navigate = useNavigate();

//     const handleChange = (event) => {
//         setSelectedProblem(event.target.value);
//     };

//     const handleDescriptionChange = (event) => {
//         setDescription((event) => (event.target.value));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const updatedDetails = {
//             major_problem: selectedProblem,
//             description: details.description,
//         };

//         console.log(updatedDetails);


//         try {
//             const result = await axios.post("http://localhost:8000/api/users/details/", updatedDetails);
//             if (selectedProblem === "stuttering") {
//                 navigate("/question");
//             } else {
//                 navigate("/");
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
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
//                     <motion.div
//                         className="flex justify-center mb-4"
//                         whileHover={{ scale: 1.05 }}
//                     >
//                         <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                         </div>
//                     </motion.div>
//                     <h2 className="text-3xl font-bold mb-2">Select Your Problem</h2>
//                     <p className="text-muted-foreground mb-6">Please choose an issue you're facing</p>
//                 </div>

//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div className="space-y-2">
//                         <label htmlFor="problem" className="block text-sm font-medium">
//                             Select a Problem
//                         </label>
//                         <div className="relative">
//                             <select
//                                 id="problem"
//                                 name="problem"
//                                 value={selectedProblem}
//                                 onChange={handleChange}
//                                 className="w-full pl-10 p-2 border rounded-md"
//                                 required
//                             >
//                                 <option value="">-- Select a problem --</option>
//                                 <option value="stuttering">Stuttering</option>
//                                 <option value="adhd">ADHD</option>
//                                 <option value="mental-illness">Mental Illness</option>
//                                 <option value="social-isolation">Social Isolation</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="description" className="block text-sm font-medium">
//                             Describe Your Problem (Optional)
//                         </label>
//                         <div className="relative">
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={description}
//                                 onChange={handleDescriptionChange}
//                                 placeholder="Please provide more details about your problem..."
//                                 className="w-full pl-10 p-2 border rounded-md"
//                                 rows="4"
//                             />
//                         </div>
//                     </div>

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

// export default ProblemDropdown;


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const ProblemDropdown = () => {
//     const [selectedProblem, setSelectedProblem] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (event) => {
//         setSelectedProblem(event.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (selectedProblem === "stuttering") {
//             console.log('done')
//             navigate("/question");
//         } else {
//             navigate("/");
//         }
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
//                     <motion.div
//                         className="flex justify-center mb-4"
//                         whileHover={{ scale: 1.05 }}
//                     >
//                         <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                         </div>
//                     </motion.div>
//                     <h2 className="text-3xl font-bold mb-2">Select Your Problem</h2>
//                     <p className="text-muted-foreground mb-6">Please choose an issue you're facing</p>
//                 </div>

//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div className="space-y-2">
//                         <label htmlFor="problem" className="block text-sm font-medium">
//                             Select a Problem
//                         </label>
//                         <div className="relative">
//                             <select
//                                 id="problem"
//                                 name="problem"
//                                 value={selectedProblem}
//                                 onChange={handleChange}
//                                 className="w-full pl-10 p-2 border rounded-md"
//                                 required
//                             >
//                                 <option value="">-- Select a problem --</option>
//                                 <option value="stuttering">Stuttering</option>
//                                 <option value="adhd">ADHD</option>
//                                 <option value="mental-illness">Mental Illness</option>
//                                 <option value="social-isolation">Social Isolation</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </div>
//                     </div>

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

// export default ProblemDropdown;
