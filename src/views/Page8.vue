<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import muti from '@/assets/muti.jpg'
import muti2 from '@/assets/mutik1.jpg'
import muti3 from '@/assets/mutip2.jpg'
import muti4 from '@/assets/muti7.jpg'
import muti5 from '@/assets/muti5.jpg'

const router = useRouter()

const theme = localStorage.getItem('theme') || 'blue'

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

function lanjut() {
  router.push('/')
}

// ---- Hati jatuh di background ----
const HEART_EMOJIS = ['❤️', '💗', '💕', '💖']
const fallingHearts = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 7 + Math.random() * 7,
  size: 14 + Math.random() * 18,
  drift: (Math.random() - 0.5) * 60,
  emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
}))

// ---- Galeri 5 foto, gaya polaroid, semua bisa diklik ----
const gallery = [
  { id: 1, src: muti, alt: 'Kenangan 1', rotate: '-rotate-6', emoji: '💕' },
  { id: 2, src: muti2, alt: 'Kenangan 2', rotate: 'rotate-3', emoji: '✨' },
  { id: 3, src: muti3, alt: 'Kenangan 3', rotate: '-rotate-2', emoji: '💫' },
  { id: 4, src: muti4, alt: 'Kenangan 4', rotate: 'rotate-6', emoji: '🌸' },
  { id: 5, src: muti5, alt: 'Kenangan 5', rotate: '-rotate-3', emoji: '💖' },
]

const isImageOpen = ref(false)
const activeImage = ref('')
const activeAlt = ref('')

function openImage(src: string, alt: string) {
  activeImage.value = src
  activeAlt.value = alt
  isImageOpen.value = true
}

function closeImage() {
  isImageOpen.value = false
}
</script>

<template>
  <div
    :class="[
      'bg-gradient-to-br',
      bgGradient,
      'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-white sm:px-10'
    ]"
  >
    <!-- Hati jatuh di background -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <span
        v-for="h in fallingHearts"
        :key="h.id"
        class="falling-heart absolute top-[-10%]"
        :style="{
          left: h.left + '%',
          fontSize: h.size + 'px',
          animationDelay: h.delay + 's',
          animationDuration: h.duration + 's',
          '--drift': h.drift + 'px',
        }"
      >{{ h.emoji }}</span>
    </div>

    <!-- Printilan mengambang -->
    <span class="floaty pointer-events-none absolute left-[8%] top-[10%] text-3xl opacity-70">💕</span>
    <span class="floaty pointer-events-none absolute right-[10%] top-[14%] text-2xl opacity-60" style="animation-delay: 0.6s">✨</span>
    <span class="floaty pointer-events-none absolute left-[14%] bottom-[12%] text-2xl opacity-60" style="animation-delay: 1.1s">🌸</span>
    <span class="floaty pointer-events-none absolute right-[16%] bottom-[16%] text-3xl opacity-70" style="animation-delay: 1.6s">💫</span>

    <div class="page8-enter relative flex w-full max-w-5xl flex-col items-center gap-4 text-center">
      <span
        :class="[
          'rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-widest backdrop-blur',
          'bg-clip-text text-transparent bg-gradient-to-r',
          accentGradient,
        ]"
      >
        🖼️ Galeri Kenangan
      </span>

      <h1 class="text-5xl font-bold leading-tight lg:text-6xl">
        Lima
        <span :class="['bg-gradient-to-r bg-clip-text text-transparent', accentGradient]">
          Cerita Kecil
        </span>
      </h1>

      <p class="max-w-xl text-lg text-white/80">
        Setiap foto punya ceritanya sendiri. Sentuh satu per satu untuk melihatnya lebih dekat. 🌷
      </p>
    </div>

    <!-- Galeri 5 foto -->
    <div class="page8-enter relative mt-12 flex w-full max-w-4xl flex-wrap items-center justify-center gap-6">
      <button
        v-for="photo in gallery"
        :key="photo.id"
        type="button"
        @click="openImage(photo.src, photo.alt)"
        :class="[
          'polaroid-cute relative bg-white p-3 shadow-2xl transition duration-300 hover:z-20 hover:scale-105 hover:rotate-0 focus:outline-none',
          photo.rotate,
        ]"
      >
        <img :src="photo.src" :alt="photo.alt" class="h-32 w-32 rounded-xl object-cover sm:h-36 sm:w-36" />
        <span class="absolute -right-2 -top-2 text-xl drop-shadow">{{ photo.emoji }}</span>
      </button>
    </div>

    <button
      @click="lanjut"
      :class="[
        'page-enter relative mt-12 w-fit rounded-2xl bg-gradient-to-r px-12 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl',
        accentGradient,
      ]"
    >
      Perjalanan kita sampek sini dulu ya sayang
    </button>

    <!-- Modal fullscreen foto -->
    <Transition name="fade-scale">
      <div
        v-if="isImageOpen"
        @click.self="closeImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-md"
      >
        <button
          @click="closeImage"
          class="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:scale-110 hover:bg-white/20"
          aria-label="Tutup"
        >
          ✕
        </button>

        <div class="flex flex-col items-center gap-4">
          <img
            :src="activeImage"
            :alt="activeAlt"
            class="max-h-[80vh] max-w-[90vw] rounded-3xl border-4 border-white/40 object-contain shadow-2xl"
          />
          <p class="text-sm text-white/70">💞 Terima kasih sudah menyimpan momen ini</p>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
@keyframes page8SlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page8-enter {
  animation: page8SlideIn 0.7s ease-out both;
}

@keyframes floaty {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

.floaty {
  animation: floaty 4s ease-in-out infinite;
}

/* Border imut ala polaroid, konsisten dengan halaman sebelumnya */
.polaroid-cute {
  border-radius: 1rem;
  border: 4px dashed #ddd6fe;
}

/* Animasi hati jatuh */
@keyframes fallHeart {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.85;
  }
  50% {
    transform: translateY(50vh) translateX(var(--drift)) rotate(180deg);
  }
  90% {
    opacity: 0.85;
  }
  100% {
    transform: translateY(115vh) translateX(0) rotate(360deg);
    opacity: 0;
  }
}

.falling-heart {
  animation-name: fallHeart;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

/* Transisi modal foto */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.25s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
}

.fade-scale-enter-active img,
.fade-scale-leave-active img {
  transition: transform 0.25s ease;
}

.fade-scale-enter-from img {
  transform: scale(0.9);
}
</style>
