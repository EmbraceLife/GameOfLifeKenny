var gridSize = 100;
var pixelSize = 4;
var colorLive = "red";
var colorDead = "white";
var iterations = 0;
var totalAlive = 0;

/****************************************************************** func: draw a squre *****************************************************************************************************************************/


var drawSquare = function(gridValue) {
    if (gridValue === 1) {
        fill(255, 0, 0);
    } else {
        fill(9, 24, 237);
    }
    // set (0, 0) as starting point for translation
    rect(0, 0, pixelSize, pixelSize);
};

// test drawSquare
drawSquare(0);
for (var i = 0; i < 400; i+=4) {
    pushMatrix();
    translate(0, i);
    drawSquare(0);
    popMatrix();

    pushMatrix();
    translate(i, 0);
    drawSquare(1);
    popMatrix();
}

/******************************************************* func: create grid/board in theory *******************************************************************************************************************/
// create a local variable grid with all cells dead at first
// return this local variable to global environment ????

var createGrid = function() {
    // create empty array to stand for the whole grid
    var grid = [];

    /****** loop 100 times (to put 100 arrays like 'row' into 'grid': ********/
    for (var i = 0; i < gridSize; i++) {
        // create an empty array named row
        var row = [];
        // loop 100 times
        for (var j = 0; j < gridSize; j++) {
            // add 100 elements into row, and give 0 as their values
            row[j] = 0;
        }
        // put array row as an element of array grid
        grid[i] = row;
    } // now grid is embeded with 100*100 values in 0


    /**** return grid to global environment ??
     *  but grid was defined as a local variable ??
     *  solution: look down to iterateLife func
    **/
    return grid;
};


/***************************************************************** func: draw the grid above *****************************************************************/
// grid parameter is passed from createGrid() as the only return value

var drawGrid = function(grid) {
    // loop through every cell in the grid
    // num of cells are 100*100
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {

			pushMatrix();
            // i*4 and j*4 make frame to move to right position to draw a square
			translate(i*4, j*4);
            // grid[i][j] decide the color of square
			drawSquare(grid[i][j]);
			popMatrix();

		}
	}
};

// test
var grid = createGrid();
grid[40][50] = 1;
drawGrid(grid);

/************************************************************** func: check cell alive or not ****************************************************************/

var isAlive = function(grid, x, y) {
    // if cell is off grid, as grid[-1][j] or grid[i][100] is off grid
    if (x < 0 || x > gridSize-1 || y < 0 || y > gridSize-1) {
        // return value 0 meaning dead
		return 0;
		// send out 0 and exit
	} else {
	// cell is within the grid
	// send out value of grid[x][y] (either 0 or 1)  and exit
	return grid[x][y];
	}
};

// test
grid[40][50] = 1;
var alive = isAlive(grid, 40, 50);
println(alive);


/*************************************************** func: sum of values of surrounding cells of a cell ****************************************************************************************************************/

var numNeighbors = function(grid, i, j) {
    // value of leftTop cell
	var n1 = isAlive(grid, i-1, j-1);
	// value of leftHand block
	var n2 = isAlive(grid, i-1, j);
	var n3 = isAlive(grid, i-1, j+1); // leftBottom block
	var n4 = isAlive(grid, i,   j-1); // topHead block
	var n5 = isAlive(grid, i,   j+1); // bottomDown block
	var n6 = isAlive(grid, i+1, j-1); // rightTop block
	var n7 = isAlive(grid, i+1, j); // rightHand block
	var n8 = isAlive(grid, i+1, j+1); // rightBottom block
	// above are all the blocks surrounding grid[i][j]

	// add their values up and exit
	return n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;
};

// test
grid[40][51] = 1;
grid[40][52] = 1;
drawGrid(grid);
println(numNeighbors(grid, 39, 51));



/************************************************************* func: iterate four rules of game of life ****************************************************************************************************************/

var iterateLife = function(grid) {

    // create a grid in theory and assign it to tmpGrid, all cells are dead at the moment
	var tmpGrid = createGrid();

	// loop through every cell
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {

			// get value sum of surrounding cells of every cell of grid, assign to total
			var total = numNeighbors(grid, i, j);

			// if a specific cell in original grid is alive (value as 1)
			if(grid[i][j] === 1) {

				// rule 1: if this alive cell surrounded by less than 2 or more than 3 alive cells
				if(total < 2 || total > 3) {

					/** make the same location of tmpGrid/newGrid value 0 or dead **/
					tmpGrid[i][j] = 0;
				}

				// rule 2: if this alive cell on original grid has either 2 or 3 alive surrounding cells,
				else {
				    // then keep it alive on the same location of tmpGrid
					tmpGrid[i][j] = 1;
				}
			}

			// rule 3: if it is a dead cell or grid[i][j] === 0
			else {
			    // if there are exact three alive surrounding cells
				if(total === 3) {
					// bring/make this cell alive at the same location of tmpGrid
					tmpGrid[i][j] = 1;
				}
				// rule 4: if not exactly 3 alive surrounding cells, keep it dead
				else {
				    // then assign 0 or dead to this cell on the same location on tmpGrid
					tmpGrid[i][j] = 0;
				}
			}
		}
	}


	// count iteration numbers: let iteration increment by 1,
	// initially iteration is global variable and set 0
	// as long as not reload page or reStart, each iteration will be added up
	iterations++;

	// return the new grid and exit
	// return tmpGrid;
    grid = tmpGrid;
	drawGrid(grid);
    return grid;
};

// test
// --- this line of code does two things: first run iterateLife(), second assign grid with the value of tmpGrid
// --- to be combined with draw(), mouseClicked()
grid = iterateLife(grid);
grid = iterateLife(grid);

// check out where are alive cells
for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
        if (grid[i][j] === 1) {
            println("x"+i+"j"+j);
        }
    }
}
/**************************************************** func: update the status of iteration ****************************************************************************************************************/


// keep a record: inform us the current num of iterations and num of alive blocks
var updateStatus = function(grid) {

	//var totalAlive = 0;

	// run through every cell in grid
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {

			// if a cell is alive or 1
			if(grid[i][j]) {
				// add 1 to totalAlive
				totalAlive++;
			}
		}
	}

	text("Total Iterations: " + iterations + "      totalAlive: " + totalAlive, 100, 50);
    println("Total Iterations: " + iterations + "      totalAlive: " + totalAlive);
	//document.getElementById(eID).firstChild.nodeValue = "Iteration: " + iterations + ", Alive: " + totalAlive; ???
};

// test
updateStatus(grid);


/*********************************************************** func: draw initial scene  *******************************************************************************************************************************/
// test by draw first scene with all cells dead
var drawScene1 = function() {

    // automatically create in theory a grid with all dead cells and return variable `grid`
    var initGrid = createGrid();

    // loop every cell in grid except cells on four edges
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {

            // make random 0 or 1 for each cell
            initGrid[i][j] = round(random(0, 1));

            // count number of alive cells in total
            if (initGrid[i][j] === 1) {
                totalAlive++;
            }

            // if totalAlive is more than 20, then break the second for loop
            if (totalAlive > 100) {
                break;
            }
        }

        // if totalAlive is more than 20, then break the first for loop
        if (totalAlive > 100) {
            break;
        }
    }

    // draw the grid made above
    drawGrid(initGrid);
    return initGrid;
};

// test
var grid1 = drawScene1();
/******************************************************* Main Program to build ***********************************************************************************************************************************/
