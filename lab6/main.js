var renderer, camera, scene,
    k, oxy, ozx, oyz,
    range, degree,
    tX, tY, tZ, rotation,
    currentVertices = JSON.parse('[{"x":0,"y":50,"z":100},{"x":15,"y":50,"z":100},{"x":15,"y":50,"z":115},{"x":0,"y":50,"z":115},{"x":0,"y":50,"z":100},{"x":0,"y":-25,"z":100},{"x":15,"y":-25,"z":100},{"x":15,"y":0,"z":100},{"x":35,"y":-25,"z":100},{"x":50,"y":-25,"z":100},{"x":15,"y":15,"z":100},{"x":50,"y":50,"z":100},{"x":35,"y":50,"z":100},{"x":15,"y":30,"z":100},{"x":15,"y":50,"z":100},{"x":15,"y":50,"z":115},{"x":15,"y":30,"z":115},{"x":15,"y":30,"z":100},{"x":15,"y":30,"z":115},{"x":35,"y":50,"z":115},{"x":35,"y":50,"z":100},{"x":35,"y":50,"z":115},{"x":50,"y":50,"z":115},{"x":50,"y":50,"z":100},{"x":50,"y":50,"z":115},{"x":15,"y":15,"z":115},{"x":15,"y":15,"z":100},{"x":15,"y":15,"z":115},{"x":50,"y":-25,"z":115},{"x":50,"y":-25,"z":100},{"x":50,"y":-25,"z":115},{"x":35,"y":-25,"z":115},{"x":35,"y":-25,"z":100},{"x":35,"y":-25,"z":115},{"x":15,"y":0,"z":115},{"x":15,"y":-25,"z":115},{"x":0,"y":-25,"z":115},{"x":0,"y":50,"z":115},{"x":0,"y":-25,"z":115},{"x":0,"y":-25,"z":100},{"x":15,"y":-25,"z":100},{"x":15,"y":-25,"z":115}]');
    vertices = JSON.parse('[{"x":0,"y":50,"z":100},{"x":15,"y":50,"z":100},{"x":15,"y":50,"z":115},{"x":0,"y":50,"z":115},{"x":0,"y":50,"z":100},{"x":0,"y":-25,"z":100},{"x":15,"y":-25,"z":100},{"x":15,"y":0,"z":100},{"x":35,"y":-25,"z":100},{"x":50,"y":-25,"z":100},{"x":15,"y":15,"z":100},{"x":50,"y":50,"z":100},{"x":35,"y":50,"z":100},{"x":15,"y":30,"z":100},{"x":15,"y":50,"z":100},{"x":15,"y":50,"z":115},{"x":15,"y":30,"z":115},{"x":15,"y":30,"z":100},{"x":15,"y":30,"z":115},{"x":35,"y":50,"z":115},{"x":35,"y":50,"z":100},{"x":35,"y":50,"z":115},{"x":50,"y":50,"z":115},{"x":50,"y":50,"z":100},{"x":50,"y":50,"z":115},{"x":15,"y":15,"z":115},{"x":15,"y":15,"z":100},{"x":15,"y":15,"z":115},{"x":50,"y":-25,"z":115},{"x":50,"y":-25,"z":100},{"x":50,"y":-25,"z":115},{"x":35,"y":-25,"z":115},{"x":35,"y":-25,"z":100},{"x":35,"y":-25,"z":115},{"x":15,"y":0,"z":115},{"x":15,"y":-25,"z":115},{"x":0,"y":-25,"z":115},{"x":0,"y":50,"z":115},{"x":0,"y":-25,"z":115},{"x":0,"y":-25,"z":100},{"x":15,"y":-25,"z":100},{"x":15,"y":-25,"z":115}]');

function init () {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.z = 400;
    camera.position.y = 30;
    camera.position.x = 330;

    camera.rotation.y = 0.7;

    scene = new THREE.Scene();

    var light = new THREE.SpotLight();
    light.position.set(250, 50, 400);
    light.castShadow = true;
    scene.add(light);

    createAxis();
    //k
    render();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMapEnabled = true;

    animate();
}

function createK() {
      var geometry = new THREE.Geometry();

      currentVertices.forEach(function (item) {
          geometry.vertices.push(new THREE.Vector3(item.x, item.y, item.z));
      });

      // material
      var material = new THREE.LineBasicMaterial({
          color: 0xffffff
      });

      // line
      k = new THREE.Line( geometry, material );
      scene.add( k );
}

function createAxis() {
      createAxe(0xff00ff, {
            x: 0,
            y: 0,
            z: 0
      }, {

      });
      createAxe(0xffff00, {
            x: -100,
            y: 0,
            z: 100
      }, {
            y: Math.PI / 2
      });
      createAxe(0x00fffff, {
            x: 0,
            y: -100,
            z: 100
      }, {
            x: -Math.PI / 2
      });
}

function createAxe(color, position, rotation) {
      var geometry = new THREE.PlaneGeometry(200, 200);

      var material = new THREE.MeshLambertMaterial({color: color});

      var plane = new THREE.Mesh(geometry, material);

      plane.position.y = position.y;
      plane.position.x = position.x;
      plane.position.z = position.z;

      plane.rotation.y = rotation.y || 0;
      plane.rotation.x = rotation.x || 0;
      plane.rotation.z = rotation.z || 0;

      plane.receiveShadow = true;
      scene.add(plane);
}

function createProjections () {
    // z = 0
    scene.remove(oxy);
    var geometry = new THREE.Geometry();

    currentVertices.forEach(function (item) {
        geometry.vertices.push(new THREE.Vector3(item.x, item.y, 1));
    });

    // material
    var material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    // line
    oxy = new THREE.Line( geometry, material );
    scene.add( oxy );

    // y = 0
    scene.remove(ozx);
    geometry = new THREE.Geometry();

    currentVertices.forEach(function (item) {
        geometry.vertices.push(new THREE.Vector3(item.x, -99, item.z));
    });

    // material
    material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    // line
    ozx = new THREE.Line( geometry, material );
    scene.add( ozx );

    // x = 0
    scene.remove(oyz);
    var geometry = new THREE.Geometry();

    currentVertices.forEach(function (item) {
        geometry.vertices.push(new THREE.Vector3(-99, item.y, item.z));
    });

    // material
    var material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    // line
    oyz = new THREE.Line( geometry, material );
    scene.add( oyz );
}

function render(){
    scene.remove(k);
    createK();

    createProjections();
}

function animate () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

function rangeChange(event) {
    var delta = range.value / 50;
    currentVertices = currentVertices.reduce(function (acc, item, index) {
        item.x = vertices[index].x * delta;
        item.y = vertices[index].y * delta;
        item.z = vertices[index].z * delta;

        acc.push(item);
        return acc;
    }, []);

    render();
}

function changePosition () {
    var dX = tX.value || 0,
        dY = tY.value || 0,
        dZ = tZ.value || 0;

    dX = parseInt(dX);
    dY = parseInt(dY);
    dZ = parseInt(dZ);

    currentVertices = currentVertices.reduce(function (acc, item, index) {
        item.x = vertices[index].x + dX;
        item.y = vertices[index].y + dY;
        item.z = vertices[index].z + dZ;

        acc.push(item);
        return acc;
    }, []);

    render();
}

function rotate () {
    var degreeValue = degree.value || 0,
        transformationMatrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

    degreeValue = parseInt(degreeValue);

    if (rotation.value === 'X') {
        transformationMatrix[1][1] = Math.cos(degreeValue / 180 * Math.PI);
        transformationMatrix[1][2] = Math.sin(degreeValue / 180 * Math.PI);
        transformationMatrix[2][1] = -Math.sin(degreeValue / 180 * Math.PI);
        transformationMatrix[2][2] = Math.cos(degreeValue / 180 * Math.PI);
    } else if (rotation.value === 'Y') {
        transformationMatrix[0][0] = Math.cos(degreeValue / 180 * Math.PI);
        transformationMatrix[0][2] = -Math.sin(degreeValue / 180 * Math.PI);
        transformationMatrix[2][0] = Math.sin(degreeValue / 180 * Math.PI);
        transformationMatrix[2][2] = Math.cos(degreeValue / 180 * Math.PI);
    } else if (rotation.value === 'Z') {
        transformationMatrix[0][1] = Math.cos(degreeValue / 180 * Math.PI);
        transformationMatrix[0][2] = Math.sin(degreeValue / 180 * Math.PI);
        transformationMatrix[1][1] = -Math.sin(degreeValue / 180 * Math.PI);
        transformationMatrix[1][2] = Math.cos(degreeValue / 180 * Math.PI);
    }

    applyTransformation(transformationMatrix);
}

function applyTransformation (transformationMatrix) {
    currentVertices = currentVertices.reduce(function (acc, item, index) {
        item.x = vertices[index].x * transformationMatrix[0][0] + vertices[index].y * transformationMatrix[0][1] + vertices[index].z * transformationMatrix[0][2];
        item.y = vertices[index].x * transformationMatrix[1][0] + vertices[index].y * transformationMatrix[1][1] + vertices[index].z * transformationMatrix[1][2];
        item.z = vertices[index].x * transformationMatrix[2][0] + vertices[index].y * transformationMatrix[2][1] + vertices[index].z * transformationMatrix[2][2];

        acc.push(item);
        return acc;
    }, []);

    render();
}

window.onload = function() {
    init();
    range = document.querySelector('#rangeInput');

    tX = document.querySelector('#tX');
    tY = document.querySelector('#tY');
    tZ = document.querySelector('#tZ');

    rotation = document.querySelector('#rotation');
    degree = document.querySelector('#degree');

    range.addEventListener('input', rangeChange);
    document.querySelector('#positionBtn').addEventListener('click', changePosition);
    document.querySelector('#rotateBtn').addEventListener('click', rotate);
}
