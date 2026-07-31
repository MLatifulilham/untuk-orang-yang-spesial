<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
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

const isOpening = ref(false)
const envelopeGone = ref(false)

let navigateTimer: ReturnType<typeof setTimeout> | null = null
let goneTimer: ReturnType<typeof setTimeout> | null = null

function openEnvelope() {
  if (isOpening.value) return // cegah klik berkali-kali
  isOpening.value = true

  // Amplop menghilang sepenuhnya setelah surat selesai keluar
  goneTimer = setTimeout(() => {
    envelopeGone.value = true
  }, 2000)

  // Setelah seluruh animasi eksklusif selesai (~10 detik), arahkan ke Page2
  navigateTimer = setTimeout(() => {
    router.push('/page2')
  }, 10000)
}

onUnmounted(() => {
  if (navigateTimer) clearTimeout(navigateTimer)
  if (goneTimer) clearTimeout(goneTimer)
})

// Ledakan hati saat amplop pertama kali terbuka (radial burst, cepat)
const burstHearts = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * 360
  const distance = 140 + Math.random() * 160
  return {
    id: i,
    symbol: ['💗', '💕', '❤️', '💖'][i % 4],
    x: Math.cos((angle * Math.PI) / 180) * distance,
    y: Math.sin((angle * Math.PI) / 180) * distance,
    delay: `${Math.random() * 0.3}s`,
  }
})

// Hujan hati yang terus muncul selama animasi berjalan
const rainHearts = Array.from({ length: 36 }, (_, i) => {
  const symbols = ['💗', '💕', '❤️', '💖', '💘', '💞']
  return {
    id: i,
    symbol: symbols[i % symbols.length],
    left: `${Math.random() * 96}%`,
    size: `${1 + Math.random() * 1.6}rem`,
    duration: `${3 + Math.random() * 3}s`,
    delay: `${Math.random() * 9}s`,
  }
})

// ---- 5 kembang api: roket meluncur (dengan ekor) -> meledak -> kalimat muncul 3x lebih besar ----
interface FireworkParticle {
  x: number
  y: number
}

interface Firework {
  id: number
  text: string
  left: string
  top: string
  launchDelay: string
  burstDelay: string
  textDelay: string
  particles: FireworkParticle[]
}

const fireworkSentences = [
  'Pendek jangan lupa makan ❤️',
  'Cepet gede yah pendek ✨',
  'wleeee💕',
  'Kapan aku dapet sapi💖',
  'I Love You muach🌹',
]

const fireworkPositions = [
  { left: '28%', top: '22%' },
  { left: '78%', top: '18%' },
  { left: '50%', top: '48%' },
  { left: '25%', top: '68%' },
  { left: '75%', top: '65%' },
]

const LAUNCH_DURATION = 1.0 // detik, lama roket meluncur sebelum meledak

function makeParticles(count: number): FireworkParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360 + Math.random() * 10
    const distance = 70 + Math.random() * 50
    return {
      x: Math.cos((angle * Math.PI) / 180) * distance,
      y: Math.sin((angle * Math.PI) / 180) * distance,
    }
  })
}

// Ledakan pertama dimulai setelah amplop benar-benar hilang,
// lalu berjalan bergantian tiap 1.4 detik (sedikit lebih lega karena roket kini lebih terlihat)
const fireworks: Firework[] = fireworkSentences.map((text, i) => {
  const burstStart = 3.2 + i * 1.4
  const launchStart = burstStart - LAUNCH_DURATION
  return {
    id: i,
    text,
    left: fireworkPositions[i].left,
    top: fireworkPositions[i].top,
    launchDelay: `${launchStart}s`,
    burstDelay: `${burstStart}s`,
    textDelay: `${burstStart + 0.25}s`,
    particles: makeParticles(14),
  }
})
</script>

<template>
  <section
    :class="[
      'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br px-6 py-16 text-white',
      bgGradient,
    ]"
  >
    <!-- Glow latar yang menyala saat amplop dibuka -->
    <div
      class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-[3000ms]"
      :class="isOpening ? 'opacity-100' : 'opacity-0'"
    >
      <div :class="['glow-pulse absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-30 blur-3xl', accentGradient]" />
    </div>

    <!-- Hujan hati -->
    <div v-if="isOpening" class="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <span
        v-for="h in rainHearts"
        :key="h.id"
        class="rain-heart absolute bottom-0 select-none opacity-0"
        :style="{
          left: h.left,
          fontSize: h.size,
          animationDuration: h.duration,
          animationDelay: h.delay,
        }"
      >
        {{ h.symbol }}
      </span>
    </div>

    <!-- 5 kembang api: roket besar berekor -> meledak -> kalimat 3x lebih besar -->
    <div v-if="isOpening" class="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <div
        v-for="fw in fireworks"
        :key="fw.id"
        class="absolute"
        :style="{ left: fw.left, top: fw.top }"
      >
        <!-- Roket yang meluncur naik menuju titik ledakan, dengan ekor cahaya -->
        <div
          class="firework-rocket-wrap absolute left-0 top-0 flex -translate-x-1/2 flex-col items-center"
          :style="{ animationDelay: fw.launchDelay }"
        >
          <span class="firework-rocket-head block rounded-full bg-white" />
          <span class="firework-rocket-trail block" />
        </div>

        <!-- Partikel ledakan -->
        <span
          v-for="(p, pi) in fw.particles"
          :key="pi"
          class="firework-particle absolute left-0 top-0 text-lg"
          :style="{
            '--tx': `${p.x}px`,
            '--ty': `${p.y}px`,
            animationDelay: fw.burstDelay,
          }"
        >
          ✨
        </span>

        <!-- Kalimat romantis, membesar 3x saat muncul -->
        <span
          class="firework-text absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm"
          :style="{ animationDelay: fw.textDelay }"
        >
          {{ fw.text }}
        </span>
      </div>
    </div>

    <div class="relative z-20 flex flex-col items-center">

      <!-- Amplop: bentuk pentagon (flap + front) seperti referensi, menghilang setelah surat keluar -->
      <button
        v-if="!envelopeGone"
        type="button"
        @click="openEnvelope"
        :disabled="isOpening"
        class="envelope-wrapper relative border-0 bg-transparent p-0 transition-all duration-[600ms] ease-in"
        :class="[
          isOpening ? 'cursor-default' : 'cursor-pointer',
          envelopeGone ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'
        ]"
        aria-label="Buka amplop"
      >
        <!-- Ledakan hati saat baru dibuka -->
        <span
          v-for="s in burstHearts"
          :key="s.id"
          v-show="isOpening"
          class="heart-burst pointer-events-none absolute left-1/2 top-1/2 text-2xl"
          :style="{
            '--tx': `${s.x}px`,
            '--ty': `${s.y}px`,
            animationDelay: s.delay,
          }"
        >
          {{ s.symbol }}
        </span>

        <!-- Badan amplop -->
        <div class="envelope-body relative h-56 w-80">

          <div
  :class="[
    'envelope-flap absolute inset-0 z-30 origin-top bg-gradient-to-br transition-transform duration-[800ms] ease-in-out',
    accentGradient,
    isOpening ? 'flap-open' : ''
  ]"
/>

          <!-- Bagian depan amplop: bentuk pentagon (mengikuti referensi) -->
          <div :class="['envelope-front absolute inset-0 z-10 bg-gradient-to-br shadow-2xl', accentGradient]" />

          <!-- Flap amplop: segitiga atas yang terbuka ke belakang -->
          <div
            :class="[
              'envelope-flap absolute inset-0 z-30 origin-top bg-gradient-to-br transition-transform duration-[800ms] ease-in-out',
              accentGradient,
              isOpening ? 'flap-open' : ''
            ]"
          />

          <!-- Segel lilin -->
          <div
            :class="[
              'seal absolute left-1/2 top-1/2 z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br text-xl shadow-lg transition-all duration-700',
              accentGradient,
              isOpening ? 'seal-break' : ''
            ]"
          >
            💌
          </div>
        </div>
      </button>

    </div>
  </section>
</template>

<style scoped>
@keyframes glowPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.25;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15);
    opacity: 0.4;
  }
}

.glow-pulse {
  animation: glowPulse 3.5s ease-in-out infinite;
}


/* Bagian depan amplop: bentuk pentagon (atap runcing di tengah) */
.envelope-front {
  clip-path: polygon(0% 0%, 50% 55%, 100% 0%, 100% 100%, 0% 100%);
  border-radius: 0 0 18px 18px;
}
.envelope-inner{
    position:absolute;
    inset:0;
    z-index:5;

    background:#ffd8e6;

    clip-path:polygon(
        0% 0%,
        50% 55%,
        100% 0%,
        100% 100%,
        0% 100%
    );

    border-radius:0 0 18px 18px;
}
/* Flap atas: segitiga menutup bagian atas amplop */
.envelope-flap {
  clip-path: polygon(0% 0%, 50% 55%, 100% 0%);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);
}

.flap-open {
  transform: rotateX(180deg);
}

/* Segel lilin pecah & memudar saat dibuka */
.seal-break {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}

/* Ledakan hati menyebar dari tengah amplop */
@keyframes heartBurst {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.1);
    opacity: 0;
  }
}

.heart-burst {
  animation: heartBurst 1.8s ease-out forwards;
}

/* Hujan hati naik pelan dari bawah layar sampai hilang di atas */
@keyframes heartRiseUp {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  50% {
    transform: translateY(-50vh) translateX(15px) rotate(15deg);
    opacity: 0.7;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100vh) translateX(-10px) rotate(-10deg);
    opacity: 0;
  }
}

.rain-heart {
  animation-name: heartRiseUp;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

/* Roket meluncur: wrapper bergerak naik, berisi kepala bercahaya + ekor panjang */
.firework-rocket-wrap {
  opacity: 0;
  animation-name: rocketLaunch;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.22, 0.1, 0.36, 1);
  animation-fill-mode: forwards;
}

.firework-rocket-head {
  width: 16px;
  height: 16px;
  box-shadow:
    0 0 16px 6px rgba(255, 255, 255, 0.95),
    0 0 34px 14px rgba(255, 255, 255, 0.5);
}

.firework-rocket-trail {
  width: 6px;
  height: 90px;
  margin-top: 2px;
  border-radius: 6px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
  filter: blur(0.5px);
}

@keyframes rocketLaunch {
  0% {
    transform: translateY(220px) scale(0.7);
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1.15);
    opacity: 0;
  }
}

/* Partikel kembang api menyebar dari titik pusat lalu memudar (dipicu setelah roket sampai) */
@keyframes fireworkParticle {
  0% {
    transform: translate(0, 0) scale(0.4);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(1);
    opacity: 0;
  }
}

.firework-particle {
  opacity: 0;
  animation-name: fireworkParticle;
  animation-duration: 1.1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

/* Kalimat romantis: muncul lalu membesar 3x, tahan sejenak, baru memudar */
@keyframes fireworkTextShow {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(3);
  }
  75% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(3);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -65%) scale(2.6);
  }
}

.firework-text {
  opacity: 0;
  animation-name: fireworkTextShow;
  animation-duration: 1.6s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}
</style>
