const GameBoard = (() => {
    let board = new new Array(9).fill(null);
    let getBoard = () => board;

    return {getBoard};
})();
