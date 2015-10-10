var gridSize = 100;
var pixelSize = 5;
var colorLive = "red";
var colorDead = "white";
var iterations = 0;

// func to draw squares
function drawSquare(ctxt, x, y, live) { // what is ctxt ??
	// if live, color = colorLive; else, color = colorDead
	live ? color = colorLive : color = colorDead;

	// begin drawing ?
	ctxt.beginPath();
	// draw a rect with specific coordinate and width and heigth
	ctxt.rect(x, y, pixelSize, pixelSize);
	// select color for filling the rect
	ctxt.fillStyle = color;
	// fill the rect with color selected
	ctxt.fill();
}


//  func to create content of canvas/board
function createGrid() {
	// create two arrays without a sense of row/horizontal or column/vertical
	var grid = new Array();
	var row = new Array();

	// loop for 100 times
	for (var i = 0; i < gridSize; i++) {
		// each time create a new array named row
		row = new Array();
		// loop for 100 times
		for (var j = 0; j < gridSize; j++) {
			// each time put value 0 into an element of row array
			row[j] = 0;
		} // by now this row array is packed with 100 value zero
		// then put this row array (inside there are 100 zero value) into one element of array grid
		grid[i] = row;
	} // by now, there are 100 row arrays created, and each of them is put into one element of array grid

	// we got array grid which has 100 elements, each element has 100 value zero
	return grid; // now grid becomes glocal variable for canvas ???? ready to be used by other functions??
}

// func to draw grid/canvas/board
function drawGrid(ctxt, grid) { // now grid must be glocal variable, so is ctxt. but what is ctxt ???

	// loop for 100 times
	for (var i = 0; i < gridSize; i++) {
		// for each index, loop 100 times
		for (var j = 0; j < gridSize; j++) {

			// for each element/cell of the grid/canvas/board
			if (grid[i][j]) { // if this cell/block of grid/canvas is alive or value 1

				// draw a square with live color for this block of grid
				drawSquare(ctxt, i*pixelSize, j*pixelSize, true); // live = true or false
			}
			else { // if false, draw a square with dead color for this block
				drawSquare(ctxt, i*pixelSize, j*pixelSize, false);
			}
		}
	}
}

// ------------------ the three funcs above are for drawing blocks/cells and canvas --------------------

// func to check a block of grid is alive or not
function isAlive(grid, x, y) {
	// x should be xPos, y should be yPos
	// x < 0 or x > 99 or y < 0 or y > 99 all of these refer to points/blocks outside of canvas or at the edge of canvas ???
	if (x < 0 || x > gridSize-1 || y < 0 || y > gridSize-1) {
	// if a cell/block is outside or at edge of canvas, make it 0
		return 0; // send out 0 and exit
	}
	// send out grid[x][y] and exit
	return grid[x][y];
}

// func to find out each value of surrounding blocks and their sum
function numNeighbors(grid, i, j) {
	var n1 = isAlive(grid, i-1, j-1); // leftTop block
	var n2 = isAlive(grid, i-1, j); // leftHand block
	var n3 = isAlive(grid, i-1, j+1); // leftBottom block
	var n4 = isAlive(grid, i,   j-1); // topHead block
	var n5 = isAlive(grid, i,   j+1); // bottomDown block
	var n6 = isAlive(grid, i+1, j-1); // rightTop block
	var n7 = isAlive(grid, i+1, j); // rightHand block
	var n8 = isAlive(grid, i+1, j+1); // rightBottom block
	// above are all the blocks surrounding grid[i][j]

	// add their values up and exit
	return n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;
}

// func to iterate 4 rules
function iterateLife(grid) {
	var tmpGrid = createGrid(); // create temperary grid/board/canvas named tmpGrid

	// loop 100 * 100 times or repeat the following codes for every block on the canvas
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {

			// get sum of surrounding blocks' values for each and every iterated block on the canvas
			var total = numNeighbors(grid, i, j);

			// if the iterated grid[i][j] true, meaning value = 1, meaning this block initially set alive???
			if(grid[i][j]) {
				// rule 1: if an alive cell surrounded by less than 2 or more than 3 alive cell, make it dead
				// if its surrounding blocks contains less than 2 alive or more than 3 alive
				if(total < 2 || total > 3) {
					// make the same location of tmpGrid/newGrid value 0 or dead
					tmpGrid[i][j] = 0;
				}
				// rule 2: if only has 2 or 3 alive surrounding cells, keep itself alive
				else { // else, make the same location on tmpGrid value 1 or keep alive without change
					tmpGrid[i][j] = 1;
				}
			}
			// rule 3: if it is a dead cell, there are three alive surrounding cells, bring it alive too
			else { // if grid[i][j] = 0 or set dead initially
				// if its 8 surrounding blocks contain three alive blocks
				if(total == 3) {
					// assign 1 or alive to the same location of tmpGrid
					tmpGrid[i][j] = 1;
				}
				// rule 4: if not exactly 3 alive surrounding cells, keep it dead
				else { // if not three alive, assign 0 or dead to the same location on tmpGrid
					tmpGrid[i][j] = 0;
				}
			}
		}
	}
	// let iteration increment by 1, initially set 0
	iterations++;

	// return the new canvas and exit
	return tmpGrid;
}

// ------ three funcs above together to run through each cell/block by the 4 rules and decide whether each cell is alive or dead -----------


// keep a record: inform us the current num of iterations and num of alive blocks
function updateStatus(eID) {
	var totalAlive = 0;
	// loop 100 * 100 times
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {

			// if this location is alive or 1
			if(grid[i][j]) {
				// add 1 to totalAlive
				totalAlive++;
			}
		}
	}
	document.getElementById(eID).firstChild.nodeValue = "Iteration: " + iterations + ", Alive: " + totalAlive; ???
}
