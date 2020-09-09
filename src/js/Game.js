import stone from "../assets/stoneCenter.png";
import AlignGrid from './helpers/AlignGrid'
import playerImage from '../assets/player_walk.png'
import player from '../assets/player_walk.json'
import bg from '../assets/bg.jpg'
import spikes from '../assets/spikes.png'
import enemy from '../assets/enemy.json'
import enemyImage from '../assets/enemy.png'
import bridge from '../assets/castleHalfMid.png'
import box from '../assets/boxWarning.png'
import global from './globalVariables'





class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('bg', bg);
        this.load.image('stone', stone);
        this.load.atlas('player', playerImage, player);
        this.load.atlas('enemy', enemyImage, enemy);
        this.load.image('spikes', spikes);
        this.load.image('bridge', bridge)
        this.load.image('box', box)
    }

    create() {
        this.sky = this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
        this.sky.setScale(5)
        this.floorGroup = this.physics.add.group();
        this.trapGroup = this.physics.add.group();
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
        this.style = {
            font: "45px Arial",
            color: "#000000",
            align: "center"
        };
        this.score = this.add.text(10, 10, `Score: ${global.currentScore}`, this.style)

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
            }, {
                key: 'player',
                frame: "p3_walk02.png"
            }, {
                key: 'player',
                frame: "p3_walk03.png"
            }, {
                key: 'player',
                frame: "p3_walk04.png"
            }, {
                key: 'player',
                frame: "p3_walk05.png"
            }, {
                key: 'player',
                frame: "p3_walk06.png"
            }, {
                key: 'player',
                frame: "p3_walk07.png"
            }, {
                key: 'player',
                frame: "p3_walk08.png"
            }, {
                key: 'player',
                frame: "p3_walk09.png"
            }, {
                key: 'player',
                frame: "p3_walk10.png"
            }, {
                key: 'player',
                frame: "p3_walk11.png"
            }, ],
            frameRate: 50,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: [{
                key: 'player',
                frame: "p3_jump.png"
            }],
            frameRate: 1,
            repeat: 0
        })
        this.anims.create({
            key: 'hurt',
            frames: [{
                key: 'player',
                frame: "p3_hurt.png"
            }],
            frameRate: 1,
            repeat: 0
        })
        this.physics.add.collider(this.player, this.floorGroup)
        // this.physics.add.collider(this.player, this.trapGroup)
        this.enemy = this.add.sprite(700, 60, 'enemy').setDepth(3)
        this.anims.create({
            key: 'open',
            frames: [{
                key: 'enemy',
                frame: "switchLeft.png"
            }, {
                key: 'enemy',
                frame: "switchLeft.png"
            }, {
                key: 'enemy',
                frame: "switchMid.png"
            }, {
                key: 'enemy',
                frame: "switchMid.png"
            }, {
                key: 'enemy',
                frame: "switchRight.png"
            }, {
                key: 'enemy',
                frame: "switchRight.png"
            }, {
                key: 'enemy',
                frame: "switchMid.png"
            }, {
                key: 'enemy',
                frame: "switchMid.png"
            }, {
                key: 'enemy',
                frame: "switchLeft.png"
            }, {
                key: 'enemy',
                frame: "switchLeft.png"
            }],
            frameRate: 30,
            repeat: 0
        })
    }
    update() {

        if (this.player.y <= 400 && global.currentAnimation != 'jump' && global.currentAnimation != 'hurt') {
            this.player.play('jump')
            global.currentAnimation = 'jump'
        } else if (this.player.y >= 440 && global.currentAnimation != 'walk' && global.currentAnimation != 'hurt') {
            this.player.play('walk')
            global.currentAnimation = 'walk'
        }



        if (global.currentAnimation != 'hurt') {
            global.currentScore++
            let chance = Math.floor((Math.random() * 100) + 1);
            if (global.timer >= 60 && chance < 11 && chance > 7) {
                this.play()
                this.spike = this.physics.add.sprite(700, 110, 'spikes').setDepth(0)
                this.trapGroup.add(this.spike)
                this.spike.setGravityY(9999)
                this.spike.setGravityX(global.spikeGravity)
                this.physics.add.collider(this.spike, this.floorGroup)
                global.timer = 0
            }
            this.input.on('pointerdown', () => {
                if (this.player.y >= 440) {
                    this.player.setVelocityY(-800)
                }
            })
        } else {
            if (!global.gameOver) {
                this.gameStyle = {
                    font: "45px Helvetica",
                    color: "#000000",
                    align: "center"
                };
                this.textStyle = {
                    font: "15px Helvetica",
                    color: "#000000",
                    align: "center"
                };
                this.add.text(300, 300, `Game Over! \n Your Score is ${Math.floor(global.currentScore / 10)}`, this.gameStyle)
                this.add.text(370, 400, 'Click Anywhere To See Scores', this.textStyle)
                global.gameOver = true
            }
            this.input.on('pointerdown', () => {
                this.scene.start('Menu')
            })
        }
        this.score.text = `Score: ${Math.floor(global.currentScore / 10)}`

        global.timer++




        if (this.findEnemy()) {
            this.player.play('hurt')
            global.currentAnimation = 'hurt'
            this.trapGroup.children.entries.forEach(element => {

            });
        }
    }
    play() {
        this.enemy.play('open')
    }

    findEnemy() {
        let search = this.trapGroup.children.entries.find((enemy) => {
            let xDistance = enemy.x - this.player.x
            let yDistance = enemy.y - this.player.y
            return (Math.abs(xDistance) <= (enemy.height / 2) && Math.abs(yDistance) <= (enemy.width / 2))
        })
        if (search != undefined) {
            return true
        }
        return false
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