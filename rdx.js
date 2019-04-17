import { boardParser, boardRandomParser } from './board_parser.js';

const CLICK_event = 'CLICK';
const CLEAR_event = 'CLEAR';
const RANDOM_event = 'RANDOM';

const defaultState = {
    board: { curPlayer: 'O', board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], endOfGame: false }
}

const clickAction = function (id) {
    return { type: CLICK_event, id: id };
}
const clearAction = function () {
    return { type: CLEAR_event };
}
const randomAction = function () {
    return { type: RANDOM_event };
}

const boardReducer = function (state = defaultState.board, action) {
    switch(action.type){ 
        case CLICK_event: return boardParser(state, action.id); 
        case CLEAR_event: return $.extend(true, {}, defaultState.board); 
        case RANDOM_event: return boardRandomParser(state); 
        case 'ENDGAME': 
            var newState = $.extend(true, {}, state); 
            newState.endOfGame = true; 
            return newState; 
        
        default: return $.extend(true, {}, state); 
    }
}

var store = Redux.createStore(Redux.combineReducers({
    board: boardReducer
}));
store.subscribe(function () {
    console.log('Redux store:', store.getState());
})

export { store, clickAction, clearAction, randomAction }; 