import Phaser from 'phaser'

import Game from './scene/Game'
import Preloader from './scene/Preloader'
import Gameover from './scene/Gameover'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [Preloader,Game, Gameover],
}

export default new Phaser.Game(config)
