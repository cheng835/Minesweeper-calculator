import numpy as np

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
