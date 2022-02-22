var player1;
var player2;
var myBall;
var myScoreBoard;

function setup()
{
    var canvas = createCanvas( 500, 300 );
    canvas.parent('pong-demo');
    player1 = new Paddle(1);
    player2 = new Paddle(2);
    myBall = new Ball();
    myScoreBoard = new ScoreBoard();
}

function draw()
{
    background(0);
    
    player1.move();
    player2.move();
    player1.draw();
    player2.draw();
    
    myBall.move();
    myBall.bounce()
    myBall.checkPaddleCollision(player1);
    myBall.checkPaddleCollision(player2);
    myBall.leftScreen(myScoreBoard);
    myBall.draw();
  
    myScoreBoard.draw();
}

function keyPressed(){
    // Do something
    return false; // prevent any default behaviour
  }


function Ball()
{
    this.position = createVector(width/2,height/2);
    this.velocity = createVector(random(-3, 3),
                                 random(-3, 3));
    this.size = 25;

    this.move = function()
    {
        this.position.add(this.velocity);
    }

    this.bounce = function ()
    {
      if( this.position.y < 0 || this.position.y > height )
      {
        this.velocity.y *= -1;
      }
    }

    this.leftScreen = function (board)
    {
      if( this.position.x < 0 )
      {
        board.p2Score++;
        this.position = createVector(width/2, height/2);
        this.velocity = createVector(random(-3, 3),
                                     random(-3, 3));
      }
      if( this.position.x > width )
      {
        board.p1Score++;
        this.position = createVector(width/2, height/2);
        this.velocity = createVector(random(-3, 3),
                                     random(-3, 3));
      }
    }

    this.checkPaddleCollision = function (pad)
    {
      var leftBound = pad.position.x - pad.width/2;
      var rightBound = pad.position.x + pad.width/2;
      var topBound = pad.position.y - pad.height/2;
      var bottomBound = pad.position.y + pad.height/2;
      
      if( this.position.x > leftBound && this.position.x < rightBound )
      {
        if( this.position.y > topBound && this.position.y < bottomBound )
        {
            this.velocity.x *= -1;
            this.velocity.y *= -1;
        }
      }
    }

    this.draw = function ()
    {
        fill(255);
        noStroke();
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}

function Paddle(side)
{
    this.position = createVector(0,0);
    this.side = side;
    if(this.side === 1)
    {
        this.position = createVector( 25 , height/2);
    }
    if(this.side === 2)
    {
        this.position = createVector( width-25, height/2);
    }

    this.width = 10;
    this.height = height/5;

    this.move = function()
    {
        if( this.side === 1 )
        {
            if(keyIsDown(87))
            {
                this.position.y -= 5;
            }
            if(keyIsDown(83))
            {
                this.position.y += 5;
            }
        }
        if( this.side === 2 )
        {
            if(keyIsDown(UP_ARROW))
            {
                this.position.y -= 5;
            }
            if(keyIsDown(DOWN_ARROW))
            {
                this.position.y += 5;
            }
        }
    };
    
    this.checkEdges = function()
    {

    };  

    this.draw = function()
    {
        fill(255);
        noStroke();
        rectMode(CENTER);
        rect(this.position.x, this.position.y,
             this.width, this.height);
    };  
}

function ScoreBoard()
{
    this.p1Score = 0;
    this.p2Score = 0;
    this.draw = function()
    {
        textSize(12);
        fill(255);
        text(this.p1Score, width/2-75, 25);
        text(this.p2Score, width/2+75, 25);
    };
}