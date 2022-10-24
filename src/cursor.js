var cursor = {
    position: null,
    width: 0,
    height: 0,

    img: null,

    halfWidth: 0,
    halfHeight: 0,

    Start: function () {
        // set the sprite reference
        this.img = graphicAssets.aim.image;

        this.width = this.img.width;
        this.height = this.img.height;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
    },

    Update: function (deltaTime) {
        // movement
        this.position = {x: Input.mouse.x, y: Input.mouse.y}

    },

    Draw: function (ctx) {
        // draw the cursor sprite
        ctx.save();

        ctx.translate(this.position.x, this.position.y);

        ctx.drawImage(this.img, -this.halfWidth, -this.halfHeight, this.width, this.height);

        ctx.restore();
    }

}