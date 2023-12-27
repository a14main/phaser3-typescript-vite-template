import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";

export default class Gameover extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Gameover);
    }

    create() {
        const { width, height } = this.scale;

        const x = width * 0.5;
        const y = height * 0.5;

        this.add.text(
            x,
            y,
            'Tap to play again',
            {
                fontSize: '32px',
                color: '#ffffff',
                backgroundColor: '#000000',
                shadow: { fill: true, blur: 0, offsetY: 0},
                padding: { left: 15, right: 15, top: 10, bottom: 10 }
            }
        ).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.stop(SceneKeys.Gameover);

            this.scene.stop(SceneKeys.Game);
            this.scene.start(SceneKeys.Game);
        });
    }
}