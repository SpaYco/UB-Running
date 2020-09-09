import bg from '../assets/bg.jpg'
import global from './globalVariables'


let opacity = 'reached'
class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    preload() {
        this.load.image('bg', bg);
    }
    create() {
        this.sky = this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
        this.sky.setScale(5)
        this.gameStyle = {
            font: "55px Calibri",
            fontStyle: 'bold',
            color: "#fff",
            align: "center"
        };
        this.smallStyle = {
            font: "25px Calibri",
            fontStyle: 'bold',
            color: "#fff",
            align: "center"
        };
        this.welcome = this.add.text(260, 200, `UB Running`, this.gameStyle)

        this.press = this.add.text(270, 300, `left mouse click to start`, this.smallStyle)
        this.tip = this.add.text(170, 500, `TIP: use your mouse to jump and avoid traps`, this.smallStyle)
        this.input.on('pointerdown', () => {

            global.timer = 0
            global.spikeGravity = -500
            global.currentScore = 0;
            global.currentAnimation = 'string';
            global.gameOver = false;
            global.difficulty = 0;
            this.scene.start('Game')
        })
    }
    update() {
        if (opacity == 'reached') {
            this.press.alpha += 0.01
            if (this.press.alpha >= 1) {
                opacity = 'max'
            }
        } else {
            this.press.alpha -= 0.01
            if (this.press.alpha < 0.3) {
                opacity = 'reached'
            }
        }


    }
}

export default Menu