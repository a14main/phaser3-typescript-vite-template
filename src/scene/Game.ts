import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
    constructor() 
    {
       super('game');
    }

    create() {
        const {width, height} = this.scale;
        
        this.add.tileSprite(0,0,width,height,'background')
        .setOrigin(0,0);

        this.add.sprite(width * 0.5, 
            height * 0.5,
            'rocket-mouse',
            'rocketmouse_fly01.png')
            .play('rocket-mouse-run');
    }
}