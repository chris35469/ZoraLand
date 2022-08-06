import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { MainMenuScene } from './scenes/main-menu-scene';
import { WorldScene } from './scenes/world-scene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Zora W3bbie',
  version: '2.0',
  width: window.innerWidth,
  height: window.innerHeight,
  type: Phaser.AUTO,
  parent: 'game',
  dom: {
    createContainer: true
  },
  scene: [BootScene, MainMenuScene, GameScene, WorldScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  backgroundColor: '#98d687',
  render: { pixelArt: true, antialias: false }
};
