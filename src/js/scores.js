import global from './globalVariables'
import bg from '../assets/bg.jpg'

class Scores extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scores'
    })
  }

  preload() {
    this.load.image('bg', bg);
  }
  create() {
    this.sky = this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
    this.sky.setScale(5)
    this.pushed = 'no'
    this.loaded = 'no'

  }

  async update() {
    if (this.pushed == 'no') {
      this.pushed = 'yes'

      this.person = {
        user: global.name,
        score: (Math.floor(global.currentScore / 10))
      }
      this.jPerson = JSON.stringify(this.person)

      this.pushData(this.jPerson)
    }

    if (this.loaded == 'no') {

      this.loaded = 'yes'
      this.result = await this.getData()

      this.style = {
        font: '25px Arial',
        color: '#fff',
        align: 'center'
      };
      this.add.text(320, 100, `Leaderboard`, this.style)
      this.add.text(250, 400, `Your Score Has Been Saved`, this.style) 
      for (let i = 0; i < 5; i += 1) {
        await this.add.text(300, 150 + i * 50, `${i + 1}. ${this.result[i].user} => ${this.result[i].score}`, this.style)
      }
    }
  }
  async pushData(e) {

    let information = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ezww6AGdTOyciw0GhscO/scores/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'Application/json',
        'Content-Type': 'application/json',
      },
      body: e
    }).then(response => response);
    return information
  }

  async getData() {
    let data = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ezww6AGdTOyciw0GhscO/scores').then(result => result).catch((e) => {
      return e
    })
    let jData = await data.json()
    jData = await jData.result

    await jData.sort((a, b) => {
      return b.score - a.score;
    });
    return await jData
  }
}

export default Scores