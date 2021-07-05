import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return this.getLateralMoves(board);
    }
}
