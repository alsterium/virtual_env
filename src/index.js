let THREE = require("three");
//orbitControl
let Orbit = require("../node_modules/three/examples/jsm/controls/OrbitControls");

(function () {
  let scene, renderer, controls, orbitCam;
  let light, ambient;
  var camera_clustor = new THREE.Group();
  let camera_clustor_helper = new THREE.Group();
  let CameraActive = 1;
  let chessbord_num = 10;
  let chessbord_distance = 60;
  let camera_distance = 30;
  let camera_num = 10;

  document.addEventListener("keydown", (e) => {
    CameraActive = e.key;
  });

  init();
  animate();

  function init() {
    scene = new THREE.Scene();
    // カメラのクラスタ（わっか）
    for (i = 0; i < camera_num; i++) {
      let camera = new THREE.PerspectiveCamera(
        87,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      const radian = (i / camera_num) * Math.PI * 2;
      camera.position.set(
        camera_distance * Math.sin(radian),
        10,
        camera_distance * Math.cos(radian)
      );
      camera.rotation.set(0, radian - Math.PI, 0);
      camera_clustor.add(camera);
      let helper = new THREE.CameraHelper(camera);
      camera_clustor_helper.add(helper);
      // camera_clustor.add(() => {
      //   return new THREE.CameraHelper(camera);
      // });
    }
    scene.add(camera_clustor);
    scene.add(camera_clustor_helper);

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
    let panel_array = new THREE.Group();
    const loader = new THREE.TextureLoader();
    const texture = loader.load("chessboard.jpg");

    for (let i = 0; i < chessbord_num; i++) {
      let geometry_P = new THREE.BoxGeometry(0.1, 4.5, 6.4);
      let material_P = new THREE.MeshStandardMaterial({ map: texture });
      let panel = new THREE.Mesh(geometry_P, material_P);
      const radian = (i / chessbord_num) * Math.PI * 2;
      panel.position.set(
        chessbord_distance * Math.cos(radian),
        10,
        chessbord_distance * Math.sin(radian)
      );
      panel.rotation.y = -radian;

      panel_array.add(panel);
    }

    scene.add(panel_array);

    let axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // controls = new Orbit.OrbitControls(orbitCam,renderer.domElement);

    document.body.appendChild(renderer.domElement);
  }

  function update() {}

  function render() {
    if (isFinite(CameraActive))
      renderer.render(scene, camera_clustor.children[CameraActive]);
    else renderer.render(scene, orbitCam);
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
    render();
  }
})();
