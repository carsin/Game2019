function Entity(name, id, initialX, initialY, world) {
    this.name = name;
    this.id = id;
    this.x = initialX;
    this.y = initialY;


    world.entities.push(this);
}

module.exports = Entity;