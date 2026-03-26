
 const express = require("express");
const mongoose  =  require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tictactoe")
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

// app.post("/save-result", async (req,res) => {
//     const {winner} = req.body;
//     const game = new Game({winner});
//     await game.save();
//     res.json({message: "saved"});

// });

app.post("/add", async (req, res) => {   //this update of that 
    try{
        const game = new Game(req,body);
        await game.save(0);
        res.send("Game Saved");
    }catch (err) {
        res.status(500).send(err);
    }
});



// app.get("/result", async( req,res) => {
//     const game = await
//     Game.findOne().sort({date: -1});
//     res.json(game);
// });


app.get("/games", async (req, res) => {
    const data = await Game.find();
    res.json(data);
});

app.listen(5000, () => {console.log("server running");

});


fetch("http://localhost:5000/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        winner: "currentPlayer"
    })
});




fetch("https://localhost:5000/game")
.then(res => res.json())
.then(data => {
    console.log(data);
});