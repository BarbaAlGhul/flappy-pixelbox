import constants from '../../constants'
import scenes from '../../manageScenes'
let TileMap = require('pixelbox/TileMap')

let gameOverTile = new TileMap(10, 7)

function start() {
    // draw the game over rectangle
    for (let x = 0; x < gameOverTile.width; x++) {
        for (let y = 0; y < gameOverTile.height; y++) {
            gameOverTile.set(x, y, 25)
        }
    }
}

function update() {
    gameOverTile.draw(constants.TILESIZE, constants.TILESIZE * 4)
    pen(0).print("GAME OVER", 4 * constants.TILESIZE - 1, 5 * constants.TILESIZE)
    print("PRESS R TO RESTART", 2 * constants.TILESIZE - 3, 6 * constants.TILESIZE)
    print("THE GAME", 4 * constants.TILESIZE - 1, 7 * constants.TILESIZE)
    print("PRESS Z OR X", 3 * constants.TILESIZE, 8 * constants.TILESIZE)
    print("TO TITLE SCREEN", 2 * constants.TILESIZE + 2, 9 * constants.TILESIZE)
    if (btnp.C) {
        scenes.start('game')
    } else if (btnp.A || btnp.B) {
        scenes.start('title')
    }
}

export default {
    start,
    update
}