
 const express = require("express");
const mongoose  =  require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI
    
)

 .then(() => console.log("mongodb Connected"))
 .catch(err => console.log(err));




const gameSchema = new mongoose.Schema({
    winner: String,
    date: {type: Date, default: Date.now}  
});
const Game = mongoose.model("Game", gameSchema);

app.get("/", (req, res) => {
     res.send("server is running");
 });

app.post("/add", async (req, res) => {   //this update of that 
    try{
        const game = new Game(req.body);
        await game.save();
        res.send("Game Saved");
    }catch (err) {
        res.status(500).send(err);
    }
});






app.get("/games", async (req, res) => {
    const data = await Game.find();
    res.json(data);
});

app.listen(5000, () => {console.log("server running");

});


app.get("/score", async (req, res) => {
    try {
        const latestScore = await 
        Game.findOne().sort({ _id: -1});
        res.json(latestScore);
    }catch(err) {
        res.status(500).send("error");
    }
 });