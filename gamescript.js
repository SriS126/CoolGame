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
    this.npc = this.physics.add.sprite(300, 300, 'npc');
    this.npc.setInteractive(); // click on npc, might change to walk up or somethn

    // dialogue
    const welcomeText = this.add.text(10, 10, 'Hello traveler! I am Stock, lets get you on some business stuff!', {
        font: '32px Arial',
        fill: '#ffffff'
    });



    // npc stuff
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            if (gameObject === this.npc) {
            startQuiz.call(this); 
            }
     });
}

function update() {
    // arrowwwwws
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        this.player.x -= 3; 
    } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        this.player.x += 3; 
        
    }

    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP)) {
        this.player.y -= 3; 
    } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.DOWN)) {
        this.player.y += 3;
    }
}


function startQuiz() {
    

}