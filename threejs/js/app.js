var APP = {
    scene: null,
    camera: null,
    render: null,
    container: null,

    // earth
    earth: null,
    earthGeometry: null,
    earthMaterial: null,

    // moon
    moon: null,
    moonGeometry: null,
    moonMaterial: null,
};

APP.init = function () {
    this.config = {
        'width': parseInt(document.body.clientWidth) - 15,
        'height': parseInt(document.body.clientHeight) - 15,
        't' : 0,
        'cameraYPosition': 0
    };
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(45, this.config.width / this.config.height, 1/*масштаб*/, 10000/*потолок оси z*/);
    this.camera.position.z = 6300;

    this.scene = new THREE.Scene(); // create scene

    this.createEarth();
    this.createMoon();

    this.render = new THREE.WebGLRenderer();    // render tool
    this.render.setSize(this.config.width, this.config.height);
    this.container.appendChild(this.render.domElement);

    document.addEventListener('mousemove', this.mouseMove.bind(this));
    this.animate();
}

// create earth
APP.createEarth = function () {
    var texture = THREE.ImageUtils.loadTexture('textures/earth.png'); //file path
    texture.anisotropy = 8;

    this.earthGeometry = new THREE.SphereGeometry(1000, 80, 80);
    //this.earthMaterial = new THREE.MeshNormalMaterial();
    this.earthMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        emissive: 0xffffff
    });

    this.earth = new THREE.Mesh(this.earthGeometry, this.earthMaterial);

    this.scene.add(this.earth);
}

APP.createMoon = function () {
    var texture = THREE.ImageUtils.loadTexture('textures/moon.jpg'); //file path
    texture.anisotropy = 8;
    this.moonGeometry = new THREE.SphereGeometry(50, 80, 80);
    this.moonMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        emissive: 0xffffff
    });
    this.moon = new THREE.Mesh(this.moonGeometry, this.moonMaterial);

    this.scene.add(this.moon);
}

APP.animate = function () {
    requestAnimationFrame(this.animate.bind(this));

    // earth move
    this.earth.rotation.y -= 0.01;

    // moon move
    this.moon.position.x = Math.sin(this.config.t * 0.3) * 2500;
    this.moon.position.z = Math.cos(this.config.t * 0.3) * 3500;  // ellipse

    this.config.t += Math.PI / 180 * 2;

    // camera
    this.camera.position.y = this.config.cameraYPosition * 2;
    this.camera.lookAt(this.scene.position);

    this.render.render(this.scene, this.camera);
}

APP.mouseMove = function (evnet) {
    this.config.cameraYPosition = parseInt(event.offsetY);
}

window.addEventListener('load', APP.init.bind(APP));