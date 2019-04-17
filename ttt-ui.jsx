import * as rdx from './rdx.js';

class TicTacToe extends React.Component {
    constructor(props) {
        super(props);

        this.clickHandle = this.clickHandle.bind(this);
    }

    clickHandle(event) {
        if (!this.props.endOfGame) {
            var clickedId = event.target.id.slice(-1);
            this.props.clickAction(clickedId);
        }
    }

    render() {
        var gameIsEnd = this.props.endOfGame ? (<span>&nbsp;&nbsp; Game is end! Click [Clear].</span>) : (<span></span>); 

        return (
            <div className='container' id='ttt-main-container'>
                <div className="row mb-1">Current player: {this.props.curPlayer} {gameIsEnd}</div>
                <div className="row">
                    <div className="col-4 t-grid text-center" id='t-grid-0' onClick={this.clickHandle}>{this.props.board[0]}</div>
                    <div className="col-4 t-grid text-center" id='t-grid-1' onClick={this.clickHandle}>{this.props.board[1]}</div>
                    <div className="col-4 t-grid text-center" id='t-grid-2' onClick={this.clickHandle}>{this.props.board[2]}</div>
                </div>
                <div className="row">
                    <div className="col-4 t-grid text-center" id='t-grid-3' onClick={this.clickHandle}>{this.props.board[3]}</div>
                    <div className="col-4 t-grid text-center" id='t-grid-4' onClick={this.clickHandle}>{this.props.board[4]}</div>
                    <div className="col-4 t-grid text-center" id='t-grid-5' onClick={this.clickHandle}>{this.props.board[5]}</div>
                </div>
                <div className="row">
                    <div className="col-4 t-grid text-center" id='t-grid-6' onClick={this.clickHandle}>{this.props.board[6]}</div>
                    <div className="col-4 t-grid text-center" id='t-grid-7' onClick={this.clickHandle}>{this.props.board[7]}</div>
                    <div className="col-4 t-grid text-center" id='t-grid-8' onClick={this.clickHandle}>{this.props.board[8]}</div>
                </div>
                <div className="row justify-content-end">
                    <button class='btn btn-primary m-1 d-none' onClick={this.props.endGameAction}> Debug </button>
                    <button class='btn btn-primary m-1' onClick={this.props.randomAction}> Random </button>
                    <button class='btn btn-primary m-1' onClick={this.props.clearAction}> Clear </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return { curPlayer: state.board.curPlayer, board: state.board.board, endOfGame: state.board.endOfGame };
}
const mapDispatchToProps = function (dispatch) {
    return {
        clickAction: function (id) {
            dispatch(rdx.clickAction(id));
        },
        clearAction: function () {
            dispatch(rdx.clearAction());
        },
        randomAction: function () {
            dispatch(rdx.randomAction());
        },
        endGameAction: function () { dispatch({ type: 'ENDGAME' }); }
    };
}
const TicTacToeC = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
const Provider = ReactRedux.Provider;

class TicTacToeW extends React.Component {
    render() {
        return (
            <Provider store={rdx.store}>
                <TicTacToeC />
            </Provider>
        );
    }
}

ReactDOM.render(<TicTacToeW />, document.getElementById('div-main')); 