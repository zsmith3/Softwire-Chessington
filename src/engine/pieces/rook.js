import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "rook";
    }

    getAvailableMoves(board) {
        return this.getLateralMoves(board).filter(square => this.moveIsUnobstructed(board, square, true));
    }
}
