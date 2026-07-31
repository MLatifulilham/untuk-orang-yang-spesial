/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const themes = [
    { key: 'pink', label: 'Pink', swatch: 'bg-pink-500', ring: 'ring-pink-500', solid: 'bg-pink-700', button: 'bg-pink-500 hover:bg-pink-600', x: '0%', y: '0%' },
    { key: 'rose', label: 'Rose', swatch: 'bg-rose-500', ring: 'ring-rose-500', solid: 'bg-rose-700', button: 'bg-rose-500 hover:bg-rose-600', x: '100%', y: '0%' },
    { key: 'blue', label: 'Biru', swatch: 'bg-blue-500', ring: 'ring-blue-500', solid: 'bg-blue-700', button: 'bg-blue-500 hover:bg-blue-600', x: '0%', y: '100%' },
    { key: 'black', label: 'Hitam', swatch: 'bg-black', ring: 'ring-black', solid: 'bg-gray-900', button: 'bg-gray-800 hover:bg-gray-900', x: '100%', y: '100%' },
];
const selected = ref(localStorage.getItem('theme') || '');
const committedKey = ref(selected.value || 'black');
const pendingKey = ref(null);
const revealActive = ref(false);
const rippleSize = '200vmax';
const committedTheme = computed(() => themes.find((t) => t.key === committedKey.value) ?? themes[3]);
const pendingTheme = computed(() => themes.find((t) => t.key === pendingKey.value));
const buttonColor = computed(() => {
    const t = themes.find((t) => t.key === selected.value);
    return t ? t.button : 'bg-gray-300';
});
function pilihTema(warna) {
    selected.value = warna;
    localStorage.setItem('theme', warna);
    pendingKey.value = warna;
    revealActive.value = true;
}
function onRevealEnd() {
    if (!pendingKey.value)
        return;
    committedKey.value = pendingKey.value;
    pendingKey.value = null;
    revealActive.value = false;
}
function lanjut() {
    router.push('/page1');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid min-h-screen w-full grid-cols-1 bg-gray-50 lg:grid-cols-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative flex flex-col justify-center gap-4 overflow-hidden px-10 py-16 text-white lg:px-20" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: (['absolute inset-0 z-0', __VLS_ctx.committedTheme.solid]) },
});
if (__VLS_ctx.pendingTheme) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ onAnimationend: (__VLS_ctx.onRevealEnd) },
        key: (__VLS_ctx.pendingKey ?? undefined),
        ...{ class: (['ripple-reveal absolute z-10 rounded-full will-change-transform', __VLS_ctx.pendingTheme.solid]) },
        ...{ style: ({
                width: __VLS_ctx.rippleSize,
                height: __VLS_ctx.rippleSize,
                left: __VLS_ctx.pendingTheme.x,
                top: __VLS_ctx.pendingTheme.y
            }) },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ([
            'relative z-20 flex flex-col gap-4 transition-all duration-700 ease-out',
            __VLS_ctx.revealActive ? 'scale-[0.98] opacity-90' : 'scale-100 opacity-100'
        ]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-sm font-medium uppercase tracking-widest text-white/50" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-5xl font-bold leading-tight lg:text-6xl" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "max-w-md text-lg text-white/70" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col items-center justify-center gap-10 bg-gray-50 px-10 py-16 lg:px-20" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid w-full max-w-md grid-cols-2 gap-5" },
});
for (const [t] of __VLS_getVForSourceType((__VLS_ctx.themes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.pilihTema(t.key);
            } },
        key: (t.key),
        ...{ class: ([
                'flex flex-col items-center gap-4 rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg',
                __VLS_ctx.selected === t.key ? `ring-2 ${t.ring}` : 'ring-1 ring-gray-100'
            ]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span)({
        ...{ class: (['h-14 w-14 rounded-full', t.swatch]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-base font-medium text-gray-700" },
    });
    (t.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.lanjut) },
    disabled: (!__VLS_ctx.selected),
    ...{ class: ([
            'w-full max-w-md rounded-xl py-4 text-lg font-semibold text-white shadow-sm transition-colors duration-500',
            __VLS_ctx.buttonColor,
            !__VLS_ctx.selected && 'cursor-not-allowed'
        ]) },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['px-10']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-20']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-0']} */ ;
/** @type {__VLS_StyleScopedClasses['ripple-reveal']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['will-change-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-700']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/70']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['px-10']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-20']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-7']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:-translate-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            themes: themes,
            selected: selected,
            pendingKey: pendingKey,
            revealActive: revealActive,
            rippleSize: rippleSize,
            committedTheme: committedTheme,
            pendingTheme: pendingTheme,
            buttonColor: buttonColor,
            pilihTema: pilihTema,
            onRevealEnd: onRevealEnd,
            lanjut: lanjut,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
