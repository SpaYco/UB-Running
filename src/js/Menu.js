
import bg from '../assets/bg.png'

class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    preload() {
        this.load.image('bg', bg);
    }
    create(){
        this.sky = this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
        this.sky.setScale(5)
    }
}

export default Menu
