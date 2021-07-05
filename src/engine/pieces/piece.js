import GameSettings from "../gameSettings";
import Square from "../square";

export default class Piece {
    constructor(player) {
        this.player = player;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    getHorizontalMoves(currentSquare) {
        const cols = [...Array(GameSettings.BOARD_SIZE).keys()].filter(i => i !== currentSquare.col);
        return cols.map(col => Square.at(currentSquare.row, col));
    }

    getVerticalMoves(currentSquare) {
        const rows = [...Array(GameSettings.BOARD_SIZE).keys()].filter(i => i !== currentSquare.row);
        return rows.map(row => Square.at(row, currentSquare.col));
    }

    getLateralMoves(board) {
        const currentSquare = board.findPiece(this);
        const horizontalMoves = this.getHorizontalMoves(currentSquare);
        const verticalMoves = this.getVerticalMoves(currentSquare);
        return horizontalMoves.concat(verticalMoves);
    }

    getDiagonalMoves(board) {
        const currentSquare = board.findPiece(this);
        let diagonalMoves = [];
        for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
            if (row === currentSquare.row) continue;

            const col1 = currentSquare.col + (row - currentSquare.row);
            if (col1 >= 0 && col1 < GameSettings.BOARD_SIZE) diagonalMoves.push(Square.at(row, col1));

            const col2 = currentSquare.col - (row - currentSquare.row);
            if (col2 >= 0 && col2 < GameSettings.BOARD_SIZE) diagonalMoves.push(Square.at(row, col2));
        }
        return diagonalMoves;
    }

    moveIsUnobstructed(board, newSquare, includeNewSquare) {
        const currentSquare = board.findPiece(this);
        const [rowDir, colDir] = currentSquare.getMoveDirection(newSquare);
        let square = currentSquare.moveBy(rowDir, colDir);
        while (!square.equals(newSquare)) {
            if (board.getPiece(square)) return false;
            square = square.moveBy(rowDir, colDir);
        }
        return includeNewSquare ? !board.getPiece(square) : true;
    }
}
