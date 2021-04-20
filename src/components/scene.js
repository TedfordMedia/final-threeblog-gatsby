import React from "react"
import * as THREE from "three"
import sceneStyles from "./styles/scene.module.sass"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
var cube;
class Gear {
  constructor(props) {
    this.clock = new THREE.Clock()
    this.zRotation = props.zRotation

    this.pausedDuration = props.pausedDuration
    this.pausedDelay = props.pausedDuration
    this.movingDuration = props.movingDuration
    this.movingDelay = props.movingDuration
    this.isPaused = false

    this.create(props)
  }

  create(props) {
    const curve = new THREE.EllipseCurve(
      props.rotationCenter.x,  props.rotationCenter.y,
      props.radius, props.radius,
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    )
    const points = curve.getPoints(props.points || 10)
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineBasicMaterial({ 
      color: props.color || 0x555555,
      linewidth: props.lineWidth || 1,
    })
    let circle = new THREE.Line( geometry, material )
    circle.position.x = props.position.x || 0
    circle.position.y = props.position.y || 0
    circle.position.z = props.position.z || 0

    this.geometry = circle
  }

  animate() {
    if (this.isPaused && this.pausedDelay > 0) {
      this.pausedDelay -= this.clock.getDelta()*1000
    }
    else if (this.pausedDuration && this.pausedDelay <= 0) {
      this.pausedDelay = this.pausedDuration
      this.isPaused = false
    }
    else if (this.movingDuration && this.movingDelay <= 0) {
      this.movingDelay = this.movingDuration
      this.isPaused = true
    }
    else if (this.movingDuration) {
      this.movingDelay -= this.clock.getDelta()*1000
      this.geometry.rotation.z += this.zRotation
    }
    else {
      this.geometry.rotation.z += this.zRotation
    }
  }
}

class Scene extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasLoaded: false }
  }

  componentDidMount() {
 
    const scene = new THREE.Scene();
    this.scene = scene;
    this.gui = new GUI( { width: 310 } );
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 3, 10, 10 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add( dirLight );


    // ground

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );









  
   // this.camera = new THREE.PerspectiveCamera( 75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000 )
    // camera
    this.camera = new THREE.PerspectiveCamera( 45, this.mount.offsetWidth / this.mount.offsetHeight, 1, 100 );
    this.camera.position.set( - 1, 2, 3 );


    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    window.onload = setTimeout(this.fadeScene.bind(this), 250)

    scene.background = new THREE.Color(0x111111)

    const numberOfGears = 3
    let gears = new Array(numberOfGears)

    const geometry = new THREE.BoxGeometry( 20, 20, 20 );
    const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.z = -25;
    cube.castShadow = true;
    cube.receiveShadow = true;
    //scene.add( cube );

    const planegeometry = new THREE.BoxGeometry( 200, 200 ,200);
    const planematerial = new THREE.MeshStandardMaterial( {color: '#683286'});
    
    var floor = new THREE.Mesh( planegeometry, planematerial );
    scene.add( floor );
   
    floor.position.y = -120;
    floor.position.z = -250;
    //floor.rotation.x = - 1//Math.PI / 2;
    floor.receiveShadow = true;
    floor.name = 'floor'
    const folder1 = this.gui.addFolder( 'Floor' );


    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    const xdirectionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( xdirectionalLight );
    xdirectionalLight.position.x = -20;
    xdirectionalLight.position.y = 20;
    var xthis = this;

  




    // // Load a glTF resource
    // const loader = new GLTFLoader();
    
    // loader.load(
    //   // resource URL
    //   '/assets/models/robot6.glb',
    //   // called when the resource is loaded
    //   function ( gltf ) { 


    //      var model = gltf.scene;
    //      scene.add( model );

    //     model.traverse( function ( object ) {

    //       if ( object.isMesh ) object.castShadow = true;

    //     } );

        
    //     scene.add( gltf.scene ); 
    //     xthis.setRobotPosition(gltf.scene);
    //   },
    //   // called while loading is progressing
    //   function ( xhr ) { 
    //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); 
    //   },
    //   // called when loading has errors
    //   function ( error ) { 
    //     console.log( 'An error happened' ); 
    //   }
    // );


    // // Load a glTF resource
 
    // loader.load(
    //   // resource URL
    //   '/assets/models/tedmedialogotedb.glb',
    //   // called when the resource is loaded
    //   function ( gltf ) { 
    //     scene.add( gltf.scene ); 
    //     console.log('it is added')
    //   },
    //   // called while loading is progressing
    //   function ( xhr ) { 
    //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); 
    //   },
    //   // called when loading has errors
    //   function ( error ) { 
    //     console.log( 'An error happened' ); 
    //   }
    // );


        




 

  
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    // controls.enablePan = false;
    // controls.enableZoom = false;
    this.controls.target.set( 0, 1, 0 );
    this.controls.update(); 



    this.animate = function () {
      var SPEED = 0.01;
      cube.rotation.x -= SPEED * 2;
      cube.position.x -= SPEED * 2;
      cube.rotation.y -= SPEED * .2; 
      this.renderer.render(scene, this.camera)
      requestAnimationFrame(this.animate.bind(this))
    }


    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }
  setRobotPosition(x){ 
    x.scale.set(4,4,4)
    x.position.set(0,0,-20)
    console.log('Robot is added')
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
