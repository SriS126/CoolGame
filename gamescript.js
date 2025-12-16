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
  
  // second npc
this.npc2 = this.add.rectangle(600, 200, 50, 50, 0xe74c3c);
  this.npc2.setInteractive();
  
  // third npc
this.npc3 = this.add.rectangle(500, 450, 50, 50, 0xf39c12);
  this.npc3.setInteractive();
  
this.playerLabel = this.add.text(100, 140, 'You', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
  this.npcLabel = this.add.text(300, 340, 'Stock', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
this.npc2Label = this.add.text(600, 240, 'Maya', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
  this.npc3Label = this.add.text(500, 490, 'Alex', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
  // score system
this.score = 0;
  this.scoreText = this.add.text(20, 20, 'Score: 0', {
    font: '20px Arial',
    fill: '#00ff00'
  });
  
  this.welcomeText = this.add.text(400, 30, 'Hello traveler! I am Stock, lets get you on some business stuff!', {
    font: '18px Arial',
    fill: '#ffffff',
    align: 'center',
    wordWrap: { width: 750 }
  }).setOrigin(0.5);
  
this.instructions = this.add.text(400, 550, 'Use arrow keys to move | click on NPCs to start quiz', {
    font: '14px Arial',
    fill: '#ecf0f1',
    align: 'center'
  }).setOrigin(0.5);
  
  this.npc.on('pointerdown', () => {
    startQuiz.call(this, 'stock');
  });
  
this.npc.on('pointerover', () => {
    this.npc.setScale(1.1);
  });
  
  this.npc.on('pointerout', () => {
    this.npc.setScale(1);
  });
  
  // npc2 interactions
this.npc2.on('pointerdown', () => {
    startQuiz.call(this, 'maya');
  });
  
  this.npc2.on('pointerover', () => {
    this.npc2.setScale(1.1);
  });
  
this.npc2.on('pointerout', () => {
    this.npc2.setScale(1);
  });
  
  // npc3 stuff
this.npc3.on('pointerdown', () => {
    startQuiz.call(this, 'alex');
  });
  
this.npc3.on('pointerover', () => {
    this.npc3.setScale(1.1);
  });
  
  this.npc3.on('pointerout', () => {
    this.npc3.setScale(1);
  });
  
  // arrow indicator
this.arrow = this.add.triangle(0, 0, 0, 0, 20, 30, -20, 30, 0xff00ff);
  this.arrow.setVisible(false);
  
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
  
  // update arrow to point at nearest npc
  if (this.arrow) {
    const dist1 = Math.sqrt(Math.pow(this.player.x - this.npc.x, 2) + Math.pow(this.player.y - this.npc.y, 2));
    const dist2 = Math.sqrt(Math.pow(this.player.x - this.npc2.x, 2) + Math.pow(this.player.y - this.npc2.y, 2));
    const dist3 = Math.sqrt(Math.pow(this.player.x - this.npc3.x, 2) + Math.pow(this.player.y - this.npc3.y, 2));
    
    const minDist = Math.min(dist1, dist2, dist3);
    let targetNpc = dist1 === minDist ? this.npc : (dist2 === minDist ? this.npc2 : this.npc3);
    
    // show arrow if far enough
    if (minDist > 80) {
      this.arrow.setVisible(true);
      
      // position above player
      this.arrow.x = this.player.x;
      this.arrow.y = this.player.y - 60;
      
      // rotate to point at npc
      const angle = Math.atan2(targetNpc.y - this.player.y, targetNpc.x - this.player.x);
      this.arrow.rotation = angle + Math.PI / 2;
    } else {
      this.arrow.setVisible(false);
    }
  }
}

function startQuiz(npcType) {
  if (this.quizGroup) {
    this.quizGroup.destroy(true);
  }
  
this.quizGroup = this.add.group();
  
  const quizBg = this.add.rectangle(400, 300, 650, 450, 0x34495e, 0.95);
  this.quizGroup.add(quizBg);
  
  // different questions for different npcs
  let question, answers, correctAnswer;
  if (npcType === 'maya') {
    question = 'What is the most important thing in marketing?';
    answers = ['Social Media', 'Understanding Customers', 'Big Budget'];
    correctAnswer = 'Understanding Customers';
  } else if (npcType === 'alex') {
    question = 'What should you do first when starting a business?';
    answers = ['Get Investors', 'Validate Your Idea', 'Hire Employees'];
    correctAnswer = 'Validate Your Idea';
  } else {
    question = 'Hey there! What is the first step in entrepreneurship?';
    answers = ['create a Business Plan', 'ask for Funding', 'build a Product'];
    correctAnswer = 'create a Business Plan';
  }
  
const quizText = this.add.text(400, 150, question, {
    font: '26px Arial',
    fill: '#ffffff',
    align: 'center',
    wordWrap: { width: 600 }
  }).setOrigin(0.5);
  this.quizGroup.add(quizText);
  
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
  
  // store correct answer for checkAnswer
  this.currentCorrectAnswer = correctAnswer;
}

function checkAnswer(selectedAnswer, correctAnswer) {
if (this.quizGroup) {
    this.quizGroup.destroy(true);
  }
  
  let resultText;
  let resultBg;
  
  if (selectedAnswer === correctAnswer) {
    // add score
    this.score += 10;
    if (this.scoreText) {
      this.scoreText.setText('Score: ' + this.score);
    }
    
    // particles effect
    for (let i = 0; i < 8; i++) {
      const particle = this.add.circle(this.player.x, this.player.y, 5, 0x00ff00);
      const angle = (Math.PI * 2 * i) / 8;
      const speed = 100;
      this.tweens.add({
        targets: particle,
        x: this.player.x + Math.cos(angle) * speed,
        y: this.player.y + Math.sin(angle) * speed,
        alpha: 0,
        duration: 500,
        onComplete: () => particle.destroy()
      });
    }
    
    resultBg = this.add.rectangle(400, 300, 500, 150, 0x27ae60, 0.9);
    let msg = 'Correct! Great business thinking!';
    if (correctAnswer === 'Understanding Customers') {
      msg = 'Correct! Knowing your customers is key!';
    } else if (correctAnswer === 'Validate Your Idea') {
      msg = 'Correct! Always validate before building!';
    }
    resultText = this.add.text(400, 300, msg, {
      font: '24px Arial',
      fill: '#ffffff',
      align: 'center',
      wordWrap: { width: 450 }
    }).setOrigin(0.5);
  } else {
resultBg = this.add.rectangle(400, 300, 500, 150, 0xe74c3c, 0.9);
    let msg = 'Not quite! The first step is to create a Business Plan.';
    if (correctAnswer === 'Understanding Customers') {
      msg = 'Not quite! Understanding customers is most important.';
    } else if (correctAnswer === 'Validate Your Idea') {
      msg = 'Not quite! You should validate your idea first.';
    }
    resultText = this.add.text(400, 300, msg, {
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

