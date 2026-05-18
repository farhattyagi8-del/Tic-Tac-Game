let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); //this use for select the element of html like sclass or id nane to access
let msg = document.querySelector("#msg");
let clickSound = document.querySelector("#clickSound");
let music = document.querySelector("#music");
let winSound = document.querySelector("#winSound");

// Current session scores (reset on page refresh)
let xScore = 0;
let OScore = 0;
 
let turnO = true;   // this variable use for check the turn of player if true then O and false then X
let count = 0;

const currentTrunDisplay = document.getElementById("currentTurn");
const playerBtn = document.getElementById("player");
const playersBtn = document.getElementById("players");
let isPlayerVsAI = true;

const updateModeButtons = () => {
    if (isPlayerVsAI) {
        playerBtn.classList.add("mode-active");
        playersBtn.classList.remove("mode-active");
    } else {
        playersBtn.classList.add("mode-active");
        playerBtn.classList.remove("mode-active");
    }
};

const UpdateCurrentPlayerDisplay = () => {
    currentTrunDisplay.innerText = `player ${turnO ? "O" : "X"}`;
    currentTrunDisplay.style.color = turnO ? "rgb(240, 37, 132)" : "rgb(19, 134, 210)";
};

playerBtn.addEventListener("click", () => {
    isPlayerVsAI = true;
    updateModeButtons();
    resetGame();
});

playersBtn.addEventListener("click", () => {
    isPlayerVsAI = false;
    updateModeButtons();
    resetGame();
});

updateModeButtons();

const winPatterns = [    // this is the rray of winning pattern in tic tac toe game
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],  
    [1, 4, 7], 
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
 ];


 const resetGame = () => {  // this function use for reset the game when click on reset button or new game button
    turnO = true;
    count = 0; //
    enableBoxes();  // this is use for enable the boxes when reset the game
    msgContainer.classList.add("hidden");   // this is use for hide the message container when reset the game
    UpdateCurrentPlayerDisplay();
};

//


boxes.forEach((box) => {    //this use for add event listner on each box when click on box then it will check the turn of player and update the box with O or X and disable the box after click and also check the winner after each click

    box.addEventListener("click", () => {  
        if (box.innerText !== "") return;
        if (!turnO && isPlayerVsAI) return; // Ignore human X clicks in AI mode while the bot is thinking

        if (!isMuted) clickSound.play();
        
        if (turnO) {
            box.innerText = "O";
            box.classList.add("O"); // this is use for update the box with O when turnO is true
            turnO = false;
            count++;
            UpdateCurrentPlayerDisplay();
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
            count++;
            UpdateCurrentPlayerDisplay();
        }
        
        box.disabled = true; // this is use for disable the box after click
        // this is use for count the number of click on box and when count is 9 then it will check the game draw

        let isWinner = checkWinner();  // this is use for check the winner after each click and return true if there is a winner

        if (count === 9 && !isWinner) { 
            gameDraw();
            return;
        }
        if (!turnO && !isWinner && isPlayerVsAI) {   
            setTimeout(() => {  /// call bay ai to delay
                computerMove();
                turnO = true;
                UpdateCurrentPlayerDisplay();
            }, 500);  ///500 means 0.5 second
        }

    });

});


   UpdateCurrentPlayerDisplay();
const gameDraw = () => {  // this function use for show the game draw message when there is no winner and count is 9
    msg.innerText = "No winner! 😒 ";
    msg.style.position = "fixed";
      msg.style.top = "49%";
        msg.style.left = "50%";
        msg.style.animation = "move 1s infinite alternate";
            msg.style.transform = "translate(-50%, -50%)";
                msg.style.fontSize = "4rem";
                    msg.style.fontStyle = "bold";
                        msg.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                            msg.style.padding = "20px 40px";
                                msg.style.borderRadius = "10px";
                                    msg.style.border = "2px solid rgb(246, 219, 44)";
                                    // msg.style.Keyframesmove{
                                    //     from{
                                    //         transform: translateY(0px);

                                    //     }
                                    //     to{
                                    //         transform: translateY(-20px);
                                    //     }
                                    // }
    if (!isMuted) music.play();
    msgContainer.classList.remove("hidden"); //
    disableBoxes();
    updateMatchStatus("draw");

   };


     const disableBoxes = () => { // this function use for disable all the boxes when there is a winner or game draw 
        for (let box of boxes) {
            box.disabled = true;
        }
     };

     const enableBoxes = () => { // this function use for enable all the boxes when reset the game
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
            box.classList.remove("x", "O");
        }
        UpdateCurrentPlayerDisplay();
     };
    

 const showWinner = (winner) => { // this function use for show the winner message when there is a winner and also disable all the boxes
    msg.innerText = `Congratulations! ${winner} wins!`;


    msg.style.position = "fixed";
      msg.style.top = "49%";
        msg.style.left = "50%";
            msg.style.transform = "translate(-50%, -50%)";
            msg.style.fontSize = "4rem";
             msg.style.fontStyle = "italic";
              msg.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
               msg.style.padding = "20px 40px";
                msg.style.borderRadius = "10px";
                msg.style.border = "2px solid rgb(246, 219, 44)";
             msg.style.color = "rgb(246, 219, 44)";
              msg.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8)";
               msg.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.6)";
                msg.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.4)";
    if (!isMuted) winSound.play();
    showConfetti();
    msgContainer.classList.remove("hidden");
        disableBoxes();

        // Update current session scores
        if (winner === "X") {
            xScore++;
            document.getElementById("xscore").innerText = xScore;
            document.getElementById("xscore").style.color = "rgb(185, 231, 69)";
        } else if (winner === "O") {
            OScore++;
            document.getElementById("Oscore").innerText = OScore;
            document.getElementById("Oscore").style.color = "rgb(185, 231, 69)";
        }

        updateMatchStatus(winner);
        saveWinner(winner);   // Save to MongoDB for records
   };



const checkWinner = () => {  // this function use for check the winner by iterating through the winPatterns array and checking the values of the boxes at the positions of the winning pattern and return true if there is a winner
    for ( let pattern of winPatterns) { //this is loop use for check win pattern
    

        let pos1Value = boxes[pattern[0]].innerText; // this is use for get the value of the box at the position of the winning pattern
        let pos2Value = boxes[pattern[1]].innerText;  
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != "" && pos2Value != "" && pos3Value != "") { //
                 if (pos1Value === pos2Value && pos2Value === pos3Value) {
                    console.log("winner is " + pos1Value);
                    showWinner(pos1Value);
                    return true;
    
}

        }
    }

};

// // this is use for add event listner on new game button when click on new game button then it will reset the game
resetbtn.addEventListener("click", resetGame);


 function showConfetti() {
    confetti ({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
 }


//   open closse menu

const homebtn = document.getElementById("homebtn"); 
const homemenu =  document.getElementById("homemenu");

homebtn.addEventListener("click", () => {
    homemenu.classList.toggle("hide");
});


let isMuted = false;
const volumebtn = document.getElementById("volumebtn");

volumebtn.addEventListener("click", () =>{
    isMuted  = !isMuted;
    volumebtn.textContent = isMuted ? "🔇" : "🔊"
    if (isMuted) stopAllSound();
});


const stopAllSound = () => { //all sound stop function
    clickSound.pause();
    music.pause();
    winSound.pause();
    clickSound.currentTime = 0;
     music.currentTime = 0;
      winSound.currentTime = 0;

};
   
const themsbtn = document.getElementById("themsbtn");

themsbtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");  //its use for on off 


if 
(document.body.classList.contains ("dark-mode")){
    themsbtn.textContent = "🔆";
} else {
    themsbtn.textContent = "🌛";
}
});


function saveWinner(winner) {
    fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({winner})
    })
    .then(res => res.text())
    .then(data => console.log("saved:", data))
    .catch(err => console.log("error:", err));
};





function computerMove() {
    // let emptyBoxes = [];
    for(let pattern of winPatterns) {
        let[a, b, c,] = pattern;

        let val1 = boxes[a].innerText;
         let val2 = boxes[b].innerText;
          let val3 = boxes[c].innerText;

          if(val1 === "X" && val2 === "X" && val3 === "" )

        {
            makeMove(c);
            return;
          }

          if(val1 === "X" && val3 === "X" && val2 === ""){
            makeMove(b);
            return;
          }

          if(val2 === "X" && val3 === "X" && val1 === ""){
            makeMove(a);
            return;
          }
    }
      // block move of O
    for(let pattern of winPatterns) {
        let[a, b, c,] = pattern;

        let val1 = boxes[a].innerText;
         let val2 = boxes[b].innerText;
          let val3 = boxes[c].innerText;

          if(val1 === "O" && val2 === "O" && val3 === ""){
            makeMove(c);
            return;
          }

          if(val1 === "O" && val3 === "O" && val2 === ""){
            makeMove(b);
            return;
          }

          if(val2 === "O" && val3 === "O" && val1 === ""){
            makeMove(a);
            return;
          }
    }

        let emptyBoxes = [];

    boxes.forEach((box, index) => {
        if(box.innerText === ""){    
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    makeMove(randomIndex);


}

//  Random move  
function makeMove(index){
    let box = boxes[index];

    box.innerText = "X";
    box.classList.add("x");
    box.disabled = true;
count++;
     let iswinner = checkWinner();
 if (count === 9 && !iswinner){
        gameDraw();
    }
}

let matchCount = 0;
let xWins = 0;
let oWins = 0;
let draws = 0;

function updateMatchStatus(winner) {
    matchCount++;
    document.getElementById("matches").innerText = matchCount;

    if (winner === "X") {
        xWins++;
    } else if (winner === "O") {
        oWins++;
    } else {
        draws++;
    }

    document.getElementById("wins").innerText = xWins + oWins;
    document.getElementById("draws").innerText = draws;
  }
  
