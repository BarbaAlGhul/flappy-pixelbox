import world from '../game/world'

export default {
    world: world,
    delta: null,
    previousDelta: null,
    update: function() {
        this.calculateDelta()
        this.world.update(this.delta)
        cls()
        this.world.render()
    },
    // reset: function() {
    //     this.delta = 0
    //     this.previousDelta = Date.now()
    // },
    calculateDelta: function() {
        // delta function inspired by https://github.com/NoohAlavi/pixelbox.js-helper
        // used so it's possible to update variables based on the time that the game is running
        let now = Date.now()
        this.delta = (now - this.previousDelta) / 90
        this.previousDelta = Date.now()
        
    }
}