// Jacob Ganburged
//Game Title:Sluggy Jump
// 27 hours

//Creative Tilt:
//I am really proud of figuring out how to mute the game background noise, unmute, and turn volume up and down
//I really liked the theme which is the UCSC theme
//I also really LOVE the eric cartman background song


//Citations:
//I got background audio from youtube and downloaded it through an mp3 downloader. I asked nathan and he said it was alright.
//here is the youtube video https://www.youtube.com/watch?v=WF_xv57aFnM&list=PL_BmerY4H3sgYJWbib1rKhCsJTvVBg4Cd&index=8
//https://pixabay.com is where i got my transition, jumpwhoosh, hitground and ding sound from

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 900,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [Preload, Menu, Play, GameOver, Credits]
}
let globalHighScore = 0
let game = new Phaser.Game(config)
