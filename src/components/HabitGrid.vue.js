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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var props = defineProps();
var emit = defineEmits();
function getLast7Days() {
    var days = [];
    var today = new Date();
    for (var i = 6; i >= 0; i--) {
        var d = new Date();
        d.setDate(today.getDate() - i);
        days.push(d.toLocaleDateString('en-CA'));
    }
    return days;
}
var days = (0, vue_1.computed)(function () { return getLast7Days(); });
function getLevel(value) {
    return value ? 'level-3' : 'level-0';
}
function formatDate(date) {
    var d = new Date(date);
    var day = String(d.getDate()).padStart(2, '0');
    var month = String(d.getMonth() + 1).padStart(2, '0');
    return "".concat(day, ".").concat(month);
}
function getDayLetter(date) {
    var d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
}
function handleClick(day) {
    var _a;
    var current = (_a = props.history[day]) !== null && _a !== void 0 ? _a : false;
    emit('toggle', day, !current);
}
function toggleToday() {
    emit('toggleToday', props.habitId);
}
var progress = (0, vue_1.computed)(function () {
    var values = days.value.map(function (d) { return props.history[d] ? 1 : 0; });
    var total = values.length;
    var done = values.reduce(function (a, b) { return a + b; }, 0);
    return Math.round((done / total) * 100);
});
var streak = (0, vue_1.computed)(function () {
    var count = 0;
    for (var i = days.value.length - 1; i >= 0; i--) {
        if (props.history[days.value[i]])
            count++;
        else
            break;
    }
    return count;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['done-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['done-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['day-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['day-cell']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "habit-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "habit-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "habit-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "lightning" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.habitName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "habit-actions" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.toggleToday) }, { class: "done-btn" }));
(__VLS_ctx.habitDone ? '✓ Done' : 'Mark Done');
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.$emit('delete-habit', __VLS_ctx.habitId);
    } }, { class: "delete-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "habit-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.progress);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.streak);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "habit-week-grid" }));
var _loop_1 = function (day) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.handleClick(day);
        } }, { key: (day) }), { class: (['day-cell', __VLS_ctx.getLevel((_a = __VLS_ctx.history[day]) !== null && _a !== void 0 ? _a : false)]) }), { title: ("".concat(__VLS_ctx.formatDate(day), " \u2014 ").concat(__VLS_ctx.history[day] ? 'Done' : 'Not done')) }));
    (__VLS_ctx.getDayLetter(day));
};
for (var _i = 0, _b = __VLS_getVForSourceType((__VLS_ctx.days)); _i < _b.length; _i++) {
    var day = _b[_i][0];
    _loop_1(day);
}
/** @type {__VLS_StyleScopedClasses['habit-card']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-header']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-title']} */ ;
/** @type {__VLS_StyleScopedClasses['lightning']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['done-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-week-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['day-cell']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            days: days,
            getLevel: getLevel,
            formatDate: formatDate,
            getDayLetter: getDayLetter,
            handleClick: handleClick,
            toggleToday: toggleToday,
            progress: progress,
            streak: streak,
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
