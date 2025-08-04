<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'gsap'

const containerRef = ref<HTMLDivElement>()

onMounted(() => {
  if (!containerRef.value) return

  // Configuration de la scène
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // Configuration de la caméra
  const camera = new THREE.PerspectiveCamera(
    75,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(-2.5, 2, -3)

  camera.zoom = 3;
  camera.updateProjectionMatrix();

  // Configuration du renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.outputColorSpace = THREE.SRGBColorSpace
  containerRef.value.appendChild(renderer.domElement)

  // Contrôles de la caméra
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Éclairage amélioré
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  // Lumière directionnelle principale
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight.position.set(5, 10, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // Lumière directionnelle secondaire (remplissage)
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6)
  fillLight.position.set(-5, 5, -5)
  scene.add(fillLight)

  // Lumière d'accentuation (spot)
  const spotLight = new THREE.SpotLight(0xffffff, 0.8)
  spotLight.position.set(0, 15, 0)
  spotLight.angle = Math.PI / 6
  spotLight.penumbra = 0.3
  spotLight.castShadow = true
  scene.add(spotLight)

  // Lumière hémisphérique pour plus de réalisme
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4)
  scene.add(hemisphereLight)

  // Chargement du modèle GLB
  const loader = new GLTFLoader()
  loader.load(
    '/sneaker_texture.glb',
    (gltf) => {
      const model = gltf.scene
      
      // Centrer et ajuster la taille du modèle
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      model.scale.setScalar(scale)
      
      model.position.sub(center.multiplyScalar(scale))
      
      // Activer les ombres pour le modèle
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      
      scene.add(model)
    },
    (progress) => {
      console.log('Chargement:', (progress.loaded / progress.total * 100) + '%')
    },
    (error) => {
      console.error('Erreur lors du chargement du modèle:', error)
    }
  )

  // Fonction d'animation
  const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // Gestion du redimensionnement
  const handleResize = () => {
    if (!containerRef.value) return
    
    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight
    
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)

  // Nettoyage
  return () => {
    window.removeEventListener('resize', handleResize)
    if (containerRef.value) {
      containerRef.value.removeChild(renderer.domElement)
    }
    renderer.dispose()
  }
})

// Animations GSAP
onMounted(() => {
  // Timeline principale
  const tl = gsap.timeline({ delay: 0.5 })

  // Animation du logo
  tl.from('.logo', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
  })

  // Animation des liens de navigation
  tl.from('.nav-links p', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.5')

  // Animation du conteneur 3D
  tl.from('.model-container', {
    duration: 1.2,
    scale: 0.8,
    opacity: 0,
    ease: 'power3.out'
  }, '-=0.3')

  // Animation des images de sneaker
  tl.from('.sneaker-images img', {
    duration: 0.8,
    y: 40,
    opacity: 0,
    stagger: 0.15,
    ease: 'power2.out'
  }, '-=0.5')

  // Animation de l'icône de rotation
  tl.from('.rotate', {
    duration: 0.8,
    y: 50,
    x: -100,
    rotation: 0,
    opacity: 0,
    ease: 'power2.out'
  }, '-=0.3')

  // Animation du header
  tl.from('.header-left p', {
    duration: 0.6,
    x: -30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.5')

  tl.fromTo('.header-right > *',
    {
      x: 30,
      opacity: 0
    },
    {
      duration: 0.6,
      x: 0,
      opacity: 1,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.3'
  )

  // Animation spécifique pour les icônes du header
  tl.fromTo('.header-right-icon', 
    {
      x: 20,
      opacity: 0
    },
    {
      duration: 0.6,
      x: 0,
      opacity: 1,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4'
  )

  // Animation de la carte produit
  tl.from('.card-title', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  }, '-=0.2')

  tl.from('.card-color', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  }, '-=0.6')

  tl.from('.card-images img', {
    duration: 0.8,
    scale: 0.5,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=0.4')

  tl.from('.card-size-title', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  }, '-=0.6')

  tl.fromTo('.card-size-button',
    {
      scale: 0.8,
      opacity: 0
    },
    {
      duration: 0.4,
      scale: 1,
      opacity: 1,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    }, '-=0.4'
  )

  tl.from('.card-buttons', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  }, '-=0.3')

  tl.from('.card-description-item', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=0.4')

  // Animations d'interaction
  // Hover sur les boutons de taille
  gsap.utils.toArray('.card-size-button').forEach((button: any) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        duration: 0.2,
        scale: 1.05,
        ease: 'power2.out'
      })
    })

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        duration: 0.2,
        scale: 1,
        ease: 'power2.out'
      })
    })
  })

  // Animation du bouton "Add to Cart"
  const addToCartBtn = document.querySelector('.card-buttons button')
  if (addToCartBtn) {
    addToCartBtn.addEventListener('mouseenter', () => {
      gsap.to(addToCartBtn, {
        duration: 0.3,
        scale: 1.02,
        ease: 'power2.out'
      })
    })

    addToCartBtn.addEventListener('mouseleave', () => {
      gsap.to(addToCartBtn, {
        duration: 0.3,
        scale: 1,
        ease: 'power2.out'
      })
    })
  }

  // Animation des images de sneaker au hover
  gsap.utils.toArray('.sneaker-image').forEach((image: any) => {
    image.addEventListener('mouseenter', () => {
      gsap.to(image, {
        duration: 0.3,
        scale: 1.1,
        ease: 'power2.out'
      })
    })

    image.addEventListener('mouseleave', () => {
      gsap.to(image, {
        duration: 0.3,
        scale: 1,
        ease: 'power2.out'
      })
    })
  })

  // Animation des icônes du header au hover
  gsap.utils.toArray('.header-right-icon').forEach((icon: any) => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        duration: 0.3,
        scale: 1.1,
        ease: 'power2.out'
      })
    })

    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        duration: 0.3,
        scale: 1,
        ease: 'power2.out'
      })
    })
  })
})
</script>

<template>
  <section>
    <div class="left-container">
      <img class="logo" src="./assets/logo.svg" alt="logo">
      <div class="nav-links">
        <p>Home</p>
        <p>|</p>
        <p>Women</p>
        <p>|</p>
        <p>Sneakers</p>
      </div>
      <div ref="containerRef" class="model-container"></div>
      <div class="sneaker-images">
        <img class="sneaker-image sneaker-image-1" src="./assets/sneaker.png" alt="sneaker">
        <img class="sneaker-image" src="./assets/photo-1.png" alt="photo-1">
        <img class="sneaker-image" src="./assets/photo-2.png" alt="photo-2">
      </div>
      <img class="rotate" src="./assets/rotate.svg" alt="rotate">
    </div>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
        </div>
        <div class="header-right">
          <div class="search-bar">
            <img src="./assets/search.png" alt="search">
            <input type="text" placeholder="Search...">
          </div>
          <img class="header-right-icon" src="./assets/profil.png" alt="profil">
          <img class="header-right-icon" src="./assets/like.png" alt="like">
          <img class="header-right-icon" src="./assets/shop.png" alt="shop"></img>
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>PASTEL AURORE</h1>
          <p>$80</p>
        </div>
        <div class="card-color">
          <h2>Choose Color</h2>
          <p>Pastel Pink</p>
        </div>
        <div class="card-images">
          <img class="sneaker-image sneaker-image-1" src="./assets/sneaker.png" alt="sneaker">
          <img class="sneaker-image sneaker-image-2" src="./assets/sneaker-2.png" alt="sneaker 2">
        </div>
        <div class="card-size">
          <div class="card-size-title">
            <h2>Select Size</h2>
            <p>Size Guide</p>
          </div>
          <div class="card-size-buttons">
            <div class="card-size-button">
              <p>5.5</p>
            </div>
            <div class="card-size-button">
              <p>6</p>
            </div>
            <div class="card-size-button">
              <p>6.5</p>
            </div>
            <div class="card-size-button">
              <p>7</p>
            </div>
            <div class="card-size-button">
              <p>7.5</p>
            </div>
            <div class="card-size-button">
              <p>8</p>
            </div>
            <div class="card-size-button">
              <p>8.5</p>
            </div>
            <div class="card-size-button">
              <p>9</p>
            </div>
            <div class="card-size-button">
              <p>9.5</p>
            </div>
            <div class="card-size-button">
              <p>10</p>
            </div>
            <div class="card-size-button">
              <p>10.5</p>
            </div>
            <div class="card-size-button">
              <p>11</p>
            </div>
          </div>
        </div>
        <div class="card-buttons">
          <div class="card-like">
            <img src="./assets/like.png" alt="like">
          </div>
          <button>Add to Cart</button>
        </div>
        <div class="card-description">
          <div class="card-description-item">
            <p class="card-description-item-description">Free Pick-up</p>
            <p class="card-description-item-description">Free returns on all qualifying orders.</p>
          </div>
          <div class="card-description-item">
            <h2 class="card-description-item-title">Description</h2>
            <p class="card-description-item-description-2">Blending comfort with minimalist style, this low-top sneaker
              features smooth leather and soft pastel
              accents. </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Text+Me+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Tauri&display=swap');

@font-face {
  font-family: 'Thonburi';
  src: url('./assets/fonts/Thonburi_Bold.ttf') format('truetype');
}

.logo {
  margin-bottom: 30px;
}

h1 {
  margin: 0;
  padding: 0;
  font-size: 40px;
  font-weight: 700;
}

h2 {
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 700;
}

p {
  margin: 0;
  padding: 0;
  color: #323328;
}

.nav-links {
  display: flex;
  gap: 10px;
  color: #323328;
  margin-bottom: 20px;
  font-family: 'Text Me One', sans-serif;
}

.model-container {
  width: 400px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}

section {
  height: 100vh;
  display: flex;
  justify-content: space-between;
}

.left-container {
  padding: 20px;
  width: 50%;
  position: relative;
}

.rotate {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-20%, -30%);
  transition: transform 0.5s ease;
  transform-origin: center;
}

.container {
  padding: 2em 4em;
  width: 50%;
  background-color: #f1f2f8;
  font-family: 'Thonburi', sans-serif;
}

.sneaker-images {
  margin-top: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.sneaker-image {
  width: 95px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: center;
}

.sneaker-image-1 {
  border: 1px solid rgba(50, 51, 40, 0.5);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  gap: 10px;
  font-family: 'Teko', sans-serif;
  font-weight: 300;
  font-size: 25px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar {
  display: flex;
  width: 90px;
  gap: 5px;
  border: 1px solid rgba(50, 51, 40, 0.5);
  border-radius: 30px;
  padding: 5px 10px;
}

.search-bar input {
  border: none;
  outline: none;
  background-color: transparent;
  flex: 1;
  color: #000;
  font-family: 'Teko', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  min-width: 0;
}

.header-right-icon {
  width: 21px;
  height: 20px;
  padding: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
  transform-origin: center;
  opacity: 1;
  visibility: visible;
}

.header-right-icon:hover {
  cursor: pointer;
  border-bottom: 1px solid rgba(50, 51, 40, 0.5);
}

.card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 6em;
  padding-right: 4em;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.card-title h1 {
  font-size: 40px;
  font-weight: 700;
}

.card-title p {
  font-family: 'Tauri', sans-serif;
  font-size: 20px;
  font-weight: 400;
}

.card-color {
  display: flex;
  flex-direction: column;
}

.card-color h2 {
  font-size: 20px;
  font-weight: 700;
}

.card-color p {
  font-size: 16px;
  font-weight: 300;
  color: rgba(50, 51, 40, 0.5);
}

.card-images {
  display: flex;
  gap: 20px;
}

.card-images img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
}

.card-size {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-size-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-size-title h2 {
  font-size: 20px;
  font-weight: 700;
}

.card-size-title p {
  font-size: 14px;
  font-weight: 300;
  color: rgba(50, 51, 40, 0.5);
}

.card-size-buttons {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}

.card-size-button {
  cursor: pointer;
  width: 61px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid rgba(50, 51, 40, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 300;
  transition: all 0.3s ease;
  cursor: pointer;
  transform-origin: center;
  opacity: 1;
  visibility: visible;
}

.card-size-button:hover {
  background-color: #6e6e6e;
  cursor: pointer;
}

.card-size-button:hover p {
  color: white;
}

.card-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.card-like {
  width: 61px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid rgba(50, 51, 40, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-like:hover {
  background-color: #6e6e6e;
  color: white;
}

.card-like:hover img {
  filter: brightness(0) invert(1);
}

.card-buttons button {
  width: 100%;
  height: 45px;
  border-radius: 10px;
  border: 1px solid rgba(50, 51, 40, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #323328;
  color: white;
  font-family: 'Teko', sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-buttons button:hover {
  background-color: #6e6e6e;
  color: white;
  cursor: pointer;
}

.card-description {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-description-item {
  display: flex;
  flex-direction: column;
}

.card-description-item-title {
  font-size: 20px;
  font-weight: 700;
}

.card-description-item-description {
  font-size: 16px;
  font-weight: 300;
  color: rgba(50, 51, 40, 0.5);
}

.card-description-item-description-2 {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
  color: rgba(50, 51, 40, 0.5);
}
</style>
