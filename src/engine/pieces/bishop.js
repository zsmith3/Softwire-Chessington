import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "bishop";
    }

    getAvailableMoves(board, allowTakeKing) {
        return this.getDiagonalMoves(board).filter(square => this.moveIsUnobstructed(board, square, true, allowTakeKing));
    }
}
