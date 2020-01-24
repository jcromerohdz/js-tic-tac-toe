const Player = (name, symbol) => {

  let getName = () => name;
  let getSymbol = () => symbol;

  return {getName, getSymbol};
};

const domBoard = (()=>{
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

const gameBoard = (() => {
    let board = new Array(9).fill(null);
    let getBoard = () => board;
    let clear = ()  => domBoard.forAll(x=> x.innerHTML = '');

    let setMove = (player, position) => {
      if (!board[position]) {
        board[position] = player.getSymbol();
        domBoard.setPosition(position, player.getSymbol());
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

  let startGame = () => {

    player_1 = Player('Christian', 'X');
    currentPlayer = player_1;
    player_2 = Player('Luis', 'O');

    return true;
  }

  let move = () => {

      if (gameBoard.setMove(currentPlayer, event.target.dataset.id)){
          let winner = gameBoard.gameOver(event.target.dataset.id, currentPlayer)
          currentPlayer = currentPlayer == player_1 ? player_2  : player_1;
          console.log(winner);
      }

  }

  return {move, startGame};

})();
//document.querySelector('.button.cancel').addEventListener('click', closeModal);
domBoard.forAll(x => {
  x.addEventListener('click', gameFlow.move);
});


gameBoard.clear();
gameFlow.startGame();
