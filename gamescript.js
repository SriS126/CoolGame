// 1. i love phaser i used it in some of my previous coding projects
    const config = {
     type: Phaser.AUTO,  
    width: 800,         
    height: 600,        
    scene: {
        preload: preload, 
        create: create,  
        update: update    
    }
};

const game = new Phaser.Game(config);

// these are the assets to myy gameee! I probably will change the like player image dimensions later
function preload() {
    
    this.load.image('player', 'assets/player.png'); //  images r placeholders, will change em ltr
    this.load.image('npc', 'assets/npc.png');
    this.load.audio('backgroundMusic', 'assets/backgroundMusic.mp3'); 
    this.load.audio('interactionSound', 'assets/interactionSound.mp3'); 
}

// intializing the game lets gooo
function create() {
    // might remove music if it doesnt work
    this.sound.add('backgroundMusic').play({ loop: true });

    // player 
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setInteractive(); 
}
