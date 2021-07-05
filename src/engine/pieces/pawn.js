import Piece from './piece';
import Player from "../player";
import GameSettings from "../gameSettings";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "pawn";
    }

    getAllMoves(board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === Player.WHITE ? 1 : -1;
        const isFirstMove = (this.player === Player.WHITE && currentSquare.row === 1) || (this.player === Player.BLACK && currentSquare.row === 6);
        const newRow = currentSquare.row + direction;
        const canMove = newRow >= 0 && newRow < GameSettings.BOARD_SIZE;
        if (isFirstMove) return [currentSquare.moveBy(direction, 0), currentSquare.moveBy(2 * direction, 0)];
        else if (canMove) return [currentSquare.moveBy(direction, 0)];
        else return [];
    }

    getAvailableMoves(board) {
        return this.getAllMoves(board).filter(square => this.moveIsUnobstructed(board, square, false));
    }
}
