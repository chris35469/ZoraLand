//import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { CustomSprite } from '../objects/player';

declare global {
  interface Window { Game: any; }
}

window.Game = window.Game || {};

export class WorldScene extends Phaser.Scene {
  private speed: number;
  private sprite: any;
  private player: Phaser.Physics.Arcade.Sprite;
  private lastCollideSprite: Phaser.Physics.Arcade.Sprite;
  private overlappingObject: boolean | Object;
  private domElement: Phaser.GameObjects.DOMElement;
  private textTitle: Phaser.GameObjects.BitmapText;
  private viewZoraCollectionText: Phaser.GameObjects.BitmapText;
  private mintZoraLandTokenText: Phaser.GameObjects.BitmapText;
  private contracts: any;
  private tokens: Phaser.GameObjects.Group;
  private isCollidingCurently: boolean;
  private currentToken: string;
  private currentID: string;

  constructor() {
    super({
      key: 'WorldScene'
    });

  }

  preload(): void { }

  init(): void {
    this.overlappingObject = false;
    this.contracts = [{ contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7", id: 20636 }, { contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7", id: 16323 }]
    this.tokens = this.add.group({});
    this.lastCollideSprite = null;
    this.isCollidingCurently = false;
  }

  generateSpriteContracts(): void {
    for (let i in this.contracts) {
      //let {contract, id} = this.contracts[i]
      //console.log(contract)
      let x = Phaser.Math.Between(0, 100);
      let y = Phaser.Math.Between(0, 100);
      this.tokens.add(new CustomSprite(this, x, y, false, "paper", this.contracts[i], 0.5));
    }
  }

  addContractSprite(): void {

  }

  create(): void {

    this.generateSpriteContracts();

    for (let i = 0; i < 500; i++) {
      let x = Phaser.Math.Between(-1000, 1000);
      let y = Phaser.Math.Between(-1000, 1000);
      this.add.image(x, y, 'grass1').setOrigin(0);
    }

    this.player = new CustomSprite(this, 10, 10, true, "down-idle", {});
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.roundPixels = true;
    this.cameras.main.setZoom(1.5);
    this.speed = 500;
    this.textTitle = this.addText("", 16, 0, 0);
    this.viewZoraCollectionText = this.addText("", 10, 0, 0);
    this.mintZoraLandTokenText = this.addText("", 10, 0, 0);
    this.createDom();

    this.physics.add.collider(this.tokens, this.player, function (token: any, player: any) {
      if (this.currentToken !== token.info.contract || this.currentID !== token.info.id) {
        console.log(token.info)
        this.currentToken = token.info.contract;
        this.currentID = token.info.id;
        this.lastCollideSprite = token;
        this.triggerCollision()
      }
    }.bind(this))

  }

  createDom(): void {
    this.domElement = this.add.dom(this.player.x, this.player.y).createFromCache('form');
    this.domElement.visible = false;
    this.domElement.setOrigin(0)
    this.domElement.setPosition(this.player.x - 150, this.player.y)
  }

  addText(text: string, size: number, x: number, y: number): Phaser.GameObjects.BitmapText {
    let titleBitmapText = this.add.bitmapText(
      x,
      y,
      'font',
      text,
      size
    ).setOrigin(0);

    titleBitmapText.setPosition(x, y)

    return titleBitmapText;
  }

  updateContractMedia(url: string): void {
    let center = this.getCenterPosition(this.player.x, this.player.y + 100, 198, 198);
    this.domElement.setPosition(center.x, center.y)
    this.domElement.visible = true;
    let child: any = this.domElement.getChildByID("media"); url
    child.src = url;
  }

  updateGameText(): void {
    this.textTitle.setText("NEW TOKEN DISCOVERED!")
    this.viewZoraCollectionText.setText("VIEW ZORA COLLECTION")
    this.mintZoraLandTokenText.setText("MINT ZORALAND TOKEN")
    this.viewZoraCollectionText.setTint(0xe596bd)
    this.mintZoraLandTokenText.setTint(0xe596bd)
    let center = this.getCenterPosition(this.player.x + 70, this.player.y - 100, this.textTitle.width, this.textTitle.height);
    this.textTitle.setPosition(center.x, center.y)
    center = this.getCenterPosition(this.player.x + 70, this.player.y + this.domElement.height + 30, this.viewZoraCollectionText.width, this.viewZoraCollectionText.height);
    this.viewZoraCollectionText.setPosition(center.x, center.y)
    center = this.getCenterPosition(this.player.x + 70, this.player.y + this.domElement.height + 80, this.mintZoraLandTokenText.width, this.mintZoraLandTokenText.height);
    this.mintZoraLandTokenText.setPosition(center.x, center.y)
  }

  triggerCollision(evt: any): void {
    this.updateContractMedia("https://cdn3.vectorstock.com/i/1000x1000/29/87/alabama-travel-poster-vector-14552987.jpg")
    this.updateGameText();
  }

  triggerCollisionEnd(): void {
    this.domElement.visible = false;
    this.textTitle.setText("");
    this.viewZoraCollectionText.setText("");
    this.mintZoraLandTokenText.setText("");
  }

  update(): void {
    let tempOverlapFlag = false;

    if (this.lastCollideSprite != null) {
      let isColliding = this.physics.overlap(
        this.lastCollideSprite,
        this.player
      )
  
      if(this.isCollidingCurently != isColliding) {
        if (isColliding === false){
          console.log("end collision")
          this.triggerCollisionEnd()
        }
        this.isCollidingCurently = isColliding;
      }
    }
   
    if (tempOverlapFlag == false && this.overlappingObject != false) {
      this.triggerCollisionEnd()
      this.overlappingObject = false;
    }


  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }

  private getCenterPosition(focusX: number, focusY: number, width: number, height: number): any {
    let x = focusX / 2 - width / 2;
    let y = focusY / 2 - height / 2;
    return { x, y };
  }

}
