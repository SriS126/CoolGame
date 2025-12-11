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
    const welcomeText = this.addaahgjghfhg.text(10, 10, 'Hello traveler! I am Stock, lets get you on some business stuff!', {
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
   // starts the quizz
    this.soundguhjgkjjkjjjjjkkkjju.play('interactionSound'); // FILL IN LATER

    
        const quizText = this.add.text(200, 150, 'Hey there! what is the first step in entrepreneurship?', {
            font: '24px Arial',
            fill: '#ffffff'
         });

    // answers, might add more choices later
    // maybe will do a points system, I dont know though as it might require API's and all of that, which I might need to work on postman
    const answers = ['create a Business Plan', 'ask for Funding', 'build a Product'];
    let yPosition = 250; 

    // loop
    answers.forEach((answer, index) => {
         this.add.text(200, yPosition, `${index + 1}. ${answer}`, {
                font: '20px Arial',
                fill: '#ffffff'
         }).setInteractive().on('pointerdown', () => {
                checkAnswer.call(this, answer); // Check if the answer is right
        });
        yPosition += 40; // Move down for next answer
    });
}