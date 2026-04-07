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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var vue_router_1 = require("vue-router");
var defaultHabits_1 = require("@/data/defaultHabits");
var HabitItem_vue_1 = require("@/components/HabitItem.vue");
var uuid_1 = require("uuid");
var vuedraggable_1 = require("vuedraggable");
var generateReportHTML_1 = require("@/utils/generateReportHTML");
var STORAGE_KEY = 'habits-tracker-data';
var newHabitName = (0, vue_1.ref)('');
var newHabitType = (0, vue_1.ref)('physical');
var habits = (0, vue_1.ref)([]);
var activeTab = (0, vue_1.ref)('all');
var currentDate = (0, vue_1.ref)(new Date());
var showModal = (0, vue_1.ref)(false);
var email = (0, vue_1.ref)('');
var message = (0, vue_1.ref)('');
var loading = (0, vue_1.ref)(false);
var router = (0, vue_router_1.useRouter)();
var showDeleteModal = (0, vue_1.ref)(false);
var habitToDelete = (0, vue_1.ref)(null);
function deleteHabit(id) {
    habitToDelete.value = id;
    showDeleteModal.value = true;
}
function confirmDelete() {
    if (!habitToDelete.value)
        return;
    habits.value = habits.value.filter(function (h) { return h.id !== habitToDelete.value; });
    showDeleteModal.value = false;
    habitToDelete.value = null;
}
function cancelDelete() {
    showDeleteModal.value = false;
    habitToDelete.value = null;
}
function openModal() {
    showModal.value = true;
    email.value = '';
    message.value = '';
}
function closeModal() {
    showModal.value = false;
}
function addHabit() {
    var name = newHabitName.value.trim();
    if (!name)
        return;
    var newHabit = {
        id: (0, uuid_1.v4)(),
        name: name,
        type: newHabitType.value,
        icon: 'star',
        doneToday: false,
        history: {}
    };
    habits.value.push(newHabit);
    newHabitName.value = '';
    newHabitType.value = 'physical';
}
function goToMonthly() {
    router.push('/monthly');
}
function getLocalDate(date) {
    return "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, '0'), "-").concat(String(date.getDate()).padStart(2, '0'));
}
(0, vue_1.onMounted)(function () {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            habits.value = JSON.parse(saved);
        }
        catch (_a) {
            habits.value = defaultHabits_1.defaultHabits.map(function (h) { return (__assign({}, h)); });
        }
    }
    else {
        habits.value = defaultHabits_1.defaultHabits.map(function (h) { return (__assign({}, h)); });
    }
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape')
            closeModal();
    });
});
(0, vue_1.watch)(habits, function (newVal) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
}, { deep: true });
(0, vue_1.watch)(email, function (v) {
    localStorage.setItem('habits-tracker-email', v);
});
function toggleDone(id) {
    var habit = habits.value.find(function (h) { return h.id === id; });
    if (!habit)
        return;
    var today = getLocalDate(new Date());
    habit.history = habit.history || {};
    habit.history[today] = !habit.history[today];
    habit.doneToday = habit.history[today];
}
var filteredHabits = (0, vue_1.computed)(function () {
    if (activeTab.value === 'all')
        return habits.value;
    return habits.value.filter(function (h) { return h.type === activeTab.value; });
});
var weekRange = (0, vue_1.computed)(function () {
    var date = new Date(currentDate.value);
    var day = date.getDay();
    var diffToMonday = day === 0 ? -6 : 1 - day;
    var monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    var sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    var options = { month: 'short', day: 'numeric' };
    return "".concat(monday.toLocaleDateString('en-US', options), " - ").concat(sunday.toLocaleDateString('en-US', options));
});
function prevWeek() {
    currentDate.value = new Date(currentDate.value.getTime() - 7 * 86400000);
}
function nextWeek() {
    currentDate.value = new Date(currentDate.value.getTime() + 7 * 86400000);
}
function sendReport() {
    return __awaiter(this, void 0, void 0, function () {
        var html, res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!email.value.trim()) {
                        message.value = 'Enter email';
                        return [2 /*return*/];
                    }
                    loading.value = true;
                    message.value = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    html = (0, generateReportHTML_1.generateWeeklyReportHTML)(email.value, habits.value);
                    if (!html || typeof html !== 'string') {
                        message.value = 'Report HTML is empty';
                        loading.value = false;
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch('http://localhost:5001/send-report', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email.value, reportHTML: html })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    message.value = res.ok ? 'Sent successfully ✅' : data.error || 'Error';
                    if (res.ok)
                        setTimeout(closeModal, 1000);
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error('Send report error:', err_1);
                    message.value = 'Connection error';
                    return [3 /*break*/, 6];
                case 5:
                    loading.value = false;
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['week-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['week-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['week-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-list']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-list']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tabs" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'all';
    } }, { class: ({ active: __VLS_ctx.activeTab === 'all' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'physical';
    } }, { class: ({ active: __VLS_ctx.activeTab === 'physical' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'mental';
    } }, { class: ({ active: __VLS_ctx.activeTab === 'mental' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "week-nav" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.prevWeek) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.weekRange);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.nextWeek) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "add-habit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "New habit",
});
(__VLS_ctx.newHabitName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.newHabitType),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "physical",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "mental",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.addHabit) }));
var __VLS_0 = {}.draggable;
/** @type {[typeof __VLS_components.Draggable, typeof __VLS_components.draggable, typeof __VLS_components.Draggable, typeof __VLS_components.draggable, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ modelValue: (__VLS_ctx.habits), itemKey: "id" }, { class: "habit-list" }), { ghostClass: "ghost", animation: "200" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ modelValue: (__VLS_ctx.habits), itemKey: "id" }, { class: "habit-list" }), { ghostClass: "ghost", animation: "200" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_3.slots.default;
{
    var __VLS_thisSlot = __VLS_3.slots.item;
    var element = __VLS_getSlotParams(__VLS_thisSlot)[0].element;
    /** @type {[typeof HabitItem, ]} */ ;
    // @ts-ignore
    var __VLS_4 = __VLS_asFunctionalComponent(HabitItem_vue_1.default, new HabitItem_vue_1.default(__assign(__assign({ 'onToggleDone': {} }, { 'onDeleteHabit': {} }), { habit: (element) })));
    var __VLS_5 = __VLS_4.apply(void 0, __spreadArray([__assign(__assign({ 'onToggleDone': {} }, { 'onDeleteHabit': {} }), { habit: (element) })], __VLS_functionalComponentArgsRest(__VLS_4), false));
    var __VLS_7 = void 0;
    var __VLS_8 = void 0;
    var __VLS_9 = void 0;
    var __VLS_10 = {
        onToggleDone: (__VLS_ctx.toggleDone)
    };
    var __VLS_11 = {
        onDeleteHabit: (__VLS_ctx.deleteHabit)
    };
    var __VLS_6;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "actions" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.goToMonthly) }, { class: "secondary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.openModal) }, { class: "primary" }));
if (__VLS_ctx.showModal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.closeModal) }, { class: "modal-overlay" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "modal-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)(__assign({ type: "email", placeholder: "Enter your email" }, { class: "modal-input" }));
    (__VLS_ctx.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-buttons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.sendReport) }, { class: "send-btn" }), { disabled: (__VLS_ctx.loading) }));
    (__VLS_ctx.loading ? 'Sending...' : 'Send');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.closeModal) }, { class: "cancel-btn" }));
    if (__VLS_ctx.message) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "modal-message" }));
        (__VLS_ctx.message);
    }
}
if (__VLS_ctx.showDeleteModal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.cancelDelete) }, { class: "modal-overlay" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "modal-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "modal-message" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-buttons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.cancelDelete) }, { class: "cancel-btn" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.confirmDelete) }, { class: "delete-confirm-btn" }));
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['week-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['add-habit']} */ ;
/** @type {__VLS_StyleScopedClasses['habit-list']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-input']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-message']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-message']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-confirm-btn']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            HabitItem: HabitItem_vue_1.default,
            draggable: vuedraggable_1.default,
            newHabitName: newHabitName,
            newHabitType: newHabitType,
            habits: habits,
            activeTab: activeTab,
            showModal: showModal,
            email: email,
            message: message,
            loading: loading,
            showDeleteModal: showDeleteModal,
            deleteHabit: deleteHabit,
            confirmDelete: confirmDelete,
            cancelDelete: cancelDelete,
            openModal: openModal,
            closeModal: closeModal,
            addHabit: addHabit,
            goToMonthly: goToMonthly,
            toggleDone: toggleDone,
            weekRange: weekRange,
            prevWeek: prevWeek,
            nextWeek: nextWeek,
            sendReport: sendReport,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
