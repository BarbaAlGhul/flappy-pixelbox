let TileMap = require('pixelbox/TileMap')

export default class Pipe {
    constructor() {
        this.x = null
        this.y = 0
        this.speed = 5
        this.gapY = null
        this.gapHeight = 4
        this.tilemap = new TileMap(1, 16)
    }

    reset(xPos) {
        // pipe reset takes an x argument so we can reset it's initial x position to any position
        this.tilemap.clear()
        this.x = xPos
        this.gapY = random(this.tilemap.width, this.tilemap.height - this.gapHeight - 1)
    }

    setPipe() {
        // this function loops over the tilemap created to hold the pipe and creates the two different segments
        for (let x = 0; x < this.tilemap.width; x++){
            for (let y = 0; y < this.gapY; y++) {
                this.tilemap.set(x, y, 35)
            }
        }
        for (let x = 0; x < this.tilemap.width; x++){
            for (let y = this.gapY + this.gapHeight; y < this.tilemap.height; y++) {
                this.tilemap.set(x, y, 35)
            }
        }
    }

    render() {
        // this function first set the tilemap and then draw it on the screen
        this.setPipe()
        this.tilemap.draw(this.x, this.y)
    }
}