<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import muti from '@/assets/muti.jpg'
import muti2 from '@/assets/mutip1.jpg'
import muti3 from '@/assets/mutip2.jpg'
import muti4 from '@/assets/mutip3.jpg'

const router = useRouter()
const theme = localStorage.getItem('theme') || 'blue'

// Gradasi sama seperti Page3, supaya konsisten di seluruh halaman
const bgGradient = computed(() => {
  return {
    pink: 'from-rose-900 via-pink-800 to-fuchsia-900',
    rose: 'from-rose-900 via-rose-800 to-pink-900',
    blue: 'from-indigo-900 via-purple-800 to-rose-900',
    black: 'from-gray-900 via-neutral-900 to-black',
  }[theme]
})

const accentGradient = computed(() => {
  return {
    pink: 'from-pink-400 to-rose-400',
    rose: 'from-rose-400 to-pink-400',
    blue: 'from-fuchsia-400 to-pink-400',
    black: 'from-rose-300 to-pink-400',
  }[theme]
})

interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
}

const gallery: GalleryItem[] = [
  {
    id: 1,
    title: 'Nature Escape',
    description: 'Kadang kamu nyebelin, ngeselin, apalagi kalok marah',
    image: muti,
  },
  {
    id: 2,
    title: 'City Lights',
    description: 'Tapi bukan berarti aku bakal pergi karena sifat mu',
    image: muti2,
  },
  {
    id: 3,
    title: 'Adventure',
    description: 'Aku akan tetap bertahan ',
    image: muti3,
  },
  {
    id: 4,
    title: 'Dream Destination',
    description: 'Karena aku suka kamu dan sifat mu',
    image: muti4,
  },
]

// ---- Lightbox: klik foto untuk lihat gambar penuh ----
const selectedItem = ref<GalleryItem | null>(null)

function openLightbox(item: GalleryItem) {
  selectedItem.value = item
}

function closeLightbox() {
  selectedItem.value = null
}

// ---- Next Page baru aktif setelah 4 detik ----
const canProceed = ref(false)
const countdown = ref(4)
let countdownTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  countdownTimer = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value -= 1
    } else {
      canProceed.value = true
      if (countdownTimer) clearInterval(countdownTimer)
    }
  }, 1000)
})

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

function goToPage3() {
  if (!canProceed.value) return
  router.push('/page3')
}

// ---- Printilan mengambang: hati & bintang, posisi & delay acak ----
interface FloatingItem {
  id: number
  symbol: string
  left: string
  size: string
  duration: string
  delay: string
}

const floatingItems: FloatingItem[] = Array.from({ length: 14 }, (_, i) => {
  const symbols = ['💗', '💕', '✨', '💫', '🤍']
  return {
    id: i,
    symbol: symbols[i % symbols.length],
    left: `${Math.random() * 96}%`,
    size: `${1 + Math.random() * 1.4}rem`,
    duration: `${9 + Math.random() * 8}s`,
    delay: `${Math.random() * 10}s`,
  }
})
</script>

<template>
 <section
  :class="[
    'relative min-h-screen overflow-hidden bg-gradient-to-br py-20 px-6 transition-all duration-700',
    bgGradient
  ]"
>
    <!-- Lapisan printilan mengambang (hati, kilau) -->
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <span
        v-for="item in floatingItems"
        :key="item.id"
        class="floating-heart absolute bottom-0 select-none opacity-0"
        :style="{
          left: item.left,
          fontSize: item.size,
          animationDuration: item.duration,
          animationDelay: item.delay,
        }"
      >
        {{ item.symbol }}
      </span>
    </div>

    <div class="relative z-10 mx-auto max-w-7xl">

      <!-- Header -->
      <div class="gallery-enter mb-14 text-center">
        <span
          :class="[
            'rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur',
            'bg-clip-text text-transparent bg-gradient-to-r',
            accentGradient,
          ]"
        >
          💌 Featured Gallery
        </span>

        <h1
          class="mt-5 text-4xl font-extrabold text-white md:text-6xl"
        >
          Explore Amazing
          <span :class="['bg-gradient-to-r bg-clip-text text-transparent', accentGradient]">
            Moments
          </span>
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-white/70">
          Muti Perengat-Perengut
        </p>
      </div>

      <!-- Gallery -->
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        <div
          v-for="(item, index) in gallery"
          :key="item.id"
          :style="{ animationDelay: `${index * 0.15}s` }"
          class="gallery-card-enter group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-pink-500/20"
        >

          <button
            type="button"
            @click="openLightbox(item)"
            class="relative block h-80 w-full cursor-zoom-in overflow-hidden"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
            ></div>

            <div class="absolute bottom-5 left-5 right-5 text-left">
              <h2 class="text-2xl font-bold text-white">
                {{ item.title }}
              </h2>

              <p class="mt-2 text-sm text-white/80">
                {{ item.description }}
              </p>
            </div>
          </button>

          <div class="flex items-center justify-between p-5">

            <span
              class="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-300"
            >
              Premium
            </span>

            <button
              @click="openLightbox(item)"
              class="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              View
            </button>

          </div>

        </div>

      </div>

      <!-- Next Page: baru aktif setelah 4 detik -->
      <div class="mt-16 flex flex-col items-center gap-3">
        <button
          @click="goToPage3"
          :disabled="!canProceed"
          :class="[
            'rounded-2xl px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-500',
            canProceed
              ? `bg-gradient-to-r ${accentGradient} text-white hover:scale-105 hover:shadow-2xl cursor-pointer`
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          ]"
        >
          <span v-if="canProceed">Lanjut yok sayang</span>
          <span v-else>Menyiapkan halaman berikutnya… ({{ countdown }})</span>
        </button>
        <p v-if="!canProceed" class="text-xs uppercase tracking-widest text-white/40">
          Nikmati dulu galerinya sebentar 🌷
        </p>
      </div>

    </div>

    <!-- Lightbox -->
    <transition name="lightbox-fade">
      <div
        v-if="selectedItem"
        @click.self="closeLightbox"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
      >
        <div class="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-md">
          <button
            @click="closeLightbox"
            class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl text-white transition hover:bg-black/70"
            aria-label="Tutup"
          >
            ×
          </button>

          <img
            :src="selectedItem.image"
            :alt="selectedItem.title"
            class="max-h-[70vh] w-full object-contain bg-black/20"
          />

          <div class="p-6 text-left">
            <h3 class="text-2xl font-bold text-white">{{ selectedItem.title }}</h3>
            <p class="mt-2 text-white/70">{{ selectedItem.description }}</p>
          </div>
        </div>
      </div>
    </transition>

  </section>
</template>

<style scoped>
@keyframes gallerySlideIn {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.gallery-enter {
  animation: gallerySlideIn 0.7s ease-out both;
}

.gallery-card-enter {
  opacity: 0;
  animation: gallerySlideIn 0.6s ease-out both;
}

/* Hati & kilau yang naik pelan dari bawah layar sampai hilang di atas */
@keyframes floatUp {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  50% {
    transform: translateY(-50vh) translateX(15px) rotate(15deg);
    opacity: 0.6;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100vh) translateX(-10px) rotate(-10deg);
    opacity: 0;
  }
}

.floating-heart {
  animation-name: floatUp;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Transisi lightbox */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
