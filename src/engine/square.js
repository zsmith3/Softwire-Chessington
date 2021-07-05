import GameSettings from "./gameSettings";

export default class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    static at(row, col) {
        return new Square(row, col);
    }

    equals(otherSquare) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    moveBy(row, col) {
        return Square.at(this.row + row, this.col + col);
    }

    isValid() {
        return this.row >= 0 && this.row < GameSettings.BOARD_SIZE && this.col >= 0 && this.col < GameSettings.BOARD_SIZE;
    }

    isAdjacentTo(otherSquare) {
        const rowDiff = Math.abs(this.row - otherSquare.row);
        const colDiff = Math.abs(this.col - otherSquare.col);
        return rowDiff <= 1 && colDiff <= 1 && rowDiff + colDiff > 0;
    }

    getMoveDirection(otherSquare) {
        const rowDiff = otherSquare.row - this.row;
        const rowDir = rowDiff / (Math.abs(rowDiff) || 1);
        const colDiff = otherSquare.col - this.col;
        const colDir = colDiff / (Math.abs(colDiff) || 1);
        return [rowDir, colDir];
    }

    toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
}
