import Phaser from "phaser"
import React, { useEffect, useState } from "react"

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
    const text = this.add.text(250, 250, "Phaser")
    text.setInteractive({ useHandCursor: true })
    this.add.image(400, 300, "player")
    let { count } = this.registry.getAll()
    text.on("pointerup", () => {
      this.registry.merge({ count: count++ })
    })
    this.game.events.emit("READY", true)
  }
}

export default Game2;