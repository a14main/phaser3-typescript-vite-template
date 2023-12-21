import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader);
    }

    preload() {
        this.load.image(TextureKeys.Background, 'bg_repeat_340x640.png');
        this.load.image(TextureKeys.MouseHole, 'object_mousehole.png');
        this.load.image(TextureKeys.Window1, 'object_window1.png');
        this.load.image(TextureKeys.Window2, 'object_window2.png');
        this.load.image(TextureKeys.Bookcase1, 'object_bookcase1.png');
        this.load.image(TextureKeys.Bookcase2, 'object_bookcase2.png');

        this.load.atlas(TextureKeys.RocketMouse,'spritesheet.png','spritesheet.json');
        
    }

    create() {
        this.anims.create({
            key: AnimationKeys.RocketMouseRun,
            frames: this.anims.generateFrameNames(
                TextureKeys.RocketMouse,
                {
                    start: 1,
                    end: 4,
                    prefix: 'rocketmouse_run',
                    zeroPad: 2,
                    suffix: '.png'
                }
            ),
            frameRate: 10,
            repeat: -1
        });
        


        this.scene.start(SceneKeys.Game);
    }
}