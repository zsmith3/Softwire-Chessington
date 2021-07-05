import Piece from './piece';
import Player from "../player";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === Player.WHITE ? 1 : -1;
        const isFirstMove = (this.player === Player.WHITE && currentSquare.row === 1) || (this.player === Player.BLACK && currentSquare.row === 6);
        if (isFirstMove) return [currentSquare.moveBy(direction, 0), currentSquare.moveBy(2 * direction, 0)];
        else return [currentSquare.moveBy(direction, 0)];
    }
}
