import scenes from '../../manageScenes'

function start() {
    paper(15).cls()
    $screen.setCharset(assets.amstrad)
    pen(0).print('FLAPPY', 25, 33) // shadow effect
    locate(3, 4).pen(1).print('FLAPPY')
    pen(0).print('PIXELBOX', 17, 49) // shadow effect
    locate(2, 6).pen(1).print('PIXELBOX')
    $screen.setCharset()
    locate(6, 13).pen(0).print('press Z or X')
    locate(8, 14).print('to start')
}

function update() {
    if (btnp.A || btnp.B) {
        scenes.start('game')
    }
}

export default {
    start,
    update
}
