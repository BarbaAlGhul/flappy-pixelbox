import title from './scenes/title'
import game from './scenes/game'
import gameover from './scenes/gameover'

export default {
    scenes: { title, game, gameover },
    update: null,
    activeScene: null,
    start: function(sceneName) {
        let scene = this.scenes[sceneName]
        this.activeScene = scene
        this.update = scene.update
        scene.start && scene.start()
    }
}