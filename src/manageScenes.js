import title from './scenes/title/title'

export default {
    scenes: { title },
    update: null,
    activeScene: null,
    start: function(sceneName) {
        let scene = this.scenes[sceneName]
        this.activeScene = scene
        this.update = scene.update
        scene.start()
    }
}