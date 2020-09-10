import global from './globalVariables';
import bg from '../assets/bg.jpg';

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
        user: global.name,
        score: (Math.floor(global.currentScore / 10)),
      };
      this.jPerson = JSON.stringify(this.person);

      this.pushData(this.jPerson);
    }

    if (this.loaded === 'no') {
      this.loaded = 'yes';
      this.result = await this.getData();
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

  async pushData(e) {
    this.information = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ezww6AGdTOyciw0GhscO/scores/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'Application/json',
        'Content-Type': 'application/json',
      },
      body: e,
    }).then(response => response);
    return this.information;
  }

  async getData() {
    this.data = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ezww6AGdTOyciw0GhscO/scores').then(result => result).catch((e) => e);
    this.jData = await this.data.json();
    this.jData = await this.jData.result;

    await this.jData.sort((a, b) => b.score - a.score);
    return this.jData;
  }
}

export default Scores;