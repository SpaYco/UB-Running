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
      this.person = JSON.stringify(this.person)

      await this.pushData(this.person)
    }

    if (this.loaded == 'no') {

      this.loaded = 'yes'
      this.result = await this.getData()

      this.style = {
        font: '25px Arial',
        color: '#fff',
        align: 'center'
      };
      for (let i = 0; i < 5; i += 1) {
        await this.add.text(100 + i * 100, 200, `${this.result[i].score}`, this.style)
      }
    }
  }
  async pushData(data) {
    let information = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Ebln0rQMJZ07Mqh88qIl/scores', {
      method: 'POST',
      mode: 'cors',
      body: data
    }).then(response => response);
    return information
  }

  async getData() {
    let data = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Ebln0rQMJZ07Mqh88qIl/scores').catch((e) => {return e})
    let jData = await data.json().result.sort((a, b) => a.score - b.score)
    return jData
  }
}

export default Scores