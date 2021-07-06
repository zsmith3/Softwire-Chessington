import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';
import King from "../../src/engine/pieces/king";
import Rook from "../../src/engine/pieces/rook";
import Bishop from "../../src/engine/pieces/bishop";
import Knight from "../../src/engine/pieces/knight";
import Queen from "../../src/engine/pieces/queen";

describe('Board', () => {

    let board;
    beforeEach(() => { // Common code executed before each test.
        board = new Board();
    });

    describe('pawns', () => {
        it('can be added to the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(0, 0);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.getPiece(square).should.equal(pawn); // Object equality: same object reference
        });

        it('can be found on the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(6, 4);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.findPiece(pawn).should.eql(square); // Object equivalence: different objects, same data
        });

    });

    it('can detect check from pawn', () => {
        const king = new King(Player.WHITE, board);
        board.setPiece(Square.at(0, 4), king);

        const pawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(1, 3), pawn);

        board.detectCheck(king).should.equal(true);
    });

    it('can detect check from rook', () => {
        const king = new King(Player.WHITE, board);
        board.setPiece(Square.at(0, 4), king);

        const rook = new Rook(Player.BLACK);
        board.setPiece(Square.at(3, 4), rook);

        board.detectCheck(king).should.equal(true);
    });

    it('can detect check from bishop', () => {
        const king = new King(Player.WHITE, board);
        board.setPiece(Square.at(0, 4), king);

        const bishop = new Bishop(Player.BLACK);
        board.setPiece(Square.at(2, 2), bishop);

        board.detectCheck(king).should.equal(true);
    });

    it('can detect check from knight', () => {
        const king = new King(Player.WHITE, board);
        board.setPiece(Square.at(0, 4), king);

        const knight = new Knight(Player.BLACK);
        board.setPiece(Square.at(1, 2), knight);

        board.detectCheck(king).should.equal(true);
    });

    it('can detect check from queen laterally', () => {
        const king = new King(Player.WHITE, board);
        board.setPiece(Square.at(0, 4), king);

        const queen = new Queen(Player.BLACK);
        board.setPiece(Square.at(3, 4), queen);

        board.detectCheck(king).should.equal(true);
    });

    it('can detect check from queen diagonally', () => {
        const king = new King(Player.WHITE, board);
        board.setPiece(Square.at(0, 4), king);

        const queen = new Queen(Player.BLACK);
        board.setPiece(Square.at(2, 6), queen);

        board.detectCheck(king).should.equal(true);
    });

    it('does not detect check when king not under threat', () => {
        const king = new King(Player.WHITE, board);
        board.setPiece(Square.at(0, 4), king);

        const pawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(1, 4), pawn);

        board.detectCheck(king).should.equal(false);
    });
});
