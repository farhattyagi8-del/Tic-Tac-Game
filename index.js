let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); //this use for select the element of html like sclass or id nane to access
let msg = document.querySelector("#msg");

 
let turnO = true;   // this variable use for check the turn of player if true then O and false then X
let count = 0;

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
};

boxes.forEach((box) => {    //this use for add event listner on each box when click on box then it will check the turn of player and update the box with O or X and disable the box after click and also check the winner after each click

    box.addEventListener("click", () => {   //
        // console.log("box clicked");
        if (turnO) {
            box.innerText ="O"; // this is use for update the box with O when turnO is true
            turnO = false;
        }else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // this is use for disable the box after click
        count++;  // this is use for count the number of click on box and when count is 9 then it will check the game draw

        let isWinner = checkWinner();  // this is use for check the winner after each click and return true if there is a winner

        if (count === 9 && !isWinner) { // this is use for check the game draw when count is 9 and no winner
            gameDraw();

        //  cheackWinner();
        }

    });

});


   const gameDraw = () => {  // this function use for show the game draw message when there is no winner and count is 9
    msg.innerText = "No winnenr";
    msgContainer.classList.remove("hidden"); //
    disableBoxes();

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
        }
     };
    

 const showWinner = (winner) => { // this function use for show the winner message when there is a winner and also disable all the boxes
    msg.innerText = `Congratulations! ${winner} wins!`;
    msgContainer.classList.remove("hidden");
        disableBoxes();

        
        
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





 