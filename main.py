import src.BoardGenerator as bg
import src.BoardSizes as bs
import json

if __name__ == "__main__":
    option = bs.printOptions()

    while(option.lower() != "quit"):
        rows, cols, bombs = bs.getBoard(option)
        board = bg.generateBoard(rows, cols, bombs)
        bg.displayBoard(board)
        solvedBoard = bg.solveBoard(board)

        #dumps solved board into a file so javascript can read it
        with open("board.json", "w") as file:
            json.dump(board.tolist(), file)

        bg.displayBoard(solvedBoard)
        option = bs.printOptions()
    print("bye bye")