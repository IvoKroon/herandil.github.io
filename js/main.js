var Ball = (function () {
    function Ball(ctx, x, y, radius) {
        this.speedX = 20;
        this.speedY = 20;
        this.windowWidth = 800;
        this.windowHeight = 500;
        this.random = new Random();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.draw = new Draw(ctx);
        this.color = this.random.color();
        this.move();
    }
    Ball.prototype.checkBorder = function () {
        if (this.x + this.radius > this.windowWidth || this.x < 0) {
            this.speedX = -this.speedX;
            this.color = this.random.color();
        }
        if (this.y + this.radius > this.windowHeight || this.y < 0) {
            this.speedY = -this.speedY;
            this.color = this.random.color();
        }
    };
    Ball.prototype.move = function () {
        this.checkBorder();
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw.circle(this.radius, this.x, this.y, this.color);
    };
    return Ball;
}());
var Bullets = (function () {
    function Bullets(ctx, x, y, radius) {
        this.speed = 5;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.draw = new Draw(this.ctx);
        this.draw.circle(this.radius, this.x, this.y, "#FF0000");
    }
    Bullets.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 32:
                console.log("shoot");
                break;
        }
    };
    Bullets.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 32:
                break;
        }
    };
    Bullets.prototype.create = function () {
    };
    return Bullets;
}());
var Draw = (function () {
    function Draw(ctx) {
        this.ctx = ctx;
    }
    Draw.prototype.circle = function (radius, x, y, color) {
        this.ctx.beginPath();
        this.ctx.arc(x + radius / 2, y + radius / 2, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    };
    Draw.prototype.rectangle = function (height, width, x, y, color, rotate) {
        this.ctx.save();
        this.ctx.translate(x - width / 2, y - width / 2);
        this.ctx.rotate(rotate * Math.PI / 180);
        this.ctx.translate(-x - width / 2, -y - width / 2);
        this.ctx.fillStyle = "#4D4E53";
        this.ctx.fillRect(x, y, width, height);
        this.ctx.restore();
    };
    return Draw;
}());
var Game = (function () {
    function Game() {
        this.timer = 0;
        this.context = document.getElementById("canvas");
        this.ctx = this.context.getContext("2d");
        this.tower = new Tower(this.ctx, this.context, 200, 100, 20, 50, 20);
        requestAnimationFrame(this.loop.bind(this));
    }
    Game.prototype.loop = function () {
        this.ctx.clearRect(0, 0, 800, 500);
        this.tower.create();
        requestAnimationFrame(this.loop.bind(this));
    };
    return Game;
}());
var Random = (function () {
    function Random() {
    }
    Random.prototype.color = function () {
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return color;
    };
    return Random;
}());
var Tower = (function () {
    function Tower(ctx, canvas, x, y, width, height, rotate) {
        this.rotateSpeed = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.draw = new Draw(this.ctx);
        this.canvas = canvas;
        this.rotate = rotate;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Tower.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
                this.rotateSpeed = 0;
                break;
            case 39:
                this.rotateSpeed = 0;
                break;
        }
    };
    Tower.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
                this.rotateSpeed = -5;
                break;
            case 39:
                this.rotateSpeed = 5;
                break;
        }
    };
    Tower.prototype.create = function () {
        console.log(this.rotate);
        this.rotate = this.rotate + this.rotateSpeed;
        if (this.rotate > 360) {
            this.rotate = 0;
        }
        if (this.rotate < 0) {
            this.rotate = 360;
        }
        this.draw.rectangle(this.height, this.width, this.x, this.y, "#FF0000", this.rotate);
    };
    return Tower;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map