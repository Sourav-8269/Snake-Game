const playboard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const controls=document.querySelector(".controls i");

let gameOver=false;
let foodX,foodY;
let snakeX=5,snakeY=5;
let velocityX=0,velocityY=0;
let snakeBody=[];
let id;
let score;

// Getting highest score from local storage;

let highScore=JSON.parse(localStorage.getItem("high-score"))||0;
highScoreElement.innerText=`High Score: ${highScore}`;

const updateFoodPosition=()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}

const handleGameOver=()=>{
    clearInterval(id);
    alert("Game Over!");
    location.reload();
}

// Simple Direction Logic => if velocityY=1 means it is Negative of Y axis and vice-versa

const changeDirection=(e)=>{
    if(e.key=="ArrowUp"&&velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }else if(e.key=="ArrowDown"&&velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }else if(e.key=="ArrowLeft"&&velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }else if(e.key=="ArrowRight"&&velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}

controls.forEach((button)=>button.addEventListener("click",()=>{
    changeDirection({key:button.dataset.key});
}))

const initGame=()=>{
    if(gameOver){
        return handleGameOver();
    }

    let html=`<div class="food" style="grid-area: ${foodY}/${foodX}" ></div>`;

    if(snakeX==foodX&&snakeY==foodY){
        updateFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        highScore=score >= highScore ? score:highScore;

        localStorage.setItem("high-score",JSON.stringify(highScore));
        scoreElement.innerText=`Score: ${score}`;
        highScoreElement.innerText=`High Score: ${highScore}`;

    }

    snakeX+=velocityX;
    snakeY+=velocityY;

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[snakeX,snakeY];

    if(snakeX<=0||snakeX>30||snakeY<=0||snakeY>30){
        return gameOver=true;
    }

}

