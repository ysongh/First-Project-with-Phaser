import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.body.setCollideWorldBounds(true);
    this.body.setDrag(500);
    this.body.setSize(32, 48);
  }

  update(cursors) {
    const speed = 200;
    this.body.setVelocity(0);

    if (cursors.left.isDown) {
      this.body.setVelocityX(-speed); // Move left
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(speed); // Move right
    }

    if (cursors.up.isDown) {
      this.body.setVelocityY(-speed); // Move up
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(speed); // Move down
    }
  }
}

class Game extends Phaser.Scene {
  preload() {
    this.load.image('player', 'src/assets/player.png');
    this.load.image('coin', 'src/assets/coin.png');
    this.load.image('rock', 'src/assets/rock.png');
    this.load.image('wall5x100', 'src/assets/wall5x100.png');
    this.load.image('wall5x200', 'src/assets/wall5x200.png');
    this.load.image('wall200x5', 'src/assets/wall200x5.png');
    this.load.image('wall400x5', 'src/assets/wall400x5.png');
    this.load.audio('coinsound', 'src/assets/coin.mp3');
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    this.player = new Player(this, 400, 600, 'player');

    this.rock = this.physics.add.sprite(670, 295, 'rock');
    this.rock.setCollideWorldBounds(true);
    this.rock.setImmovable(true);
    this.physics.add.collider(this.player, this.rock);

    this.wall1 = this.physics.add.sprite(360, 240, 'wall5x200');
    this.wall1.setCollideWorldBounds(true);
    this.wall1.setImmovable(true);
    this.physics.add.collider(this.player, this.wall1);

    this.wall2 = this.physics.add.sprite(450, 445, 'wall200x5');
    this.wall2.setCollideWorldBounds(true);
    this.wall2.setImmovable(true);
    this.physics.add.collider(this.player, this.wall2);

    this.wall3 = this.physics.add.sprite(450, 240, 'wall400x5');
    this.wall3.setCollideWorldBounds(true);
    this.wall3.setImmovable(true);
    this.physics.add.collider(this.player, this.wall3);

    this.wall4 = this.physics.add.sprite(255, 340, 'wall5x200');
    this.wall4.setCollideWorldBounds(true);
    this.wall4.setImmovable(true);
    this.physics.add.collider(this.player, this.wall4);

    this.wall5 = this.physics.add.sprite(550, 345, 'wall200x5');
    this.wall5.setCollideWorldBounds(true);
    this.wall5.setImmovable(true);
    this.physics.add.collider(this.player, this.wall5);

    const coinsPerRow = 5;
    const coinSpacing = 100;
    const startX = 200;
    const startY = 200;

    this.coins = this.physics.add.group();

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < coinsPerRow; col++) {
        const x = startX + col * coinSpacing;
        const y = startY + row * coinSpacing;
        const coin = this.coins.create(x, y, 'coin');
        this.physics.add.collider(this.player, coin, this.earnCoin, null, this);
      }
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.sound.add('coinsound');
  }

  earnCoin(player, object) {
    this.sound.play('coinsound');
    object.destroy();
  }

  update() {
    this.player.update(this.cursors);
  }
}

export default function PhaserGame() {
  return <div id="phaser-game-container" />;
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-game-container',
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, // Set to true for debug information
    },
  },
  scene: Game,
};

new Phaser.Game(config);
