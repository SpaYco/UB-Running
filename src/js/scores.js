import Phaser from 'phaser';
import globalVars from './globalVariables';
import bg from '../assets/bg.jpg';
import { getData, pushData } from './calls';

// eslint-disable-next-line no-undef
class Scores extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scores',
    });
  }

  preload() {
    this.load.image('bg', bg);
  }

  create() {
    this.sky = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    this.sky.setScale(5);
    this.pushed = 'no';
    this.loaded = 'no';
    this.opacity = 'max';
    this.style = {
      font: '25px Arial',
      color: '#fff',
      align: 'center',
    };
    this.restart = this.add.text(275, 450, 'Mouse Click To Restart!', this.style);

    this.input.on('pointerdown', () => {
      this.scene.start('Menu');
    });
  }

  async update() {
    if (this.pushed === 'no') {
      this.pushed = 'yes';

      this.person = {
        user: globalVars.name,
        score: (Math.floor(globalVars.currentScore / 10)),
      };
      this.jPerson = JSON.stringify(this.person);

      pushData(this.jPerson);
    }

    if (this.loaded === 'no') {
      this.loaded = 'yes';
      this.result = await getData();
      this.add.text(320, 100, 'Leaderboard', this.style);
      this.add.text(250, 400, 'Your Score Has Been Saved', this.style);
      for (let i = 0; i < 5; i += 1) {
        this.add.text(300, 150 + i * 50, `${i + 1}. ${this.result[i].user} => ${this.result[i].score}`, this.style);
      }
    }

    if (this.opacity === 'reached') {
      this.restart.alpha += 0.01;
      if (this.restart.alpha >= 1) {
        this.opacity = 'max';
      }
    } else {
      this.restart.alpha -= 0.01;
      if (this.restart.alpha < 0.3) {
        this.opacity = 'reached';
      }
    }
  }
}

export default Scores;