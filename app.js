const gameBoard = (() => {
    let board = new Array(9).fill(null);
    let getBoard = () => board;

    return {getBoard};
})();

const Player = (name, symbol) => {

  let getName = () => name;
  let getSymbol = () => symbol;

  return {getName, getSymbol};
};




const gameFlow = (() => {

})();


player_1 = Player('Christian', 'X');
player_2 = Player('Luis', 'O');

console.log(player_1.getName(), player_1.getSymbol());
console.log(player_2.getName(), player_2.getSymbol());
