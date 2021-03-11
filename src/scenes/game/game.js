import player from '../game/player'
import world from '../game/world'

let game = {
    player: null,
    world: null,
    start: function() {
        this.player = player
        this.world = world
        this.player.reset()
        this.world.setUp()
    },
    update: function() {
        this.world.update()
    }
}

export default game