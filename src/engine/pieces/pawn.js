import Piece from './piece';
import Player from "../player";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "pawn";
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === Player.WHITE ? 1 : -1;
        const isFirstMove = (this.player === Player.WHITE && currentSquare.row === 1) || (this.player === Player.BLACK && currentSquare.row === 6);
        const moveOne = currentSquare.moveBy(direction, 0);

        if (isFirstMove) {
            let moves = [];
            const canMoveOne = this.canLandAt(board, moveOne, false);
            if (canMoveOne) moves.push(moveOne);
            const moveTwo = currentSquare.moveBy(2 * direction, 0);
            const canMoveTwo = this.moveIsUnobstructed(board, moveTwo, false);
            const canTakeTwo = !canMoveOne && this.canLandAt(board, moveOne, true) && this.canLandAt(board, moveTwo, false);
            if (canMoveTwo || canTakeTwo) moves.push(moveTwo);
            return moves;
        } else if (moveOne.isValid()) {
            if (this.canLandAt(board, moveOne, false)) return [moveOne];
            else if (this.canLandAt(board, moveOne, true)) {
                const takeMove = currentSquare.moveBy(2 * direction, 0);
                if (takeMove.isValid() && this.canLandAt(board, takeMove, false)) return [takeMove];
                else return [];
            } else return [];
        } else return [];
    }
}
