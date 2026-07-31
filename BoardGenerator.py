import BoardSizes as bs
import numpy as np
import random

def generateBoard(rows, cols, bombNum):
    board = np.zeros((rows, cols))
    bombs = 0
    
    while bombs < bombNum:
        randomRow = random.randint(0, rows - 1)
        randomCol = random.randint(0, cols - 1)

        if(board[randomRow, randomCol] == 0):
            board[randomRow, randomCol] = 1
            bombs += 1

    return board

def displayBoard(board):
    for r in range(board.shape[0]):
        print()
        for c in range(board.shape[1]):
            if(board[r][c]):
                print("X", end = " ")
            else:
                print(int(board[r][c]), end = " ")
    print("\n")

if __name__ == "__main__":
    option = bs.printOptions()

    while(option.lower() != "quit"):
        rows, cols, bombs = bs.getBoard(option)
        board = generateBoard(rows, cols, bombs)
        displayBoard(board)
        option = bs.printOptions()
    print("bye bye")
