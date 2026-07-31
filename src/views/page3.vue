<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

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
  router.push('/page4')
}

// ---- Hati jatuh di background ----
const HEART_EMOJIS = ['❤️', '💗', '💕', '💖']
const fallingHearts = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100, // posisi horizontal (%)
  delay: Math.random() * 8, // detik
  duration: 7 + Math.random() * 7, // detik
  size: 14 + Math.random() * 18, // px
  drift: (Math.random() - 0.5) * 60, // px, goyangan horizontal
  emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
}))

// ---- Tombol yang menghindar, gerakannya kecil dan tetap di dalam kotak ----
const dodgeZoneRef = ref<HTMLElement | null>(null)
const dodgeButtonRef = ref<HTMLElement | null>(null)
const dodgeX = ref(0)
const dodgeY = ref(0)

const TRIGGER_DISTANCE = 110 // jarak (px) yang memicu tombol menjauh
const SAFE_DISTANCE = 130 // jarak minimal aman dari kursor untuk posisi baru
const SAMPLE_ATTEMPTS = 30 // jumlah percobaan cari posisi valid

function relocateButton(cursorX: number, cursorY: number) {
  const zone = dodgeZoneRef.value
  const btn = dodgeButtonRef.value
  if (!zone || !btn) return

  const zoneRect = zone.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()

  const maxX = Math.max(0, zoneRect.width - btnRect.width)
  const maxY = Math.max(0, zoneRect.height - btnRect.height)

  let bestCandidate: { x: number; y: number } | null = null
  let bestMoveDist = Infinity

  // cari posisi acak di dalam kotak yang cukup jauh dari kursor,
  // lalu pilih yang PALING DEKAT dari posisi sekarang (gerakan minimal)
  for (let i = 0; i < SAMPLE_ATTEMPTS; i++) {
    const candX = Math.random() * maxX
    const candY = Math.random() * maxY

    const candCenterX = zoneRect.left + candX + btnRect.width / 2
    const candCenterY = zoneRect.top + candY + btnRect.height / 2
    const distFromCursor = Math.hypot(cursorX - candCenterX, cursorY - candCenterY)

    if (distFromCursor >= SAFE_DISTANCE) {
      const moveDist = Math.hypot(candX - dodgeX.value, candY - dodgeY.value)
      if (moveDist < bestMoveDist) {
        bestMoveDist = moveDist
        bestCandidate = { x: candX, y: candY }
      }
    }
  }

  // fallback kalau tidak ada kandidat yang cukup aman (kotak terlalu kecil dari radius aman)
  if (!bestCandidate) {
    bestCandidate = { x: maxX - dodgeX.value > maxX / 2 ? maxX : 0, y: maxY - dodgeY.value > maxY / 2 ? maxY : 0 }
  }

  dodgeX.value = bestCandidate.x
  dodgeY.value = bestCandidate.y
}

function onZoneMouseMove(e: MouseEvent) {
  const btn = dodgeButtonRef.value
  if (!btn) return

  const btnRect = btn.getBoundingClientRect()
  const btnCenterX = btnRect.left + btnRect.width / 2
  const btnCenterY = btnRect.top + btnRect.height / 2

  const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY)

  if (distance < TRIGGER_DISTANCE) {
    relocateButton(e.clientX, e.clientY)
  }
}

function onButtonMouseEnter(e: MouseEvent) {
  relocateButton(e.clientX, e.clientY)
}
</script>

<template>
  <section
    :class="[
      'relative min-h-screen w-full overflow-hidden bg-gradient-to-br px-6 py-16 text-white',
      bgGradient,
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
    <span class="floaty pointer-events-none absolute left-[8%] top-[12%] text-3xl opacity-70">💕</span>
    <span class="floaty pointer-events-none absolute right-[10%] top-[20%] text-2xl opacity-60" style="animation-delay: 0.6s">✨</span>
    <span class="floaty pointer-events-none absolute left-[15%] bottom-[15%] text-2xl opacity-60" style="animation-delay: 1.1s">🌸</span>
    <span class="floaty pointer-events-none absolute right-[18%] bottom-[10%] text-3xl opacity-70" style="animation-delay: 1.6s">💫</span>

    <div class="page3-enter relative mx-auto flex max-w-4xl flex-col items-center text-center">

      <!-- Badge -->
      <span
        :class="[
          'rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur',
          'bg-clip-text text-transparent bg-gradient-to-r',
          accentGradient,
        ]"
      >
        💌 Untuk Muti yang Spesial
      </span>

      <!-- Judul -->
      <h1 class="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
        Setiap Detik
        <span :class="['bg-gradient-to-r bg-clip-text text-transparent', accentGradient]">
          Bersama Muti
        </span>
        Berharga
      </h1>

      <p class="mx-auto mt-5 max-w-xl text-lg text-white/80">
        Kalau suatu hari nanti kita lelah, semoga kita tidak memilih untuk menyerah, melainkan memilih untuk saling menguatkan. Karena bagiku, rumah bukanlah sebuah tempat, melainkan seseorang. Dan rumah itu adalah kamu. 🌷
      </p>

      <!-- Kartu premium: pesan singkat -->
      <div class="mt-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        <p class="text-sm uppercase tracking-widest text-white/50">Sebuah pesan kecil</p>
        <p class="mt-3 text-xl font-semibold">
          "Kamu sayang aku gak." 🥰
        </p>
      </div>

      <!-- Dua tombol sejajar: Lanjutkan & Area tombol kabur -->
<!-- Dua tombol sejajar -->
<div class="mt-10 flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch">
  <button
    @click="lanjut"
    :class="[
      'w-fit shrink-0 self-center rounded-2xl bg-gradient-to-r px-8 py-1 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl sm:self-auto',
      accentGradient,
    ]"
  >
    sayang bangetttt😊
  </button>

  <!-- Area tombol kabur TANPA BORDER -->
  <div class="w-full max-w-md p-4">
    <div
      ref="dodgeZoneRef"
      @mousemove="onZoneMouseMove"
      class="relative h-28 w-full overflow-hidden"
    >
      <button
        ref="dodgeButtonRef"
        @mouseenter="onButtonMouseEnter"
        :style="{ transform: `translate(${dodgeX}px, ${dodgeY}px)` }"
        :class="[
          'absolute left-0 top-0 select-none rounded-lg bg-gradient-to-r px-4 py-1 text-sm font-semibold text-white transition-transform duration-400 ease-out',
          accentGradient,
        ]"
      >
        Engga sayang hmph😾
      </button>
    </div>
  </div>
</div>

    </div>
  </section>
</template>

<style scoped>
@keyframes page3SlideIn {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.page3-enter {
  animation: page3SlideIn 0.7s ease-out both;
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
</style>
