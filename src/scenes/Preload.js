class Preload extends Phaser.Scene {
    constructor() {
        super('Preload')
    }
    //all preloads
    preload() {
        this.load.image('background', 'assets/background.png')
        this.load.image('treeTop', 'assets/treeTop.png')
        this.load.image('treeBot', 'assets/treeBot.png')
        this.load.image('slug' , 'assets/Slug.png') 
        this.load.audio('ericCartman', 'assets/ericCartman.mp3')
        this.load.audio('hitground', 'assets/hitground.mp3')
        this.load.audio('transition', 'assets/transition.mp3')
        this.load.audio('jumpwhoosh', 'assets/jumpwhoosh.mp3')
        this.load.audio('ding', 'assets/ding.mp3')
    }

    create() {
        this.scene.start('Menu')
    }
}
