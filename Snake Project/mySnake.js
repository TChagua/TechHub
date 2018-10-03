//Menu Items
let snakeLength = document.querySelector('#snakeLength');
let snakeSpeed = document.querySelector('#snakeSpeed');
let boardSize = document.querySelector('#boardSize');

//Control Items
let play = document.querySelector('#play');
let hidden = document.querySelector('#hidden');
let replay = document.querySelector('#replay');
let yes = document.querySelector("#yes");
let no = document.querySelector("#no");

//Levels
let novice = document.querySelector('#novice');
let amateur = document.querySelector('#amateur');
let master = document.querySelector('#master');

//GAME CLASSES
let snake, apple, game, board;
let highScore = document.querySelector("#highScore");
let score = document.querySelector('#score');
let scoreNumber = 0;
score.textContent = `Your score is ${scoreNumber}`;


//Local Storage Functions
function populateStorage(){
    localStorage.setItem('SnakeLength', snakeLength.value);
    localStorage.setItem('snakeSpeed', snakeSpeed.value);
    localStorage.setItem('boardSize', boardSize.value);

    setDefaults();
}
function setDefaults() {
    let currentLength = localStorage.getItem('SnakeLength');
    let currentSpeed = localStorage.getItem('snakeSpeed');
    let currentSize = localStorage.getItem('boardSize');
    snakeLength.value = currentLength;
    snakeSpeed.value = currentSpeed;
    boardSize.value = currentSize;

  }


if(!localStorage.getItem('SnakeLength')||
    !localStorage.getItem('snakeSpeed')||
    !localStorage.getItem('boardSize')){
        populateStorage();
    }else{
        setDefaults();
    }
snakeLength.onchange = populateStorage;
snakeSpeed.onchange = populateStorage;
boardSize.onchange = populateStorage;

//Creating Board
class Board{
    constructor(){
        this.element = document.querySelector('canvas');
        this.context = this.element.getContext('2d');
        this.cell = 10;
        this.fillColour =  'white';
        this.strokeColour = '#008080';
        this.element.width = boardSize.value;
        this.element.height = boardSize.value;
        this.width = this.element.width;
        this.height = this.element.height;
        
    }
    redraw(){
        this.draw(0, 0, this.fillColour, this.strokeColour, this.width, this.height);
    };
    draw(x, y, fillColour = 'black', strokeColour = 'white', width = this.cell, height=this.cell) {
        this.context.fillStyle = fillColour;
        this.context.fillRect(x*this.cell, y*this.cell, width, height);
        this.context.strokeStyle = strokeColour;
        this.context.strokeRect(x*this.cell, y*this.cell, width, height);
    };
}


//Creating Snake
class Snake{
    constructor() {
        this.length = snakeLength.value;
        this.bodyColour = 'seagreen';
        this.body = [];
        this.direction = 'right';
        this.nd = []; 
        this.nx; 
        this.ny;
        this.startingPos = {x: 5, y: 5};
        this.tail;
    }
	create(){
		for(let i = this.length-1; i>=0; i--) {
			this.body.push({x: this.startingPos.x + i, y: this.startingPos.y});
		}
	};
    
    move(){
        if (this.nd.length) {
            this.direction = this.nd.shift();
        }
        this.nx = this.body[0].x;
        this.ny = this.body[0].y;
    
        switch(this.direction) {
            case 'right':
                this.nx++;
                break;
            case 'left':
                this.nx--;
                break;
            case 'up':
                this.ny--;
                break;
            case 'down':
                this.ny++;
                break;
        }
    //Checking whether our snake died or not
        if(this.wentOut() || this.collision()) {

            game.over();
        }
    //Checking whether our snake ate an apple. If so, we create a new one
        if(this.eat()) {
            scoreNumber+=10;
            let bestScore = localStorage.getItem('bestScore');
            if (scoreNumber > bestScore || !bestScore) {
                localStorage.setItem('bestScore', JSON.stringify(scoreNumber));
            }
            score.textContent = `Your score is ${scoreNumber}`;
            this.tail = {x: this.nx, y: this.ny};
            apple = new Apple()
        } else {
            this.tail = this.body.pop();
            this.tail.x = this.nx;
            this.tail.y = this.ny;
        }
        this.body.unshift(this.tail);
        this.draw();
    }
    draw() {
        board.redraw();
        for(let i = 0; i < this.body.length; i++) {
            board.draw(this.body[i].x, this.body[i].y, this.bodyColour);
        }
    }
    wentOut() {
        if(this.nx <= -1 || this.nx === board.width/board.cell || this.ny <= -1 || this.ny === board.height/board.cell) {
            return true;
        }
        return false;
    }
    eat() {
        if(this.nx === apple.x && this.ny === apple.y) {
            return true;
        }
        return false;
    }
    //Checking body collision
    collision(x = this.nx, y = this.ny) {
        for(let i = 0; i < this.body.length; i++) {
            if(this.body[i].x === x && this.body[i].y === y) {
                return true;
            }
        }
        return false;
    }
}


//Creating apple
class Apple {
    constructor(){
        //Random coordinates
        this.x = Math.round(Math.random() * (board.width-board.cell)/board.cell);
		this.y = Math.round(Math.random() * (board.height-board.cell)/board.cell);
    }
	generateCoords() {
		this.checkCollision();
    };
    //Check whether random positions collide the snake position
	checkCollision() {
		if(snake.collision(this.x, this.y)) {
			this.generateCoords();
		}
	};
	draw(){
		board.draw(this.x, this.y, 'red');
	};
}

//Finally, Game is created
class Game{
    constructor(){
        //Here we check whether a level was selected and give default values
        if(novice.checked){
            snakeSpeed.value = 100;
        }else if(amateur.checked){
            snakeSpeed.value = 70;
        }else if(master.checked){
            snakeSpeed.value = 30;
        }
        this.speed = snakeSpeed.value

    //Animation happens here
        this.interval = setInterval(function() {
            snake.move();
            if(typeof apple.draw != 'undefined') {
                apple.draw();
            }
        }, this.speed)
    }
    gameLoop(){
        this.interval;
    };
    //Start a game
    start() {
        board = new Board();
        board.redraw();
        apple = new Apple();
        snake = new Snake();
        snake.create();
    };
    //Game is over
    over(){
        clearInterval(this.interval);
        board.element.setAttribute('class', 'hide');
        hidden.classList.remove('hide');
        yes.classList.remove('hide');
        no.classList.remove('hide');
        replay.classList.remove('hide');
        play.setAttribute('class', 'hide');
        let bestScore = JSON.parse(localStorage.getItem('bestScore'));
        if(scoreNumber <= bestScore){
            highScore.textContent = `Your best score is ${bestScore}`
        }else{
            highScore.textContent = `Your new best score is ${scoreNumber}`
        }
        highScore.classList.remove('hide');
        score.setAttribute('class', 'hide');  
    };
}

//Event Listeners

//for play button
play.addEventListener('click', function(){
    game = new Game();
    score.classList.remove('hide');
    play.setAttribute('class', 'hide');
    game.start();
    game.gameLoop();
})

//for a new game
yes.addEventListener('click', function(){
    hidden.setAttribute('class', 'hide');
    replay.setAttribute('class', 'hide');
    yes.setAttribute('class', 'hide');
    no.setAttribute('class', 'hide');
    score.classList.remove('hide');
    highScore.setAttribute('class', 'hide');
    scoreNumber = 0;
    score.textContent = `Your score is ${scoreNumber}`;
    game = new Game();
    board.element.classList.remove('hide');
    game.start();
    game.gameLoop();
})

//Control keys
document.addEventListener('keydown', function(e) {
	
	if(e.keyCode == "37" && snake.direction != 'right') {
		snake.nd.push('left');
	} else if(e.keyCode == "38" && snake.direction != 'down') {
		snake.nd.push('up');
	} else if(e.keyCode == "39" && snake.direction != 'left') {
		snake.nd.push('right');
	} else if(e.keyCode == "40" && snake.direction != 'up') {
		snake.nd.push('down');
	}
})
