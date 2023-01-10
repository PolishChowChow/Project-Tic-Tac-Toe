//Object generating players with stats
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
//global variables used in code
const reset = document.querySelector("button#reset");
const start = document.querySelector("button#start");
const p1 = document.querySelector("section#p1");
const p2 = document.querySelector("section#p2");
const player1 = new player("player1","X");
const player2 = new player("player2","O");
//function generating nine squares on the board
function generateBlankBoard(){
    const boardContainer = document.querySelector("section#board");
        for(let i=0;i<9;i++){
            let div = document.createElement("div");
            div.setAttribute("id",i+1);
            div.classList.add("square");
            boardContainer.appendChild(div);
        }
}
//game starting function
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

//checking if player wins
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
function checkCombos(array, sign){
    if(checkRows(array,sign)){
        return true;
    }
    if(checkColumns(array,sign)){
        return true;
    }
    if(checkDiagonally(array,sign)){
        return true;
    }
}
function checkRows(arr, sign){
    let j = 0;
    for(let i=0;i<3;i++){
        if(arr[j]==sign && arr[j+1]==sign && arr[j+2]==sign){
            return true;
        }
        j+=3;
    }
    return false;
}
function checkColumns(arr, sign){
    for(let i=0;i<3;i++){
        if(arr[i]==sign && arr[i+3]==sign && arr[i+6]==sign){
            return true;
        }
    }
    return false;
}
function checkDiagonally(arr, sign){
    if(arr[0]==sign && arr[4]==sign && arr[8]==sign){
        return true;
    }
    if(arr[2]==sign && arr[4]==sign && arr[6]==sign){
        return true;
    }
    return false;
}

//updating information about players (e.g. if they're winstreaking or not)
function updateStatus(){
    p1.innerHTML = "";
    p1.innerHTML = player1.getInfo();
    p2.innerHTML = "";
    p2.innerHTML = player2.getInfo();
}

//this is for disabling bug when the user clicks starts more than once
function startPlaying(){
    startGame();
    start.removeEventListener("click",startPlaying);
}

//It allows user to do rematch
function resetGame(){
    const divs = document.querySelectorAll("div.square");
    divs.forEach(element => {
        element.textContent = "";
    });
    startGame();
}

//this generates information about players in aside container
function generateStartInfo(container, player){
    container.innerHTML = player.getInfo();
}

//settings needed to load before game starts
function loadSettings(){
    generateBlankBoard();
    generateStartInfo(p1,player1);
    generateStartInfo(p2,player2);
}

//listeners for the main functions
start.addEventListener("click",startPlaying);
reset.addEventListener("click",resetGame);
window.addEventListener("load",loadSettings);