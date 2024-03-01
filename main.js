//tic tac toe

//Gameboard
const board = document.getElementById('board');


const Gameboard= ( () => {
   let  gameboard = ["","","","","","","","",""];

   const render = ()=>{
    let boardHTML= "";
    gameboard.forEach((cell,index) =>  {
        boardHTML += `<div class="cell" id="cell-${index}" data-cell>${cell}</div>`
    })
    document.querySelector('#board').innerHTML = boardHTML;
    const cellEl = document.querySelectorAll('[data-cell]');
    console.log(cellEl);
    cellEl.forEach((cell) =>{
    cell.addEventListener("click", Game.handleClick)
}) 
   }
   const Update = (index,value) =>{
    gameboard[index] = value;
    render()
   }
   const getGameboard = () => gameboard;
   return {
    gameboard,
    render,
    Update,
    getGameboard}
})();
console.log(Gameboard);

//player  create for two players.
const player = (
    function (name,marker) {
    return {name,marker};
});

//playgame >> GAME FLOW FUNCTION.
// ?? factory function

const Game = (
    //users choice of marker
    function () {
        let players = [];
        let currentPlayerIndex;
        let gameOver ;

        const start = () => {
            players = [
                player(document.getElementById('player1').value,"x"),
                player(document.getElementById('player2').value,"o")
              ];
            console.log(players);
            currentPlayerIndex = 0;
            gameOver = false;
            Gameboard.render();            
            const cellEl = document.querySelectorAll('[data-cell]');
            cellEl.forEach((cell) =>{
            cell.addEventListener("click", handleClick)

              // computer v human.
            const ComputerChoice = getComputerChoice();


    })

        }
        const handleClick =(e) =>{
            if (gameOver) {
                return;
            }
           let index = parseInt( e.target.id.split('-')[1]);
           if (Gameboard.getGameboard()[index] !== "")
            return;
            Gameboard.Update(index,players[currentPlayerIndex].marker);

            if (checkForWin(Gameboard.getGameboard(),
                players[currentPlayerIndex].marker)) {
                    gameOver = true;
                    winningMessageTextEl.innerText=`${players[currentPlayerIndex].name} wins!`
                
            } else if (checkForTie(Gameboard.getGameboard())) {
                gameOver = true;
                winningMessageTextEl.innerText=`it's a tie`;
            }
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;


        } 
      
        const restart = () => {
            for ( let i = 0 ; i < 9; i++){
                Gameboard.Update(i,"");
            }
            winningMessageTextEl.innerText="";
            gameOver = false;
            Gameboard.render()
        }

        return{
            start,
            handleClick,
            restart};
    }
    
)();

function checkForWin(board) {
    const WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
    [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a,b,c] = WINNING_COMBINATIONS[i];
        if (board[a] && board[a]=== board[b]&& board[a]=== board[c])
        {
         return true;   
        }
        
    }
}

function checkForTie(board){
    return board.every(cell => cell !=="")
} 

const startButton = document.getElementById('startButton');
startButton.addEventListener('click',()=>{
   Game.start();
})

const restarButton = document.getElementById('restartButton');
restarButton.addEventListener('click',()=>{Game.restart()} );

const winningMessageEl = document.getElementById('winning-message')
const winningMessageTextEl = document.querySelector('[data-winning-message-text]');
