const playboard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const controls=document.querySelector(".controls i");

let gameOver=false;
let foodX,foodY;
let snakeX=5,snakeY=5;
let velocityX=0,velocityY=0;
let snakeBoard=[];
let id;
let score;

// Getting highest score from local storage;

let highScore=JSON.parse(localStorage.getItem("high-score"))||0;
highScoreElement.innerText=`High Score: ${highScore}`
