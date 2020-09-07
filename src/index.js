import Phaser from "phaser";
import Game from "./js/Game";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
      gravity: { y: 500 }, 
      debug: true 
  },
  scene: [Game]
};

const game = new Phaser.Game(config);

export default game