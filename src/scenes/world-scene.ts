//import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { zdk } from '../interfaces/zora.interface'
import { CustomSprite } from '../objects/player';
import {
  EventSortKey,
  EventType,
  SortDirection,
} from '@zoralabs/zdk/dist/queries/queries-sdk';

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
  private viewZoraCollectionText: any;
  private mintZoraLandTokenText: Phaser.GameObjects.BitmapText;
  private contractTitleText: Phaser.GameObjects.BitmapText;
  private contracts: any;
  private tokens: Phaser.GameObjects.Group;
  private isCollidingCurently: boolean;
  private currentToken: string;
  private currentID: string;
  private tokenName: string;
  private contractCount: number;
  private maxSpread: number;
  private collectionLink: string;

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
    this.tokenName = "";
    this.contractCount = 500;
    this.maxSpread = 5000;
  }

  generateSpriteContracts(): void {
    for (let i = 0; i < this.contractCount; i++) {
      //let {contract, id} = this.contracts[i]
      //console.log(contract)
      let x = Phaser.Math.Between(0, this.maxSpread);
      let y = Phaser.Math.Between(0, this.maxSpread);
      this.tokens.add(new CustomSprite(this, x, y, false, "paper", {contract: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7", id:Phaser.Math.Between(0, 5000).toString()}, 0.5));
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
    this.viewZoraCollectionText.inputEnabled = true;
    this.mintZoraLandTokenText = this.addText("", 10, 0, 0);
    this.contractTitleText = this.addText("", 10, 0, 0);
    this.createDom();

    this.physics.add.collider(this.tokens, this.player, function (token: any, player: any) {
      if (this.currentToken !== token.info.contract || this.currentID !== token.info.id || this.lastCollideSprite === null) {
        this.currentToken = token.info.contract;
        this.currentID = token.info.id;
        this.lastCollideSprite = token;
        this.triggerCollision(token)
      }
    }.bind(this))
    
    this.input.keyboard.on("keydown-V", function (event: any) {
     window.open(this.collectionLink, '_blank');
    }.bind(this));

    this.input.keyboard.on("keydown-M", function (event: any) {
     console.log("add mint function here")
     }.bind(this));
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

  updateContractMedia(url: string, type: string): void {
    let center = this.getCenterPosition(this.player.x, this.player.y + 100, 198, 198);
    this.domElement.setPosition(this.player.x - 225, this.player.y-20)
    this.domElement.visible = true;
    console.log("center", center)
    console.log("player", this.player.x, this.player.y)

    if (type === "video") {
      let vid: any = this.domElement.getChildByID("vid");
      vid.src = url;
    } else if (type === "image") {
      let child: any = this.domElement.getChildByID("media");
      child.src = url;
    }
  }

  updateGameText(): void {
    this.textTitle.setText("NEW TOKEN DISCOVERED!")
    this.viewZoraCollectionText.setText("VIEW ZORA COLLECTION (V)")
    this.contractTitleText.setText(this.tokenName.toUpperCase())
    this.mintZoraLandTokenText.setText("MINT ZORALAND TOKEN (M)")
    this.viewZoraCollectionText.setTint(0xe596bd)
    this.mintZoraLandTokenText.setTint(0xe596bd)
    //let center = this.getCenterPosition(this.player.x + 70, this.player.y - 130, this.textTitle.width, this.textTitle.height);
    this.textTitle.setPosition(this.player.x - 150, this.player.y - 50)

    //center = this.getCenterPosition(this.player.x + 70, this.player.y - 100, this.contractTitleText.width, this.contractTitleText.height);
    this.contractTitleText.setPosition(this.player.x - 150, this.player.y - 25)

    //center = this.getCenterPosition(this.player.x + 70, this.player.y + this.domElement.height + 30, this.viewZoraCollectionText.width, this.viewZoraCollectionText.height);
    this.viewZoraCollectionText.setPosition(this.player.x - 150, this.player.y + 140 )
    
    //center = this.getCenterPosition(this.player.x + 70, this.player.y + this.domElement.height + 80, this.mintZoraLandTokenText.width, this.mintZoraLandTokenText.height);
    this.mintZoraLandTokenText.setPosition(this.player.x - 150, this.player.y + 170)
  }

  triggerCollision(evt: any): void {
    //console.log(evt.info)
    let { contract, id } = evt.info
    //console.log(zdk);
    //let c = "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7"
    this.getTokenInfo(contract, id)
    this.collectionLink = `https://zora.co/collections/zora/${id}`
    console.log("triggered", id)
    //this.updateContractMedia("https://ipfs.io/ipfs/bafkreiec6p23oewjapaqkypt7vafhgyfejefa6fk6eso2blie5kytezata")
  }

  getTokenInfo = async (contractAddress: string, id: string) => {
    const args = {
      //where:{tokens: [{ address: contractAddress, tokenId: id}]},
      /*sort:{
        sortDirection: SortDirection.Asc,
      },*/
      token: { address: contractAddress, tokenId: id },
      //token:{token: [{ address: contractAddress, tokenId: id}]},
      includeFullDetails: true, // Optional, provides more data on the NFTs such as events
      includeSalesHistory: true, // Optional, provides sales data on the NFTs
      includeMarkets: true,
    };


    const resultPromise = new Promise((resolve, reject) => {
      resolve(zdk.token(args));
    });

    resultPromise.then((res: any) => {
      console.log(res)

      let type = res.token.token.content.mimeType.split("/")[0];
      //let name =  res.token.token

      this.tokenName = res.token.token.metadata.name
      let ipfsSplit = res.token.token.content.url.split("/")
      let ipfsID = res.token.token.content.url.split("/")[ipfsSplit.length - 1]
      console.log(ipfsID)
      console.log(type)

      if (type === "image") {
        let mediaLink = `https://ipfs.io/ipfs/${ipfsID}`
        console.log(mediaLink)
        this.updateContractMedia(mediaLink, type)
        this.updateGameText();
      } else {
        
      }

    });

    //let res = await zdk.markets(args)
    //console.log(res)

  }


  triggerCollisionEnd(): void {
    this.domElement.visible = false;
    this.textTitle.setText("");
    this.viewZoraCollectionText.setText("");
    this.mintZoraLandTokenText.setText("");
    this.contractTitleText.setText("");
  }

  update(): void {
    let tempOverlapFlag = false;

    if (this.lastCollideSprite != null) {
      let isColliding = this.physics.overlap(
        this.lastCollideSprite,
        this.player
      )

      if (this.isCollidingCurently != isColliding) {
        if (isColliding === false) {
          console.log("end collision")
          this.triggerCollisionEnd()
          this.lastCollideSprite = null;
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
