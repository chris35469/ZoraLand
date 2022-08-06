var animationCreator = (anims: any, sprite: any, key: any, start: any, end: any, frameRate: any, repeat: any) => {
    anims.create({
        key,
        frames: anims.generateFrameNumbers(sprite, {
            start,
            end,
        }),
        frameRate,
        repeat, // infinite repeat
    });
};


export class CustomSprite extends Phaser.Physics.Arcade.Sprite {
    private cursors: any;
    private speed: any;
    private keys: any;
    private keyUpMap: any;
    private facingDirection: string;
    private attackEventMap: Object;
    private idleEventMap: Object;
    private controlled: boolean;
    private spriteName: string;
    private info: any;

    constructor(scene: any, x: any, y: any, controlled: boolean, name: string, info: any, scale: number = 2) {
        super(scene, x, y, 'player');
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.createAnimations(scene)
        this.play(name);
        this.controlled = controlled;
        this.facingDirection = "down";
        this.setSize(16, 16);
        this.setScale(scale);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.speed = 2;
        this.spriteName = name;
        this.info = info;
        this.keys = scene.input.keyboard.addKeys("W,A,S,D");
        this.keyUpMap = [
            { key: 'keyup-DOWN', animation: 'down-idle' },
            { key: 'keyup-UP', animation: 'up-idle' },
            { key: 'keyup-LEFT', animation: 'left-idle' },
            { key: 'keyup-RIGHT', animation: 'right-idle' },
            { key: 'keyup-W', animation: 'up-idle' },
            { key: 'keyup-A', animation: 'left-idle' },
            { key: 'keyup-S', animation: 'down-idle' },
            { key: 'keyup-D', animation: 'right-idle' },

        ]
        this.attackEventMap = {
            down: "down-attack",
            up: "up-attack",
            right: "right-attack",
            left: "left-attack"
        }

        this.idleEventMap = {
            down: "down-idle",
            up: "up-idle",
            right: "right-idle",
            left: "left-idle"
        }

        if (this.controlled) {
            this.createKeyUpEvents(scene);
            this.createAttackEvents(scene);
        }

    }

    createAttackEvents(scene: any) {
        scene.input.keyboard.on("keydown-SPACE", function (event: any) {
            this.play(this.attackEventMap[this.facingDirection])
        }.bind(this));

        scene.input.keyboard.on("keyup-SPACE", function (event: any) {
            this.play(this.idleEventMap[this.facingDirection])
        }.bind(this));
    }

    createKeyUpEvents(scene: any) {
        for (let i in this.keyUpMap) {
            let { key, animation } = this.keyUpMap[i];
            scene.input.keyboard.on(key, function (event: any) {
                if (this.controlled) this.play(animation, true);
            }.bind(this));
            //console.log(key, animation)
        }
    }

    createAnimations(scene: any) {
        animationCreator(scene.anims, "player", "down", 1, 4, 6, -1);
        animationCreator(scene.anims, "player", "left", 5, 8, 6, -1);
        animationCreator(scene.anims, "player", "right", 9, 12, 6, -1);
        animationCreator(scene.anims, "player", "up", 13, 16, 6, -1);

        animationCreator(scene.anims, "player-idle", "down-idle", 0, 3, 6, -1);
        animationCreator(scene.anims, "player-idle", "left-idle", 4, 7, 6, -1);
        animationCreator(scene.anims, "player-idle", "right-idle", 8, 11, 6, -1);
        animationCreator(scene.anims, "player-idle", "up-idle", 12, 15, 6, -1);

        animationCreator(scene.anims, "player-attack", "down-attack", 1, 4, 12, -1);
        animationCreator(scene.anims, "player-attack", "left-attack", 5, 8, 12, -1);
        animationCreator(scene.anims, "player-attack", "right-attack", 9, 12, 12, -1);
        animationCreator(scene.anims, "player-attack", "up-attack", 13, 16, 12, -1);

        animationCreator(scene.anims, "icons", "paper", 192, 192, 12, -1);
    }

    up() {
        this.play('up', true);
        this.y -= this.speed;
        this.facingDirection = "up";
    }

    left() {
        //console.log(this.x, this.y)
        this.play('left', true);
        this.x -= this.speed;
        this.facingDirection = "left";
    }

    right() {
        this.play('right', true);
        this.x += this.speed;
        this.facingDirection = "right";
    }

    down() {
        this.play('down', true);
        this.y += this.speed;
        this.facingDirection = "down";
    }

    update() {
        if (this.controlled) {
            this.setVelocity(0)

            if (this.cursors.left.isDown || this.keys.A.isDown) {
                this.left()

            }
            else if (this.cursors.right.isDown || this.keys.D.isDown) {
                this.right()

            }

            if (this.cursors.up.isDown || this.keys.W.isDown) {
                this.up()

            }
            else if (this.cursors.down.isDown || this.keys.S.isDown) {
                this.down()
            }

        }
    }

}