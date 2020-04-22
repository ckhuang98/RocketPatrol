class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        // load background music (Source: Bensound.com)
        this.load.audio('theme', './assets/bensound-scifi.mp3');
        
    }

    create() {
        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 200
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;


        this.add.text(centerX, centerY- 3*textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 2*textSpacer, 'High Score:' + highScore, menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer, 'Use 1 or 2 to choose num. of players', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'P1: Use ←→ arrows to move & ↑ to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'P2: Use A & D to move & W to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + 2*textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);  
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            game.settings = {
                multiplayer: false,
                spaceshipSpeed: 0,
                gameTimer: 0,
            }
            this.sound.play('sfx_select');
        }
        if(Phaser.Input.Keyboard.JustDown(keyTWO)){
            game.settings = {
                multiplayer: true,
                spaceshipSpeed: 0,
                gameTimer: 0,
            }
            this.sound.play('sfx_select');
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings.spaceshipSpeed = 3;
            game.settings.gameTimer = 60000;
            
            this.sound.play('sfx_select');
            if(game.settings.multiplayer == false){
                this.scene.start("playScene");    
            } else if(game.settings.multiplayer == true){
                this.scene.start("playScene2");
            }
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings.spaceshipSpeed = 4;
            game.settings.gameTimer = 45000;

            this.sound.play('sfx_select');
            if(game.settings.multiplayer == false){
                this.scene.start("playScene");    
            } else if(game.settings.multiplayer == true){
                this.scene.start("playScene2");
            }    
        }
    }
}