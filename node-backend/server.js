const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://mongo:27017/textSimilarity")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const ComparisonSchema = new mongoose.Schema({
  text1: String,
  text2: String,
  similarityScore: Number,
  date: { type: Date, default: Date.now },
});
const Comparison = mongoose.model("Comparison", ComparisonSchema);

app.post("/compare", async (req, res) => {
  const { text1, text2 } = req.body;
  if (!text1 || !text2) {
    return res.status(400).json({ message: "Both texts are required" });
  }
  try {
    const response = await axios.post(
      "http://backend-python:8000/compute-embeddings",
      {
        text1,
        text2,
      }
    );
    const { similarity_score } = response.data;
    const comparison = new Comparison({
      text1,
      text2,
      similarityScore: similarity_score,
    });
    await comparison.save();
    res.json({ similarityScore: similarity_score });
  } catch (error) {
    console.error("Error in /compare:", error);
    res
      .status(500)
      .json({ message: "Error processing request", error: error.toString() });
  }
});

app.listen(3001, () => console.log("Node.js server running on port 3001"));
