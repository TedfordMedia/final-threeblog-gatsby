import React from "react"
import * as THREE from "three"
import sceneStyles from "./styles/scene.module.sass"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import anime from 'animejs/lib/anime.es.js';

var scaleForLogo = 60000.35;
var customMaterial;
var mesh;
class Scene extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasLoaded: false }
  }

  componentDidMount() {
    this.animationClock = new THREE.Clock();
    this.clock = new THREE.Clock()
    const scene = new THREE.Scene();
    this.mixer = false;   
    this.mixers = [];
    this.scene = scene;
    var xthis = this;
    this.gui = new GUI( { width: 310 } );
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );
 
    this.setUpLighting(); 
    this.setUpFloor();
    this.scene = scene;
 
    this.camera = new THREE.PerspectiveCamera( 45, this.mount.offsetWidth / this.mount.offsetHeight, 1, 100 );
    this.camera.position.set( - .7, .7, 2.6 );

     
    window.onload = setTimeout(this.fadeScene.bind(this), 1)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.makeACube(); 
    
    this.gui.hide();
 
    var sampleClosedSpline = new THREE.CatmullRomCurve3( [
      new THREE.Vector3( -10, .5, 10 ),
      new THREE.Vector3( -5, .3, 5 ),
      new THREE.Vector3( 0, 1, 0 ),
      new THREE.Vector3( 3, .4, 3 ),
      new THREE.Vector3( 6, .2, 8 )
    ] );
    
    sampleClosedSpline.curveType = 'catmullrom';
    sampleClosedSpline.closed = true;
    var params = {
      spline: 'SampleClosedSpline',
      scale: 1,
      extrusionSegments: 100,
      radiusSegments: 3,
      closed: true,
      animationView: true,
      lookAhead: false,
      cameraHelper: false,
  };
    // Keep a dictionary of Curve instances
    var splines = { 
        SampleClosedSpline: sampleClosedSpline
    };




    // var follower;

    // var xLoaderGltf = new GLTFLoader();
    // xLoaderGltf.load('/assets/models/starbuk2.glb', function ( gltf ) {

    //     var xmesh = gltf.scene;

    //      var s = .11;
    //      xmesh.scale.set( s, s, s );
    //      xmesh.position.z = -2;
    //      xmesh.position.x = 2;
    //         // mesh.position.x = 65;
    //     //mesh.rotation.y =  Math.PI/1; 
    //    // mesh.rotation.x =  Math.PI/1; 

    //       //   xmesh.castShadow = true;
    //       //  xmesh.receiveShadow = true;


    //     // const mygroup = new THREE.Group();
    //     // mygroup.add( xmesh );


    //     xthis.scene.add( xmesh );
    //   //  // follower = mygroup;

    //   //   var mixer = new THREE.AnimationMixer( xmesh );
    //   //   mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
    //   //   xthis.mixers.push( mixer );

    // } );







    function addTube() {

      if ( mesh !== undefined ) { 
          this.scene.remove( mesh );
          mesh.geometry.dispose(); 
      }
  
      var extrudePath = splines[ params.spline ]; 
      var tubeGeometry = new THREE.TubeBufferGeometry( extrudePath, params.extrusionSegments, .02, params.radiusSegments, params.closed );
  
      addGeometry( tubeGeometry ); 
     // setScale();
  
    }
    addTube();
  
    function addGeometry( xgeometry ) { 
      var xmaterial = new THREE.MeshLambertMaterial( { color: 0xff00ff } ); 
      var xmesh = new THREE.Mesh( xgeometry, xmaterial ); 
      xmesh.name = 'spliiiine'
      xmesh.position.z = -5;
      xthis.scene.add( xmesh ); 
    }
 
    // // Load a glTF resource
    const loader = new GLTFLoader();
    this.loader = loader;
    var xthis = this;
    loader.load( '/assets/models/robot6.glb',
      // called when the resource is loaded
      function ( gltf ) { 

        var thismixer  = new THREE.AnimationMixer(gltf.scene);
        xthis.mixers.push(thismixer);
        // var action = mixer.clipAction( gltf.animations[ 0 ] ); 
        // action.play(); 
        var aaaaction = thismixer.clipAction( gltf.animations[ 2 ] ); 
        var actionChicked = thismixer.clipAction( gltf.animations[ 0 ] ); 
        var actionidle3 = thismixer.clipAction( gltf.animations[ 3 ] ); 
        aaaaction.play(); 
 
    
      //xthis.switchAnimations(gltf);

        // setTimeout(() => {
        //   actionidle3.stop();  
        //   actionChicked.play(); 
        // }, ytimeout*2); 
 
        var model = gltf.scene;
        scene.add( model );
   
        xthis.doAnimateRobot(model);
        xthis.setUpShadows(model);  
      },
      // called while loading is progressing
      function ( xhr ) { 
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); 
      },
      // called when loading has errors
      function ( error ) { 
        console.log( 'An error happened' +JSON.stringify(error)); 
      }
    );
 
    this.doFlamingo();
 
    this.loader.load('/assets/models/tedmedialogotedb.glb', function ( gltf ) {

      var mesh = gltf.scene.children[ 0 ];

      mesh.scale.set( scaleForLogo, scaleForLogo, scaleForLogo );
   
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      var model = gltf.scene;
      scene.add( model );
      model.position.z = -4;
      model.position.y = 5;
      xthis.doAnimateLogo(model);
      xthis.setUpShadows(model);  

    });
    
    this.animate = function () {  
      var time = this.animationClock.getDelta() ;
      for ( var i = 0; i < this.mixers.length; ++ i ) { 
         this.mixers[ i ].update( time );
      } 
      customMaterial.uniforms.s.value+= .01; 
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate.bind(this))
    }

    this.setupControls();
    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }
  switchAnimations(gltf){


    // var thismixer  = new THREE.AnimationMixer(gltf.scene);
    // xthis.mixers.push(thismixer);
    // // var action = mixer.clipAction( gltf.animations[ 0 ] ); 
    // // action.play(); 
    // var aaaaction = thismixer.clipAction( gltf.animations[ 2 ] ); 
    // var actionChicked = thismixer.clipAction( gltf.animations[ 0 ] ); 
    // var actionidle3 = thismixer.clipAction( gltf.animations[ 3 ] ); 
    // aaaaction.play(); 

    var ytimeout = 5000;

    setTimeout(() => {
      console.log('hello action change   number of animations = '+gltf.animations.length)
      // var b = action;
      // var a = actionidle3
      // mixer.stopAllAction(); 
      // b.play();
      // b.crossFadeTo(a, .75);
      // a.play(); 
    }, ytimeout);
  }
  doFlamingo(){
    var xthis = this;
    var scaleforFlam = .005
    xthis.loader.load('/assets/models/Flamingo.glb', function ( gltf ) {

      var qmesh = gltf.scene.children[ 0 ];

      qmesh.scale.set( scaleforFlam, scaleforFlam, scaleforFlam );

      var zfmodel = gltf.scene;
      xthis.scene.add( zfmodel );
      // xthis.setUpShadows( fmodel );  
      zfmodel.position.z = -1;
      zfmodel.position.x = -1;
      zfmodel.position.y = 1; 
      var zzzmixer  = new THREE.AnimationMixer(gltf.scene);
      xthis.mixers.push(zzzmixer); 
      var zzzzaction = zzzmixer.clipAction( gltf.animations[ 0 ] );  
      zzzzaction.play();   
    });

  }
  setUpShadows(model){
    model.traverse( function ( object ) {
      object.castShadow = true
      if ( object.isMesh ) object.castShadow = true; 
    }); 
  }
  doAnimateRobot(model){
    // anime({
    //   targets: model.position,
    //   z: -10,
    //   easing: 'easeInOutQuart',
    //   loop: true,
    //   direction: 'alternate',
    //   duration: 10000,
    // });
  }
  doAnimateLogo(model){
    // anime({
    //   targets: model.position,
    //   x: 2.2,
    //   easing: 'easeOutBounce',
    //   loop: false,
    //   delay:1800,
    //   direction: 'alternate',
    //   duration: 500,
    // });
    anime({
      targets: model.position,
      y: 0,
      delay:5000,
      easing: 'easeOutBounce',
      loop: false,
      direction: 'alternate',
      duration: 1000,
    });
    // anime({
    //   targets: model.position,
    //   z: 2.2,
    //   delay:1800,
    //   easing: 'easeOutBounce',
    //   loop: false,
    //   direction: 'alternate',
    //   duration: 500,
    // });
  }
  setUpFloor(){ 
      const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshStandardMaterial( { color: 0x999999, depthWrite: true } ) );
      mesh.rotation.x = - Math.PI / 2;
      mesh.receiveShadow = true;
      this.scene.add( mesh );
  }
  setupControls(){
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.target.set( 0, 1, 0 );
    this.controls.update(); 
   this.camera.lookAt(0, .9, 0);
  }
  setRobotPosition(x){ 
    x.scale.set(4,4,4)
    x.position.set(0,0,-20)
    console.log('Robot is added')
  }
  makeACube(){
    const vRing = `
    varying vec2 vUv;

    void main()
    {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }`;
    const fRing = `

    uniform float time;
    uniform float id;
    uniform float expanded;

    varying vec2 vUv;
    // 2D Random
    float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
    }

    float noise (in vec2 st) {
        st *= 1.;
        vec2 i = floor(st);
        vec2 f = fract(st);
    
    
        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
    
        // Smooth Interpolation
    
        // Cubic Hermine Curve.  Same as SmoothStep()
        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);
    
        // Mix 4 coorners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void main( void ) {

      float st = distance(vUv,vec2(0.5))*1.1;
      st += .01;
      float pct = smoothstep(0.1,0.9,st);
      float t = time *1.5;

      // add noise
      float scale = 3.1;
      vec2 offset = vec2(2.7, -1.3);
      pct += noise(vUv*scale+offset);
      pct *= pct;

      vec3 blue = vec3(0.,0.094,0.659);
      vec3 cyan = vec3(0.2, 0.45, .95);
      vec3 color = mix(blue, cyan, pct);
      float finalAlpha = 1.;
  
    gl_FragColor = vec4( color, finalAlpha);

    }`;

    customMaterial = new THREE.ShaderMaterial({
      uniforms:
      {
        "s": { value: -1.0 },
        "b": { value: 1.0 },
        "p": { value: 2.0 },
        glowColor: { value: new THREE.Color(0x00dd00) }
      },
      vertexShader: vRing,
      fragmentShader: fRing, 
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    })

    
    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    //const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    this.cube = new THREE.Mesh( geometry, customMaterial );
    this.cube.position.z = -15; 
    this.cube.position.y = 1;
    this.cube.position.y = 1;
    this.cube.castShadow = true;
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
  //  this.scene.add( this.cube );
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this), false)
  }

  shouldComponentUpdate() {
    this.onWindowResize()
  }
  setUpLighting(){
    const dirLight = new THREE.DirectionalLight( 0xffffff ,0.5);
    dirLight.position.set( 3, 122, 122 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 250;
    this.scene.add( dirLight );
    this.gui.add(dirLight, 'visible').name('Light' ) ; 
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
