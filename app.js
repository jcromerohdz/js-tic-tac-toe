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
      }
    }

    return {getBoard, clear, setMove};
})();


const gameFlow = (() => {
  let player_1;
  let player_2;

  let startGame = () => {
    player_1 = Player('Christian', 'X');
    player_2 = Player('Luis', 'O');
    return true;
  }

  let move = () => {
      gameBoard.setMove(player_1, event.target.dataset.id);
  }

  return {move, startGame};

})();
//document.querySelector('.button.cancel').addEventListener('click', closeModal);
domBoard.forAll(x => {
  x.addEventListener('click', gameFlow.move);
});


gameBoard.clear();
gameFlow.startGame();