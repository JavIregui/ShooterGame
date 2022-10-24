var player = {
    position: null,
    width: 0,
    height: 0,
    rotation: 0,

    img: null,

    halfWidth: 0,
    halfHeight: 0,

    speed: 400,
    speedTurboMultiplier: 1.5,

    baseVector: Vector2.Zero(),
    toCursor: Vector2.Zero(),
    dir: Vector2.Zero(),

    shotCadency: 0.1,
    shotCadencyAux: 0,

    bulletPool: null,

    vidas: 0,

    Start: function (position) {
        this.position = position;
        this.vidas = 3;

        this.baseVector.Set(0, -1);

        // set the sprite reference
        this.img = graphicAssets.player_ship.image;

        this.width = this.img.width;
        this.height = this.img.height;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.bulletPool = new BulletPool(10);
    },

    Update: function (deltaTime) {
        // movement
        this.dir = Vector2.Zero();

        if (Input.IsKeyPressed(KEY_UP) || Input.IsKeyPressed(KEY_W)){
            this.dir.y = -1;
        }
        if (Input.IsKeyPressed(KEY_DOWN) || Input.IsKeyPressed(KEY_S)){
            this.dir.y = 1;
        }
        if (Input.IsKeyPressed(KEY_RIGHT) || Input.IsKeyPressed(KEY_D)){
            this.dir.x = 1;
        }
        if (Input.IsKeyPressed(KEY_LEFT) || Input.IsKeyPressed(KEY_A)){
            this.dir.x = -1;
        }

        this.dir.Normalize();
        this.position.x += this.dir.x * this.speed * deltaTime;
        this.position.y += this.dir.y * this.speed * deltaTime;

        if(this.position.x < 0){
            this.position.x = 0;
        }
        else if(this.position.x > canvas.width){
            this.position.x = canvas.width;
        }
        if(this.position.y < 0){
            this.position.y = 0;
        }
        else if(this.position.y > canvas.height){
            this.position.y = canvas.height;
        }

        // rotation
        
        this.toCursor.Set(Input.mouse.x - this.position.x,Input.mouse.y - this.position.y);
        this.toCursor.Normalize();
        this.rotation = this.baseVector.AngleBetween(this.toCursor);

        //Disparo
        if((Input.IsKeyPressed(KEY_SPACE) || Input.IsMousePressed()) && this.shotCadencyAux >= this.shotCadency){
            this.bulletPool.Activate(this.position.x, this.position.y, this.rotation - PIH, 600, 10);
            this.shotCadencyAux = 0;
        }
        this.shotCadencyAux += deltaTime;

        this.bulletPool.Update(deltaTime);   

        //Vidas
        for (let i = 0; i < game.enemies.length; i++) {
            if(PointInsideCircle(this.position, game.enemies[i].position, game.enemies[i].halfHeight)){
                --this.vidas;
                //this.position.x = RandomBetween(0, canvas.width);
                //this.position.y = RandomBetween(0, canvas.height);
                this.position.x = canvas.width/2;
                this.position.y = canvas.height/2;
            }   
        }   
    },

    Draw: function (ctx) {
        // draw the player sprite
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        ctx.drawImage(this.img, -this.halfWidth, -this.halfHeight, this.width, this.height);

        ctx.restore();

        this.bulletPool.Draw(ctx);

        // draw the dir value
        const uiCirclePosition = {x: 50, y: canvas.height - 50};

        // outer circle (bounds)
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(uiCirclePosition.x, uiCirclePosition.y, 30, 0, PI2, true);
        ctx.closePath();
        ctx.stroke();

        // inner circle (direction vector)
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(uiCirclePosition.x + this.dir.x * 30, uiCirclePosition.y + this.dir.y * 30, 10, 0, PI2, true);
        ctx.closePath();
        ctx.fill();
    },

}