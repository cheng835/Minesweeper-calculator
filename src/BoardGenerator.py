from . import BoardSizes as bs
import numpy as np
import random

#generates board with just bomb locations
def generateBoard(rows, cols, bombNum):
    board = np.zeros((rows, cols))
    bombs = 0
    
    while bombs < bombNum:
        randomRow = random.randint(0, rows - 1)
        randomCol = random.randint(0, cols - 1)

        if(board[randomRow, randomCol] == 0):
            board[randomRow, randomCol] = "-1"
            bombs += 1

    return board.astype(int)

#counts how many mines bordering given the coord
def bombCounter(rowNum, colNum, board):
    count = 0

    directions = [
        (-1, -1), (-1, 0), (-1, 1), 
        (0, -1),           (0, 1),
        (1, -1), (1, 0), (1, 1)
    ]
    #top row, middle row, bottom row

    for r, c in directions:
        new_row = rowNum + r
        new_col = colNum + c

        #checking boundaries
        if((0 <= new_row and new_row < len(board)) and
            (0 <= new_col and new_col < len(board[0]))):

                if(board[new_row][new_col] == -1):
                    count += 1

    return count

#generates numbers depending on the mines only board
def solveBoard(board):
    solvedBoard = board

    for r in range(len(board)):
        for c in range(len(board[0])):
             if(board[r][c] == 0):
                  solvedBoard[r][c] = bombCounter(r, c, board)
    return solvedBoard


#displays the board                      
def displayBoard(board):
    for r in range(len(board)):
        print()
        for c in range(len(board[0])):
                print(f"{int(board[r][c]):>3}", end = ' ')
    print("\n")
