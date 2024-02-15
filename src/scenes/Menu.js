class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' })
    }

    create() {

        if (this.game.music && this.game.music.isPlaying) {
            this.game.music.stop()
        }
    
       
        this.game.music = this.sound.add('ericCartman', { loop: true, volume: 0.6 })
        this.game.music.play()

        this.cameras.main.fadeIn(1000, 0, 0, 0)
        
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0)

        // add slug image
        this.slug = this.add.image(this.scale.width / 2, this.scale.height / 2, 'slug').setOrigin(0.5)

        
        if (!this.game.music) { 
            this.game.music = this.sound.add('ericCartman', { loop: true, volume: 0.6 })
            this.game.music.play()
        }

        // music control instructions
        this.add.text(10, 10, 'Mute: M | Unmute: U | Vol +: V | Vol -: D', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        })

        // add the menu text for starting the game
        this.add.text(this.scale.width / 2, this.scale.height / 4, 'Press SPACE to Play', {
            fontFamily: 'Fantasy',
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5)

        // instructions for gameplay
        this.add.text(this.scale.width / 2, this.scale.height / 4+40, 'Use SPACE to Jump Through The Trees', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        // right arrow key for Credits scene
        this.add.text(this.scale.width / 2, this.scale.height / 4+80, 'Press RIGHT ARROW for Credits', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        // display the high score
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 150, 'High Score: ' + globalHighScore, {
            fontFamily: 'Fantasy',
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5)

        // set up the space key to start the game
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Play')
        })

        // set up keyboard controls for music
        this.defineMusicControlKeys()
        
        // right arrow key for Credits scene
        this.rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.transitionSound = this.sound.add('transition', { volume: 0.5 })
    }

    update() {
        //if right arrow go to Credits
        if (Phaser.Input.Keyboard.JustDown(this.rightArrow)) {
            
            this.transitionSound.play()

            
            this.time.delayedCall(100, () => {
                this.scene.start('Credits')
            })
        }
    }

    defineMusicControlKeys() {
        // mute with 'M'
        this.input.keyboard.on('keydown-M', () => {
            if (this.game.music) {
                this.game.music.setMute(true)
            }
        })

        // unmute with 'U'
        this.input.keyboard.on('keydown-U', () => {
            if (this.game.music) {
                this.game.music.setMute(false)
            }
        })

        // volume down with 'D'
        this.input.keyboard.on('keydown-D', () => {
            if (this.game.music) {
                let volume = Math.max(0, this.game.music.volume - 0.1)
                this.game.music.setVolume(volume)
            }
        })

        // volume up with 'V'
        this.input.keyboard.on('keydown-V', () => {
            if (this.game.music) {
                let volume = Math.min(1, this.game.music.volume + 0.1)
                this.game.music.setVolume(volume)
            }
        })
    }
}
