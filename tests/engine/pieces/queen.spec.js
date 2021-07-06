import 'chai/register-should';
import Queen from '../../../src/engine/pieces/queen';
import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import GameSettings from '../../../src/engine/gameSettings';
import Rook from "../../../src/engine/pieces/rook";
import King from "../../../src/engine/pieces/king";

describe('Queen', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move laterally', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(2, 3), queen);

        const moves = queen.getAvailableMovesNoCheck(board);

        const expectedMoves = [
            // Horizontal
            Square.at(2, 0), Square.at(2, 1), Square.at(2, 2), Square.at(2, 4), Square.at(2, 5), Square.at(2, 6), Square.at(2, 7),
            // Vertical
            Square.at(0, 3), Square.at(1, 3), Square.at(3, 3), Square.at(4, 3), Square.at(5, 3), Square.at(6, 3), Square.at(7, 3)
        ];
        
        moves.should.deep.include.members(expectedMoves);
    });

    it('can move diagonally', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(2, 3), queen);

        const moves = queen.getAvailableMovesNoCheck(board);

        const expectedMoves = [
            // Forwards diagonal
            Square.at(0, 1), Square.at(1, 2), Square.at(3, 4), Square.at(4, 5), Square.at(5, 6), Square.at(6, 7),
            // Backwards diagonal
            Square.at(0, 5), Square.at(1, 4), Square.at(3, 2), Square.at(4, 1), Square.at(5, 0)
        ];
        
        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(2, 3), queen);

        const moves = queen.getAvailableMovesNoCheck(board);

        moves.should.have.length(25);
    });

    it('cannot move through friendly pieces', () => {
        const queen = new Queen(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), friendlyPiece);

        const moves = queen.getAvailableMovesNoCheck(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });

    it('cannot move through opposing pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), opposingPiece);

        const moves = queen.getAvailableMovesNoCheck(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });

    it('can take opposing pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), opposingPiece);

        const moves = queen.getAvailableMovesNoCheck(board);

        moves.should.deep.include(Square.at(4, 6));
    });

    it('cannot take opposing king', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new King(Player.BLACK, board);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), opposingPiece);

        const moves = queen.getAvailableMovesNoCheck(board);

        moves.should.not.deep.include(Square.at(4, 6));
    });

    it('cannot take friendly pieces', () => {
        const queen = new Queen(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), friendlyPiece);

        const moves = queen.getAvailableMovesNoCheck(board);

        moves.should.not.deep.include(Square.at(4, 6));
    });

    it('cannot move into check', () => {
        const king = new King(Player.WHITE, board);
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 3), queen);
        board.setPiece(Square.at(0, 1), opposingPiece);

        const moves = queen.getAvailableMovesNoCheck(board);

        moves.filter(square => square.row !== 0).should.be.empty;
    });
});
