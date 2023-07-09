import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// UPDATE 

router.patch("/:id/like", verifyToken, likePost);

// READ
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/", verifyToken, getFeedPosts);

export default router;

