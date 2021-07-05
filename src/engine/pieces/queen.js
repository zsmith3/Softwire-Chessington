import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "queen";
    }

    getAvailableMoves(board) {
        return this.getLateralMoves(board).concat(this.getDiagonalMoves(board)).filter(square => this.moveIsUnobstructed(board, square, true));
    }
}
