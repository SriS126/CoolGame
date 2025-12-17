const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
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

  // hp / stamina bars (super basic)
this.hp = 100;
this.stamina = 100;
  this.hpBar = this.add.rectangle(120, 50, this.hp, 10, 0xe74c3c);
  this.staBar = this.add.rectangle(120, 70, this.stamina, 8, 0x00ffff);
  this.add.text(30, 44, 'HP', { font:'12px Arial', fill:'#fff'});
  this.add.text(30, 64, 'STA', { font:'12px Arial', fill:'#fff'});

  // sprint key
  this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

  // tiny quests text
  this.questText = this.add.text(600, 20, 'Quests: talk to NPCs\nFind coins', {
    font:'14px Arial',
    fill:'#ffeb3b'
  });

  // coins to grab
  this.coins = [];
  const coinPos = [
    {x:180,y:180},{x:420,y:120},{x:700,y:340},
    {x:150,y:500},{x:520,y:320},{x:950,y:200},
    {x:1100,y:450},{x:800,y:600},{x:200,y:650},
    {x:1000,y:100},{x:600,y:500}
  ];
  coinPos.forEach(p=>{
    const c = this.add.star(p.x, p.y, 5, 6, 10, 0xffff00);
    c.collected = false;
    this.coins.push(c);
  });

  // cheap rain lines
  this.rainLines = [];
  for(let i=0;i<40;i++){
    const line = this.add.rectangle(Math.random()*1280, Math.random()*720, 2, 12, 0x66ccff, 0.5);
    line.speed = 3 + Math.random()*3;
    this.rainLines.push(line);
  }
  
  // more npcs scattered around
this.npc4 = this.add.rectangle(1000, 400, 50, 50, 0x9b59b6);
  this.npc4.setInteractive();
  this.npc4Label = this.add.text(1000, 440, 'Sam', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
this.npc5 = this.add.rectangle(200, 600, 50, 50, 0x1abc9c);
  this.npc5.setInteractive();
  this.npc5Label = this.add.text(200, 640, 'Jordan', {
    font: '16px Arial',
    fill: '#ffffff'
  }).setOrigin(0.5);
  
  // obstacles / decorations
this.obstacles = [];
  for(let i=0;i<8;i++){
    const obs = this.add.rectangle(
      200 + i*150, 
      300 + Math.sin(i)*100, 
      40, 40, 
      0x7f8c8d, 0.7
    );
    this.obstacles.push(obs);
  }
  
  // collectible items
this.items = [];
  const itemTypes = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24];
  for(let i=0;i<6;i++){
    const item = this.add.circle(
      300 + i*180,
      150 + (i%2)*400,
      12,
      itemTypes[i % itemTypes.length]
    );
    item.collected = false;
    this.items.push(item);
  }

  // danger zone + heal pad
this.danger = this.add.rectangle(1000, 600, 120, 120, 0xff0000, 0.18);
this.danger2 = this.add.rectangle(500, 200, 100, 100, 0xff0000, 0.18);
this.heal = this.add.rectangle(120, 120, 80, 80, 0x00ff00, 0.18);
this.heal2 = this.add.rectangle(1100, 100, 80, 80, 0x00ff00, 0.18);
this.add.text(960, 570, 'ouch zone', {font:'12px Arial', fill:'#ff7777'});
this.add.text(460, 170, 'ouch', {font:'12px Arial', fill:'#ff7777'});
this.add.text(90, 95, 'heal', {font:'12px Arial', fill:'#7dff7d'});
this.add.text(1070, 75, 'heal', {font:'12px Arial', fill:'#7dff7d'});

  // tips + timer
this.tips = ['save cash','validate idea first','listen to users','ship small','track cashflow','test early','iterate fast','focus on users'];
this.tipIdx = 0;
this.tipText = this.add.text(640, 8, this.tips[this.tipIdx], {font:'14px Arial', fill:'#00ffff'}).setOrigin(0.5,0);
this.lastTip = 0;
this.startTime = this.time.now;
this.timerText = this.add.text(640, 30, 'time: 0s', {font:'14px Arial', fill:'#ffffff'}).setOrigin(0.5,0);
  
  this.welcomeText = this.add.text(640, 30, 'Hello traveler! I am Stock, lets get you on some business stuff!', {
    font: '18px Arial',
    fill: '#ffffff',
    align: 'center',
    wordWrap: { width: 1100 }
  }).setOrigin(0.5);
  
this.instructions = this.add.text(640, 680, 'Use arrow keys to move | click on NPCs to start quiz', {
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
  
  // npc4 + npc5
this.npc4.on('pointerdown', () => {
    startQuiz.call(this, 'sam');
  });
  
this.npc4.on('pointerover', () => {
    this.npc4.setScale(1.1);
  });
  
  this.npc4.on('pointerout', () => {
    this.npc4.setScale(1);
  });
  
this.npc5.on('pointerdown', () => {
    startQuiz.call(this, 'jordan');
  });
  
  this.npc5.on('pointerover', () => {
    this.npc5.setScale(1.1);
  });
  
this.npc5.on('pointerout', () => {
    this.npc5.setScale(1);
  });
  
  // arrow indicator
this.arrow = this.add.triangle(0, 0, 0, 0, 20, 30, -20, 30, 0xff00ff);
  this.arrow.setVisible(false);
  this.arrowPulse = 0;
  this.arrowBaseY = 0;
  
  // mini radar thing
this.radarBg = this.add.rectangle(1230, 50, 40, 40, 0x000000, 0.6);
  this.radarDot1 = this.add.circle(1230, 50, 3, 0x2ecc71);
  this.radarDot2 = this.add.circle(1230, 50, 3, 0xe74c3c);
  this.radarDot3 = this.add.circle(1230, 50, 3, 0xf39c12);
  this.radarDot4 = this.add.circle(1230, 50, 3, 0x9b59b6);
  this.radarDot5 = this.add.circle(1230, 50, 3, 0x1abc9c);
  this.radarPlayer = this.add.circle(1230, 50, 2, 0x3498db);
  
  // combo counter
this.combo = 0;
  this.comboText = this.add.text(20, 100, '', {
    font: '18px Arial',
    fill: '#ff00ff'
  });
  this.comboTimer = 0;
  
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.cursors.left.isDown) {
    this.player.x -= (this.shiftKey && this.shiftKey.isDown && this.stamina>0) ? 6 : 4;
    if (this.player.x < 25) this.player.x = 25;
  } else if (this.cursors.right.isDown) {
    this.player.x += (this.shiftKey && this.shiftKey.isDown && this.stamina>0) ? 6 : 4;
    if (this.player.x > 1255) this.player.x = 1255;
  }
  
if (this.cursors.up.isDown) {
    this.player.y -= (this.shiftKey && this.shiftKey.isDown && this.stamina>0) ? 6 : 4;
    if (this.player.y < 25) this.player.y = 25;
  } else if (this.cursors.down.isDown) {
    this.player.y += (this.shiftKey && this.shiftKey.isDown && this.stamina>0) ? 6 : 4;
    if (this.player.y > 695) this.player.y = 695;
  }
  
  // obstacle collision
  if (this.obstacles) {
    this.obstacles.forEach(obs => {
      const dx = this.player.x - obs.x;
      const dy = this.player.y - obs.y;
      if (Math.abs(dx) < 45 && Math.abs(dy) < 45) {
        // push player away
        const push = 2;
        if (dx > 0) this.player.x += push;
        else this.player.x -= push;
        if (dy > 0) this.player.y += push;
        else this.player.y -= push;
      }
    });
  }
  
  // stamina drain/regain
  if (this.shiftKey && this.shiftKey.isDown && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
    this.stamina = Math.max(0, this.stamina - 0.5);
  } else {
    this.stamina = Math.min(100, this.stamina + 0.3);
  }
  if (this.staBar) this.staBar.width = this.stamina;

  // regen hp slowly
  this.hp = Math.min(100, this.hp + 0.02);
  if (this.hpBar) this.hpBar.width = this.hp;

  // danger / heal zones
  if (this.danger) {
    const dx = this.player.x - this.danger.x;
    const dy = this.player.y - this.danger.y;
    if (Math.abs(dx) < this.danger.width/2 && Math.abs(dy) < this.danger.height/2) {
      this.hp = Math.max(0, this.hp - 0.6);
      if (this.hpBar) this.hpBar.width = this.hp;
      this.cameras.main.shake(60, 0.001);
    }
  }
  if (this.danger2) {
    const dx = this.player.x - this.danger2.x;
    const dy = this.player.y - this.danger2.y;
    if (Math.abs(dx) < this.danger2.width/2 && Math.abs(dy) < this.danger2.height/2) {
      this.hp = Math.max(0, this.hp - 0.6);
      if (this.hpBar) this.hpBar.width = this.hp;
      this.cameras.main.shake(60, 0.001);
    }
  }
  if (this.heal) {
    const dx2 = this.player.x - this.heal.x;
    const dy2 = this.player.y - this.heal.y;
    if (Math.abs(dx2) < this.heal.width/2 && Math.abs(dy2) < this.heal.height/2) {
      this.hp = Math.min(100, this.hp + 0.5);
      if (this.hpBar) this.hpBar.width = this.hp;
    }
  }
  if (this.heal2) {
    const dx2 = this.player.x - this.heal2.x;
    const dy2 = this.player.y - this.heal2.y;
    if (Math.abs(dx2) < this.heal2.width/2 && Math.abs(dy2) < this.heal2.height/2) {
      this.hp = Math.min(100, this.hp + 0.5);
      if (this.hpBar) this.hpBar.width = this.hp;
    }
  }
  
  // item pickup
  if (this.items) {
    this.items.forEach(item => {
      if (!item.collected) {
        const dx = item.x - this.player.x;
        const dy = item.y - this.player.y;
        if (Math.sqrt(dx*dx+dy*dy) < 30) {
          item.collected = true;
          item.setVisible(false);
          this.score += 15;
          if (this.scoreText) this.scoreText.setText('Score: ' + this.score);
        }
      }
    });
  }

  // coin pickup
  if (this.coins) {
    this.coins.forEach(c=>{
      if (!c.collected) {
        const dx = c.x - this.player.x;
        const dy = c.y - this.player.y;
        if (Math.sqrt(dx*dx+dy*dy) < 30) {
          c.collected = true;
          c.setVisible(false);
          this.score += 5;
          if (this.scoreText) this.scoreText.setText('Score: ' + this.score);
        }
      }
    });
  }

  // rain drift
  if (this.rainLines) {
    this.rainLines.forEach(r=>{
      r.y += r.speed;
      if (r.y > 730) {
        r.y = -10;
        r.x = Math.random()*1280;
      }
    });
  }

  // tips rotate
  if (this.time.now - this.lastTip > 5000) {
    this.tipIdx = (this.tipIdx + 1) % this.tips.length;
    if (this.tipText) this.tipText.setText(this.tips[this.tipIdx]);
    this.lastTip = this.time.now;
  }

  // timer update
  if (this.timerText) {
    const secs = Math.floor((this.time.now - this.startTime)/1000);
    this.timerText.setText('time: ' + secs + 's');
  }

  // combo decay
  if (this.comboTimer > 0) {
    this.comboTimer -= 16;
    if (this.comboTimer <= 0) {
      this.combo = 0;
      if (this.comboText) this.comboText.setText('');
    }
  }

  // update radar
  if (this.radarDot1) {
    const scale = 0.15;
    this.radarDot1.x = 1230 + (this.npc.x - this.player.x) * scale;
    this.radarDot1.y = 50 + (this.npc.y - this.player.y) * scale;
    this.radarDot2.x = 1230 + (this.npc2.x - this.player.x) * scale;
    this.radarDot2.y = 50 + (this.npc2.y - this.player.y) * scale;
    this.radarDot3.x = 1230 + (this.npc3.x - this.player.x) * scale;
    this.radarDot3.y = 50 + (this.npc3.y - this.player.y) * scale;
    if (this.radarDot4) {
      this.radarDot4.x = 1230 + (this.npc4.x - this.player.x) * scale;
      this.radarDot4.y = 50 + (this.npc4.y - this.player.y) * scale;
    }
    if (this.radarDot5) {
      this.radarDot5.x = 1230 + (this.npc5.x - this.player.x) * scale;
      this.radarDot5.y = 50 + (this.npc5.y - this.player.y) * scale;
    }
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
    const dist4 = Math.sqrt(Math.pow(this.player.x - this.npc4.x, 2) + Math.pow(this.player.y - this.npc4.y, 2));
    const dist5 = Math.sqrt(Math.pow(this.player.x - this.npc5.x, 2) + Math.pow(this.player.y - this.npc5.y, 2));
    
    const minDist = Math.min(dist1, dist2, dist3, dist4, dist5);
    let targetNpc = dist1 === minDist ? this.npc : 
                   (dist2 === minDist ? this.npc2 : 
                   (dist3 === minDist ? this.npc3 :
                   (dist4 === minDist ? this.npc4 : this.npc5)));
    
    // show arrow if far enough
    if (minDist > 80) {
      this.arrow.setVisible(true);
      
      // dynamic color based on distance
      const distPercent = Math.min(1, (minDist - 80) / 300);
      const r = Math.floor(255 * distPercent);
      const g = Math.floor(255 * (1 - distPercent));
      this.arrow.setFillStyle(Phaser.Display.Color.GetColor(r, g, 255));
      
      // pulse animation
      this.arrowPulse += 0.1;
      const pulseOffset = Math.sin(this.arrowPulse) * 8;
      
      // position above player with bounce
      this.arrow.x = this.player.x;
      this.arrow.y = this.player.y - 60 + pulseOffset;
      
      // rotate to point at npc
      const angle = Math.atan2(targetNpc.y - this.player.y, targetNpc.x - this.player.x);
      this.arrow.rotation = angle + Math.PI / 2;
      
      // scale pulse
      const scale = 1 + Math.sin(this.arrowPulse * 1.5) * 0.2;
      this.arrow.setScale(scale);
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
  
  const quizBg = this.add.rectangle(640, 360, 650, 450, 0x34495e, 0.95);
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
  } else if (npcType === 'sam') {
    question = 'What is key for customer retention?';
    answers = ['Low Prices', 'Great Service', 'Big Ads'];
    correctAnswer = 'Great Service';
  } else if (npcType === 'jordan') {
    question = 'When should you pivot your business?';
    answers = ['Never', 'When Data Shows It', 'After 1 Month'];
    correctAnswer = 'When Data Shows It';
  } else {
    question = 'Hey there! What is the first step in entrepreneurship?';
    answers = ['create a Business Plan', 'ask for Funding', 'build a Product'];
    correctAnswer = 'create a Business Plan';
  }
  
const quizText = this.add.text(640, 210, question, {
    font: '26px Arial',
    fill: '#ffffff',
    align: 'center',
    wordWrap: { width: 600 }
  }).setOrigin(0.5);
  this.quizGroup.add(quizText);
  
  let yPosition = 310;
  
answers.forEach((answer, index) => {
    const answerBg = this.add.rectangle(640, yPosition, 500, 45, 0x2c3e50);
    answerBg.setInteractive({ useHandCursor: true });
    this.quizGroup.add(answerBg);
    
    const answerText = this.add.text(640, yPosition, `${index + 1}. ${answer}`, {
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
    // add score + combo
    this.combo++;
    this.comboTimer = 3000;
    const points = 10 + (this.combo * 2);
    this.score += points;
    if (this.scoreText) {
      this.scoreText.setText('Score: ' + this.score);
    }
    if (this.comboText) {
      this.comboText.setText(this.combo > 1 ? 'COMBO x' + this.combo + '!' : '');
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
    
    resultBg = this.add.rectangle(640, 360, 500, 150, 0x27ae60, 0.9);
    let msg = 'Correct! Great business thinking!';
    if (correctAnswer === 'Understanding Customers') {
      msg = 'Correct! Knowing your customers is key!';
    } else if (correctAnswer === 'Validate Your Idea') {
      msg = 'Correct! Always validate before building!';
    } else if (correctAnswer === 'Great Service') {
      msg = 'Correct! Service keeps customers coming back!';
    } else if (correctAnswer === 'When Data Shows It') {
      msg = 'Correct! Data-driven decisions are smart!';
    }
    resultText = this.add.text(640, 360, msg, {
      font: '24px Arial',
      fill: '#ffffff',
      align: 'center',
      wordWrap: { width: 450 }
    }).setOrigin(0.5);
  } else {
resultBg = this.add.rectangle(640, 360, 500, 150, 0xe74c3c, 0.9);
    let msg = 'Not quite! The first step is to create a Business Plan.';
    if (correctAnswer === 'Understanding Customers') {
      msg = 'Not quite! Understanding customers is most important.';
    } else if (correctAnswer === 'Validate Your Idea') {
      msg = 'Not quite! You should validate your idea first.';
    } else if (correctAnswer === 'Great Service') {
      msg = 'Not quite! Great service is key for retention.';
    } else if (correctAnswer === 'When Data Shows It') {
      msg = 'Not quite! Pivot when data shows you should.';
    }
    resultText = this.add.text(640, 360, msg, {
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

