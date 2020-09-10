import Phaser from 'phaser';
import Game from './js/Game';
import Menu from './js/Menu';
import Scores from './js/scores'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import style from './sass/main.scss'

const config = {
  type: Phaser.AUTO,
  parent: 'UB-Running',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    gravity: {
      y: 500
    },
    debug: true
  },
  dom: {
    createContainer: true
  },
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: RexUIPlugin,
      mapping: 'rexUI',
    }, ]
  },
  scene: [Menu, Game, Scores]
};

const game = new Phaser.Game(config);

export default game