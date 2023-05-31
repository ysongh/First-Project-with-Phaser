import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
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