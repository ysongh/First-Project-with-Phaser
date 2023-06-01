import Phaser from "phaser"
import React, { useEffect, useState } from "react"

import { Player } from '../components/Player';

const  Game2 = ({ count, setCount }) => {
  console.log(count)
  const [isReady, setReady] = useState(false);

  const dataService = (changedState) => {
    console.log(changedState)
  }

  useEffect(() => {
    const config = {
      callbacks: {
        preBoot: game => {
          game.registry.merge(count)
          game.registry.events.on("changedata", (par, key, val, prevVal) => {
            setCount(count++)
            dataService({ [key]: val })
          })
        },
      },
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false, // Set to true for debug information
        },
      },
      scene: [ExampleScene],
    }
    let game = new Phaser.Game(config)
    game.events.on("READY", setReady)
    return () => {
      setReady(false)
      game.destroy(true)
    }
  }, [])
  return (
    isReady && <div id="phaser-example" />
  )
}

class ExampleScene extends Phaser.Scene {
  preload() {
    this.load.image('player', 'src/assets/player.png');
  }
  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);
    const text = this.add.text(250, 250, "Phaser");
    text.setInteractive({ useHandCursor: true });
    this.player = new Player(this, 400, 600, 'player');
    let { count } = this.registry.getAll();
    text.on("pointerup", () => {;
      this.registry.merge({ count: count++ });
    })
    this.cursors = this.input.keyboard.createCursorKeys();
    this.game.events.emit("READY", true);
  }
  update() {
    this.player.update(this.cursors);
  }
}

export default Game2;