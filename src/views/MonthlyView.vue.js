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
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var STORAGE_KEY = 'habits-tracker-data';
var habits = (0, vue_1.ref)([]);
var currentDate = new Date();
(0, vue_1.onMounted)(function () {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        habits.value = JSON.parse(saved);
    }
    animateCircle(animatedPhysicalPercent, physicalPercent.value);
    animateCircle(animatedMentalPercent, mentalPercent.value);
});
function getLocalDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
var daysInMonth = (0, vue_1.computed)(function () {
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var days = new Date(year, month + 1, 0).getDate();
    var firstDay = new Date(year, month, 1).getDay();
    var offset = firstDay === 0 ? 6 : firstDay - 1;
    var arr = Array(offset).fill(null);
    for (var i = 1; i <= days; i++)
        arr.push(i);
    return arr;
});
function getLevel(day) {
    if (day === null)
        return 'level-0';
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    var dateStr = getLocalDate(date);
    var count = 0;
    habits.value.forEach(function (habit) {
        var _a;
        if ((_a = habit.history) === null || _a === void 0 ? void 0 : _a[dateStr])
            count++;
    });
    if (count === 0)
        return 'level-0';
    var maxHabits = habits.value.length || 1;
    var ratio = count / maxHabits;
    if (count === 0)
        return 'level-0';
    if (count === 1)
        return 'level-1';
    if (count === 2)
        return 'level-2';
    if (count === 3)
        return 'level-3';
    return 'level-4';
}
var physicalPercent = (0, vue_1.computed)(function () {
    var physical = habits.value.filter(function (h) { return h.type === 'physical'; });
    var total = 0, done = 0;
    physical.forEach(function (habit) {
        Object.values(habit.history || {}).forEach(function (val) { total++; if (val)
            done++; });
    });
    return total ? Math.round((done / total) * 100) : 0;
});
var mentalPercent = (0, vue_1.computed)(function () {
    var mental = habits.value.filter(function (h) { return h.type === 'mental'; });
    var total = 0, done = 0;
    mental.forEach(function (habit) {
        Object.values(habit.history || {}).forEach(function (val) { total++; if (val)
            done++; });
    });
    return total ? Math.round((done / total) * 100) : 0;
});
var streak = (0, vue_1.computed)(function () {
    var count = 0;
    var today = getLocalDate(new Date());
    var _loop_1 = function (i) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var key = getLocalDate(d);
        var hasActivity = habits.value.some(function (h) { var _a; return (_a = h.history) === null || _a === void 0 ? void 0 : _a[key]; });
        if (hasActivity)
            count++;
        else
            return "break";
    };
    for (var i = 0; i < 365; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
            break;
    }
    return count;
});
var animatedPhysicalPercent = (0, vue_1.ref)(0);
var animatedMentalPercent = (0, vue_1.ref)(0);
function animateCircle(refValue, target) {
    var start = 0;
    var step = function () {
        start += 1;
        if (start <= target) {
            refValue.value = start;
            requestAnimationFrame(step);
        }
        else {
            refValue.value = target;
        }
    };
    requestAnimationFrame(step);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['day']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-circle']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calendar" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.daysInMonth)); _i < _a.length; _i++) {
    var day = _a[_i][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (day) }, { class: (['day', __VLS_ctx.getLevel(day)]) }));
    (day);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "progress-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "progress-circle" }, { style: ({ '--percent': __VLS_ctx.animatedPhysicalPercent, '--color': '#22c55e' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "percent" }));
(Math.round(__VLS_ctx.animatedPhysicalPercent));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "progress-circle" }, { style: ({ '--percent': __VLS_ctx.animatedMentalPercent, '--color': '#4ade80' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "percent" }));
(Math.round(__VLS_ctx.animatedMentalPercent));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "streak" }));
(__VLS_ctx.streak);
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['calendar']} */ ;
/** @type {__VLS_StyleScopedClasses['day']} */ ;
/** @type {__VLS_StyleScopedClasses['stats']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-row']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['percent']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['percent']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['streak']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            daysInMonth: daysInMonth,
            getLevel: getLevel,
            streak: streak,
            animatedPhysicalPercent: animatedPhysicalPercent,
            animatedMentalPercent: animatedMentalPercent,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
