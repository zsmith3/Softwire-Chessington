import Piece from './piece';
import Player from "../player";

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

    checkTakeMove(board, square) {
        return square.isValid() && !this.canLandAt(board, square, false) && this.canLandAt(board, square, true);
    }

    getTakeMoves(board, currentSquare, direction) {
        const takeMoves = [currentSquare.moveBy(direction, 1), currentSquare.moveBy(direction, -1)];
        return takeMoves.filter(square => this.checkTakeMove(board, square));
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === Player.WHITE ? 1 : -1;

        const standardMoves = this.getStandardMoves(board, currentSquare, direction);
        const takeMoves = this.getTakeMoves(board, currentSquare, direction);

        return standardMoves.concat(takeMoves);
    }
}
