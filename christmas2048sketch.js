let bg;

function preload(){
    bg = loadImage('https://i.ytimg.com/vi/ZpjjAj4OfHc/maxresdefault.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  placeNewNumber();
  placeNewNumber();  
}

function blankGrid() {
  return [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
}

let grid = blankGrid();
let score = 0;

function copyGrid(grid) {
  let grid_copy = blankGrid();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      grid_copy[i][j] = grid[i][j];
    }
  }
  return grid_copy;
}

function hasChanged(a, b) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] != b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function flipGrid(arr) {
  for (let i = 0; i < 4; i++) {
    arr[i].reverse();
  }
  return grid;
}

function rotateGrid(arr) {
  let newGrid = blankGrid();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = arr[j][i];
    }
  }
  return newGrid;
}

function keyPressed() {
  let prev = copyGrid(grid);
  let flipped = false;
  let rotated = false;
  if (keyCode == RIGHT_ARROW) {
    //DO NOTHING (IT IS THE DEFAULT ACTION)
  } else if (keyCode == LEFT_ARROW) {
    grid = flipGrid(grid);
    flipped = true;
  } else if (keyCode == UP_ARROW) {
    grid = rotateGrid(grid);
    grid = flipGrid(grid);
    flipped = true;
    rotated = true;
  } else if (keyCode == DOWN_ARROW) {
    grid = rotateGrid(grid);
    rotated = true;
  }

  for (let i = 0; i < 4; i++) {
    grid[i] = operate(grid[i]);
  }

  if (flipped) {
    grid = flipGrid(grid);
  }

  if (rotated) {
    grid = rotateGrid(grid);
  }

  if (hasChanged(prev, grid)) {
    placeNewNumber();
  }
}

function draw() {
  background(bg);
  noStroke();
  fill(color(211, 212, 201));
  rect(width/2 - 250, 100, 500, 500, 20);
  let w = 100;
  let padding = 20;
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      fill(color(163, 192, 170));
      rect(width/2 - 250 + padding + i * (padding + w), 100 + padding + j * (w + padding), w, w, 10);
    }
  }
  fill(255);
  rect(width/2 - 85, 60, 170, 40, 10);
  rect(width/2 - 320, 0, 640, 60, 10);
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Score: " + score, 0, 30, width, 100);
  textSize(32);
  text("Join the numbers and get to the 2048 tile!", 0, 0, width, 60);
  drawGrid();
}

function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function drawGrid() {

  let w = 100;
  let padding = 20;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      let val = grid[i][j];
      if (val != 0) {
        textAlign(CENTER, CENTER);
        textSize(64);
        fill(0);
        noStroke();
        text(val, width/2 - 250 + padding + j * (w + padding) + w / 2, 100 + padding + i * (w + padding) + 0.55 * w);
      }
    }
  }
}
let px = 0;
let py = 0;
function placeNewNumber() {
  var x = round(random(3));
  var y = round(random(3));
  if (grid[x][y] == 0 && x !== px && y != py) {
    let a = random(1);
    grid[x][y] = a > 0.8 ? 2 : 4;
    px = x;
    py = y;
    return true;
  } else {
    placeNewNumber();
  }
}

function slide(arr) {
  arr = arr.filter(val => val);
  let numzero = 4 - arr.length;
  let zeros = Array(numzero).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row) {
  for (let i = 3; i >= 1; i--) {
    if (row[i] == row[i - 1]) {
      row[i] = row[i] + row[i - 1];
      row[i - 1] = 0;
      score += row[i];
    }
  }
  return row;
}