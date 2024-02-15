class Slug extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setGravityY(1000) //apply gravity to make it fall down
        this.setCollideWorldBounds(true) //make sure slug cant leave screen
        this.canJump = true
    }

    jump() {
        if (this.canJump) {
            this.setVelocityY(-500)
            this.canJump = false //so it cant spam jump
            this.scene.time.delayedCall(200, () => {
                this.canJump = true
            })
        }
    }

    update() {
        // checks if body of slug is touching the bottom
        if (this.body.touching.down) {
            this.canJump = true
        }
    }
}
