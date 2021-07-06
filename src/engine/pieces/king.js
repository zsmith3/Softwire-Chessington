import Piece from './piece';
import Square from "../square";
import Player from "../player";

export default class King extends Piece {
    constructor(player) {
        super(player);
        this.pieceType = "king";
        const playerStr = player === Player.WHITE ? 'White' : 'Black';
        if (King.kings) King.kings[playerStr] = this;
        else King.kings = {[playerStr]: this};
    }

    getCastleMove(board, currentSquare, rookCol, colNextToRook, targetCol) {
        const rook = board.getPiece(Square.at(currentSquare.row, rookCol));
        if (!rook || rook.player !== this.player || rook.pieceType !== "rook" || rook.history.length) return [];
        if (!this.moveIsUnobstructed(board, Square.at(currentSquare.row, colNextToRook), false)) return [];
        return [Square.at(currentSquare.row, targetCol)];
    }

    getCastleMoves(board, currentSquare) {
        if (this.history.length) return [];
        const castle1 = this.getCastleMove(board, currentSquare, 0, 1, 2);
        const castle2 = this.getCastleMove(board, currentSquare, 7, 6, 6);
        return castle1.concat(castle2);
    }

    getAvailableMoves(board, allowTakeKing) {
        const currentSquare = board.findPiece(this);
        const allMoves = this.getLateralMoves(board).concat(this.getDiagonalMoves(board));
        const adjacentMoves = allMoves.filter(square => square.isAdjacentTo(currentSquare));
        const standardMoves = adjacentMoves.filter(square => this.canLandAt(board, square, true, allowTakeKing));
        const castleMoves = this.getCastleMoves(board, currentSquare);
        return standardMoves.concat(castleMoves);
    }

    detectCastle(board, fromSquare, toSquare) {
        return Math.abs(fromSquare.col - toSquare.col) > 1;
    }

    applyCastle(board, fromSquare, toSquare) {
        const diff = toSquare.col - fromSquare.col;
        const dir = diff / Math.abs(diff);
        const rookSquare = Square.at(fromSquare.row, dir > 0 ? 7 : 0);
        const rook = board.getPiece(rookSquare);
        const rookTo = toSquare.moveBy(0, -dir);
        board.setPiece(rookTo, rook);
        board.setPiece(rookSquare, undefined);
    }
}
