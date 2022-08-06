import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";


const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
}

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
}

const zdk = new ZDK(args) // All arguments are optional



export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private enterFlag: boolean;

  constructor() {
    super({
      key: 'MainMenuScene'
    });

    this.enterFlag = false;
  }

  preload(): void {
    //this.load.html('nameform', './assets/loginform.html');
    //console.log("preloading...")
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.startKey.isDown = false;

    //this.getAddressTokens('0x0aff155c5246d40a4dea995f16c59147402b434a', this.handleTokens.bind(this), 10)

  }

  handleTokens(tokenObj: any): void {
    let y: number = 50;
    for (let id in tokenObj.tokens.nodes) {
      console.log(tokenObj.tokens.nodes[id])
      if (tokenObj.tokens.nodes[id].token.tokenContract.name !== null) {
        this.addText(tokenObj.tokens.nodes[id].token.tokenContract.name.toUpperCase(), 0, y);
        y += 50;
      }
    }

  }

  create(): void {
    var element = this.add.dom(0, 0).createFromCache('form').setOrigin(0, 0);
    element.x = this.getCenterXPositionOfBitmapText(
      element.width
    );

    element.y = this.sys.canvas.height * .8;

  }

  addText(text: string, x: number, y: number): void {
    let titleBitmapText = this.add.bitmapText(
      x,
      y,
      'font',
      text,
      16
    );

    titleBitmapText.x = this.getCenterXPositionOfBitmapText(
      titleBitmapText.width
    );
  }

  update(): void {
    if (this.startKey.isDown && !this.enterFlag) {

      /*
      this.enterFlag = true
      this.scene.restart()
      let p: any = document.getElementById("username");
      console.log(p.value)
      this.getAddressTokens(p.value, this.handleTokens.bind(this), 10)
      */
      //this.scene.start('GameScene');



    }

    if (this.startKey.isUp && this.enterFlag) {
      this.enterFlag = false
    }

  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }


  /*
  private getAddressTokens(address: string, cb: Function, limit: number): void {
    const args = {
      where: {
        ownerAddresses: [address]
      },
      pagination: { limit }, // Optional, limits the response size to 3 NFTs
      includeFullDetails: false, // Optional, provides more data on the NFTs such as events
      includeSalesHistory: false // Optional, provides sales data on the NFTs
    };

    const resultPromise = new Promise((resolve, reject) => {
      resolve(zdk.tokens(args))
    })

    resultPromise.then(res => cb(res))
  }
  */
}
