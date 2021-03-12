import constants from '../../constants'
import scenes from '../../manageScenes'
let TileMap = require('pixelbox/TileMap')

let gameOverTile = new TileMap(10, 5)

function start() {
    // draw the game over rectangle
    for (let x = 0; x < gameOverTile.width; x++) {
        for (let y = 0; y < gameOverTile.height; y++) {
            gameOverTile.set(x, y, 61)
        }
    }
    gameOverTile.draw(constants.TILESIZE, constants.TILESIZE * 4)
    print("TESTE", 8, 8)
    print("GAME OVER", 4 * constants.TILESIZE, 5 * constants.TILESIZE)
    print("PRESS R TO START", 2 * constants.TILESIZE, 6 * constants.TILESIZE)
    print("A NEW GAME", 4 * constants.TILESIZE - 2, 7 * constants.TILESIZE)
}

function update() {
    if (btnp.C) {
        scenes.start('title')
    }
}

export default {
    start,
    update
}