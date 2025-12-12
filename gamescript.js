const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#2c3e50',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // nothing to load rn
}

function create() {
this.player = this.add.rectangle(100, 100, 50, 50, 0x3498db);
this.player.setInteractive();
  
  this.npc = this.add.rectangle(300, 300, 50, 50, 0x2ecc71);
  this.npc.setInteractive();
  
this.playerLabel = this.add.text(100, 140, 'You', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
  this.npcLabel = this.add.text(300, 340, 'Stock', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
  this.welcomeText = this.add.text(400, 30, 'Hello traveler! I am Stock, lets get you on some business stuff!', {
    font: '18px Arial',
    fill: '#ffffff',
    align: 'center',
    wordWrap: { width: 750 }
  }).setOrigin(0.5);
  
this.instructions = this.add.text(400, 550, 'Use arrow keys to move | click on Stock (green) to start quiz', {
    font: '14px Arial',
    fill: '#ecf0f1',
    align: 'center'
  }).setOrigin(0.5);
  
  this.npc.on('pointerdown', () => {
    startQuiz.call(this);
  });
  
this.npc.on('pointerover', () => {
    this.npc.setScale(1.1);
  });
  
  this.npc.on('pointerout', () => {
    this.npc.setScale(1);
  });
  
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.cursors.left.isDown) {
    this.player.x -= 4;
    if (this.player.x < 25) this.player.x = 25;
  } else if (this.cursors.right.isDown) {
    this.player.x += 4;
    if (this.player.x > 775) this.player.x = 775;
  }
  
if (this.cursors.up.isDown) {
    this.player.y -= 4;
    if (this.player.y < 25) this.player.y = 25;
  } else if (this.cursors.down.isDown) {
    this.player.y += 4;
    if (this.player.y > 575) this.player.y = 575;
  }
  
  if (this.playerLabel) {
    this.playerLabel.x = this.player.x;
    this.playerLabel.y = this.player.y + 40;
  }
}

function startQuiz() {
  if (this.quizGroup) {
    this.quizGroup.destroy(true);
  }
  
this.quizGroup = this.add.group();
  
  const quizBg = this.add.rectangle(400, 300, 650, 450, 0x34495e, 0.95);
  this.quizGroup.add(quizBg);
  
const quizText = this.add.text(400, 150, 'Hey there! What is the first step in entrepreneurship?', {
    font: '26px Arial',
    fill: '#ffffff',
    align: 'center',
    wordWrap: { width: 600 }
  }).setOrigin(0.5);
  this.quizGroup.add(quizText);
  
  const answers = ['create a Business Plan', 'ask for Funding', 'build a Product'];
  const correctAnswer = 'create a Business Plan';
  let yPosition = 250;
  
answers.forEach((answer, index) => {
    const answerBg = this.add.rectangle(400, yPosition, 500, 45, 0x2c3e50);
    answerBg.setInteractive({ useHandCursor: true });
    this.quizGroup.add(answerBg);
    
    const answerText = this.add.text(400, yPosition, `${index + 1}. ${answer}`, {
      font: '20px Arial',
      fill: '#ecf0f1'
    }).setOrigin(0.5);
    this.quizGroup.add(answerText);
    
    answerBg.on('pointerdown', () => {
      checkAnswer.call(this, answer, correctAnswer);
    });
    
answerText.on('pointerdown', () => {
      checkAnswer.call(this, answer, correctAnswer);
    });
    
    answerBg.on('pointerover', () => {
      answerBg.setFillStyle(0x3498db);
    });
    
    answerBg.on('pointerout', () => {
      answerBg.setFillStyle(0x2c3e50);
    });
    
    yPosition += 60;
  });
}

function checkAnswer(selectedAnswer, correctAnswer) {
if (this.quizGroup) {
    this.quizGroup.destroy(true);
  }
  
  let resultText;
  let resultBg;
  
  if (selectedAnswer === correctAnswer) {
    resultBg = this.add.rectangle(400, 300, 500, 150, 0x27ae60, 0.9);
    resultText = this.add.text(400, 300, 'Correct! Great business thinking!\n\nCreating a business plan is the foundation!', {
      font: '24px Arial',
      fill: '#ffffff',
      align: 'center',
      wordWrap: { width: 450 }
    }).setOrigin(0.5);
  } else {
resultBg = this.add.rectangle(400, 300, 500, 150, 0xe74c3c, 0.9);
    resultText = this.add.text(400, 300, 'Not quite!\n\nThe first step is to create a Business Plan.', {
      font: '24px Arial',
      fill: '#ffffff',
      align: 'center',
      wordWrap: { width: 450 }
    }).setOrigin(0.5);
  }
  
  this.time.delayedCall(3000, () => {
    resultText.destroy();
    resultBg.destroy();
  });
}

