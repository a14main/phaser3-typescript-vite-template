import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import RocketMouse from '../game/RocketMouse';
import LaserObstacle from '../game/LaserObstacle';

export default class Game extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Game);
    }

    private background!: Phaser.GameObjects.TileSprite
    private mouseHole!: Phaser.GameObjects.Image
    private window1!: Phaser.GameObjects.Image
    private window2!: Phaser.GameObjects.Image
    private bookcase1!: Phaser.GameObjects.Image
    private bookcase2!: Phaser.GameObjects.Image
    private laser!: LaserObstacle

    private windows: Phaser.GameObjects.Image[] = [];
    private bookcases: Phaser.GameObjects.Image[] = [];


    create() {
        const { width, height } = this.scale;

        this.background = this.add
            .tileSprite(0, 0, width, height, TextureKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0, 0);

        this.mouseHole = this.add.image(
            Phaser.Math.Between(900, 1500),
            501,
            TextureKeys.MouseHole
        );

        this.window1 = this.add.image(
            Phaser.Math.Between(900, 1300),
            200,
            TextureKeys.Window1
        );

        this.window2 = this.add.image(
            Phaser.Math.Between(1600, 2000),
            200,
            TextureKeys.Window2
        );

        this.windows = [this.window1, this.window2];

        this.bookcase1 = this.add.image(
            Phaser.Math.Between(2200, 2700),
            580,
            TextureKeys.Bookcase1
        )
            .setOrigin(0.5, 1);

        this.bookcase2 = this.add.image(
            Phaser.Math.Between(2900, 3400),
            580,
            TextureKeys.Bookcase2
        )
            .setOrigin(0.5, 1);

        this.bookcases = [this.bookcase1, this.bookcase2];

        this.laser = new LaserObstacle(this, 900, 100);
        this.add.existing(this.laser);

        const mouse = new RocketMouse(this, width * 0.5, height - 30);
        this.add.existing(mouse);

        const body = mouse.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);
        this.cameras.main.startFollow(mouse);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);


        this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

        this.physics.add.overlap(this.laser, mouse, this.handleOverlapLaser, undefined, this);
        mouse.once('dead', this.gameOver, this);
    }

    update(t: number, dt: number) {
        this.background.setTilePosition(this.cameras.main.scrollX);
        this.wrapMouseHole();
        this.wrapWindows();
        this.wrapBookcases();
        this.wrapLaser();

    }

    private wrapMouseHole() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;

        if (this.mouseHole.x + this.mouseHole.width < scrollX) {
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            );
        }
    }

    private wrapWindows() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;

        let width = this.window1.width * 2;
        if (this.window1.x + width < scrollX) {
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            );
            const overlap = this.bookcases.find(bc => {
                return Math.abs(this.window1.x - bc.x) <= this.window1.width;
            });
            this.window1.visible = !overlap;
        }

        width = this.window2.width * 2;
        if (this.window2.x + width < scrollX) {
            this.window2.x = Phaser.Math.Between(
                this.window1.x + width,
                this.window1.x + width + 800
            );
            const overlap = this.bookcases.find(bc => {
                return Math.abs(this.window2.x - bc.x) <= this.window2.width;
            });
            this.window2.visible = !overlap;

        }
    }

    private wrapBookcases() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;

        let width = this.bookcase1.width * 2;
        if (this.bookcase1.x + width < scrollX) {
            this.bookcase1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            );
            const overlap = this.windows.find(w => {
                return Math.abs(this.bookcase1.x - w.x) <= w.width;
            });
            this.bookcase1.visible = !overlap;

        }

        width = this.bookcase2.width * 2;
        if (this.bookcase2.x + width < scrollX) {
            this.bookcase2.x = Phaser.Math.Between(
                this.bookcase1.x + width,
                this.bookcase1.x + width + 800
            );
            const overlap = this.windows.find(w => {
                return Math.abs(this.bookcase2.x - w.x) <= w.width;
            });
            this.bookcase2.visible = !overlap;

        }
    }

    private wrapLaser() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;

        const body = this.laser.body as Phaser.Physics.Arcade.StaticBody

        const width = body.width;

        if (this.laser.x + width < scrollX) {
            this.laser.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 1000
            );
            this.laser.y = Phaser.Math.Between(0, 300);

            body.position.x = this.laser.x + body.offset.x;
            body.position.y = this.laser.y + body.offset.y;
        }

    }

    private handleOverlapLaser(laser: LaserObstacle, mouse: RocketMouse) {
        mouse.kill();
    }

    private gameOver() {
        this.scene.run(SceneKeys.Gameover);
    }
}