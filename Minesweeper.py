import numpy as np
import random

def getInfo():
    rows = int(input("Enter board width: "))
    while(rows < 0):
        print("Please enter a positive number.")
        rows = int(input("Enter board width: "))

    cols = int(input("Enter board height: "))
    while(cols < 0):
        print("Please enter a positive number.")
        cols = int(input("Enter board height: "))

    bombs = int(input("Enter number of bombs: "))
    while(bombs > (cols * rows - 1)):
        print(f"The max number of bombs you can have is {rows * cols - 1}")
        bombs = int(input("Enter number of bombs: "))

    return rows, cols, bombs


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

if __name__ == "__main__":
    rows, cols, bombs = getInfo()
    board = generateBoard(rows, cols, bombs)
    displayBoard(board)
