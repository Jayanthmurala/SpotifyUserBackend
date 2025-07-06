import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TryCatch from "../errors/TryCatch.js";
dotenv.config();
// Controller function to register a new user
const registerUser = async (req :any, res:any) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required",states: false});
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) { 
        return res.status(400).json({ message: "User already exists", states: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET! ,{
        expiresIn: "7d",});
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 60 * 60 * 1000,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully", states: true });
};


// Controller function to handle user Login
const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required", states: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials", states: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials", states: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful", states: true ,token , user });
};


// Controller function to handle My Profile
const myProfile = TryCatch( async (req: any, res: any) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized access", states: false });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found", states: false });
    }
    return res.status(200).json({ message: "Profile fetched successfully", states: true, data:user });
});

//add song to playlist
const addSongToPlaylist = async (req: any, res: any) => {
    const songId = req.params.id;
    const userId = req.userId;
    if (!songId || !userId) {
        return res.status(400).json({ message: "Song ID and user ID are required", states: false });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found", states: false });
    }
    const songExists = user.playlist.includes(songId);
    if (songExists) {
        return res.status(400).json({ message: "Song already exists in playlist", states: false });
    }
    user.playlist.push(songId);
    await user.save();
    return res.status(200).json({ message: "Song added to playlist successfully", states: true });
}


// Remove song from playlist
const removeSongFromPlaylist = async (req: any, res: any) => {
    const songId = req.params.id;
    const userId = req.userId;
    if (!songId || !userId) {
        return res.status(400).json({ message: "Song ID and user ID are required", states: false });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found", states: false });
    }
    const songIndex = user.playlist.indexOf(songId);
    if (songIndex === -1) {
        return res.status(400).json({ message: "Song not found in playlist", states: false });
    }
    user.playlist.splice(songIndex, 1);
    await user.save();
    return res.status(200).json({ message: "Song removed from playlist successfully", states: true });
}
//get all songs in playlist
const getAllSongesInPlaylist = async (req: any, res: any) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized access", states: false });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found", states: false });
    }
    return res.status(200).json({ message: "Playlist fetched successfully", states: true, playlist: user.playlist });
}

// Exporting the controller functions
export default {
    registerUser,
    loginUser,
    myProfile,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getAllSongesInPlaylist
}