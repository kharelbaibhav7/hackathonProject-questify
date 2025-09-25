import express from "express";
const forumRouter = express.Router();
// import {
//   createForumPost,
//   getAllForumPosts,
//   getForumPostById,
//   deleteForumPost,
//   postReply,
//   likeForumPost,
// } from "../controllers/forumController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createForumPost, 
  deleteForumPost,
  getAllForumPosts,
  getForumPostById,
  likeForumPost,
  postReply,
} from "../controller/forumController.js";
  
forumRouter.route("/").post(protect, createForumPost).get(getAllForumPosts);
 
forumRouter
  .route("/:id")
  .get(getForumPostById)
  .delete(protect, deleteForumPost);

forumRouter.route("/:id/reply").post(protect, postReply);
forumRouter.route("");

forumRouter.route("/:id/like").post(protect, likeForumPost);

export default forumRouter;
