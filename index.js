const panels = document.querySelectorAll('.panel')
const labels = document.querySelectorAll('.form-control label')
labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
        })

    
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
        })
    }


/*<!-- Three.js setup -->*/ 
  

    /* // Texture */
    let textureLoader = new THREE.TextureLoader()
    const normalTexture = textureLoader.load("https://assets.codepen.io/8189774/map.webp?format=auto")

    /* // Canvas */
    const canvas = document.querySelector("canvas.webgl")
    
    /* // Scene */
    const scene = new THREE.Scene()
    
    /* // Objects */
    const geometry = new THREE.SphereBufferGeometry(0.5, 65, 65)

    /* // Materials */
    const material = new THREE.MeshStandardMaterial()
    material.normalMap = normalTexture

    /* // Mesh */
    const shape = new THREE.Mesh(geometry, material)
    scene.add(shape)

    /* // Lights */
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.x = -25;
    pointLight.position.y = -20;
    pointLight.position.z = -20;
    scene.add(pointLight);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    window.addEventListener("resize", () => {
      /* // Update sizes */
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      
      /* // Update camera */
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      /* // Update renderer */
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
      );
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 2;
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    /**
     * Animate
     */
    
     document.addEventListener("mousemove", onDocumentMouseMove);
     
     let mouseX = 0;
     let mouseY = 0;

     let targetX = 0;
     let targeY = 0;

     const windowX = window.innerWidth / 2;
     const windowY = window.innerHeight / 2;

     function onDocumentMouseMove(event) {
       mouseX = event.clientX - windowX;
       mouseY = event.clientY - windowY;
      }

      const updateShape = (event) => {
       shape.position.y = window.scrollY * 0.001;
     }
     
     window.addEventListener("scroll", updateShape);
     
     const clock = new THREE.Clock();
     
    const tick = () => {

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      const elapsedTime = clock.getElapsedTime();
      
      /* // Update objects */
      
      shape.rotation.y = 0.5 * elapsedTime;
      
      shape.rotation.y += 0.5 * (targetX - shape.rotation.y);
      shape.rotation.x += 0.5 * (targetY - shape.rotation.x);
      
      /* // Update Orbital Controls
      // controls.update() */
      
      /* // Render */
      renderer.render(scene, camera);
      
      /* // Call tick again on the next frame */
      window.requestAnimationFrame(tick);
    };
    
    
    window.onload = function() {
        try {
            TagCanvas.Start('myCanvas');
        } catch(e) {
            
            document.getElementById('myCanvasContainer').style.display = 'none';
        }
    };
    
    tick();



                