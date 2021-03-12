import game   from '../game/game'
import world from '../game/world'

game.world  = world

exports.start = function () {
	game.world.setUp()
	game.delta = 0
	game.previousDelta = Date.now()
}

exports.update = function () {
	game.update()
}