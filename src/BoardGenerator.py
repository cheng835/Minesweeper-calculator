import src.BoardSizes as bs
import numpy as np
import random

def generateBoard(rows, cols, bombNum):
    board = np.zeros((rows, cols))
    bombs = 0
    
    while bombs < bombNum:
        randomRow = random.randint(0, rows - 1)
        randomCol = random.randint(0, cols - 1)

        if(board[randomRow, randomCol] == 0):
            board[randomRow, randomCol] = "X"
            bombs += 1

    return board

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

                if(board[new_row][new_col] == "X"):
                    count += 1

    return count
    

                      
def displayBoard(board):
    for r in range(board.shape[0]):
        print()
        for c in range(board.shape[1]):
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
