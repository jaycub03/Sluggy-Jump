class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver')
    }

    create() {
        //stops current background music if it is playing
        if (this.game.music && this.game.music.isPlaying) {
            this.game.music.stop()
        }
    
        
        this.game.music = this.sound.add('ericCartman', { loop: true, volume: 0.6 })
        this.game.music.play()
        // add background image
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0)

        // text for game over
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Game Over', {
            fontFamily: "Fantasy",
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5)

        // display the high score
        this.add.text(this.scale.width / 2, this.scale.height / 2, 'High Score: ' + globalHighScore, {
            fontFamily: "Fantasy",
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5)

        // instructions to restart with 'R' key
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Press R to Restart', {
            fontFamily: "Fantasy",
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        // instructions to go back to the main menu with the left arrow key
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, 'Press LEFT ARROW for Main Menu', {
            fontFamily: "Fantasy",
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        // set up the 'R' key to restart the game
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('Play')
        })

        // set up the left arrow key to return to the main menu
        this.input.keyboard.on('keydown-LEFT', () => {
            this.scene.start('Menu')
        })

        this.input.keyboard.on('keydown-LEFT', () => {
            this.sound.play('transition', { volume: 0.5 }) 
            this.scene.start('Menu') 
        })
    }
}
