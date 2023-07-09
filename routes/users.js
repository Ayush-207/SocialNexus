import express from "express";
import {
    getUserFriends,
    addRemoveFriend,
    getUsers
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// UPDATE 

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


// READ

router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id", verifyToken, getUsers);

export default router;