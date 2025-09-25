import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const AddForumForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { title, description };
        console.log(data);

        try {
            let result = await axios({
                method: "post",
                url: `http://localhost:8000/api/forums`,
                data: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(result);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }

        navigate("/forum");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10"
        >
            <h2 className="text-2xl font-bold text-center mb-6">Create a New Forum</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="Title" className="block text-lg font-medium mb-1">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter forum title..."
                    />
                </div>
                <div>
                    <label htmlFor="Description" className="block text-lg font-medium mb-1">
                        Description:
                    </label>
                    <textarea
                        id="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-40"
                        placeholder="Write a detailed description..."
                    ></textarea>
                </div>
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Submit
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddForumForm;



// import React, { useState } from 'react'
// import axios from 'axios'
// import { Navigate, useNavigate } from 'react-router-dom'

// const AddForumForm = () => {

//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("")
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         let data = {
//             title,
//             description
//         }
//         console.log(data)

//         try {

//             let result = await axios({
//                 method: 'post',
//                 url: `http://localhost:8000/api/forums`,
//                 data: data,
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 }
//             })
//             console.log(result)
//             setTitle("")
//             setDescription("")
//         } catch (error) {
//             console.log(error)
//         }

//         navigate("/forum")

//     }


//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="Title">Title: </label>
//                     <input type="text" id='Title' value={title} onChange={(e) => setTitle(e.target.value)} />

//                     <label htmlFor="Description">Description: </label>
//                     <textarea type='text' id='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
//                 </div>
//                 <div>
//                     <button type='submit'>Submit</button>
//                 </div>

//             </form>
//         </div>
//     )
// }

// export default AddForumForm