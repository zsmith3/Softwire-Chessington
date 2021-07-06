import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Rook from "../../../src/engine/pieces/rook";
import Pawn from "../../../src/engine/pieces/pawn";
import Queen from "../../../src/engine/pieces/queen";

describe('King', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.deep.have.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(4, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(4, 5));
    });

    it('cannot take opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(4, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(4, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 5));
    });

    it('can castle queenside', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0, 2));
    });

    it('can castle kingside', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 7), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0, 6));
    });

    it('cannot castle if already moved', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);
        board.setPiece(Square.at(4, 4), opposingPiece);
        king.moveTo(board, Square.at(1, 4));
        opposingPiece.moveTo(board, Square.at(3, 4));
        king.moveTo(board, Square.at(0, 4));

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 2));
    });

    it('cannot castle if piece in between', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);
        board.setPiece(Square.at(0, 3), queen);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 2));
    });

    it('cannot castle without rook', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 2));
    });

    it('cannot move into check', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(1, 1), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(1, 4));
        moves.should.not.deep.include(Square.at(1, 3));
        moves.should.not.deep.include(Square.at(1, 5));
    });
});
