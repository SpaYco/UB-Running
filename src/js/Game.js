import stoneMid from "../assets/stoneMid.png";
import stone from "../assets/stoneCenter.png";
import AlignGrid from './helpers/AlignGrid'
import playerImage from '../assets/player_walk.png'
import player from '../assets/player_walk.json'
import bg from '../assets/bg.png'
import spikes from '../assets/spikes.png'
import enemy from '../assets/enemy.json'
import enemyImage from '../assets/enemy.png'
import bridge from '../assets/castleHalfMid.png'
import box from '../assets/boxWarning.png'


var when = 0

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('bg', bg);
        this.load.image('stoneMid', stoneMid);
        this.load.image('stone', stone);
        this.load.atlas('player', playerImage, player);
        this.load.atlas('enemy', enemyImage, enemy);
        this.load.image('spikes', spikes);
        this.load.image('bridge', bridge)
        this.load.image('box', box)
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
        this.add.sprite(760, 150, 'bridge').setScale(1.5)
        this.add.sprite(700, 130, 'box').setDepth(3)
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
        this.enemy = this.add.sprite(700,  60, 'enemy')
        this.anims.create({
            key: 'open',
            frames: [{
                key: 'enemy',
                frame: "switchLeft.png"
            },{
                key: 'enemy',
                frame: "switchLeft.png"
            },{
                key: 'enemy',
                frame: "switchMid.png"
            },{
                key: 'enemy',
                frame: "switchMid.png"
            },{
                key: 'enemy',
                frame: "switchRight.png"
            },{
                key: 'enemy',
                frame: "switchRight.png"
            },{
                key: 'enemy',
                frame: "switchMid.png"
            },{
                key: 'enemy',
                frame: "switchMid.png"
            },{
                key: 'enemy',
                frame: "switchLeft.png"
            },{
                key: 'enemy',
                frame: "switchLeft.png"
            }
            ],
            frameRate: 30,
            repeat: 0
        })
    }
    update(){
        let chance = Math.floor((Math.random() * 100) + 1);
        if (chance < 11 && chance > 7 && when >= 60){
            this.play()
            this.spike = this.physics.add.sprite(700, 100, 'spikes').setDepth(0)
            this.spike.setGravityY(9999)
            this.spike.setGravityX(-500)
            this.physics.add.collider(this.spike, this.floorGroup)
            when = 0
        }
        when++


    }
    

    play(){
        this.enemy.play('open')
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