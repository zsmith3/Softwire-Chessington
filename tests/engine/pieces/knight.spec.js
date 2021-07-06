import 'chai/register-should';
import Knight from '../../../src/engine/pieces/knight';
import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Queen from "../../../src/engine/pieces/queen";
import King from "../../../src/engine/pieces/king";
import Bishop from "../../../src/engine/pieces/bishop";
import Rook from "../../../src/engine/pieces/rook";

describe('Knight', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can make knights moves', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);

        const moves = knight.getAvailableMovesNoCheck(board);

        const expectedMoves = [
            Square.at(2, 5), Square.at(2, 3), Square.at(3, 6), Square.at(3, 2),
            Square.at(5, 6), Square.at(5, 2), Square.at(6, 5), Square.at(6, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);

        const moves = knight.getAvailableMovesNoCheck(board);

        moves.should.have.length(8);
    });

    it('can jump over other pieces', () => {
        const knight = new Knight(Player.WHITE);
        const firstPawn = new Pawn(Player.WHITE);
        const secondPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), knight);
        board.setPiece(Square.at(3, 4), firstPawn);
        board.setPiece(Square.at(3, 5), secondPawn);

        const moves = knight.getAvailableMovesNoCheck(board);

        moves.should.deep.include(Square.at(2, 5));
    });

    it('cannot leave the board', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(0, 0), knight);

        const moves = knight.getAvailableMovesNoCheck(board);

        const expectedMoves = [Square.at(1, 2), Square.at(2, 1)];

        moves.should.deep.have.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const knight = new Knight(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), knight);
        board.setPiece(Square.at(2, 5), opposingPiece);

        const moves = knight.getAvailableMovesNoCheck(board);

        moves.should.deep.include(Square.at(2, 5));
    });

    it('cannot take opposing king', () => {
        const knight = new Knight(Player.WHITE);
        const opposingPiece = new King(Player.BLACK, board);
        board.setPiece(Square.at(4, 4), knight);
        board.setPiece(Square.at(2, 5), opposingPiece);

        const moves = knight.getAvailableMovesNoCheck(board);

        moves.should.not.deep.include(Square.at(2, 5));
    });

    it('cannot take friendly pieces', () => {
        const knight = new Knight(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);
        board.setPiece(Square.at(2, 5), friendlyPiece);

        const moves = knight.getAvailableMovesNoCheck(board);

        moves.should.not.deep.include(Square.at(2, 5));
    });

    it('cannot move into check', () => {
        const king = new King(Player.WHITE, board);
        const knight = new Knight(Player.WHITE);
        const opposingPiece = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 3), knight);
        board.setPiece(Square.at(0, 1), opposingPiece);

        const moves = knight.getAvailableMovesNoCheck(board);

        moves.should.be.empty;
    });
});
