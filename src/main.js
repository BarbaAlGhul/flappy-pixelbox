let TileMap = require('pixelbox/TileMap')

// creating the tilemap where the obstacle will be drawn, it is 1x16 tiles (a vertical section of the screen)
let tilemap = new TileMap(1, 16)
let gameOverTile = new TileMap(10, 5)

// constants, tilesize is in pixels and obstacleSpaceHeight is in tiles
const tilesize = 8
const obstacleSpaceHeight = 4

let isRunning = true

// delta variables
let previous = Date.now()
let delta = 0

// character variables
let charX = 0
let charY = 0
let charSpeed = 0

// obstacle variables
let obstacle
let obstacleSpeed = 5
let obstacleGapY = 0
let obstacleX = 0

// score variables. Scored here is used to update the score just one time after the condition is met (try to remove it and see what happens to your score)
let score = 0
let scored = false

resetPlayer()
resetObstacle()
paper(15)
pen(1)

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame
exports.update = function () {
    if (isRunning) {
        calculateDelta()
        handleKeyPress()
        charSpeed += 3 * delta
        charY += charSpeed * delta
        cls()
        sprite(156, charX, charY)
        obstacle = drawObstacle(tilemap)
        obstacle.draw(obstacleX, 0)
        obstacleX -= obstacleSpeed * delta
        if (obstacleX + tilesize <= 0) {
            resetObstacle()
        }
        print(`Score: ${score}`, 2, 2)
        handleScore()
        handleGameOver()
    } else {
        gameOverMessage()
        if (btnp.C) {
            isRunning = true
            cls()
            resetPlayer()
            resetObstacle()
            gameOverTile.clear()
        }
    }
}

// delta function inspired by https://github.com/NoohAlavi/pixelbox.js-helper
function calculateDelta() {
    let now = Date.now()
    delta = (now - previous) / 90
    previous = Date.now()
}

function handleKeyPress() {
    // checking for button press and button release makes the character go higher if the key is pressed longer.
    // the check on button press gives the character a vertical boost.
    // if the character is still ascending, the check on button release limits the speed of the character.
    // the check charY > 0 is just to prevent the player to make the character fly outside of the screen top .
    if (charY > 0) {
        if (btnp.A || btnp.B) {
            charSpeed = -14
        }
    
        if (btnr.A || btnr.B) {
            if (charSpeed < - 4) charSpeed = -4
        }
    }
}

function drawObstacle(tilemap) {
    // this function loops over the tilemap created to hold the pipe and creates the two different segments
    for (let x = 0; x < tilemap.width; x++){
        for (let y = 0; y < obstacleGapY; y++) {
            tilemap.set(x, y, 35)
        }
    }
    for (let x = 0; x < tilemap.width; x++){
        for (let y = obstacleGapY + obstacleSpaceHeight; y < tilemap.height; y++) {
            tilemap.set(x, y, 35)
        }
    }
    return tilemap
}

function resetObstacle() {
    // clear the tilemap of the obstacle and resets the variables related to its movement and gap position and reset the scored variable
    tilemap.clear()
    obstacleX = $screen.width
    obstacleGapY = random(tilemap.width, tilemap.height - obstacleSpaceHeight - 1)
    scored = false
}

function resetPlayer() {
    // resets all variables related to the player, including the score since this is the function that resets the game
    delta = 0
    previous = Date.now()
    charX = 35
    charY = tilesize
    charSpeed = 0
    score = 0
}

function handleScore() {
    // computes the score according to the player position. Scored is used so the score doesn't increase every frame
    if (charX + tilesize > obstacleX + tilesize && !scored) {
        score++
        scored = true
    }
}

function handleGameOver() {
    // check the two possibilities of game over: collision with the obstacle or the character Y position being higher or lower than the screen size
    if (checkCollision()) {
        isRunning = false
    }

    if (charY > $screen.height || charY + tilesize + 1 < 0) {
        isRunning = false
    }
    
}

function checkCollision() {
    // this function checks for collision on all the sides of the obstacle
    // The first check verifies if the left edge of character is to the left of the right edge of obstacle
    // The second check verifies if the right edge of the character is to the left edge of the obstacle
    // The third check verifies if the top edge of the character is above the bottom edge of the upper segment
    // The last check verifies if the bottom edge of the character is bellow the top edge of the lower segment
    return charX < obstacleX + tilesize
        && charX + tilesize - 1 > obstacleX 
        && (
            charY < obstacleGapY * tilesize
            || charY + tilesize - 1 > (obstacleGapY * tilesize)+ obstacleSpaceHeight * tilesize
            )
}

function gameOverMessage() {
    // draw the game over message on the screen
    for (let x = 0; x < gameOverTile.width; x++) {
        for (let y = 0; y < gameOverTile.height; y++) {
            gameOverTile.set(x, y, 61)
        }
    }
    gameOverTile.draw(tilesize, tilesize * 4)
    print("GAME OVER", 4 * tilesize, 5 * tilesize)
    print("PRESS R TO START", 2 * tilesize, 6 * tilesize)
    print("A NEW GAME", 4 * tilesize - 2, 7 * tilesize)
}