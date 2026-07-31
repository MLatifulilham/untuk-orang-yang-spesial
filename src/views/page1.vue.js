/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const theme = localStorage.getItem('theme') || 'blue';
const bgGradient = computed(() => {
    return {
        pink: 'from-rose-900 via-pink-800 to-fuchsia-900',
        rose: 'from-rose-900 via-rose-800 to-pink-900',
        blue: 'from-indigo-900 via-purple-800 to-rose-900',
        black: 'from-gray-900 via-neutral-900 to-black',
    }[theme];
});
const accentGradient = computed(() => {
    return {
        pink: 'from-pink-400 to-rose-400',
        rose: 'from-rose-400 to-pink-400',
        blue: 'from-fuchsia-400 to-pink-400',
        black: 'from-rose-300 to-pink-400',
    }[theme];
});
const isOpening = ref(false);
const envelopeGone = ref(false);
let navigateTimer = null;
let goneTimer = null;
function openEnvelope() {
    if (isOpening.value)
        return; // cegah klik berkali-kali
    isOpening.value = true;
    // Amplop menghilang sepenuhnya setelah surat selesai keluar
    goneTimer = setTimeout(() => {
        envelopeGone.value = true;
    }, 2000);
    // Setelah seluruh animasi eksklusif selesai (~10 detik), arahkan ke Page2
    navigateTimer = setTimeout(() => {
        router.push('/page2');
    }, 10000);
}
onUnmounted(() => {
    if (navigateTimer)
        clearTimeout(navigateTimer);
    if (goneTimer)
        clearTimeout(goneTimer);
});
// Ledakan hati saat amplop pertama kali terbuka (radial burst, cepat)
const burstHearts = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360;
    const distance = 140 + Math.random() * 160;
    return {
        id: i,
        symbol: ['💗', '💕', '❤️', '💖'][i % 4],
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        delay: `${Math.random() * 0.3}s`,
    };
});
// Hujan hati yang terus muncul selama animasi berjalan
const rainHearts = Array.from({ length: 36 }, (_, i) => {
    const symbols = ['💗', '💕', '❤️', '💖', '💘', '💞'];
    return {
        id: i,
        symbol: symbols[i % symbols.length],
        left: `${Math.random() * 96}%`,
        size: `${1 + Math.random() * 1.6}rem`,
        duration: `${3 + Math.random() * 3}s`,
        delay: `${Math.random() * 9}s`,
    };
});
const fireworkSentences = [
    'Pendek jangan lupa makan ❤️',
    'Cepet gede yah pendek ✨',
    'wleeee💕',
    'Kapan aku dapet sapi💖',
    'I Love You muach🌹',
];
const fireworkPositions = [
    { left: '28%', top: '22%' },
    { left: '78%', top: '18%' },
    { left: '50%', top: '48%' },
    { left: '25%', top: '68%' },
    { left: '75%', top: '65%' },
];
const LAUNCH_DURATION = 1.0; // detik, lama roket meluncur sebelum meledak
function makeParticles(count) {
    return Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360 + Math.random() * 10;
        const distance = 70 + Math.random() * 50;
        return {
            x: Math.cos((angle * Math.PI) / 180) * distance,
            y: Math.sin((angle * Math.PI) / 180) * distance,
        };
    });
}
// Ledakan pertama dimulai setelah amplop benar-benar hilang,
// lalu berjalan bergantian tiap 1.4 detik (sedikit lebih lega karena roket kini lebih terlihat)
const fireworks = fireworkSentences.map((text, i) => {
    const burstStart = 3.2 + i * 1.4;
    const launchStart = burstStart - LAUNCH_DURATION;
    return {
        id: i,
        text,
        left: fireworkPositions[i].left,
        top: fireworkPositions[i].top,
        launchDelay: `${launchStart}s`,
        burstDelay: `${burstStart}s`,
        textDelay: `${burstStart + 0.25}s`,
        particles: makeParticles(14),
    };
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: ([
            'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br px-6 py-16 text-white',
            __VLS_ctx.bgGradient,
        ]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pointer-events-none absolute inset-0 z-0 transition-opacity duration-[3000ms]" },
    ...{ class: (__VLS_ctx.isOpening ? 'opacity-100' : 'opacity-0') },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: (['glow-pulse absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-30 blur-3xl', __VLS_ctx.accentGradient]) },
});
if (__VLS_ctx.isOpening) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pointer-events-none absolute inset-0 z-10 overflow-hidden" },
    });
    for (const [h] of __VLS_getVForSourceType((__VLS_ctx.rainHearts))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (h.id),
            ...{ class: "rain-heart absolute bottom-0 select-none opacity-0" },
            ...{ style: ({
                    left: h.left,
                    fontSize: h.size,
                    animationDuration: h.duration,
                    animationDelay: h.delay,
                }) },
        });
        (h.symbol);
    }
}
if (__VLS_ctx.isOpening) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pointer-events-none absolute inset-0 z-30 overflow-hidden" },
    });
    for (const [fw] of __VLS_getVForSourceType((__VLS_ctx.fireworks))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (fw.id),
            ...{ class: "absolute" },
            ...{ style: ({ left: fw.left, top: fw.top }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "firework-rocket-wrap absolute left-0 top-0 flex -translate-x-1/2 flex-col items-center" },
            ...{ style: ({ animationDelay: fw.launchDelay }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span)({
            ...{ class: "firework-rocket-head block rounded-full bg-white" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span)({
            ...{ class: "firework-rocket-trail block" },
        });
        for (const [p, pi] of __VLS_getVForSourceType((fw.particles))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                key: (pi),
                ...{ class: "firework-particle absolute left-0 top-0 text-lg" },
                ...{ style: ({
                        '--tx': `${p.x}px`,
                        '--ty': `${p.y}px`,
                        animationDelay: fw.burstDelay,
                    }) },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "firework-text absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm" },
            ...{ style: ({ animationDelay: fw.textDelay }) },
        });
        (fw.text);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative z-20 flex flex-col items-center" },
});
if (!__VLS_ctx.envelopeGone) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.openEnvelope) },
        type: "button",
        disabled: (__VLS_ctx.isOpening),
        ...{ class: "envelope-wrapper relative border-0 bg-transparent p-0 transition-all duration-[600ms] ease-in" },
        ...{ class: ([
                __VLS_ctx.isOpening ? 'cursor-default' : 'cursor-pointer',
                __VLS_ctx.envelopeGone ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'
            ]) },
        'aria-label': "Buka amplop",
    });
    for (const [s] of __VLS_getVForSourceType((__VLS_ctx.burstHearts))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (s.id),
            ...{ class: "heart-burst pointer-events-none absolute left-1/2 top-1/2 text-2xl" },
            ...{ style: ({
                    '--tx': `${s.x}px`,
                    '--ty': `${s.y}px`,
                    animationDelay: s.delay,
                }) },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isOpening) }, null, null);
        (s.symbol);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "envelope-body relative h-56 w-80" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ class: ([
                'envelope-flap absolute inset-0 z-30 origin-top bg-gradient-to-br transition-transform duration-[800ms] ease-in-out',
                __VLS_ctx.accentGradient,
                __VLS_ctx.isOpening ? 'flap-open' : ''
            ]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ class: (['envelope-front absolute inset-0 z-10 bg-gradient-to-br shadow-2xl', __VLS_ctx.accentGradient]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ class: ([
                'envelope-flap absolute inset-0 z-30 origin-top bg-gradient-to-br transition-transform duration-[800ms] ease-in-out',
                __VLS_ctx.accentGradient,
                __VLS_ctx.isOpening ? 'flap-open' : ''
            ]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ([
                'seal absolute left-1/2 top-1/2 z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br text-xl shadow-lg transition-all duration-700',
                __VLS_ctx.accentGradient,
                __VLS_ctx.isOpening ? 'seal-break' : ''
            ]) },
    });
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-[3000ms]']} */ ;
/** @type {__VLS_StyleScopedClasses['glow-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[60vmax]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[60vmax]']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-30']} */ ;
/** @type {__VLS_StyleScopedClasses['blur-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rain-heart']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['firework-rocket-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['firework-rocket-head']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['firework-rocket-trail']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['firework-particle']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['firework-text']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-max']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/40']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['envelope-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-[600ms]']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in']} */ ;
/** @type {__VLS_StyleScopedClasses['heart-burst']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['envelope-body']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-56']} */ ;
/** @type {__VLS_StyleScopedClasses['w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['envelope-flap']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['origin-top']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-[800ms]']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['envelope-front']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['envelope-flap']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['origin-top']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-[800ms]']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['seal']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['z-40']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-700']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            bgGradient: bgGradient,
            accentGradient: accentGradient,
            isOpening: isOpening,
            envelopeGone: envelopeGone,
            openEnvelope: openEnvelope,
            burstHearts: burstHearts,
            rainHearts: rainHearts,
            fireworks: fireworks,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
