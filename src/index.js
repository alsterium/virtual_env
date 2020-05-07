let THREE = require("three");
//orbitControl
let Orbit = require("../node_modules/three/examples/jsm/controls/OrbitControls");

(function () {
  let scene, renderer, camera, orbitCam;
  let light, ambient;
  let CameraActive = 1;
  let chessbord_num = 10;
  let chessbord_distance = 60;
  let camera_distance = 30;
  let camera_num = 10;
  let chessboard_scale = 1;

  document.addEventListener("keydown", (e) => {
    CameraActive = e.key;
  });

  init();
  animate();

  function init() {
    scene = new THREE.Scene();
    // カメラ
      camera = new THREE.PerspectiveCamera(
        87,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      
      camera.position.set(
        -10,
        10,
        3
      );
      let camera_helper = new THREE.CameraHelper(camera);
      camera.rotation.y = - Math.PI / 2;
    scene.add(camera);
    scene.add(camera_helper);

    //デバック用カメラ
    orbitCam = new THREE.PerspectiveCamera(
      87,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    orbitCam.position.set(0, 100, 0);
    orbitCam.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(orbitCam);

    ambient = new THREE.AmbientLight(0xffffff, 0.8);
    light = new THREE.DirectionalLight(0xffffff, 0.8);

    scene.add(ambient, light);

    //床の生成
    let geometry = new THREE.BoxGeometry(2000, 0.1, 2000);
    let material = new THREE.MeshStandardMaterial({ color: 0x708090 });

    floor = new THREE.Mesh(geometry, material);
    floor.position.set(0, -0.1, 0);
    scene.add(floor);

    //パネルの生成
    const loader = new THREE.TextureLoader();
    const texture = loader.load("chess.png");

      let geometry_P = new THREE.BoxGeometry(
        0.1,
        10 * chessboard_scale,
        13 * chessboard_scale
      );
      let material_P = new THREE.MeshStandardMaterial({ map: texture });
      let panel = new THREE.Mesh(geometry_P, material_P);
      panel.position.set(
        0,
        10,
        0
      );
      panel.rotation.y = Math.PI/180*25;

    scene.add(panel);

    let axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
  }

  function update() {}

  function render() {
    if (CameraActive == '1')
      renderer.render(scene, camera);
    else renderer.render(scene, orbitCam);
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
    render();
  }
})();
