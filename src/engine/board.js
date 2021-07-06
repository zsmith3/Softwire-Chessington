import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Pawn from "./pieces/pawn";
import Rook from "./pieces/rook";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Queen from "./pieces/queen";
import Bishop from "./pieces/bishop";

export default class Board {
    static createPiece(pieceType, player) {
        const classes = {pawn: Pawn, rook: Rook, king: King, knight: Knight, queen: Queen, bishop: Bishop};
        return new classes[pieceType](player);
    }

    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.lastMovedPiece = null;
        this.pawnPromotionSquare = null;
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
            this.specialMoveActions(movingPiece, fromSquare, toSquare);
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            this.lastMovedPiece = movingPiece;
        }
    }

    specialMoveActions(movingPiece, fromSquare, toSquare) {
        if (movingPiece.pieceType === "pawn" && movingPiece.detectEnPassant(this, fromSquare, toSquare)) {
            this.setPiece(Square.at(fromSquare.row, toSquare.col), undefined);
        }
        if (movingPiece.pieceType === "king" && movingPiece.detectCastle(this, fromSquare, toSquare)) {
            movingPiece.applyCastle(this, fromSquare, toSquare);
        }
        if (movingPiece.pieceType === "pawn" && movingPiece.detectPromotion(this, fromSquare, toSquare)) {
            document.getElementById("chess-board").style.pointerEvents = "none";
            document.getElementById("piece-chooser").style.display = "block";
            this.pawnPromotionSquare = toSquare;
        }
    }

    promotePawn(pieceType) {
        const newPiece = Board.createPiece(pieceType, (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE));
        this.setPiece(this.pawnPromotionSquare, newPiece);
        document.getElementById("chess-board").style.pointerEvents = "auto";
        document.getElementById("piece-chooser").style.display = "none";
        this.pawnPromotionSquare = null;
    }

    detectCheck(king) {
        const kingSquare = this.findPiece(king);
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                const piece = this.board[row][col];
                if (!piece || piece.player === king.player) continue;
                if (piece.getAvailableMoves(this, true).some(square => square.equals(kingSquare))) {
                    return true;
                }
            }
        }
        return false;
    }
}
