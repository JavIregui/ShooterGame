class Bullet {

    constructor(position, rotation, speed, power) 
    {
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
        this.power = power;
        this.active = false;
    }

    Update (deltaTime) 
    {
        this.position.x += Math.cos(this.rotation) * this.speed * deltaTime;
        this.position.y += Math.sin(this.rotation) * this.speed * deltaTime; 
    }

    Draw (ctx) 
    {
        ctx.fillStyle = "yellow";
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        ctx.fillRect(-3, -1, 6, 2);
        
        ctx.restore();
    }
}

class BulletPool 
{
    constructor(initialSize)
    {
        this.bullets = [];

        for (let i = 0; i < initialSize; i++)
        {
            let bullet = new Bullet(new Vector2(0, 0), 0, 0, 0);
            this.bullets.push(bullet); 
        }
    }

    Update(deltaTime) 
    {
        // update all the Active bullets
        for (let i = 0; i < this.bullets.length; i++)
        {
            if(this.bullets[i].active){
                this.bullets[i].Update(deltaTime);

                for (let j = 0; j < game.enemies.length; j++) {
                    if(PointInsideCircle(this.bullets[i].position, game.enemies[j].position, game.enemies[j].halfHeight)){
                        game.enemies[j].life = game.enemies[j].life - this.bullets[i].power;
                        if(game.enemies[j].life <= 0){
                            game.enemies.splice(j, 1);
                        }
                        this.Deactivate(this.bullets[i]);
                    }
                }

                // check if a bullet has to be deactivated
                if(this.bullets[i].position.x > canvas.width || this.bullets[i].position.x < 0 ||this.bullets[i].position.y > canvas.height ||this.bullets[i].position.y < 0)
                {
                    this.Deactivate(this.bullets[i]);
                }
            }
        }
    }

    Draw(ctx) 
    {
        // draw the Active bullets
        //this.bullets.forEach(bullet => bullet.Draw(ctx));
        this.bullets.forEach(bullet => {
            if(bullet.active){
                bullet.Draw(ctx);
            }
        });
    }
    Activate(x, y, rotation, speed, power) 
    {
        let newBullet = null;

        // look for the first non-active bullet of the pool
        for (let i = 0; !newBullet && i < this.bullets.length; i++){

            if(!this.bullets[i].active){
                
                newBullet = this.bullets[i];

                newBullet.position.x = x;
                newBullet.position.y = y;
                newBullet.rotation = rotation;
                newBullet.speed = speed;
                newBullet.power = power; 
                newBullet.active = true;
            }
        }

        // if there is no non-active bullet found, create a new one
        if(!newBullet){
            newBullet = new Bullet(new Vector2(x, y), rotation, speed, power)
            // add the new bullet into the bullets array
            this.bullets.push(newBullet);

        }
        // activate the bullet
        newBullet.active = true;
        // return the bullet reference
        return newBullet;
        
    }
    Deactivate(bullet) 
    {
        bullet.active = false;
    } 
}