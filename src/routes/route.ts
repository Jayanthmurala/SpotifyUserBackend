import { Router } from "express";
import userController from "../controllers/user.controller.js";
import TryCatch from "../errors/TryCatch.js";
import authenticateUser from "../middleware/user.middleware.js";

const router = Router();
router.post("/user/register",  TryCatch( userController.registerUser));
router.post("/user/login",  TryCatch( userController.loginUser));
router.get("/user", authenticateUser, userController.myProfile);
router.put("/user/song/:id", authenticateUser, TryCatch(userController.addSongToPlaylist));
router.delete("/user/song/:id", authenticateUser, TryCatch(userController.removeSongFromPlaylist));
router.get("/user/playlist", authenticateUser, TryCatch(userController.getAllSongesInPlaylist));
export default router;