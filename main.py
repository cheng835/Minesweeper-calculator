import src.BoardGenerator as bg
import src.BoardSizes as bs

if __name__ == "__main__":
    option = bs.printOptions()

    while(option.lower() != "quit"):
        rows, cols, bombs = bs.getBoard(option)
        board = bg.generateBoard(rows, cols, bombs)
        bg.displayBoard(board)
        solvedBoard = bg.solveBoard(board)
        bg.displayBoard(solvedBoard)
        option = bs.printOptions()
    print("bye bye")