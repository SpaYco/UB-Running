import Phaser from "phaser";
import Game from "./js/Game";
import Menu from "./js/Menu"

const config = {
  type: Phaser.AUTO,
  parent: "UB-Running",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
      gravity: { y: 500 }, 
      debug: true 
  },
  scene: [Menu, Game ]
};

const game = new Phaser.Game(config);

export default game