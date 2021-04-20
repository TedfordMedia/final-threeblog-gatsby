---
title: Using React-Three-Fiber
date: "2021-04-17T21:40:00.169Z" 
featuredImage: r3ff.png
description: Getting started with Using React-Three-Fiber
tags: ["three.js", "Gatsby", "React"]
---

React-Three-Fiber or R3F is a powerful React renderer for three.js scenes, both for the web and with React Native.
Go to your preferred terminal, navigate to a folder you want for your repository, then:

```bash
gatsby new .... finish this later as havent really used it yet
```

















install the package:

```
npm install react-three-fiber --legacy-peer-deps
npm install three
npm audit fix
npm i nice-color-palettes --save --legacy-peer-deps

```

Then make a page inside the Pages folder
  
here is the typescript
```typescript
import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

ReactDOM.render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
  document.getElementById('root'),
)
```