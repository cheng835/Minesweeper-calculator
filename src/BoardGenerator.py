import numpy as np
import random
import json

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

#displays the board                      
def displayBoard(board):
    for r in range(len(board)):
        print()
        for c in range(len(board[0])):
                print(f"{int(board[r][c]):>3}", end = ' ')
    print("\n")

def depositData(rows, cols, bombs, solvedBoard):
    data = {
        "rows": rows,
        "cols": cols,
        "bombs": bombs,
        "solvedBoard": solvedBoard.tolist()
    }
    #dumps solved data into a file so javascript can read it
    with open("data.json", "w") as file:
        json.dump(data, file)