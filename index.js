const player = (name, sign) => {
    wins = 0;
    draws = 0;
    loses = 0;
    const getInfo = () =>{
        return `Player ${this.name} wins ${this.wins} times, loses ${this.loses} times and make draw ${this.draws} times.`;
    }
    const getSign = () =>{
        return this.sign;
    }
    return {name,getInfo,getSign}
}
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
    //console.log("check win every time array: "+array1+" "+array2);
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
function startGame(){
    let isX = true;
    console.log(isX);
    let signMark = "";
    var iterator = 0;
    var arrayX = [];
    var arrayO = [];
    player1 = player("player1","X");
    player2 = player("player2","O");
    const divs = document.querySelectorAll("div.square");
    divs.forEach(element => {
        element.addEventListener("click",function(e){
            if(element.textContent == ""){
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
                if(winCheck === "draw" && iterator == 8){
                    alert("draw");
                    status=true;
                }
                else if(winCheck == "p1win"){
                    alert("player 1 won");
                    status=true;
                }
                else if(winCheck == "p2win"){
                    alert("player 2 won");
                    status=true;
                }
                iterator++;
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
function resetGame(){
    const divs = document.querySelectorAll("div.square");
    divs.forEach(element => {
        element.textContent = "";
    });
    startGame();
}


const reset = document.querySelector("button#reset");
const start = document.querySelector("button#start");
start.addEventListener("click",startGame);
reset.addEventListener("click",resetGame);
window.addEventListener("load",generateBlankBoard);