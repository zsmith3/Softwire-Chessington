import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.lastMovedPiece = null;
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);
        if (!movingPiece) throw `No piece at square ${fromSquare}`;
        else if (movingPiece.player !== this.currentPlayer) throw "Cannot move piece belonging to wrong player";
        else {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.specialMoveActions(movingPiece, fromSquare, toSquare);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            this.lastMovedPiece = movingPiece;
        }
    }

    specialMoveActions(movingPiece, fromSquare, toSquare) {
        if (movingPiece.pieceType === "pawn" && movingPiece.detectEnPassant(this, fromSquare, toSquare)) {
            this.setPiece(Square.at(fromSquare.row, toSquare.col), undefined);
        }
    }
}
