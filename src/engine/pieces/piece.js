import GameSettings from "../gameSettings";
import Square from "../square";

export default class Piece {
    constructor(player) {
        this.player = player;
        this.pieceType = null;
        this.history = [];
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    getAvailableMovesNoCheck(board) {
        const currentSquare = board.findPiece(this);
        const allMoves = this.getAvailableMoves(board);
        return allMoves.filter(newSquare => !board.doesMoveCauseCheck(currentSquare, newSquare));
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.history.push(currentSquare);
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

    canTakePiece(otherPiece, allowTakeKing) {
        return otherPiece.player !== this.player && (allowTakeKing || otherPiece.pieceType !== "king");
    }

    canLandAt(board, square, allowCapture, allowTakeKing) {
        const pieceAtNewSquare = board.getPiece(square);
        if (!pieceAtNewSquare) return true;
        else if (allowCapture && this.canTakePiece(pieceAtNewSquare, allowTakeKing)) return true;
        else return false;
    }

    canTakeAtSquare(board, square, allowTakeKing) {
        const pieceAtNewSquare = board.getPiece(square);
        return pieceAtNewSquare && this.canTakePiece(pieceAtNewSquare, allowTakeKing);
    }

    moveIsUnobstructed(board, newSquare, allowCapture, allowTakeKing) {
        const currentSquare = board.findPiece(this);
        const [rowDir, colDir] = currentSquare.getMoveDirection(newSquare);
        let square = currentSquare.moveBy(rowDir, colDir);
        while (!square.equals(newSquare)) {
            if (board.getPiece(square)) return false;
            square = square.moveBy(rowDir, colDir);
        }
        return this.canLandAt(board, square, allowCapture, allowTakeKing);
    }

    clone(board) {
        const newPiece = board.createPiece(this.pieceType, this.player);
        newPiece.history = [...this.history];
        return newPiece;
    }
}
