function Entity(name, id, initialX, initialY, world) {
    this.name = name;
    this.id = id;
    this.x = initialX;
    this.y = initialY;
    this.lastDirSwitched = 0;
    this.dir = 4;

    this.update = () => {
        // Random movement
        this.lastDirSwitched++;
        
        if (this.lastDirSwitched >= 120) {
            this.dir = Math.floor(Math.random() * 5);
        }

        switch (dir) {
            case 0: this.x++;
            case 1: this.x--;
            case 2: this.y++;
            case 3: this.y--;
            case 4: console.log("staystillbah");
        }

    };


    world.entities.push(this);
}

module.exports = Entity;