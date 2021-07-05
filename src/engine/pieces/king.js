import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "king";
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const allMoves = this.getLateralMoves(board).concat(this.getDiagonalMoves(board));
        return allMoves.filter(square => square.isAdjacentTo(currentSquare))
    }
}
