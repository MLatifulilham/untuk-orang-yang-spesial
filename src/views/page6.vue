<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import muti from '@/assets/muti.jpg'
import muti2 from '@/assets/mutik1.jpg'
import muti3 from '@/assets/muti7.jpg'

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
  router.push('/page7')
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

// ---- Foto: klik untuk membuka fullscreen ----
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
      'relative flex min-h-screen w-full items-center justify-center overflow-hidden px-10 py-16 text-white'
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
    <span class="floaty pointer-events-none absolute left-[8%] top-[12%] text-3xl opacity-70">💜</span>
    <span class="floaty pointer-events-none absolute right-[10%] top-[18%] text-2xl opacity-60" style="animation-delay: 0.6s">✨</span>
    <span class="floaty pointer-events-none absolute left-[12%] bottom-[14%] text-2xl opacity-60" style="animation-delay: 1.1s">🎀</span>

    <div class="page6-enter relative grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">

      <!-- Kiri: teks besar (rata kiri) -->
      <div class="flex flex-col items-start gap-5 text-left">
        <span
          :class="[
            'rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-widest backdrop-blur',
            'bg-clip-text text-transparent bg-gradient-to-r',
            accentGradient,
          ]"
        >
          🎀 Kenangan Manis
        </span>

        <h1 class="text-6xl font-bold leading-tight lg:text-7xl">
          Momen yang
          <span :class="['block bg-gradient-to-r bg-clip-text text-transparent', accentGradient]">
            Selalu Kusimpan
          </span>
        </h1>

        <p class="max-w-md text-lg text-white/80">
          Tiga potongan kenangan kecil ini kusimpan rapi, seperti caramu menyimpan tempat khusus di hatiku. eakkk🌷
        </p>

        <button
          @click="lanjut"
          :class="[
            'mt-4 w-fit rounded-2xl bg-gradient-to-r px-12 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl',
            accentGradient,
          ]"
        >
          Lanjut yok PENDEK
        </button>
      </div>

      <!-- Kanan: tiga kartu foto gaya polaroid dengan border imut, bisa diklik -->
      <div class="hidden justify-self-end lg:flex">
        <div class="relative flex h-96 w-96 items-center justify-center">

          <!-- Foto 1: sedikit miring ke kiri, paling belakang -->
          <button
            type="button"
            @click="openImage(muti, 'Kenangan 1')"
            class="polaroid-cute absolute left-0 top-0 z-10 -rotate-6 bg-white p-3 shadow-2xl focus:outline-none"
          >
            <img
              :src="muti"
              alt="Kenangan 1"
              class="h-36 w-36 rounded-xl object-cover"
            />
          </button>

          <!-- Foto 2: sedikit miring ke kanan, tengah -->
          <button
            type="button"
            @click="openImage(muti2, 'Kenangan 2')"
            class="polaroid-cute absolute right-0 bottom-0 z-20 rotate-6 bg-white p-3 shadow-2xl focus:outline-none"
          >
            <img
              :src="muti2"
              alt="Kenangan 2"
              class="h-36 w-36 rounded-xl object-cover"
            />
            <span class="absolute -right-3 -top-3 text-2xl drop-shadow">💜</span>
          </button>

          <!-- Foto 3: paling depan, sedikit miring -->
          <button
            type="button"
            @click="openImage(muti3, 'Kenangan 3')"
            class="polaroid-cute absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-white p-3 shadow-2xl focus:outline-none"
          >
            <img
              :src="muti3"
              alt="Kenangan 3"
              class="h-36 w-36 rounded-xl object-cover"
            />
            <span class="absolute -left-3 -top-3 text-2xl drop-shadow">✨</span>
          </button>

        </div>
      </div>

    </div>

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
@keyframes page6SlideIn {
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.page6-enter {
  animation: page6SlideIn 0.7s ease-out both;
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

/* Border imut ala polaroid: putih tebal + dashed lavender di dalamnya (tidak diubah) */
.polaroid-cute {
  border-radius: 1rem;
  border: 4px dashed #ddd6fe; /* setara violet-200 */
  transition: transform 0.3s ease;
}

.polaroid-cute:hover {
  transform: scale(1.05) rotate(0deg) !important;
  z-index: 40;
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
