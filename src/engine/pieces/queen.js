import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "queen";
    }

    getAvailableMoves(board, allowTakeKing) {
        const lateralMoves = this.getLateralMoves(board);
        const diagonalMoves = this.getDiagonalMoves(board);
        const allMoves = lateralMoves.concat(diagonalMoves);
        return allMoves.filter(square => this.moveIsUnobstructed(board, square, true, allowTakeKing));
    }
}
