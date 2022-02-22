class Player
{
    constructor(x,y,w,h)
    {
        let options = {
            friction: 2,
            restitution: 0.6,
            isStatic: false
          }
        this.w = w;
        this.h = h;
        this.jumpCoolDown = false;
        this.body = Bodies.rectangle(x, y, w, h,
                                     options);
    }

    init(matterWorld)
    {
        World.add(matterWorld, this.body)
    }
    
    update()
    {
        if(keyIsDown(32) && this.jumpCoolDown == false)
        {
            this.jump();  
            this.jumpCoolDown = true;
        }
        if(keyIsDown(LEFT_ARROW))
        {
            this.moveLeft();   
        }
        if(keyIsDown(RIGHT_ARROW))
        {
            this.moveRight();   
        }

        Matter.Events.on(engine, 'collisionStart', (event) =>
        {
            let pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                if( pair.bodyA === this.body || pair.bodyB === this.body)
                {
                    this.jumpCoolDown = false;
                    // console.log("collide")
                }
            }            
        })

        if(this.body.position.y > height + 20)
        {
            Body.setPosition(this.body,createVector(100,200))
        }
    }

    moveLeft()
    {
        Body.translate(this.body, createVector(-3,0))
    }

    moveRight()
    {
        Body.translate(this.body, createVector(3,0))
    }

    jump()
    {
        Body.applyForce(this.body, this.body.position, createVector(0, 0.2))
    }

    display()
    {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(0);
        stroke(255);
        fill(255);
        rect(0, 0, this.w, this.h);
        pop();
    }
}