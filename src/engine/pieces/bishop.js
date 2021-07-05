import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        let availableMoves = [];
        for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
            if (row === currentSquare.row) continue;

            const col1 = currentSquare.col + (row - currentSquare.row);
            if (col1 >= 0 && col1 < GameSettings.BOARD_SIZE) availableMoves.push(Square.at(row, col1));

            const col2 = currentSquare.col - (row - currentSquare.row);
            if (col2 >= 0 && col2 < GameSettings.BOARD_SIZE) availableMoves.push(Square.at(row, col2));
        }
        return availableMoves;
    }
}
