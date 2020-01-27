const Player = (name, symbol) => {

  let getName = () => name;
  let getSymbol = () => symbol;
  let setName = (playerName) => name=playerName;

  return {getName, getSymbol, setName};
};

const dom = (()=>{
  const board = (()=>{
    let dom = document.querySelectorAll('.boxcontainer div');
    let forAll = (callback) => {
      dom.forEach((item) => {
        callback(item)
      });
      return dom;
    }

    let setPosition = (position, content) => {
      dom[position].innerHTML = content;
    }

    return {forAll, setPosition}
  })();

  const messagebox = (()=>{
    let dom = document.querySelector('#messages-box');
    let setMessage = (message) => {
      return dom.innerHTML = message;
    }

    return {setMessage}
  })();

  return {board, messagebox};
})();

const gameBoard = (() => {
    let board = new Array(9).fill(null);
    let getBoard = () => board;
    let clear = ()  => {
      dom.board.forAll(x=> x.innerHTML = '');
      board = new Array(9).fill(null);
    };

    let setMove = (player, position) => {
      if (!board[position]) {
        board[position] = player.getSymbol();
        dom.board.setPosition(position, player.getSymbol());
        return true;
      }else{
        return false;
      }
    }

    let gameOver = (lastPosition, player) => {
      let winnigCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
      let result = false;
      winnigCases.forEach( x  => {
        // if (!x.includes(parseInt(lastPosition))) return;
        if (player.getSymbol() == board[x[0]] && player.getSymbol() == board[x[1]] && player.getSymbol() == board[x[2]] ){
          result = player;
        }

      });
      return result;
    }

    return {getBoard, clear, setMove, gameOver};
})();


const gameFlow = (() => {
  let player_1;
  let player_2;
  let currentPlayer;
  let winner = false;

  let startGame = () => {

    player_1 = Player('Player 1', 'X');
    currentPlayer = player_1;
    player_2 = Player('Player 2', 'O');



    return true;
  }

  let move = () => {
    if (!winner) {
      if (gameBoard.setMove(currentPlayer, event.target.dataset.id)){
        winner = gameBoard.gameOver(event.target.dataset.id, currentPlayer)
        currentPlayer = currentPlayer == player_1 ? player_2  : player_1;
        if (winner) dom.messagebox.setMessage(`The winner is ${winner.getName()}`);
      }
    }
  }

  let setPlayers = () => {
    if (event.target.id == 'player1'){
      player_1.setName(event.target.value);
    }else{
      player_2.setName(event.target.value);
    }

    document.querySelector('#players').innerHTML = `${player_1.getName()} VS ${player_2.getName()}`;
  }

  return {move, startGame, setPlayers};

})();



dom.board.forAll(x => {
  x.addEventListener('click', gameFlow.move);
});

clearBtn = document.querySelector(".btn.btn-danger");

clearBtn.addEventListener('click', () => {
  gameBoard.clear();
  document.querySelector("#player1").value='';
  document.querySelector("#player2").value='';
});

let player1 = document.querySelector("#player1")
player1.addEventListener('keydown', gameFlow.setPlayers);

let player2 = document.querySelector("#player2")
player2.addEventListener('keydown', gameFlow.setPlayers);


gameBoard.clear();
gameFlow.startGame();
