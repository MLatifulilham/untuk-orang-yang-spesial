<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import muti4 from '@/assets/muti4.jpg'

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
  router.push('/page5')
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

// ---- Foto: buka fullscreen tanpa border sebelum dipencet, border muncul saat dibuka ----
const isImageOpen = ref(false)

function openImage() {
  isImageOpen.value = true
}

function closeImage() {
  isImageOpen.value = false
}
</script>

<template>
  <div :class="[
    'relative overflow-hidden bg-gradient-to-br',
    bgGradient,
    'flex min-h-screen w-full items-center justify-center px-10 py-16 text-white'
  ]">
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
    <span class="floaty pointer-events-none absolute left-[8%] top-[14%] text-3xl opacity-70">💕</span>
    <span class="floaty pointer-events-none absolute right-[10%] top-[18%] text-2xl opacity-60" style="animation-delay: 0.6s">✨</span>
    <span class="floaty pointer-events-none absolute left-[14%] bottom-[16%] text-2xl opacity-60" style="animation-delay: 1.1s">🌸</span>
    <span class="floaty pointer-events-none absolute right-[16%] bottom-[12%] text-3xl opacity-70" style="animation-delay: 1.6s">💫</span>

    <div class="page4-enter relative grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">

      <!-- Kiri: teks besar (rata kiri) -->
      <div class="flex flex-col items-start gap-5 text-left">
        <span
          :class="[
            'rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur',
            'bg-clip-text text-transparent bg-gradient-to-r',
            accentGradient,
          ]"
        >
          📸 Kenangan Kita
        </span>

        <h1 class="text-6xl font-bold leading-tight lg:text-7xl">
          Setiap
          <span :class="['bg-gradient-to-r bg-clip-text text-transparent', accentGradient]">
            Momen
          </span>
          Berarti
        </h1>

        <p class="max-w-md text-lg text-white/80">
         Di dunia yang begitu luas, aku bersyukur semesta mempertemukanku denganmu. Dari sekian banyak orang, kamu adalah alasan mengapa aku percaya bahwa ketulusan itu nyata.🌷
        </p>

        <!-- Kartu kutipan kecil -->
        <div class="mt-2 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-md">
          <p class="text-sm uppercase tracking-widest text-white/50">Sebuah kutipan</p>
          <p class="mt-2 text-lg font-semibold">
            "Di antara semua momen, bersamamu selalu jadi favoritku." 🥰
          </p>
        </div>

        <button
          @click="lanjut"
          :class="[
            'mt-4 w-fit rounded-2xl bg-gradient-to-r px-12 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl',
            accentGradient,
          ]"
        >
          Lanjut yok sayang
        </button>
      </div>

      <!-- Kanan: foto tanpa border, klik untuk membuka fullscreen dengan border -->
      <div class="flex justify-center lg:justify-self-end">
        <button
          type="button"
          @click="openImage"
          class="group relative h-80 w-80 overflow-hidden rounded-3xl transition duration-300 hover:scale-[1.03] focus:outline-none"
        >
          <img :src="muti4" alt="Gambar kenangan" class="h-full w-full object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-80 transition group-hover:opacity-60"
          ></div>
          <span
            class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium tracking-wide text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100"
          >
            🔍 Sentuh untuk memperbesar
          </span>
        </button>
      </div>

    </div>

    <!-- Modal fullscreen: border muncul saat gambar ditampilkan -->
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
            :src="muti4"
            alt="Gambar kenangan diperbesar"
            :class="[
              'max-h-[80vh] max-w-[90vw] rounded-3xl border-4 object-contain shadow-2xl',
              'border-white/40',
            ]"
          />
          <p class="text-sm text-white/70">💞 Terima kasih sudah menyimpan momen ini</p>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
@keyframes page4SlideIn {
  from {
    opacity: 0;
    transform: translateX(60px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.page4-enter {
  animation: page4SlideIn 0.7s ease-out both;
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
