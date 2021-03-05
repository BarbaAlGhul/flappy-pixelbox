import scenes from '../../manageScenes'

let title = {
    start: function() {
        paper(15).cls()
        locate(5, 7).pen(1).print('FLAPPY PIXELBOX')
        locate(6, 9).pen(0).print('press Z or X')
        locate(8, 10).print('to start')
    },
    update: function() {
        if (btnp.A || btnp.B) {
            scenes.start('game')
        }
    }
}

export default title