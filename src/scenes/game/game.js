export default {
    world: null,
    delta: null,
    previousDelta: null,
    update: function() {
        this.calculateDelta()
        this.world.update(this.delta)
        cls()
        this.world.render()
    },
    calculateDelta: function() {
        // delta function inspired by https://github.com/NoohAlavi/pixelbox.js-helper
        // used so it's possible to update variables based on the time that the game is running
        let now = Date.now()
        this.delta = (now - this.previousDelta) / 90
        this.previousDelta = Date.now()
    }
}