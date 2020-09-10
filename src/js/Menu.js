import bg from '../assets/bg.jpg';
import global from './globalVariables';


let opacity = 'reached';
// eslint-disable-next-line no-undef
class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu',
    });
  }

  preload() {
    this.load.image('bg', bg);
  }

  create() {
    this.sky = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    this.sky.setScale(5);
    this.gameStyle = {
      font: '55px Calibri',
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    };
    this.smallStyle = {
      font: '25px Calibri',
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    };
    this.welcome = this.add.text(260, 200, 'UB Running', this.gameStyle);
    this.input = this.add.dom(390, 300, 'input', {
      type: 'text',
      font: '32px Calibri',
      textAlign: 'center',
      color: '#fff',
      border: '1px solid white',
      outline: 'none',
      backgroundColor: '#ffffff00',
      width: '250px',
      height: '50px',
    });
    this.btn = this.add.dom(390, 375, 'button', {
      font: '32px Calibri',
      color: '#fff',
      border: '1px solid white',
      outline: 'none',
      backgroundColor: '#ffffff00',
      width: '75px',
      height: '50px',
      cursor: 'pointer',
    }, 'PLAY');
    this.nameTip = this.add.text(250, 425, 'Enter your name to continue', this.smallStyle);
    this.tip = this.add.text(170, 500, 'TIP: use your mouse to jump and avoid traps', this.smallStyle);
    this.btn.addListener('click');
    this.btn.on('click', () => {
      if (this.input.node.value.length >= 3) {
        if (this.input.node.value.length > 12) {
          this.nameTip.text = 'The Name Is Too Long!';
          this.nameTip.x = 275;
        } else {
          global.name = this.input.node.value;
          global.timer = 0;
          global.spikeGravity = -500;
          global.currentScore = 0;
          global.currentAnimation = 'string';
          global.gameOver = false;
          global.difficulty = 0;
          this.scene.start('Game');
        }
      } else if (this.input.node.value.length > 0) {
        this.nameTip.text = 'The Name Is Too Short!';
        this.nameTip.x = 275;
      } else {
        this.nameTip.text = 'Please Enter A Name';
        this.nameTip.x = 280;
      }
    });

    this.tip = this.add.text(730, 580, 'By SpaYco', {
      font: '15px Calibri',
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
  }

  update() {
    if (opacity === 'reached') {
      this.nameTip.alpha += 0.01;
      if (this.nameTip.alpha >= 1) {
        opacity = 'max';
      }
    } else {
      this.nameTip.alpha -= 0.01;
      if (this.nameTip.alpha < 0.3) {
        opacity = 'reached';
      }
    }
  }
}

export default Menu;