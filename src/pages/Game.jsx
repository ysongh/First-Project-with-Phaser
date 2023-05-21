import Phaser from 'phaser';

class Game extends Phaser.Scene {
  preload() {
    this.load.image('book', 'src/assets/book.png');
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    this.add.image(400, 200, 'book');

    this.player = this.add.rectangle(400, 300, 32, 32, 0xFFFF00);

    this.physics.world.enable(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setDrag(500);
    this.player.body.setSize(32, 48);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 200;

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed); // Move left
    }
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed); // Move right
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed); // Move up
    }
    else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed); // Move down
    }
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
