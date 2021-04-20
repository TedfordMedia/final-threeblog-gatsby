import React from "react"
import * as THREE from "three"
import sceneStyles from "./styles/scene.module.sass"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

var cube;
 

class Scene extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasLoaded: false }
  }

  componentDidMount() {
    let scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000 )
    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    window.onload = setTimeout(this.fadeScene.bind(this), 250)

    // scene.background = new THREE.Color(0x111111)
 
    // const geometry = new THREE.BoxGeometry( 20, 20, 20 );
    // const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    // cube = new THREE.Mesh( geometry, material );
    // cube.position.z = -25;
    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // scene.add( cube );

    // const planegeometry = new THREE.BoxGeometry( 200, 200 ,2);
    // const planematerial = new THREE.MeshBasicMaterial( {color: '#683286'});
    
    // var floor = new THREE.Mesh( planegeometry, planematerial );
    // scene.add( floor );
   
    // floor.position.y = 0.0;
    // floor.position.z = -150;
    // floor.rotation.x = - 1//Math.PI / 2;
    // floor.receiveShadow = true;
    // floor.name = 'floor'


    // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    // scene.add( light );
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // scene.add( directionalLight );

 

    // var clock = new THREE.Clock();
 
    // scene.background = new THREE.Color( 0xa0a0a0 );
    // scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

    // const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    // hemiLight.position.set( 0, 20, 0 );
    // scene.add( hemiLight );

    // const dirLight = new THREE.DirectionalLight( 0xffffff );
    // dirLight.position.set( 3, 10, 10 );
    // dirLight.castShadow = true;
    // dirLight.shadow.camera.top = 2;
    // dirLight.shadow.camera.bottom = - 2;
    // dirLight.shadow.camera.left = - 2;
    // dirLight.shadow.camera.right = 2;
    // dirLight.shadow.camera.near = 0.1;
    // dirLight.shadow.camera.far = 40;
    // scene.add( dirLight );














    // Load a glTF resource
    const loader = new GLTFLoader();
    loader.load(
      // resource URL
      'models/robot6.glb',
      // called when the resource is loaded
      function ( gltf ) {

        scene.add( gltf.scene );

        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Group
        // gltf.scenes; // Array<THREE.Group>
        // gltf.cameras; // Array<THREE.Camera>
        // gltf.asset; // Object

      },
      // called while loading is progressing
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' );

      }
    );




 
    this.camera.position.z = 15

    this.animate = function () {
      var SPEED = 0.01;
      cube.rotation.x -= SPEED * 1;
      cube.rotation.y -= SPEED * .1; 
      this.renderer.render(scene, this.camera)
      requestAnimationFrame(this.animate.bind(this))
    }


    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this), false)
  }

  shouldComponentUpdate() {
    this.onWindowResize()
  }

  fadeScene() {
    this.mount.appendChild(this.renderer.domElement)
    this.setState({ hasLoaded: true })
  }

  onWindowResize() {
    if (this.mount) {
      this.camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    }
  }

  render() {


    const classes = this.state.hasLoaded === false ? [sceneStyles.webglContainer]
                                                   : [sceneStyles.webglContainer, sceneStyles.shown]
    return (
      <div className={sceneStyles.webglWrapper}>
        <div className={classes.join(' ')} ref={ref => (this.mount = ref)} />
      </div>
    )
  }
}

export default Scene
