"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var HabitGrid_vue_1 = require("./HabitGrid.vue");
var props = defineProps();
var historySafe = (0, vue_1.computed)(function () { return props.habit.history || {}; });
var emit = defineEmits();
function toggleDone() {
    emit('toggle-done', props.habit.id);
}
function toggleDay(date) {
    emit('toggle-day', date);
}
function deleteHabit() {
    emit('delete-habit', props.habit.id);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "habit-item" }));
/** @type {[typeof HabitGrid, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(HabitGrid_vue_1.default, new HabitGrid_vue_1.default(__assign(__assign(__assign({ 'onToggle': {} }, { 'onToggleToday': {} }), { 'onDeleteHabit': {} }), { history: (__VLS_ctx.historySafe), habitId: (__VLS_ctx.habit.id), habitName: (__VLS_ctx.habit.name), habitDone: (__VLS_ctx.habit.doneToday) })));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([__assign(__assign(__assign({ 'onToggle': {} }, { 'onToggleToday': {} }), { 'onDeleteHabit': {} }), { history: (__VLS_ctx.historySafe), habitId: (__VLS_ctx.habit.id), habitName: (__VLS_ctx.habit.name), habitDone: (__VLS_ctx.habit.doneToday) })], __VLS_functionalComponentArgsRest(__VLS_0), false));
var __VLS_3;
var __VLS_4;
var __VLS_5;
var __VLS_6 = {
    onToggle: (__VLS_ctx.toggleDay)
};
var __VLS_7 = {
    onToggleToday: (__VLS_ctx.toggleDone)
};
var __VLS_8 = {
    onDeleteHabit: (__VLS_ctx.deleteHabit)
};
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['habit-item']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            HabitGrid: HabitGrid_vue_1.default,
            historySafe: historySafe,
            toggleDone: toggleDone,
            toggleDay: toggleDay,
            deleteHabit: deleteHabit,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
