//import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { CustomSprite } from '../objects/player';

export class WorldScene extends Phaser.Scene {
  private speed: number;
  private sprite: any;
  private player: Phaser.Physics.Arcade.Sprite;
  private colliderSprite: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: 'WorldScene'
    });

  }

  preload(): void {}

  init(): void { }

  create(): void {
    for (let i = 0; i < 500; i++) {
      let x = Phaser.Math.Between(-1000, 1000);
      let y = Phaser.Math.Between(-1000, 1000);
      this.add.image(x, y, 'grass1').setOrigin(0);
    }

    this.player = new CustomSprite(this, 40, 10, true, "me");
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.roundPixels = true;
    this.cameras.main.setZoom(1.5);
    this.speed = 500

    this.colliderSprite = new CustomSprite(this, 40, 20, false, "you");
  }

  addText(text: string, size: number, x: number, y: number): void {
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

  update(): void {
    
    this.physics.overlap(
      this.colliderSprite,
      this.player,
      function (evt:any) {
        console.log(evt.spriteName)
      },
      null,
      this
    );
    

  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}
