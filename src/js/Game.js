import stoneMid from "../assets/stoneMid.png";
import stone from "../assets/stoneCenter.png";
import AlignGrid from './helpers/AlignGrid'
import playerImage from '../assets/player_walk.png'
import player from '../assets/player_walk.json'
import bg from '../assets/bg.png'
import spikes from '../assets/spikes.png'

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('bg', bg)
        this.load.image('stoneMid', stoneMid);
        this.load.image('stone', stone)
        this.load.atlas('player', playerImage, player)
        this.load.image('spikes', spikes)
    }

    create() {
        this.sky = this.add.sprite(0,0,'bg').setOrigin(0,0)
        this.sky.setScale(5)
        this.floorGroup = this.physics.add.group();
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
        for (let i = 99; i <= 120; i++) {
            this.placeBlock(i, "stone");
        }
        this.player = this.physics.add.sprite(200, 400, 'player')
        this.player.setGravityY(1500)
        this.anims.create({
            key: 'walk',
            frames: [{
                key: 'player',
                frame: "p3_walk01.png"
            },{
                key: 'player',
                frame: "p3_walk02.png"
            },{
                key: 'player',
                frame: "p3_walk03.png"
            },{
                key: 'player',
                frame: "p3_walk04.png"
            },{
                key: 'player',
                frame: "p3_walk05.png"
            },{
                key: 'player',
                frame: "p3_walk06.png"
            },{
                key: 'player',
                frame: "p3_walk07.png"
            },{
                key: 'player',
                frame: "p3_walk08.png"
            },{
                key: 'player',
                frame: "p3_walk09.png"
            },{
                key: 'player',
                frame: "p3_walk10.png"
            },{
                key: 'player',
                frame: "p3_walk11.png"
            },
            ],
            frameRate: 50,
            repeat: -1
        });
        this.player.play('walk')
        this.physics.add.collider(this.player, this.floorGroup)
    }
    placeBlock(pos, key) {
        let block = this.physics.add.sprite(0, 0, key);
        this.aGrid.placeAtIndex(pos, block);
        block.setScale(1.1, 0.85)
        this.floorGroup.add(block)
        block.setImmovable()
    }
}


export default Game