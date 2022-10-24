class Enemy
{
	constructor(position, rotation, life, image)
	{
		this.position = position;
		this.rotation = rotation;
		this.life = life;
		this.image = image;

		this.halfWidth = this.image.width / 2;
		this.halfHeight = this.image.height / 2;
	}
	
	Update(deltaTime)
	{
        
	}
	

	Draw(ctx)
	{
		ctx.save();

		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation);

		ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight, this.image.width, this.image.height);

		ctx.restore();
	}
}

class EnemyFollow extends Enemy 
{
    constructor(position, rotation, life, image)
	{
        super(position, rotation, life, image);

        this.speed = 150; 
	}

    Update(deltaTime)
    {
        this.rotation = Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x);

        this.position.x -= Math.cos(this.rotation) * this.speed * deltaTime; 
        this.position.y -= Math.sin(this.rotation) * this.speed * deltaTime;
    }
}

const KAMIKAZE_STATE = {
    looking: 0,
    launching: 1
}

class KamikazeEnemy extends Enemy 
{
    constructor(position, rotation, life, image)
	{
        super(position, rotation, life, image);

        this.speed = 600; 

        this.currentState = KAMIKAZE_STATE.looking;

        this.counter = 1.5;
	}

    Update(deltaTime)
    {
        switch (this.currentState)
        {  
            case KAMIKAZE_STATE.looking:
                if(this.counter > 0){
                    if(this.position.x < canvas.width - this.halfWidth && this.position.x > this.halfWidth && this.position.y < canvas.height - this.halfHeight && this.position.y > this.halfHeight){
                        this.counter = this.counter - deltaTime;
                        this.rotation = Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x);
                    }
                    else{
                        if(this.position.x > canvas.width - this.halfWidth){
                            --this.position.x;
                        }
                        else if(this.position.x < this.halfWidth){
                            ++this.position.x;
                        }
                        if(this.position.y > canvas.height - this.halfHeight){
                            --this.position.y;
                        }
                        else if(this.position.y < this.halfHeight){
                            ++this.position.y;
                        }
                    }
                }
                else{
                    this.currentState = KAMIKAZE_STATE.launching;
                }
                
            break;

            case KAMIKAZE_STATE.launching:

                if(this.position.x < canvas.width - this.halfWidth && this.position.x > this.halfWidth && this.position.y < canvas.height - this.halfHeight && this.position.y > this.halfHeight){
                    this.position.x -= Math.cos(this.rotation) * this.speed * deltaTime; 
                    this.position.y -= Math.sin(this.rotation) * this.speed * deltaTime;
                }
                else{
                    this.counter = 1.5;
                    this.currentState = KAMIKAZE_STATE.looking;
                }


            break;
        } 

    }
}
