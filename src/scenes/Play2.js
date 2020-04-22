class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    //global var keeps track of whether bgm is playing
    isPlaying = false;
    //loop count and elapsed time count
    loop = 0;
    

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        
        if(this.isPlaying == false){
            this.bgm = this.sound.add('theme');
            this.bgm.play();
        }

        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add 2 rocket
        this.p1Rocket = new Rocket(this, game.config.width/2 + 32, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
        this.p2Rocket = new Rocket2(this, game.config.width/2 - 32, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0,0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyBACKSPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // player 1 & 2 score
        this.p1Score = 0;
        this.p2Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(469, 54, this.p2Score, scoreConfig);

        // High score display
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 200
        }
        this.add.text(220, 6, "High Score:", highScoreConfig);
        this.scoreMiddle = this.add.text(269, 54, highScore, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Fire to Restart or BACKSPACE for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.clock.startAt = 0;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyW))) {
            this.scene.restart();
            this.isPlaying = true;
            if(this.p1Score > highScore){
                highScore = this.p1Score;
            } 
            if(this.p2Score > highScore){
                highScore = this.p2Score;
            }
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyBACKSPACE)) {
            this.scene.start("menuScene");
            this.isPlaying = false;
            this.bgm.stop();
            if(this.p1Score > highScore){
                highScore = this.p1Score;
            } 
            if(this.p2Score > highScore){
                highScore = this.p2Score;
            }
       }
        console.log(this.clock.getElapsedSeconds());
        if(this.clock.getElapsedSeconds() >= 30){
            if(game.settings.spaceshipSpeed == 3){
                game.settings.spaceshipSpeed = 5;
            } else if(game.settings.spaceshipSpeed == 4){
                game.settings.spaceshipSpeed = 6;
            }
        }

        this.starfield.tilePositionX -= 4;  // scroll tile sprite
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.clock.startAt = 0;
            if(game.settings.spaceshipSpeed == 5){
                game.settings.spaceshipSpeed = 3;
            } else if(game.settings.spaceshipSpeed == 6){
                game.settings.spaceshipSpeed = 4;
            }
        }             
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            // score increment and repaint
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;  
            this.clock.delay += 500;   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            // score increment and repaint
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;  
            this.clock.delay += 500;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            // score increment and repaint
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;  
            this.clock.delay += 500;
        }

        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
            // score increment and repaint
            this.p2Score += this.ship03.points;
            this.scoreRight.text = this.p2Score;  
            this.clock.delay += 500;   
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
            // score increment and repaint
            this.p2Score += this.ship02.points;
            this.scoreRight.text = this.p2Score;  
            this.clock.delay += 500;
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
            // score increment and repaint
            this.p2Score += this.ship01.points;
            this.scoreRight.text = this.p2Score;  
            this.clock.delay += 500;
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });   
        // play sound
        this.sound.play('sfx_explosion');  
    }
}