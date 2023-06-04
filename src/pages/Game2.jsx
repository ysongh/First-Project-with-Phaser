import Phaser from "phaser";
import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';

import { Player } from '../components/Player';
import CONTRACT_ABI from "../artifacts/contracts/CoinCollecterGame.sol/CoinCollecterGame.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const  Game2 = ({ count, setCount }) => {
  console.log(count)
  const [isReady, setReady] = useState(false);

  const dataService = (changedState) => {
    console.log(changedState)
  }

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI.abi,
    functionName: 'earnPoint'
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(data, isLoading, isSuccess, write);

  useEffect(() => {
    const config = {
      callbacks: {
        preBoot: game => {
          game.registry.merge(count)
          game.registry.events.on("changedata", (par, key, val, prevVal) => {
            setCount(count++)
            dataService({ [key]: val })
            write()
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
    if(write){
      let game = new Phaser.Game(config)
      game.events.on("READY", setReady)
      return () => {
        setReady(false)
        game.destroy(true)
      }
    }
  }, [write])
  return (
    isReady && <div id="phaser-example" />
  )
}

class ExampleScene extends Phaser.Scene {
  preload() {
    this.load.image('player', 'src/assets/player.png');
    this.load.image('coin', 'src/assets/coin.png');
    this.load.audio('coinsound', 'src/assets/coin.mp3');
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

    this.game.events.emit("READY", true);
  }
  earnCoin(player, object) {
    this.sound.play('coinsound');
    object.destroy();
  }
  update() {
    this.player.update(this.cursors);
  }
}

export default Game2;