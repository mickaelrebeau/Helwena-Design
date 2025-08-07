<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards } from 'swiper/modules'
import { gsap } from 'gsap'
import 'swiper/css'
import 'swiper/css/effect-cards'

interface Card {
  id: number
  name: string
  price: number
  surface: number
  description: string
  image: string
}

const cards = ref<Card[]>([
  {
    id: 1,
    name: "Vinland",
    price: 850,
    surface: 75,
    description: "Cozy eco-home with a green roof, surrounded by open fields. ",
    image: "/src/assets/card-1.webp"
  },
  {
    id: 2,
    name: "Greenhouse",
    price: 1200,
    surface: 100,
    description: "Modern 3-bedroom apartment with a private garden and a pool.",
    image: "/src/assets/card-2.webp"
  },
  {
    id: 3,
    name: "Villa",
    price: 1500,
    surface: 120,
    description: "Luxurious 4-bedroom villa with a private beachfront.",
    image: "/src/assets/card-3.webp"
  }
])

const swiperInstance = ref<any>(null)
const currentIndex = ref(0)

const currentCard = computed(() => {
  return cards.value[currentIndex.value] || null
})

const swiperModules = [EffectCards]

const headerRef = ref<HTMLElement>()
const actionButtonsRef = ref<HTMLElement>()
const bottomNavRef = ref<HTMLElement>()
const cardContainerRef = ref<HTMLElement>()

const initAnimations = () => {
  // Animation d'entrée pour le header
  if (headerRef.value) {
    gsap.fromTo(headerRef.value, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
  }

  // Animation d'entrée pour les boutons d'action
  if (actionButtonsRef.value) {
    gsap.fromTo(actionButtonsRef.value, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
    )
  }

  // Animation d'entrée pour la navigation du bas
  if (bottomNavRef.value) {
    gsap.fromTo(bottomNavRef.value, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
    )
  }

  // Animation d'entrée pour le conteneur de cartes
  if (cardContainerRef.value) {
    gsap.fromTo(cardContainerRef.value, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: "back.out(1.7)" }
    )
  }
}

const animateButton = (button: HTMLElement, direction: 'like' | 'dislike' | 'reverse') => {
  const tl = gsap.timeline()
  
  tl.to(button, {
    scale: 1.2,
    duration: 0.1,
    ease: "power2.out"
  })
  .to(button, {
    scale: 1,
    duration: 0.1,
    ease: "power2.in"
  })

  // Animation spéciale selon le type de bouton
  if (direction === 'like') {
    gsap.to(button, {
      rotation: 360,
      duration: 0.3,
      ease: "power2.out"
    })
  } else if (direction === 'dislike') {
    gsap.to(button, {
      x: -10,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  } else if (direction === 'reverse') {
    gsap.to(button, {
      x: 10,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }
}

const animateCardChange = () => {
  if (cardContainerRef.value) {
    gsap.to(cardContainerRef.value, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })
  }
}

const animateBackground = () => {
  gsap.to('.blurred-background', {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      gsap.to('.blurred-background', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.in"
      })
    }
  })
}

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onSlideChange = () => {
  if (swiperInstance.value) {
    currentIndex.value = swiperInstance.value.activeIndex
    animateCardChange()
    animateBackground()
  }
}

const like = (event: Event) => {
  if (swiperInstance.value) {
    animateButton(event.target as HTMLElement, 'like')
    swiperInstance.value.slideNext()
  }
}

const dislike = (event: Event) => {
  if (swiperInstance.value) {
    animateButton(event.target as HTMLElement, 'dislike')
    swiperInstance.value.slideNext()
  }
}

const reverse = (event: Event) => {
  if (swiperInstance.value) {
    animateButton(event.target as HTMLElement, 'reverse')
    swiperInstance.value.slidePrev()
  }
}

onMounted(() => {
  nextTick(() => {
    initAnimations()
  })
})
</script>

<template>
  <div id="app" class="relative h-screen bg-gray-900">
    <div class="blurred-background" :style="{ backgroundImage: `url(${currentCard?.image})` }"></div>

    <header ref="headerRef" class="w-full fixed top-0 left-0 right-0 z-50 p-4">
      <div class="w-full flex justify-center items-center">
        <img src="/logo.svg" alt="Logo" class="h-8 w-auto" />
      </div>
    </header>

    <main class="pt-20 pb-32 h-full">
      <div ref="cardContainerRef" class="card-container">
        <swiper :modules="swiperModules" :effect="'cards'" :grab-cursor="true" @swiper="onSwiper"
          @slideChange="onSlideChange" class="w-full h-full">
          <swiper-slide v-for="(card, index) in cards" :key="index" class="swiper-card">
            <div class="card-content">
              <div class="flex justify-between items-center">
                <h3>{{ card.name }}</h3>
                <p>${{ card.price }}/month</p>
              </div>
              <p>{{ card.surface }} m²</p>
              <p>{{ card.description }}</p>
              <p>Swipe up for more details...</p>
            </div>
            <img :src="card.image" :alt="card.name" class="card-image" />
          </swiper-slide>
        </swiper>
      </div>
    </main>

    <div ref="actionButtonsRef" class="action-buttons">
      <button @click="reverse" class="action-btn reverse-btn" title="Reverse">
        <img src="/src/assets/reverse.png" alt="Reverse" />
      </button>

      <button @click="dislike" class="action-btn dislike-btn" title="Dislike">
        <img src="/src/assets/dislike.png" alt="Dislike" />
      </button>

      <button @click="like" class="action-btn like-btn" title="Like">
        <img src="/src/assets/like.png" alt="Like" />
      </button>
    </div>

    <nav ref="bottomNavRef" class="bottom-nav">
      <div class="flex justify-around items-center py-4">
        <button class="flex flex-col items-center space-y-1">
          <img src="/src/assets/heart.png" alt="Cœur" class="w-6 h-6" />
          <span class="text-xs text-gray-600">Cœur</span>
        </button>

        <button class="flex flex-col items-center space-y-1">
          <img src="/src/assets/home.png" alt="Accueil" class="w-6 h-6" />
          <span class="text-xs text-gray-600">Accueil</span>
        </button>

        <button class="flex flex-col items-center space-y-1">
          <img src="/src/assets/message.png" alt="Messages" class="w-6 h-6" />
          <span class="text-xs text-gray-600">Messages</span>
        </button>

        <button class="flex flex-col items-center space-y-1">
          <img src="/src/assets/profile.png" alt="Profil" class="w-6 h-6" />
          <span class="text-xs text-gray-600">Profil</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

#app {
  max-width: 450px;
  margin: 0 auto;
  border-left: 1px solid rgba(224, 224, 224, 0.2);
  border-right: 1px solid rgba(224, 224, 224, 0.2);
}

.blurred-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(40px);
  opacity: 1;
  z-index: -1;
  transition: opacity 0.5s ease;
}

header {
  margin-top: 20px;
  max-width: 450px;
  width: 100%;
  height: 50px;
  background-color: transparent;
  z-index: 100;
}

.card-container {
  margin: 100px auto;
  position: relative;
  width: 80%;
  height: 100%;
  transition: transform 0.3s ease;
}

.swiper-card {
  max-width: 400px;
  width: 100%;
  height: 550px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.swiper-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-content {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  text-align: start;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;
}

.card-content h3 {
  margin: 0;
  padding: 0;
  color: white;
  font-size: 17px;
  font-weight: 600;
}

.card-content p {
  margin: 0;
  padding: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 200;
}

.swiper-card:hover .card-image {
  transform: scale(1.05);
}

.bottom-nav {
  max-width: 400px;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.action-buttons {
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
  z-index: 50;
}

.action-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn img {
  width: 20px;
  height: 20px;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.action-btn:hover img {
  transform: scale(1.1);
}

.bottom-nav {
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 450px;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.bottom-nav button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.bottom-nav button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.bottom-nav button img {
  transition: transform 0.2s ease;
}

.bottom-nav button:hover img {
  transform: scale(1.1);
}

.swiper-slide {
  transition: all 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1);
}

.swiper-slide-prev,
.swiper-slide-next {
  transform: scale(0.9);
  opacity: 0.7;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.action-btn.like-btn:hover {
  animation: pulse 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.card-container.bounce {
  animation: bounce 1s ease;
}
</style>