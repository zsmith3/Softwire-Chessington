import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getHorizontalMoves(currentSquare) {
        const cols = [...Array(GameSettings.BOARD_SIZE).keys()].filter(i => i !== currentSquare.col);
        return cols.map(col => Square.at(currentSquare.row, col));
    }

    getVerticalMoves(currentSquare) {
        const rows = [...Array(GameSettings.BOARD_SIZE).keys()].filter(i => i !== currentSquare.row);
        return rows.map(row => Square.at(row, currentSquare.col));
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const horizontalMoves = this.getHorizontalMoves(currentSquare);
        const verticalMoves = this.getVerticalMoves(currentSquare);
        return horizontalMoves.concat(verticalMoves);
    }
}
