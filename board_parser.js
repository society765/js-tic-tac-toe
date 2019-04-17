
const boardParser = function (curState, clickedID) {
    // var newState = Object.assign({}, curState);
    // newState.board = [...newState.board]; 

    // jQuery deep copy, or JSON deep copy (without functions)
    var newState = $.extend(true, {}, curState);
    // var newState = JSON.parse(JSON.stringify(curState)); 

    if (newState.board[clickedID] == ' ') {
        newState.board[clickedID] = newState.curPlayer;

        newState.endOfGame = gameIsEndTest(newState.board);
        if (newState.endOfGame) return newState;

        if (newState.curPlayer == 'O') {
            newState.curPlayer = 'X';
        } else {
            newState.curPlayer = 'O';
        }
    }

    return newState;
}

const boardRandomParser = function (curState) {
    if (curState.endOfGame) return $.extend(true, {}, curState); 

    var boardBlankId = [];
    for (var i in curState.board) {
        if (curState.board[i] == ' ') boardBlankId.push(i);
    }
    if (boardBlankId.length == 0) return $.extend(true, {}, curState);

    var rn = Math.floor(Math.random() * boardBlankId.length);
    return boardParser(curState, boardBlankId[rn]);
}

/**@param {String} board */
/**@returns {boolean} */
const gameIsEndTest = function (board) {
    var curPlayer, reduced;

    curPlayer = 'X';
    reduced = board.map(x => x == curPlayer);
    if (gameIsEndTestA(reduced)) return true;

    curPlayer = 'O';
    reduced = board.map(x => x == curPlayer);
    if (gameIsEndTestA(reduced)) return true;

    return false;
}

/**@param {Array<boolean>} board */
/**@returns {boolean} */
const gameIsEndTestA = function (board) {
    if (board[0] && board[1] && board[2]) return true;
    else if (board[3] && board[4] && board[5]) return true;
    else if (board[6] && board[7] && board[8]) return true;
    else if (board[0] && board[3] && board[6]) return true;
    else if (board[1] && board[4] && board[7]) return true;
    else if (board[2] && board[5] && board[8]) return true;
    else if (board[0] && board[4] && board[8]) return true;
    else if (board[2] && board[4] && board[6]) return true;
    else return false;
}

export { boardParser, boardRandomParser }; 