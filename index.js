class player{
    constructor(name, sign){
        this.name = name;
        this.sign = sign;
        this.wins = 0;
        this.loses = 0;
        this.winstreak = 0;
        this.losestreak = 0;
    }
    getInfo = () =>{
        return `
            <h1>${this.name}</h1>
            <p>Sign: ${this.sign}</p>
            <p>wins: ${this.wins}</p>
            <p>loses: ${this.loses}</p>
            <p>Winstreak: ${this.winstreak}</p>
            <p>Losestreak: ${this.losestreak}</p>
         `;
    }
    setStreak = (setter) =>{
        if(setter=="win"){
            this.winstreak++;
            this.losestreak = 0;
        }
        else if(setter=="lose"){
            this.losestreak++;
            this.winstreak = 0;
        }
        else{
            this.winstreak = 0;
            this.losestreak = 0;
        }
    }
    winCounter = () =>{
        this.wins++;
    }
    loseCounter = () =>{
        this.loses++;
    }
   
}
const reset = document.querySelector("button#reset");
const start = document.querySelector("button#start");
const p1 = document.querySelector("section#p1");
const p2 = document.querySelector("section#p2");
const player1 = new player("player1","X");
const player2 = new player("player2","O");
function generateBlankBoard(){
    const boardContainer = document.querySelector("section#board");
        for(let i=0;i<9;i++){
            let div = document.createElement("div");
            div.setAttribute("id",i+1);
            div.classList.add("square");
            boardContainer.appendChild(div);
        }
}
function checkCombos(array, sign){
    if(array[0]==sign && array[1]==sign && array[2]==sign){
        return true;
    }
    if(array[3]==sign && array[4]==sign && array[5]==sign){
        return true;
    }
    if(array[6]==sign && array[7]==sign && array[8]==sign){
        return true;
    }
    if(array[0]==sign && array[3]==sign && array[6]==sign){
        return true;
    }
    if(array[1]==sign && array[4]==sign && array[7]==sign){
        return true;
    }
    if(array[2]==sign && array[5]==sign && array[8]==sign){
        return true;
    }
    if(array[0]==sign && array[4]==sign && array[8]==sign){
        return true;
    }
    if(array[2]==sign && array[4]==sign && array[6]==sign){
        return true;
    }
    return false;
}
function checkWin(array1, array2){
    let message = "";
    if(checkCombos(array1,"X")==true){
        message = "p1win";
    }
    else if(checkCombos(array2,"O")==true){
        message = "p2win";
    }
    else{
        message = "draw";
    }
    return message;
}
function updateStatus(){
    p1.innerHTML = "";
    p1.innerHTML = player1.getInfo();
    p2.innerHTML = "";
    p2.innerHTML = player2.getInfo();
}
function startGame(){
    document.querySelector("section#tellwinner").textContent = "GOOD LUCK!";
    let isX = true;
    let signMark = "";
    var iterator = 0;
    var arrayX = [];
    var arrayO = [];
    var winner = false;
    const divs = document.querySelectorAll("div.square");
    divs.forEach(element => {
        element.addEventListener("click",function(e){
            if(element.textContent == "" && winner==false){
                console.log(isX);
                let status;
                if(isX){
                    signMark = "X";
                    arrayX[e.target.id-1] = signMark;
                    isX = false;
                }
                else{
                    signMark = "O";
                    arrayO[e.target.id-1] = signMark;
                    isX = true;
                }
                element.textContent = signMark;
                let winCheck = checkWin(arrayX,arrayO);
                const tellWinner = document.querySelector("section#tellwinner");
                if(winCheck === "draw" && iterator == 8){
                    winner = true;
                    status=true;
                    tellWinner.textContent = "It's draw, nobody loses, still good right?";
                    player1.setStreak("draw");
                    player2.setStreak("draw");
                }
                else if(winCheck == "p1win"){
                    winner = true;
                    status=true;
                    tellWinner.textContent = `${player1.name} is the winner`;
                    player1.winCounter();
                    player1.setStreak("win");
                    player2.loseCounter();
                    player2.setStreak("lose");
                    
                }
                else if(winCheck == "p2win"){
                    winner = true;
                    status=true;
                    tellWinner.textContent = `${player2.name} is the winner`;
                    player2.winCounter();
                    player2.setStreak("win");
                    player1.loseCounter();
                    player1.setStreak("lose");
                }
                iterator++;
                updateStatus();
                if(status){
                    arrayX.length = 0;
                    arrayO.length = 0;
                    isX = true;
                    signMark = "";
                    iterator = 0;
                    status=false;
                }
            }
        });
    });
}
function startPlaying(){
    startGame();
    start.removeEventListener("click",startPlaying);
}
function resetGame(){
    const divs = document.querySelectorAll("div.square");
    divs.forEach(element => {
        element.textContent = "";
    });
    startGame();
}
function generateStartInfo(){
    p1.innerHTML = player1.getInfo();
    p2.innerHTML = player2.getInfo();
}
function loadSettings(){
    generateBlankBoard();
    generateStartInfo();
}
start.addEventListener("click",startPlaying);
reset.addEventListener("click",resetGame);
window.addEventListener("load",loadSettings);