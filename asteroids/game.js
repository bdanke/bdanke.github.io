(function(root) {
  var Game = root.Game = (root.Game || {});

  var Screen = Game.Screen = function(ctx, dimX, dimY, numAsteroids) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.ctx = ctx;
    this.numAsteroids = numAsteroids;
    this.setup();
    this.bindKeyHandlers();
  };

  Screen.prototype.setup = function() {
    this.switchState();
    this.score = 0;
    this.asteroids = [];
    this.addAsteroids(this.numAsteroids);
    this.ship = new Game.Ship([this.dimX/2,this.dimY/2],0,-Math.PI/2);
    this.bullets = [];
    this.draw();
  };

  Screen.prototype.addAsteroids = function(num) {
    for (var i = 0; i < num; i++) {
      this.asteroids.push(Game.randomAsteroid(this.dimX, this.dimY));
    }
  };

  Screen.prototype.draw = function() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.dimX,this.dimY);
    var self = this;
    self.ship.draw(self.ctx);
    this.asteroids.forEach( function(aster) {
      aster.draw(self.ctx);
    });
    this.bullets.forEach( function(bullet) {
      bullet.draw(self.ctx);
    });
    this.ctx.font = "20px san-serif";
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('Score: ' + this.score, 20, 30);
  };

  Screen.prototype.move = function() {
    var self = this;
    this.ship.move(self.dimX, self.dimY);
    this.asteroids.forEach( function(aster) {
      aster.move(self.dimX, self.dimY);
    });
    this.bullets.forEach( function(bullet) {
      bullet.move(self.dimX, self.dimY);
    });
  };

  Screen.prototype.step = function() {

    if(key.isPressed('up')) this.ship.impulse(0.3);
    if(key.isPressed('down')) this.ship.impulse(-0.3);
    if(key.isPressed('left')) this.ship.rotate(-0.1);
    if(key.isPressed('right')) this.ship.rotate(0.1);

    this.move();
    this.draw();
    var self = this;

    this.bullets.forEach( function(bullet) {
      bullet.hitAsteroids(self);
    });
    this.checkCollisions();
    
    if (this.asteroids.length == 0) {
      this.stop();
      return true;
    }
  };

  Screen.prototype.start = function() {
    this.draw();
  };

  Screen.prototype.switchState = function() {
    if (this.state == false) {
      this.state = true;
      this.timer = setInterval(this.step.bind(this), 30);
    } else {
      this.state = false;
      clearInterval(this.timer);
    }
  };

  Screen.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.stop();
        return true;
      }
    }
    return false;
  };

  Screen.prototype.stop = function() {
    clearInterval(this.timer);
    this.ctx.font = '40px san-serif';
    this.ctx.textBaseline = 'middle';
    if (this.asteroids.length == 0) {
      this.ctx.fillStyle = '#0f0';
      this.ctx.fillText('YOU WIN!', this.dimX / 2 - 100, this.dimY / 2);
      this.state = false;
    } else {
      this.ctx.fillStyle = '#f00';
      this.ctx.fillText('GAME OVER', this.dimX / 2 - 120, this.dimY / 2);
      this.state = false;
    }
  };

  Screen.prototype.bindKeyHandlers = function() {
    var self = this;
    key('space', function() { self.addBullet(); return false; });
    key('r', function() {
      self.setup();
      self.switchState();
      return false;
    });
    key('p', function() { self.switchState(); return false; });
  };

  Screen.prototype.addBullet = function() {
    var bullet = this.ship.fireBullet();
    this.bullets.push(bullet);
    setTimeout( function() { this.game.removeBullet(bullet); }, 500);
  };

  Screen.prototype.removeAsteroid = function(aster) {
    var arr = this.asteroids;
    if (aster.radius > 10) {
      for (var i = 0; i < 3; i++) {
        arr.push(aster.smallerAsteroid());
      }
    }
    this.asteroids = _.without(arr, aster);
    this.score += 1;
  };

  Screen.prototype.removeBullet = function(bullet) {
    var arr = this.bullets;
    this.bullets = _.without(arr, bullet);
  };
})(this);