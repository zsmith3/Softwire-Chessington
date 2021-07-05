import Piece from './piece';
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "pawn";
    }

    getStandardMoves(board, currentSquare, direction) {
        const isFirstMove = (this.player === Player.WHITE && currentSquare.row === 1) || (this.player === Player.BLACK && currentSquare.row === 6);
        const moveOne = currentSquare.moveBy(direction, 0);

        let allMoves;
        if (isFirstMove) allMoves = [moveOne, currentSquare.moveBy(2 * direction, 0)];
        else if (moveOne.isValid()) allMoves = [moveOne];
        else allMoves = [];

        return allMoves.filter(square => this.moveIsUnobstructed(board, square, false));
    }

    getTakeMoves(board, currentSquare, direction) {
        const takeMoves = [currentSquare.moveBy(direction, 1), currentSquare.moveBy(direction, -1)];
        return takeMoves.filter(square => square.isValid() && this.canTakeAtSquare(board, square));
    }

    getEnPassant(board, currentSquare, direction) {
        const horizontalAdjacentSquares = [currentSquare.moveBy(0, -1), currentSquare.moveBy(0, 1)];
        const possibleEnPassantSquares = horizontalAdjacentSquares.filter(square => {
            if (!square.isValid() || !this.canTakeAtSquare(board, square)) return false;
            const piece = board.getPiece(square);
            if (piece.pieceType !== "pawn") return false;
            const pieceLast = piece.history[piece.history.length - 1];
            return board.lastMovedPiece === piece && pieceLast.equals(square.moveBy(2 * direction, 0));
        });
        return possibleEnPassantSquares.map(square => square.moveBy(direction, 0));
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === Player.WHITE ? 1 : -1;

        const standardMoves = this.getStandardMoves(board, currentSquare, direction);
        const takeMoves = this.getTakeMoves(board, currentSquare, direction);
        const enPassantMoves = this.getEnPassant(board, currentSquare, direction);

        return standardMoves.concat(takeMoves).concat(enPassantMoves);
    }

    detectEnPassant(board, fromSquare, toSquare) {
        // NOTE this assumes the move is valid
        const rowDiff = Math.abs(toSquare.row - fromSquare.row);
        const colDiff = Math.abs(toSquare.col - fromSquare.col);
        if (rowDiff && colDiff && !this.canTakeAtSquare(board, toSquare)) return true;
        else return false;
    }
}
