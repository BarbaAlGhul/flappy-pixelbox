import constants from '../../constants'

let player = {
    x: null,
    y: null,
    speed: null,
    reset: function() {
        this.x = 35
        this.y = constants.TILESIZE
        this.speed = 0
    },
    handleKeyPress: function() {
        // checking for button press and button release makes the character go higher if the key is pressed longer.
        // the check on button press gives the character a vertical boost.
        // if the character is still ascending, the check on button release limits the speed of the character.
        // the check charY > 0 is just to prevent the player to make the character fly outside of the screen top .
        if (this.y > 0) {
            if (btnp.A || btnp.B) {
                this.speed = -16
            }
            if (btnr.A || btnr.B) {
                if (this.speed < -4) this.speed = -4
            }
        }
    },
    update: function() {
        this.handleKeyPress()
    }
}

export default player