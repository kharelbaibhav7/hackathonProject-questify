import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageCircle, ThumbsUp, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";

const SpecificForumPage = () => {
    let { id } = useParams();
    let [forum, setForum] = useState({});
    let [likes, setLikes] = useState(0);
    let [comments, setComments] = useState([]);
    let [comment, setComment] = useState("");
    let [showCommentBox, setShowCommentBox] = useState(false);
    let [userLiked, setUserLiked] = useState(false);
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchForum = async () => {
            try {
                let response = await axios.get(`http://localhost:8000/api/forums/${id}`);
                setForum(response.data);
                setLikes(response.data.likes.length);
                setComments(response.data.replies);
                setUserLiked(response.data.likes.includes(localStorage.getItem("userId")));
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };
        fetchForum();
    }, [id]);

    const onLike = async () => {
        try {
            let result = await axios.post(`http://localhost:8000/api/forums/${id}/like`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setLikes(result.data.result.likes.length);
            setUserLiked(!userLiked);
        } catch (err) {
            console.log(err.message);
        }
    };

    const onPostComment = async () => {
        if (!comment.trim()) return;
        try {
            await axios.post(`http://localhost:8000/api/forums/${id}/reply`, { comment }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setComments([...comments, { user: { fullName: "You" }, comment }]);
            setComment("");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-2xl mx-auto"
        >
            <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
            >
                <ArrowLeft size={18} /> Back
            </Button>

            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                    className="mt-6 text-center text-gray-500"
                >
                    Loading...
                </motion.div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mt-4">{forum.title}</h1>
                    <h2 className="text-gray-600">-  {forum.postedBy?.fullName || "Anonymous"}</h2>
                    <p className="mt-2 text-gray-800">{forum.description}</p>

                    <div className="flex gap-4 mt-4">
                        <Button
                            onClick={onLike}
                            className={`flex items-center gap-2 ${userLiked ? "bg-blue-600 text-white" : "bg-blue-400 text-white"}`}
                        >
                            <ThumbsUp size={18} /> Like ({likes})
                        </Button>
                        <Button onClick={() => setShowCommentBox(!showCommentBox)} className="flex items-center gap-2">
                            <MessageCircle size={18} /> Comment ({comments.length})
                        </Button>
                    </div>

                    {showCommentBox && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 border p-4 rounded-lg shadow-sm bg-gray-100"
                        >
                            <h3 className="text-lg font-semibold">Add a Comment</h3>
                            <div className="flex gap-2 mt-2">
                                <Input
                                    type="text"
                                    placeholder="Write your comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <Button onClick={onPostComment}>Post</Button>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6"
                    >
                        <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
                        {comments.length === 0 ? (
                            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                        ) : (
                            <div className="mt-2 space-y-3">
                                {comments.map((reply, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <Card>
                                            <CardContent className="p-3">
                                                <p className="font-semibold">{reply.user.fullName}</p>
                                                <p className="text-gray-700">{reply.comment}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default SpecificForumPage;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from "react-router-dom";

// const SpecificForumPage = () => {
//     let { id } = useParams()
//     let [Forum, setForum] = useState({})
//     let [likes, setLikes] = useState(0)
//     let navigate = useNavigate()



//     const onLike = async () => {
//         let result = await axios({
//             method: 'post',
//             url: `http://localhost:8000/api/forums/${id}/like`,
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         // console.log(result.data.result.likes.length)
//         setLikes(result.data.result.likes.length)

//     }

//     const onComment = async () => {
//         navigate("/forums/" + id + "/comment")
//     }

//     useEffect(() => {
//         const fetchForum = async () => {
//             try {
//                 let response = await axios.get(`http://localhost:8000/api/Forums/${id}`);
//                 setForum(response.data);
//                 // console.log(response.data.likes.length, "reponse.data")
//                 setLikes(response.data.likes.length);
//             } catch (err) {
//                 console.log(err.message)
//             }
//         };
//         fetchForum();
//     }, [id]);

//     return (
//         <div>
//             <button onClick={() => navigate(-1)}>Back</button>
//             <h1>{Forum.title}</h1>
//             <h2>-By {Forum.postedBy?.fullName || "Anonymous"}</h2>
//             <p>{Forum.description}</p>

//             <button onClick={onLike}>Like</button>
//             <p>Total Likes: {likes || 0}</p>

//             <button onClick={() => navigate("/forums/" + id + "/comment")}>Comment</button>


//         </div>
//     )
// }

// export default SpecificForumPage