var resources = {
    textures: [],
    loadTexture: (name, path) => {
        var tex = new Image(8, 8);
        tex.src = path;
        resources.textures[name] = tex;
    }
};

resources.loadTexture("dirt", "../res/img/dirt.png");
resources.loadTexture("grass", "../res/img/grass.png");