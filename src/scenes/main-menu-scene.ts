//import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
//import { zdk } from '../interfaces/zora.interface';

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: 'MainMenuScene'
    });

  }

  preload(): void {}

  init(): void {}

  create(): void {
    let y = this.sys.canvas.height * 0.45;
    this.addText("ZORA LAND", 30, 0, 50);
    this.addText("START (PRESS S)", 16, 0, y);
    y = this.sys.canvas.height * 0.95;
    this.addText("BUILT BY W3BBIE", 12, 0, y);

    this.input.keyboard.on("keydown-S", function (event: any) {
      this.scene.start('WorldScene');
     }.bind(this));
  }

  addText(text: string, size:number, x: number, y: number): void {
    let titleBitmapText = this.add.bitmapText(
      x,
      y,
      'font',
      text,
      size
    );

    titleBitmapText.x = this.getCenterXPositionOfBitmapText(
      titleBitmapText.width
    );
  }

  update(): void {}

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}
