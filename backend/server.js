import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🎮 Gamerpedia backend is running...");
});

// ✅ Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password });
    await user.save();

    res.json({ message: "Signup successful", user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ✅ Get User by Email
app.get("/api/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});

// ✅ Update User Info
app.put("/api/user/:email", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fields are required" });

    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      { username, password },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
