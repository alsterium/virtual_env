let THREE = require("three");
//orbitControl
let Orbit = require("../node_modules/three/examples/jsm/controls/OrbitControls");

(function () {
  var scene, camera, renderer, controls;
  var mesh, light, ambient;

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(-5, 10, 0);

    ambient = new THREE.AmbientLight(0xffffff, 0.3);
    light = new THREE.DirectionalLight(0xffffff, 0.8);

    scene.add(ambient, light);

    //床の生成
    let geometry = new THREE.BoxGeometry(2000, 0.1, 2000);
    let material = new THREE.MeshStandardMaterial({ color: 0x708090 });

    floor = new THREE.Mesh(geometry, material);
    floor.position.set(0, -0.1, 0);
    scene.add(floor);

    //パネルの生成
    let panel_array = new THREE.Group();

    for (let i = 0; i < 10; i++) {
      let geometry_P = new THREE.BoxGeometry(0.1, 9, 16);
      let material_P = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      let panel = new THREE.Mesh(geometry_P, material_P);
      const radian = (i / 10) * Math.PI * 2;
      panel.position.set(100 * Math.cos(radian), 10, 100 * Math.sin(radian));
      panel.rotation.y = -radian;

      panel_array.add(panel);
    }

    scene.add(panel_array);

    let axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //カメラコントロール
    controls = new Orbit.OrbitControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
})();
