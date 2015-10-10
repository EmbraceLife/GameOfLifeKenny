/*
In this file, there will be two functions

Function setInitial:
1. setInitial() to create initial state by user clicking around the canvas
2. the canvas is divided into four equal areas/range, once clicked within, each cell inside the range will be randomized to be 0 or 1
3. if inside the range the alive cells are more than 10, return grid
4. user can click the same area again, and the range will be re-randomized; user can move on to click other areas of canvas to randomize other areas

Function reStart:
1. at any stage of the game, either initializing the state or during iterations, reStart function can intervene
2. make a button for reStart, once clicked, all cells of grid/canvas will go back to 0


my Questions:
1. I am not sure whether these two functions working or not, as I cannot run it for two reasons:
    1. I don't know how to run them on browser yet.
    2. the syntax I use is based on processing.js library, I don't know how to import libraries yet.

2. What I understand of the two files you create:
    1. I think I understand most of library.js file now;
    2. and I understand the initial state is set within index.html
    3. I understand all the user interface like Header, buttons, updateStatus information are created for or pushed to user in index.html file

3. What I don't understand are mainly dealt with getElementById:
    In index.html file:
    I still don't understand the exactly usage of these two lines of codes:
        var canv = document.getElementById("myCanvas"); // ???
        var context = canv.getContext("2d"); // ???

    In library.js file:
        document.getElementById(eID).firstChild.nodeValue = "Iteration: " + iterations + ", Alive: " + totalAlive; ???

4. If you have time, could you check of the rest of my comments in both index.html and library.js, or comments with "???" in particular?
    I think I understand them all, the remaining comments with "???", I still have little doubt. 

*/

function setIntial() {

    var rangX = 0;
    var rangY = 0;
    var totalAlive = 0;
    // what to repeat
    // 1. click to select a range/area
    var mouseClicked =function () {


        // 1. if click inside Northwest range
        if (mouseX >= 1 && mouseX <= 50 && mouseY >= 1 && mouseY <= 50) {
            rangeX = 50;
            rangeY = 50;
            // 2. loop every cell inside the range NorthWest
            for (var i = 0; i < rangeY; i++ ) {
                for (var j = 0; j < rangeX; j++) {
                    // 3. randomize and round to 0 or 1 for each cell
                    grid[i][j] = round(random(0, 1));
                    // 4. calculate num of alive cells inside the area
                    if (grid[i][j] === 1) {
                        totalAlive++;
                    }
                    // 5. if alive cells are more than 10, return grid
                    if (totalAlive > 10) {
                        return grid;
                    }

                }
            }
        // 1. if click SouthEast range
        } else if (mouseX > 50 && mouseX < 100 && mouseY > 50 && mouseY < 100) {
            rangeX = 100;
            rangeY = 100;
            // 2. loop every cell inside the range NorthWest
            for (var i = 50; i < rangeY; i++ ) {
                for (var j = 50; j < rangeX; j++) {
                    // 3. randomize and round to 0 or 1 for each cell
                    grid[i][j] = round(random(0, 1));
                    // 4. calculate num of alive cells inside the area
                    if (grid[i][j] === 1) {
                        totalAlive++;
                    }
                    // 5. if alive cells are more than 10, return grid
                    if (totalAlive > 10) {
                        return grid;
                    }

                }
            }
        // 1. if click NorthEast range
        } else if (mouseX > 50 && mouseX < 100 && mouseY >= 1 && mouseY <= 50) {
            rangeX = 100;
            rangeY = 50;
            // 2. loop every cell inside the range NorthEast
            for (var i = 0; i < rangeY; i++ ) {
                for (var j = 50; j < rangeX; j++) {
                    // 3. randomize and round to 0 or 1 for each cell
                    grid[i][j] = round(random(0, 1));
                    // 4. calculate num of alive cells inside the area
                    if (grid[i][j] === 1) {
                        totalAlive++;
                    }
                    // 5. if alive cells are more than 10, return grid
                    if (totalAlive > 10) {
                        return grid;
                    }

                }
            }
        // if click SouthWest range
        } else if (mouseX >= 1 && mouseX <= 50 && mouseY > 50 && mouseY < 100) {
            rangeX = 50;
            rangeY = 100;
            // 2. loop every cell inside the range SouthWest
            for (var i = 50; i < rangeY; i++ ) {
                for (var j = 0; j < rangeX; j++) {
                    // 3. randomize and round to 0 or 1 for each cell
                    grid[i][j] = round(random(0, 1));
                    // 4. calculate num of alive cells inside the area
                    if (grid[i][j] === 1) {
                        totalAlive++;
                    }
                    // 5. if alive cells are more than 10, return grid
                    if (totalAlive > 10) {
                        return grid;
                    }

                }
            }
        }
    }
}

// create a button, when click the state/grid will be set to 0 for all cells
function reStart() {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = 0;
}
