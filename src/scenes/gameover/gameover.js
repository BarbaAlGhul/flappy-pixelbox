import constants from '../../constants'
import scenes from '../../manageScenes'
let TileMap = require('pixelbox/TileMap')

let gameover = {
    gameOverTile: null,
    start: function() {
        this.gameOverTile = buildGameOverTile(new TileMap(10, 5))
        this.gameOverTile.draw(constants.TILESIZE, constants.TILESIZE * 4)
        print("GAME OVER", 4 * constants.TILESIZE, 5 * constants.TILESIZE)
        print("PRESS R TO START", 2 * constants.TILESIZE, 6 * constants.TILESIZE)
        print("A NEW GAME", 4 * constants.TILESIZE - 2, 7 * constants.TILESIZE)
    },
    update: function() {
        if (btnp.C) {
            scenes.start('title')
        }
    }
}

export default gameover

function buildGameOverTile(tileMap) {
    // draw the game over rectangle
    for (let x = 0; x < tileMap.width; x++) {
        for (let y = 0; y < tileMap.height; y++) {
            tileMap.set(x, y, 61)
        }
    }
    return tileMap
}