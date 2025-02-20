import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "knight";
    }

    getAllMoves(board) {
        const currentSquare = board.findPiece(this);
        return [
            currentSquare.moveBy(-2, -1),
            currentSquare.moveBy(-2, 1),
            currentSquare.moveBy(-1, -2),
            currentSquare.moveBy(-1, 2),
            currentSquare.moveBy(1, -2),
            currentSquare.moveBy(1, 2),
            currentSquare.moveBy(2, -1),
            currentSquare.moveBy(2, 1)
        ];
    }

    getAvailableMoves(board, allowTakeKing) {
        const allMoves = this.getAllMoves(board);
        const validMoves = allMoves.filter(square => square.isValid());
        return validMoves.filter(square => this.canLandAt(board, square, true, allowTakeKing));
    }
}
