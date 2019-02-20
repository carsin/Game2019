function Entity(name, id, initialX, initialY, world) {
    this.name = name;
    this.id = id;
    this.x = initialX;
    this.y = initialY;
    this.tgtX = initialX;
    this.tgtY = initialY;
    this.moveTimerX = 0;
    this.moveTimerY = 0;

    this.update = (delta) => {
        // Move towards target

        // Calculate normalized move direction 
        var dirX = this.tgtX - this.x;
        var dirY = this.tgtY - this.y;
        var mag = Math.sqrt(dirX * dirX + dirY * dirY);
        
        if (mag !== 0) {
            var moveX = dirX / mag;
            var moveY = dirY / mag;

            // Time for each tile move
            timeX = Math.abs(1 / moveX);
            timeY = Math.abs(1 / moveY);

            if (this.moveTimerX >= timeX) {
                this.moveTimerX -= timeX;
                this.x += moveX > 0 ? 1 : -1;
            }
            if (this.moveTimerY >= timeY) {
                this.moveTimerY -= timeY;
                this.y += moveY > 0 ? 1 : -1;
            }
        }

        var speed = 4;

        this.moveTimerX += delta * speed;
        this.moveTimerY += delta * speed;
    };


    world.entities.push(this);
}

module.exports = Entity;