function Resources() {
    this.textures = [];
    this.loadTexture = (name, path) => {
        var tex = new Image(8, 8);
        tex.src = path;
        this.textures[name] = tex;
    };
};

