class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' })
    }

    create() {
        if (this.game.music && this.game.music.isPlaying) {
            this.game.music.stop()
        }
    
       
        this.game.music = this.sound.add('ericCartman', { loop: true, volume: 0.6 })
        this.game.music.play()
        
        
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0)
        this.score = 0
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '42px', fill: '#fff' })

        // creating slug
        this.slug = new Slug(this, this.scale.width / 4, this.scale.height / 2, 'slug')
        this.physics.add.existing(this.slug)

        // gravity and colliders
        this.slug.setGravityY(1000)
        this.slug.setCollideWorldBounds(true)

        // tree group for collision
        this.treeGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        })
        this.jumpWhooshSound = this.sound.add('jumpwhoosh', { volume: 0.5 })

        //if space is pressed whoosh sound will play
        this.input.keyboard.on('keydown-SPACE', () => {
            this.slug.jump()
            this.jumpWhooshSound.play() 
        })

        // spawn trees
        this.time.addEvent({
            delay: 2500,
            callback: this.spawnTree,
            callbackScope: this,
            loop: true
        })

        // collision
        this.physics.add.collider(this.slug, this.treeGroup, this.hitTree, null, this)

        this.hitGroundSound = this.sound.add('hitground', { volume: 2})
        this.dingSound = this.sound.add('ding', { volume: 1})
    }

    spawnTree() {
        let gap = 200 // Gap size
        let topTreeY = Phaser.Math.Between(-150, this.scale.height / 2 - gap - 150)
        let treeTop = new Tree(this, this.scale.width, topTreeY, 'treeTop')
        this.treeGroup.add(treeTop)
        let treeBot = new Tree(this, this.scale.width, topTreeY + treeTop.displayHeight + gap, 'treeBot')
        this.treeGroup.add(treeBot)

        this.treeGroup.setVelocityX(-200)
    }

    update() {
        this.background.tilePositionX += 2
    
        // destroy trees when they're fully off-screen to the left
        this.treeGroup.getChildren().forEach(tree => {
            if (!tree.scored && tree.x < this.slug.x - this.slug.width / 2) {
                tree.scored = true
                this.incrementScore(0.5)
                this.dingSound.play()
            }
        })
        //if slug hit bottom game over scene
        if(this.slug.body.bottom >= this.sys.game.config.height) {
            this.hitGroundSound.play()
            this.checkAndUpdateHighScore()
            this.scene.start('GameOver', { score: this.score })
        }
    
        // check for collisions with trees
        this.physics.add.collider(this.slug, this.treeGroup, this.hitTree, null, this)

        
    }

    //score function
    incrementScore(amount) {
        this.score += amount 
        this.scoreText.setText(`Score: ${this.score}`)
        if (this.score > globalHighScore) {
            globalHighScore = this.score
        }
    }

    hitTree() {
        // Stop all trees
        this.treeGroup.setVelocityX(0)
        if(this.score > globalHighScore) {
            globalHighScore = this.score   
        }
        this.scene.start('GameOver', { score: this.score })
    }
    //update highscore global
    checkAndUpdateHighScore() {
        if(this.score > globalHighScore) {
            console.log(`New high score: ${this.score}`)
            globalHighScore = this.score
            this.scoreText.setText('Score: ' + this.score)
        }
    }
}
