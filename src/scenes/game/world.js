import constants from '../../constants'
import player from '../game/player'
import Pipe from '../game/pipe'
import scenes from '../../manageScenes'

export default {
    player: player,
    pipe1: new Pipe(),
    pipe2: new Pipe(),
    score: 0,
    scored: false,
    reset: function() {
        this.score = 0
        this.scored = false
        this.pipe1.reset($screen.width)
        this.pipe2.reset($screen.width + ($screen.width + constants.TILESIZE) / 2)
        this.player.reset()
        paper(15).cls()
        pen(1)
    },
    update: function(delta) {
        this.player.update()
        this.player.speed += 3 * delta
        this.player.y += this.player.speed * delta
        this.movePipe(delta, this.pipe1)
        this.movePipe(delta, this.pipe2)
        this.handleGameOver()
    },
    render: function() {
        this.player.render()
        this.pipe1.render()
        this.pipe2.render()
        print(`Score: ${this.score}`, 2, 2)
    },
    movePipe: function(delta, pipe) {
        // this function updates the pipe position and handle all the pipe interactions with the player and the score
        pipe.x -= pipe.speed * delta
        if (pipe.x + constants.TILESIZE < 0) {
            pipe.reset($screen.width)
            this.scored = false
        }
        this.handleScore(pipe)
    },
    handleScore: function(pipe) {
        // computes the score according to the player position. Scored is used so the score doesn't increase every frame
        if (this.player.x > pipe.x + constants.TILESIZE && !this.scored) {
            this.score++
            this.scored = true
        }
    },
    handleGameOver: function() {
        // check the two possibilities of game over: collision with the obstacle or the character Y position being higher or lower than the screen size
        if (this.checkCollision(this.pipe1) 
            || this.checkCollision(this.pipe2)
            || this.player.y > $screen.height
            || this.player.y + constants.TILESIZE + 1 < 0
            ) {
            scenes.start('gameover')
        }
    },
    checkCollision: function(pipe) {
        // this function checks for collision on all the sides of the obstacle
        // The first check verifies if the left edge of character is to the left of the right edge of obstacle
        // The second check verifies if the right edge of the character is to the left edge of the obstacle
        // The third check verifies if the top edge of the character is above the bottom edge of the upper segment
        // The last check verifies if the bottom edge of the character is bellow the top edge of the lower segment
        // returns true if detects a collision
        return this.player.x + 1 < pipe.x + constants.TILESIZE
            && this.player.x + constants.TILESIZE - 1 > pipe.x 
            && (
                this.player.y < pipe.gapY * constants.TILESIZE
                || this.player.y + constants.TILESIZE > (pipe.gapY * constants.TILESIZE) + pipe.gapHeight * constants.TILESIZE
            )
    }
}