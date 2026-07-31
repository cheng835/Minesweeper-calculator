def printOptions():
    print(f"{'Options':<15} {'Height':<9} {'Width':<8} {'Mines':<5}")
    print(f"{'Easy':<15} {'9':<9} {'9':<8} {'10':<5}")
    print(f"{'Intermediate':<15} {'16':<9} {'16':<8} {'40':<5}")
    print(f"{'Expert':<15} {'16':<9} {'30':<8} {'99':<5}")
    print(f"{'Custom':<15} {'??':<9} {'??':<8} {'??':<5}")
    print("Quit\n")

    option = input("Choose an option: ")
    return option

def getBoard(option):
    if(option.lower() == "quit"):
        return option
    elif(option.lower() == "easy"):
        rows = 9
        cols = 9
        bombs = 10
    elif(option.lower() == "intermediate"):
        rows = 16
        cols = 16
        bombs = 40
    elif(option.lower() == "expert"):
        rows = 16
        cols = 30
        bombs = 99
    else:
        rows, cols, bombs = getCustom()

    return rows, cols, bombs

def getCustom():
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
