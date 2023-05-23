import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32, 32, 0xFFFF00);

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
    this.load.image('book', 'src/assets/book.png');
    this.load.image('coin', 'src/assets/coin.png');
    this.load.image('rock', 'src/assets/rock.png');
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    this.player = new Player(this, 400, 300);

    this.rock = this.physics.add.sprite(400, 100, 'rock');
    this.rock.setCollideWorldBounds(true);
    this.rock.setImmovable(true);
    this.physics.add.collider(this.player, this.rock);

    this.object1 = this.physics.add.sprite(300, 300, 'coin');
    this.object2 = this.physics.add.sprite(500, 300, 'coin');
    this.object3 = this.physics.add.sprite(400, 500, 'coin');
    this.physics.add.collider(this.player, this.object1, this.handleCollision, null, this);
    this.physics.add.collider(this.player, this.object2, this.handleCollision, null, this);
    this.physics.add.collider(this.player, this.object3, this.handleCollision, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  handleCollision(player, object) {
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
