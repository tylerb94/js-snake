// Game Settings
let grid_width = 100;
let grid_height = 100;
let speed = 65;

// Snake Movement
let snake_x = 1;
let snake_y = 1;
let snake_move = [0, 0];
let snake_length = 10;

// Playfield
let grid = [];
var row = [];
for(let y=0; y<grid_height; y++){
    for(let x=0; x<grid_width; x++){
        if(x==snake_x && y==snake_y){
            row.push(snake_length);
        }
        else{
            row.push(0);
        }
    }
    grid.push(row);
    row = [];}

// Food / Score
let food_loc = 0;
let score = 0;
let lose = false;
placeFood();

// Directions
const UP = [0, -1];
const DOWN = [0, 1];
const LEFT = [-1, 0];
const RIGHT = [1, 0];

//resize canvas
//
function randInt(max) {return Math.floor(Math.random() * max);}
function placeFood(){

    var x = randInt(grid_width);
    var y = randInt(grid_height);

    while(grid[y][x] > 0){
        console.log("finding new place for food");
        var x = randInt(grid_width);
        var y = randInt(grid_height);
    }
    food_loc = (x, y);
    grid[y][x] = -1;

}
function snakeIncLength(){
    snake_length++;
    for(var y=0; y<grid_height; y++){
        for(var x=0; x <grid_width; x++){
            if(grid[y][x] > 0){
                grid[y][x]++;
            }

        }
    }
}
function update(){

    // Move snake
    snake_x += snake_move[0];
    snake_y += snake_move[1];

    if(snake_x < 0){snake_x = grid_width;}
    else if(snake_x >= grid_width){snake_x = 0;}

    if(snake_y < 0){snake_y = grid_height;}
    else if(snake_y >= grid_height){snake_y = 0;}

    // loop Y, X size of grid. read number stored in location
    for(let y=0; y<grid_height; y++){
        for(let x=0; x<grid_height; x++){

            var value = grid[y][x];

            // Delete food if same loc as snake head
            if(value < 0){
                if(x==snake_x && y==snake_y){
                    // Change -1 to snake head value
                    grid[y][x] = snake_length;
                    // Place food in new location
                    placeFood();
                    // Increase score
                    score++;
                    // Increase snake length
                    snakeIncLength();
                    // Increase speed
                    if(speed > 1){speed--;}
                }
            }

            // blank spaces. set to 'snake_length' if same location of snake
            else if(value == 0){
                if(x==snake_x && y==snake_y){
                    grid[y][x] = snake_length;
                }
            }

            // Part of snake, lose if snake touches here
            else if(value > 0){
                // Snake Ttuches itself
                if(x==snake_x && y==snake_y){
                    if(grid[y][x] < snake_length){
                        lose = true;
                    }
                }
                else{
                    grid[y][x] -= 1;
                }
            }
        }
    }
}
function drawLabel( ctx, text){

    if(lose){
        text += "\t-- YOU LOSE!";
    }

    ctx.fillStyle = "#FF0000";
    ctx.font = "10px Courier";
    ctx.fillText(text,10,10);
}
function draw(){
    if(lose){return;}
    update();

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var tile_width = canvas.width / grid_width;
    var tile_height = canvas.height / grid_height;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let x = 0; x < grid_height; x++){
        for(let y = 0; y < grid_width; y++){
            var num = grid[y][x];

            if(num < 0){
                ctx.fillStyle = "#0000FF";
            }
            else if(num > 0){
                ctx.fillStyle = "#00FF00";
            }

            if(num != 0){
                ctx.fillRect(x*tile_width, y*tile_height, tile_width, tile_height);
            }
            
        }
    }

    drawLabel(ctx, "Score: " + score.toString());
}

// Redraw every X milliseconds
var drawTimer = window.setInterval(function(){draw()}, speed);

document.addEventListener('keydown', function(event) {
    console.log(event.key);

    if(event.key == "ArrowUp"){
        if(snake_move != DOWN){
            snake_move = UP;
        }
    }
    else if(event.key == "ArrowDown"){
        if(snake_move != UP){
            snake_move = DOWN;
        }
    }
    else if(event.key == "ArrowLeft"){
        if(snake_move != RIGHT){
            snake_move = LEFT;
        }
    }
    else if(event.key == "ArrowRight"){
        if(snake_move != LEFT){
            snake_move = RIGHT;
        }
    }
    

});