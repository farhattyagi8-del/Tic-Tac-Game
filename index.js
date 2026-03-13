let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

 
let turnO = true;

 const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],  
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
 ];

boxes.forEach((box) => {

    box.addEventListener("click", () => {
        console.log("box clicked");
        if (turnO) {
            box.innerText ="O";
            turnO = false;
        }else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

          cheackWinner();


    });

});
     const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
     };

     const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
     }
    

 const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hidden");
        disableBoxes();
   };



const cheackWinner = () => {
    for ( let pattern of winPatterns) {
    

        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
                 if (pos1Value === pos2Value && pos2Value === pos3Value) {
                    console.log("winner is " + pos1Value);
                    showWinner();
    
}
        }
    }

}
const resetGame = () => {
    trueO =true;
    enableBoxes();
    msgContainer.classList.add("hidden");
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

