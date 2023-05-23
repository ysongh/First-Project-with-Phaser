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
    this.load.audio('coinsound', 'src/assets/coin.mp3');
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    this.player = new Player(this, 400, 600, 'player');

    this.rock = this.physics.add.sprite(400, 100, 'rock');
    this.rock.setCollideWorldBounds(true);
    this.rock.setImmovable(true);
    this.physics.add.collider(this.player, this.rock);

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
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, // Set to true for debug information
    },
  },
  scene: Game,
};

new Phaser.Game(config);
