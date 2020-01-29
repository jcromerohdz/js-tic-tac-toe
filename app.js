const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const setName = (playerName) => (name = playerName);

  return { getName, getSymbol, setName };
};

const dom = (() => {
  const board = (() => {
    const dom = document.querySelectorAll('.boxcontainer div');
    const forAll = (callback) => {
      dom.forEach((item) => {
        callback(item);
      });
      return dom;
    };

    const setPosition = (position, content) => {
      dom[position].innerHTML = content;
    };

    return { forAll, setPosition };
  })();

  const messagebox = (() => {
    const dom = document.querySelector('#messages-box');
    const setMessage = (message) => dom.innerHTML = message;

    return { setMessage };
  })();

  return { board, messagebox };
})();

const gameBoard = (() => {
  let board = new Array(9).fill(null);
  const getBoard = () => board;
  const clear = () => {
    dom.board.forAll((x) => (x.innerHTML = ''));
    board = new Array(9).fill(null);
  };

  const setMove = (player, position) => {
    if (!board[position]) {
      board[position] = player.getSymbol();
      dom.board.setPosition(position, player.getSymbol());
      return true;
    }
    return false;
  };

  const gameOver = (lastPosition, player) => {
    const winnigCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let result = false;
    const sy = player.getSymbol();
    winnigCases.forEach(x => {
      if (sy === board[x[0]] && sy === board[x[1]] && sy === board[x[2]]) {
        result = player;
      }
    });
    return result;
  };

  return {
    getBoard, clear, setMove, gameOver,
  };
})();


const gameFlow = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let winner = false;

  const startGame = () => {
    player1 = Player('Player 1', 'X');
    currentPlayer = player1;
    player2 = Player('Player 2', 'O');
    gameBoard.clear();
    document.querySelector('#player1').value = '';
    document.querySelector('#player2').value = '';
    dom.messagebox.setMessage(`Welcome to the game, the first turn is for ${player1.getName()}`);
    winner = false;
    return true;
  };

  const move = (event) => {
    if (!winner) {
      if (gameBoard.setMove(currentPlayer, event.target.dataset.id)) {
        winner = gameBoard.gameOver(event.target.dataset.id, currentPlayer);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        if (winner) dom.messagebox.setMessage(`The winner is ${winner.getName()}`);
        else if (!gameBoard.getBoard().includes(null)) {
          dom.messagebox.setMessage('Ohh, it\'s a draw');
        } else dom.messagebox.setMessage(`Next turn is for ${currentPlayer.getName()}`);
      }
    }
  };

  const setPlayers = (event) => {
    if (event.target.id === 'player1') {
      player1.setName(event.target.value);
    } else {
      player2.setName(event.target.value);
    }
    dom.messagebox.setMessage(`Next turn is for ${currentPlayer.getName()}`);
    document.querySelector('#players').innerHTML = `${player1.getName()} VS ${player2.getName()}`;
  };

  return { move, startGame, setPlayers };
})();


dom.board.forAll(x => {
  x.addEventListener('click', gameFlow.move);
});

document.querySelector('.btn.btn-danger').addEventListener('click', gameFlow.startGame);

document.querySelector('#player1').addEventListener('keyup', gameFlow.setPlayers);

document.querySelector('#player2').addEventListener('keyup', gameFlow.setPlayers);

gameFlow.startGame();
