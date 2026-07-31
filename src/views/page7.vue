<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import muti1 from '@/assets/mutiku1.jpg'

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
  router.push('/page8')
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

// ---- Foto: tanpa border sebelum dipencet, border muncul saat fullscreen ----
const isImageOpen = ref(false)

function openImage() {
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
    <span class="floaty pointer-events-none absolute left-[10%] top-[14%] text-3xl opacity-70">🧡</span>
    <span class="floaty pointer-events-none absolute right-[12%] top-[10%] text-2xl opacity-60" style="animation-delay: 0.5s">🕊️</span>
    <span class="floaty pointer-events-none absolute left-[8%] bottom-[16%] text-2xl opacity-60" style="animation-delay: 1s">🍑</span>
    <span class="floaty pointer-events-none absolute right-[16%] bottom-[10%] text-3xl opacity-70" style="animation-delay: 1.5s">✨</span>

    <div class="page7-enter relative grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">

      <!-- Kiri: foto muti1, tanpa border sebelum diklik -->
      <div class="order-2 flex justify-center lg:order-1 lg:justify-self-start">
        <button
          type="button"
          @click="openImage"
          class="glow-cute group relative h-80 w-80 overflow-hidden rounded-3xl transition duration-300 hover:scale-[1.03] focus:outline-none"
        >
          <img :src="muti1" alt="Kenangan hangat" class="h-full w-full object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-80 transition group-hover:opacity-60"
          ></div>
          <span class="absolute right-4 top-4 text-2xl drop-shadow-lg">🧡</span>
          <span
            class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium tracking-wide text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100"
          >
            🔍 Sentuh untuk memperbesar
          </span>
        </button>
      </div>

      <!-- Kanan: teks besar (rata kanan), tombol lanjut ikut ke kanan -->
      <div class="order-1 flex flex-col items-end gap-5 text-right lg:order-2">
        <span
          :class="[
            'rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-widest backdrop-blur',
            'bg-clip-text text-transparent bg-gradient-to-r',
            accentGradient,
          ]"
        >
          🌅 Hangat Seperti Senja
        </span>

        <h1 class="text-6xl font-bold leading-tight lg:text-7xl">
          Pulang ke
          <span :class="['block bg-gradient-to-r bg-clip-text text-transparent', accentGradient]">
            Tempat Ternyaman
          </span>
        </h1>

        <p class="max-w-md text-lg text-white/80">
          Kamu tuh pendek, tapi untungnya rasa sayangku tinggi. Jadi masih cukup buat nutupin selisih tinggi kita.🌇
        </p>

        <!-- Kartu kutipan kecil, glass premium -->
        <div class="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-6 text-right shadow-2xl backdrop-blur-md">
          <p class="text-xs uppercase tracking-widest text-white/50">Sepenggal rasa</p>
          <p class="mt-2 text-lg font-semibold">
            "Rumah bukan tempat, tapi rasa nyaman yang kamu bawa." 🧡
          </p>
        </div>

        <button
          @click="lanjut"
          :class="[
            'mt-4 w-fit self-end rounded-2xl bg-gradient-to-r px-12 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl',
            accentGradient,
          ]"
        >
          Lanjut yok PENDEK
        </button>
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
            :src="muti1"
            alt="Kenangan hangat diperbesar"
            class="max-h-[80vh] max-w-[90vw] rounded-3xl border-4 border-white/40 object-contain shadow-2xl"
          />
          <p class="text-sm text-white/70">💞 Terima kasih sudah menyimpan momen ini</p>
        </div>
      </div>
    </Transition>

  </div>
</template>
<style scoped>
@keyframes page7SlideIn {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.page7-enter {
  animation: page7SlideIn 0.7s ease-out both;
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

/* Aksen glow lembut di sekeliling foto */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 25px 0 rgba(253, 186, 116, 0.35);
  }
  50% {
    box-shadow: 0 0 45px 8px rgba(253, 186, 116, 0.5);
  }
}

.glow-cute {
  animation: glowPulse 3s ease-in-out infinite;
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
