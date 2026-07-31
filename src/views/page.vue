<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const themes = [
  { key: 'pink', label: 'Pink', swatch: 'bg-pink-500', ring: 'ring-pink-500', solid: 'bg-pink-700', button: 'bg-pink-500 hover:bg-pink-600', x: '0%', y: '0%' },
  { key: 'rose', label: 'Rose', swatch: 'bg-rose-500', ring: 'ring-rose-500', solid: 'bg-rose-700', button: 'bg-rose-500 hover:bg-rose-600', x: '100%', y: '0%' },
  { key: 'blue', label: 'Biru', swatch: 'bg-blue-500', ring: 'ring-blue-500', solid: 'bg-blue-700', button: 'bg-blue-500 hover:bg-blue-600', x: '0%', y: '100%' },
  { key: 'black', label: 'Hitam', swatch: 'bg-black', ring: 'ring-black', solid: 'bg-gray-900', button: 'bg-gray-800 hover:bg-gray-900', x: '100%', y: '100%' },
]

const selected = ref(localStorage.getItem('theme') || '')
const committedKey = ref(selected.value || 'black')
const pendingKey = ref<string | null>(null)
const revealActive = ref(false)
const rippleSize = '200vmax'

const committedTheme = computed(() =>
  themes.find((t) => t.key === committedKey.value) ?? themes[3]
)
const pendingTheme = computed(() =>
  themes.find((t) => t.key === pendingKey.value)
)

const buttonColor = computed(() => {
  const t = themes.find((t) => t.key === selected.value)
  return t ? t.button : 'bg-gray-300'
})

function pilihTema(warna: string) {
  selected.value = warna
  localStorage.setItem('theme', warna)

  pendingKey.value = warna
  revealActive.value = true
}

function onRevealEnd() {
  if (!pendingKey.value) return
  committedKey.value = pendingKey.value
  pendingKey.value = null
  revealActive.value = false
}

function lanjut() {
  router.push('/page1')
}
</script>

<template>
  <div class="grid min-h-screen w-full grid-cols-1 bg-gray-50 lg:grid-cols-2">

    <div class="relative flex flex-col justify-center gap-4 overflow-hidden px-10 py-16 text-white lg:px-20">

      <div :class="['absolute inset-0 z-0', committedTheme.solid]" />

      <div
        v-if="pendingTheme"
        :key="pendingKey"
        @animationend="onRevealEnd"
        :class="['ripple-reveal absolute z-10 rounded-full will-change-transform', pendingTheme.solid]"
        :style="{
          width: rippleSize,
          height: rippleSize,
          left: pendingTheme.x,
          top: pendingTheme.y
        }"
      />

      <div
        :class="[
          'relative z-20 flex flex-col gap-4 transition-all duration-700 ease-out',
          revealActive ? 'scale-[0.98] opacity-90' : 'scale-100 opacity-100'
        ]"
      >
        <span class="text-sm font-medium uppercase tracking-widest text-white/50">
          Langkah 1 dari 8
        </span>

        <h1 class="text-5xl font-bold leading-tight lg:text-6xl">
          Pilih Tema
          <br />
          Favoritmu
        </h1>

        <p class="max-w-md text-lg text-white/70">
          Warna yang kamu pilih di sini akan diterapkan ke seluruh halaman berikutnya.
          Kamu bisa menggantinya kapan saja.
        </p>
      </div>

    </div>

    <div class="flex flex-col items-center justify-center gap-10 bg-gray-50 px-10 py-16 lg:px-20">

      <div class="grid w-full max-w-md grid-cols-2 gap-5">
        <button
          v-for="t in themes"
          :key="t.key"
          @click="pilihTema(t.key)"
          :class="[
            'flex flex-col items-center gap-4 rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg',
            selected === t.key ? `ring-2 ${t.ring}` : 'ring-1 ring-gray-100'
          ]"
        >
          <span :class="['h-14 w-14 rounded-full', t.swatch]" />
          <span class="text-base font-medium text-gray-700">{{ t.label }}</span>
        </button>
      </div>

      <button
        @click="lanjut"
        :disabled="!selected"
        :class="[
          'w-full max-w-md rounded-xl py-4 text-lg font-semibold text-white shadow-sm transition-colors duration-500',
          buttonColor,
          !selected && 'cursor-not-allowed'
        ]"
      >
        Lanjut →
      </button>

    </div>

  </div>
</template>

<style scoped>
.ripple-reveal {
  animation: rippleReveal 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes rippleReveal {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.9;
    filter: blur(30px);
  }
  40% {
    opacity: 1;
    filter: blur(15px);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    filter: blur(0);
  }
}
</style>
