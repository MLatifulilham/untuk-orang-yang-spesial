/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, ref } from 'vue';
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
function lanjut() {
    router.push('/page4');
}
// ---- Hati jatuh di background ----
const HEART_EMOJIS = ['❤️', '💗', '💕', '💖'];
const fallingHearts = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // posisi horizontal (%)
    delay: Math.random() * 8, // detik
    duration: 7 + Math.random() * 7, // detik
    size: 14 + Math.random() * 18, // px
    drift: (Math.random() - 0.5) * 60, // px, goyangan horizontal
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
}));
// ---- Tombol yang menghindar, gerakannya kecil dan tetap di dalam kotak ----
const dodgeZoneRef = ref(null);
const dodgeButtonRef = ref(null);
const dodgeX = ref(0);
const dodgeY = ref(0);
const TRIGGER_DISTANCE = 110; // jarak (px) yang memicu tombol menjauh
const SAFE_DISTANCE = 130; // jarak minimal aman dari kursor untuk posisi baru
const SAMPLE_ATTEMPTS = 30; // jumlah percobaan cari posisi valid
function relocateButton(cursorX, cursorY) {
    const zone = dodgeZoneRef.value;
    const btn = dodgeButtonRef.value;
    if (!zone || !btn)
        return;
    const zoneRect = zone.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const maxX = Math.max(0, zoneRect.width - btnRect.width);
    const maxY = Math.max(0, zoneRect.height - btnRect.height);
    let bestCandidate = null;
    let bestMoveDist = Infinity;
    // cari posisi acak di dalam kotak yang cukup jauh dari kursor,
    // lalu pilih yang PALING DEKAT dari posisi sekarang (gerakan minimal)
    for (let i = 0; i < SAMPLE_ATTEMPTS; i++) {
        const candX = Math.random() * maxX;
        const candY = Math.random() * maxY;
        const candCenterX = zoneRect.left + candX + btnRect.width / 2;
        const candCenterY = zoneRect.top + candY + btnRect.height / 2;
        const distFromCursor = Math.hypot(cursorX - candCenterX, cursorY - candCenterY);
        if (distFromCursor >= SAFE_DISTANCE) {
            const moveDist = Math.hypot(candX - dodgeX.value, candY - dodgeY.value);
            if (moveDist < bestMoveDist) {
                bestMoveDist = moveDist;
                bestCandidate = { x: candX, y: candY };
            }
        }
    }
    // fallback kalau tidak ada kandidat yang cukup aman (kotak terlalu kecil dari radius aman)
    if (!bestCandidate) {
        bestCandidate = { x: maxX - dodgeX.value > maxX / 2 ? maxX : 0, y: maxY - dodgeY.value > maxY / 2 ? maxY : 0 };
    }
    dodgeX.value = bestCandidate.x;
    dodgeY.value = bestCandidate.y;
}
function onZoneMouseMove(e) {
    const btn = dodgeButtonRef.value;
    if (!btn)
        return;
    const btnRect = btn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    if (distance < TRIGGER_DISTANCE) {
        relocateButton(e.clientX, e.clientY);
    }
}
function onButtonMouseEnter(e) {
    relocateButton(e.clientX, e.clientY);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: ([
            'relative min-h-screen w-full overflow-hidden bg-gradient-to-br px-6 py-16 text-white',
            __VLS_ctx.bgGradient,
        ]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pointer-events-none absolute inset-0 overflow-hidden" },
});
for (const [h] of __VLS_getVForSourceType((__VLS_ctx.fallingHearts))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        key: (h.id),
        ...{ class: "falling-heart absolute top-[-10%]" },
        ...{ style: ({
                left: h.left + '%',
                fontSize: h.size + 'px',
                animationDelay: h.delay + 's',
                animationDuration: h.duration + 's',
                '--drift': h.drift + 'px',
            }) },
    });
    (h.emoji);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "floaty pointer-events-none absolute left-[8%] top-[12%] text-3xl opacity-70" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "floaty pointer-events-none absolute right-[10%] top-[20%] text-2xl opacity-60" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "floaty pointer-events-none absolute left-[15%] bottom-[15%] text-2xl opacity-60" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "floaty pointer-events-none absolute right-[18%] bottom-[10%] text-3xl opacity-70" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page3-enter relative mx-auto flex max-w-4xl flex-col items-center text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: ([
            'rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur',
            'bg-clip-text text-transparent bg-gradient-to-r',
            __VLS_ctx.accentGradient,
        ]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "mt-6 text-5xl font-extrabold leading-tight lg:text-6xl" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: (['bg-gradient-to-r bg-clip-text text-transparent', __VLS_ctx.accentGradient]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mx-auto mt-5 max-w-xl text-lg text-white/80" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-md" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm uppercase tracking-widest text-white/50" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mt-3 text-xl font-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-10 flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.lanjut) },
    ...{ class: ([
            'w-fit shrink-0 self-center rounded-2xl bg-gradient-to-r px-8 py-1 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl sm:self-auto',
            __VLS_ctx.accentGradient,
        ]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "w-full max-w-md p-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMousemove: (__VLS_ctx.onZoneMouseMove) },
    ref: "dodgeZoneRef",
    ...{ class: "relative h-28 w-full overflow-hidden" },
});
/** @type {typeof __VLS_ctx.dodgeZoneRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onMouseenter: (__VLS_ctx.onButtonMouseEnter) },
    ref: "dodgeButtonRef",
    ...{ style: ({ transform: `translate(${__VLS_ctx.dodgeX}px, ${__VLS_ctx.dodgeY}px)` }) },
    ...{ class: ([
            'absolute left-0 top-0 select-none rounded-lg bg-gradient-to-r px-4 py-1 text-sm font-semibold text-white transition-transform duration-400 ease-out',
            __VLS_ctx.accentGradient,
        ]) },
});
/** @type {typeof __VLS_ctx.dodgeButtonRef} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['falling-heart']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[-10%]']} */ ;
/** @type {__VLS_StyleScopedClasses['floaty']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-[8%]']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[12%]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['floaty']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-[10%]']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[20%]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['floaty']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-[15%]']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-[15%]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['floaty']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-[18%]']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-[10%]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['page3-enter']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-clip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['text-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-clip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['text-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/15']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/5']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['w-fit']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['self-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:self-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-28']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-400']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            bgGradient: bgGradient,
            accentGradient: accentGradient,
            lanjut: lanjut,
            fallingHearts: fallingHearts,
            dodgeZoneRef: dodgeZoneRef,
            dodgeButtonRef: dodgeButtonRef,
            dodgeX: dodgeX,
            dodgeY: dodgeY,
            onZoneMouseMove: onZoneMouseMove,
            onButtonMouseEnter: onButtonMouseEnter,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
