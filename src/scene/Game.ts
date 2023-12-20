import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Game extends Phaser.Scene {
    constructor() 
    {
       super(SceneKeys.Game);
    }

    private background!: Phaser.GameObjects.TileSprite

    create() {
        const {width, height} = this.scale;
        
        this.background = this.add
            .tileSprite(0,0,width,height,TextureKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0,0);

        const mouse = this.physics.add
            .sprite(
                width * 0.5, 
                height * 0.5,
                TextureKeys.RocketMouse,
                'rocketmouse_fly01.png')
            .play(AnimationKeys.RocketMouseRun);

        const body = mouse.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);
        this.cameras.main.startFollow(mouse);
        this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER,height-30);

        this.physics.world.setBounds(0,0,Number.MAX_SAFE_INTEGER, height-30);
    }

    update(t: number, dt: number) {
        this.background.setTilePosition(this.cameras.main.scrollX);
    }
}