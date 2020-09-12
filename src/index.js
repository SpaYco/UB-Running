import Phaser from 'phaser';
// eslint-disable-next-line import/no-cycle
import Game from './js/Game';
import Menu from './js/Menu';
import Scores from './js/scores';
// eslint-disable-next-line no-unused-vars
import style from './sass/main.scss';

const config = {
  type: Phaser.AUTO,
  parent: 'UB-Running',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    gravity: {
      y: 500,
    },
    debug: true,
  },
  dom: {
    createContainer: true,
  },
  scene: [Menu, Game, Scores],
};

const game = new Phaser.Game(config);

export default game;