/*
Cary Huang(ckhuang)
Points Breakdown:
    Track a high score that persists across scenes and display it in the UI (10)
    Add your own (copyright-free) background music to the Play scene (10)
    implement the speed increase that happens after 30 seconds in the original game (10)
    Allow the player to control the Rocket after it's fired (10)
    Implement a new timing/scoring mechanism that adds time to the clock for successful hits (25)
    Implement a simultaneous two-player mode (50)
*/

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