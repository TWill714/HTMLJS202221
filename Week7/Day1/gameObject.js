var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "green";

var timer = requestAnimationFrame;
var speed = 4;
var gravity = 0.1;

var bp = new Image();
bp.src = "images/BP2.jpeg"

bp.onload = function(){
    main();
}
//ctx.fillRect(350,250,100,100);
//ctx.fillRect(500,250,100,100);

//Utility function
function randomRange(high, low){
    return Math.random()*(high - low) + low;
}

//Example of GameObject class
function GameObject(){
    //Examples of properties inside our class
    this.width  = randomRange(100,10);
    this.height  = this.width;
    this.radius = randomRange(50,5);
    this.x  = 750; //randomRange(canvas.width-this.width, 0);
    this.y  = 10; //randomRange(canvas.height-this.height, 0);
    this.color  = `rgb(${randomRange(255,0)},${randomRange(255,0)},${randomRange(255,0)})`;
    this.vx = randomRange(speed,-speed);
    this.vy = randomRange(speed,-speed);

    //Examples of methods in a class
    this.drawSquare = function(){
        //All the procedures to draw a square go here
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    this.drawCircle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius, 0 ,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
    }

    this.drawSprite = function(){
        ctx.drawImage(bp, this.x - this.radius, this.y - this.radius, this.radius *2, this.radius * 2);
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        //check for top of canvas
        if(this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        }
        //check for bottom of canvas
        if(this.y > canvas.height - this.radius){
            this.y = canvas.height - this.radius;
            this.vy *= -1;
        }
        //check for left side of canvas
        if(this.x <  this.radius){
            this.x = this.radius;
            this.vx *= -1;
        }
        //check for right side of canvas
        if(this.x > canvas.width - this.radius){
            this.x = canvas.width - this.radius;
            this.vx *= -1;
        }
    }

}

var square = new GameObject();


//square.color = "yellow";
//square.y = 50;
square.drawCircle();


var square2 = new GameObject();
//square2.color = "purple";
square2.drawCircle();

var circle = new GameObject();
circle.drawCircle();

var numberOfObjects = 40;

var circles = [];

for(var i = 0; i<numberOfObjects; i++){
    circles[i] = new GameObject()
}

function main(){
    //Clear
    ctx.clearRect(0,0,canvas.width, canvas.height);
    //Update
    //square.move();
   // square2.move();
    //circle.move();
    //Draw
    //square.drawCircle();
   // square2.drawCircle();
   // circle.drawCircle();
    
    for(var i = 0; i<circles.length; i++){
        //update
        circles[i].move();
        //draw
        //circles[i].drawCircle();
        circles[i].vy += gravity;
        circles[i].drawSprite();
    }

    timer = requestAnimationFrame(main);
}

main();