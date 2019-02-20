function Chunk(chunkSize, chunkX, chunkY) {
    this.updated = true; // Whether this chunk has been changed since last transmission
    this.tiles = [];
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.chunkSize = chunkSize;

    // Set and get tiles
    this.setTile = (x, y, val) => {
        this.tiles[x][y] = val;
        this.updated = true;
    };

    this.getTile = (x, y) => {
        return this.tiles[x][y];
    };

    // Init tiles
    for (var x = 0; x < this.chunkSize; x++) {
        this.tiles[x] = [];
        for (var y = 0; y < this.chunkSize; y++) {
            this.tiles[x][y] = 1;
        }
    }
}

function World(worldSize, chunkSize) {
    this.chunks = [];
    this.worldSize = worldSize;
    this.chunkSize = chunkSize;

    this.entities = [];
    
    // Length of the world in chunks
    this.lengthInChunks = this.worldSize / this.chunkSize;

    this.getChunk = (x, y) => { return this.chunks[x][y]; };

    // Automatically set and get tile from raw tile coords
    this.setTile = (x, y, val) => {
        this.getChunk(Math.floor(x / this.chunkSize), Math.floor(y / this.chunkSize)).setTile(x % this.chunkSize, y % this.chunkSize, val);
    };

    this.getTile = (x, y) => {
        return this.getChunk(Math.floor(x / this.chunkSize), Math.floor(y / this.chunkSize)).getTile(x % this.chunkSize, y % this.chunkSize);
    };

    // Init chunks
    for (var x = 0; x < this.worldSize / this.chunkSize; x++) {
        this.chunks[x] = [];
        for (var y = 0; y < this.worldSize / this.chunkSize; y++) {
            this.chunks[x][y] = new Chunk(this.chunkSize, x, y);
        }
    }
}

module.exports = World;