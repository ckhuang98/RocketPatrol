// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Play2 ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000   
}

// reserve keyboard vars
let keyUP, keyLEFT, keyRIGHT, keyONE, keyTWO, keyA, keyD, keyW, keyBACKSPACE;

//highscore var
let highScore = 0;