var game = {
    bgGradient: null,
    player: null,
    cursor: null,
    bulletPool: null,
    enemies: [], 

    Start: function()
    {
        // prepare the bg gradient
        this.bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        this.bgGradient.addColorStop(1, "rgb(112, 162, 218)");
        this.bgGradient.addColorStop(0.9494949494949495, "rgb(0, 122, 255)");
        this.bgGradient.addColorStop(0.4292929292929293, "rgb(38, 71, 108)");
        this.bgGradient.addColorStop(0.16161616161616163, "rgb(0, 0, 0)");
        this.bgGradient.addColorStop(0, "rgb(1, 1, 1)");
    
        // player is a global variable
        this.player = player;
        this.player.Start(new Vector2(canvas.width / 2, canvas.height / 2));

        this.cursor = cursor;
        this.cursor.Start();

        this.bulletPool = new BulletPool(10);

        this.enemies = [];
        let newFollowEnemy = new EnemyFollow(new Vector2(canvas.width - 50, 50), 0, 100, graphicAssets.enemy.image);
        let newKamikazeEnemy = new KamikazeEnemy(new Vector2(canvas.width - 50, 50), 0, 100, graphicAssets.enemy.image);
        this.enemies.push(newFollowEnemy);
        this.enemies.push(newKamikazeEnemy);
    },

    Update: function(deltaTime)
    {
        // Update the player
        this.player.Update(deltaTime);

        this.cursor.Update(deltaTime);

        this.bulletPool.Update(deltaTime);

        this.enemies.forEach(enemy => enemy.Update(deltaTime));

        if(this.enemies.length == 0 || this.player.vidas <= 0){
            this.Start();
        }
    },

    Draw: function(ctx)
    {

        // background gradient
        ctx.fillStyle = this.bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw the player
        this.player.Draw(ctx);

        // draw the aiming point
        this.cursor.Draw(ctx);

        this.bulletPool.Draw(ctx);

        this.enemies.forEach(enemy => enemy.Draw(ctx));
        
    }

}