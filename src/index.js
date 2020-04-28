let THREE = require('three');
//orbitControl
let Orbit = require('../node_modules/three/examples/jsm/controls/OrbitControls');


(function(){
    var scene,  camera, renderer, controls;
    var mesh, light, ambient;

    init();
    animate();

    function init() {
        scene = new THREE.Scene();
  
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set(-5,1,0);
        
        ambient = new THREE.AmbientLight(0xFFFFFF,0.3);
        light = new THREE.DirectionalLight(0xFFFFFF,0.8);

        scene.add(ambient,light);
        
        //床の生成
        let geometry = new THREE.BoxGeometry(2000,0.1,2000);
        let material = new THREE.MeshStandardMaterial({color:0x708090});
        
        floor = new THREE.Mesh( geometry, material );
        floor.position.set(0,-0.1,0)
        scene.add( floor );

        //パネルの生成
        let geometry_P = new THREE.BoxGeometry(16,9,0.1);
        let material_P = new THREE.MeshStandardMaterial({color:0xFF0000});
        panel = new THREE.Mesh(geometry_P,material_P);
        panel.position.set(20,9,0);
        panel.rotation.y = 90/180*Math.PI;
        scene.add(panel);
        
        let axesHelper = new THREE.AxesHelper();
        scene.add(axesHelper);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        //カメラコントロール
        controls = new Orbit.OrbitControls(camera, renderer.domElement);

        document.body.appendChild( renderer.domElement );
  
    }

    function animate() {

        requestAnimationFrame( animate );
        renderer.render( scene, camera );
  
    }
})();