// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        //add obj to scene
        scene.add.existing(this);   // add to existing, displayList, updateList
        this.points = pointValue;
    }

    update() {
        // move space left
        this.x -= game.settings.spaceshipSpeed;

        // wraparound screen bounds
        if(this.x <=0 - this.width){
            this.x = game.config.width;
        }
        
    }

    reset(){
        this.x = game.config.width;
    }
}