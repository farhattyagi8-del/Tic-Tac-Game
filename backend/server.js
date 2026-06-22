
 const express = require("express");
const mongoose  =  require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/tictac";

mongoose.connect(mongoUri)
    .then(() => console.log("mongodb Connected"))
    .catch(err => console.log("Mongo Error: ", err));




const gameSchema = new mongoose.Schema({
    winner: String,
    date: {type: Date, default: Date.now}  
});
const Game = mongoose.model("Game", gameSchema);

// Routes
app.get("/", (req, res) => {
     res.send("server is running");
 });

 // Route to add a new game result

app.post("/add", async (req, res) => {   //this update of that 
    try {
        if (!req.body.winner) {
            return res.status(400).json({ success: false, message: "Winner is required" });
        }

        const game = new Game({
            winner: req.body.winner
        });
         const savedGame = await game.save();
         console.log("Game saved:", savedGame);
        res.json({ success: true, message: "Game Saved" });
    } catch (err) {
        console.error("Error saving game:", err);
        res.status(500).json({ success: false, message: "Error saving game" });
    }
});






app.get("/games", async (req, res) => {
    const data = await Game.find().sort({ date: -1 });
    res.json(data);
});

app.get("/score", async (req, res) => {
    try {
        const latestScore = await Game.findOne().sort({ _id: -1 });
        res.json(latestScore);
    } catch (err) {
        console.error("Error fetching latest score:", err);
        res.status(500).json({ success: false, message: "Error fetching latest score" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

