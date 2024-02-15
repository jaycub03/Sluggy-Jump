class Tree extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setImmovable(true) //makes it so it doesnt move when collided with slug
        this.setVelocityX(-200) //makes trees move left 
        this.scored = false
    }

    update() {
        if (this.x < -this.displayWidth) {
            this.destroy() //destroy tree from game if it is off the left side of screen
        } else if (!this.scored && this.x < this.scene.slug.x - this.width) {
            this.scene.incrementScore() 
            this.scored = true
        }
    }
}
