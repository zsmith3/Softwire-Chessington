import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        let allMoves = [];
        allMoves.push(currentSquare.moveBy(-2, -1));
        allMoves.push(currentSquare.moveBy(-2, 1));
        allMoves.push(currentSquare.moveBy(-1, -2));
        allMoves.push(currentSquare.moveBy(-1, 2));
        allMoves.push(currentSquare.moveBy(1, -2));
        allMoves.push(currentSquare.moveBy(1, 2));
        allMoves.push(currentSquare.moveBy(2, -1));
        allMoves.push(currentSquare.moveBy(2, 1));

        return allMoves.filter(square => square.isValid());
    }
}
