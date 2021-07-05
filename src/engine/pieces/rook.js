import Piece from './piece';
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getHorizontalMoves(currentSquare) {
        const cols = [...Array(GameSettings.BOARD_SIZE).keys()].filter(i => i !== currentSquare.col);
        return cols.map(col => ({row: currentSquare.row, col: col}));
    }

    getVerticalMoves(currentSquare) {
        const rows = [...Array(GameSettings.BOARD_SIZE).keys()].filter(i => i !== currentSquare.row);
        return rows.map(row => ({row: row, col:  currentSquare.col}));
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const horizontalMoves = this.getHorizontalMoves(currentSquare);
        const verticalMoves = this.getVerticalMoves(currentSquare);
        return horizontalMoves.concat(verticalMoves);
    }
}
