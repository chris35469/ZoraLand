export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;
  
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x98d687);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      'progress',
      function (value: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      'complete',
      function () {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // load out package
    this.load.pack('preload', './assets/pack.json', 'preload');
    this.load.html('form', './assets/html/loginform.html');
    this.load.image("map", "assets/map/map_large.png");
    this.load.image('ship', '../assets/images/ship.png');
    this.load.image('grass1', '../assets/sprites/grass1-final.png');

    var sheet = this.load.spritesheet("rabbit", "../assets/sprites/rabbits.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    var player = this.load.spritesheet("player", "../assets/sprites/walk-final-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    var idleFinal = this.load.spritesheet("player-idle", "../assets/sprites/idle-final-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    var attackFinal = this.load.spritesheet("player-attack", "../assets/sprites/attack-final.png", {
      frameWidth: 64,
      frameHeight: 64,
    });


  }

  update(): void {
   // this.scene.start('MainMenuScene');
   this.scene.start('WorldScene');
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}
