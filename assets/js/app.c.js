!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).MicroModal = t();
}(this, function() {
    "use strict";
    function e(e, t) {
        for(var o = 0; o < t.length; o++){
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
    }
    function t(e) {
        return (function(e) {
            if (Array.isArray(e)) return o(e);
        })(e) || (function(e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
        })(e) || (function(e, t) {
            if (!e) return;
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return o(e, t);
        })(e) || (function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
    }
    function o(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for(var o = 0, n = new Array(t); o < t; o++)n[o] = e[o];
        return n;
    }
    var n, i, a, r, s, l = (n = [
        "a[href]",
        "area[href]",
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        "select:not([disabled]):not([aria-hidden])",
        "textarea:not([disabled]):not([aria-hidden])",
        "button:not([disabled]):not([aria-hidden])",
        "iframe",
        "object",
        "embed",
        "[contenteditable]",
        '[tabindex]:not([tabindex^="-"])'
    ], i = function() {
        function o(e) {
            var n = e.targetModal, i = e.triggers, a = void 0 === i ? [] : i, r = e.onShow, s = void 0 === r ? function() {
            } : r, l = e.onClose, c = void 0 === l ? function() {
            } : l, d = e.openTrigger, u = void 0 === d ? "data-micromodal-trigger" : d, f = e.closeTrigger, h = void 0 === f ? "data-micromodal-close" : f, v = e.openClass, m = void 0 === v ? "is-open" : v, g = e.disableScroll, b = void 0 !== g && g, y = e.disableFocus, p = void 0 !== y && y, w = e.awaitCloseAnimation, E = void 0 !== w && w, k = e.awaitOpenAnimation, M = void 0 !== k && k, C = e.debugMode, A = void 0 !== C && C;
            !function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, o), this.modal = document.getElementById(n), this.config = {
                debugMode: A,
                disableScroll: b,
                openTrigger: u,
                closeTrigger: h,
                openClass: m,
                onShow: s,
                onClose: c,
                awaitCloseAnimation: E,
                awaitOpenAnimation: M,
                disableFocus: p
            }, a.length > 0 && this.registerTriggers.apply(this, t(a)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
        }
        var i, a, r;
        return i = o, (a = [
            {
                key: "registerTriggers",
                value: function() {
                    for(var e = this, t = arguments.length, o = new Array(t), n = 0; n < t; n++)o[n] = arguments[n];
                    o.filter(Boolean).forEach(function(t) {
                        t.addEventListener("click", function(t) {
                            return e.showModal(t);
                        });
                    });
                }
            },
            {
                key: "showModal",
                value: function() {
                    var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    if (this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add(this.config.openClass), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.awaitOpenAnimation) {
                        var o = function t() {
                            e.modal.removeEventListener("animationend", t, !1), e.setFocusToFirstNode();
                        };
                        this.modal.addEventListener("animationend", o, !1);
                    } else this.setFocusToFirstNode();
                    this.config.onShow(this.modal, this.activeElement, t);
                }
            },
            {
                key: "closeModal",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = this.modal;
                    if (this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.config.onClose(this.modal, this.activeElement, e), this.config.awaitCloseAnimation) {
                        var o = this.config.openClass;
                        this.modal.addEventListener("animationend", function e() {
                            t.classList.remove(o), t.removeEventListener("animationend", e, !1);
                        }, !1);
                    } else t.classList.remove(this.config.openClass);
                }
            },
            {
                key: "closeModalById",
                value: function(e) {
                    this.modal = document.getElementById(e), this.modal && this.closeModal();
                }
            },
            {
                key: "scrollBehaviour",
                value: function(e) {
                    if (this.config.disableScroll) {
                        var t = document.querySelector("body");
                        switch(e){
                            case "enable":
                                Object.assign(t.style, {
                                    overflow: ""
                                });
                                break;
                            case "disable":
                                Object.assign(t.style, {
                                    overflow: "hidden"
                                });
                        }
                    }
                }
            },
            {
                key: "addEventListeners",
                value: function() {
                    this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown);
                }
            },
            {
                key: "removeEventListeners",
                value: function() {
                    this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown);
                }
            },
            {
                key: "onClick",
                value: function(e) {
                    e.target.hasAttribute(this.config.closeTrigger) && this.closeModal(e);
                }
            },
            {
                key: "onKeydown",
                value: function(e) {
                    27 === e.keyCode && this.closeModal(e), 9 === e.keyCode && this.retainFocus(e);
                }
            },
            {
                key: "getFocusableNodes",
                value: function() {
                    var e = this.modal.querySelectorAll(n);
                    return Array.apply(void 0, t(e));
                }
            },
            {
                key: "setFocusToFirstNode",
                value: function() {
                    var e = this;
                    if (!this.config.disableFocus) {
                        var t = this.getFocusableNodes();
                        if (0 !== t.length) {
                            var o = t.filter(function(t) {
                                return !t.hasAttribute(e.config.closeTrigger);
                            });
                            o.length > 0 && o[0].focus(), 0 === o.length && t[0].focus();
                        }
                    }
                }
            },
            {
                key: "retainFocus",
                value: function(e) {
                    var t = this.getFocusableNodes();
                    if (0 !== t.length) if (t = t.filter(function(e) {
                        return null !== e.offsetParent;
                    }), this.modal.contains(document.activeElement)) {
                        var o = t.indexOf(document.activeElement);
                        e.shiftKey && 0 === o && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && t.length > 0 && o === t.length - 1 && (t[0].focus(), e.preventDefault());
                    } else t[0].focus();
                }
            }
        ]) && e(i.prototype, a), r && e(i, r), o;
    }(), a = null, r = function(e) {
        if (!document.getElementById(e)) return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(e, '"></div>')), !1;
    }, s = function(e, t) {
        if ((function(e) {
            e.length <= 0 && (console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'));
        })(e), !t) return !0;
        for(var o in t)r(o);
        return !0;
    }, {
        init: function(e) {
            var o = Object.assign({
            }, {
                openTrigger: "data-micromodal-trigger"
            }, e), n = t(document.querySelectorAll("[".concat(o.openTrigger, "]"))), r = function(e, t) {
                var o = [];
                return e.forEach(function(e) {
                    var n = e.attributes[t].value;
                    void 0 === o[n] && (o[n] = []), o[n].push(e);
                }), o;
            }(n, o.openTrigger);
            if (!0 !== o.debugMode || !1 !== s(n, r)) for(var l in r){
                var c = r[l];
                o.targetModal = l, o.triggers = t(c), a = new i(o);
            }
        },
        show: function(e, t) {
            var o = t || {
            };
            o.targetModal = e, !0 === o.debugMode && !1 === r(e) || (a && a.removeEventListeners(), (a = new i(o)).showModal());
        },
        close: function(e) {
            e ? a.closeModalById(e) : a.closeModal();
        }
    });
    return window.MicroModal = l, l;
});
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define([
        "exports"
    ], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Popper = {
    });
}(this, function(e) {
    function t(e, t) {
        return {
            width: (e = e.getBoundingClientRect()).width / 1,
            height: e.height / 1,
            top: e.top / 1,
            right: e.right / 1,
            bottom: e.bottom / 1,
            left: e.left / 1,
            x: e.left / 1,
            y: e.top / 1
        };
    }
    function n(e) {
        return null == e ? window : "[object Window]" !== e.toString() ? (e = e.ownerDocument) && e.defaultView || window : e;
    }
    function o(e) {
        return {
            scrollLeft: (e = n(e)).pageXOffset,
            scrollTop: e.pageYOffset
        };
    }
    function r(e) {
        return e instanceof n(e).Element || e instanceof Element;
    }
    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement;
    }
    function a(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof n(e).ShadowRoot || e instanceof ShadowRoot);
    }
    function s(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function f(e) {
        return ((r(e) ? e.ownerDocument : e.document) || window.document).documentElement;
    }
    function p(e) {
        return t(f(e)).left + o(e).scrollLeft;
    }
    function c(e) {
        return n(e).getComputedStyle(e);
    }
    function l(e) {
        return e = c(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX);
    }
    function u(e, r, a) {
        void 0 === a && (a = !1);
        var c = i(r);
        i(r) && r.getBoundingClientRect();
        var u = f(r);
        e = t(e);
        var d = {
            scrollLeft: 0,
            scrollTop: 0
        }, m = {
            x: 0,
            y: 0
        };
        return (c || !c && !a) && (("body" !== s(r) || l(u)) && (d = r !== n(r) && i(r) ? {
            scrollLeft: r.scrollLeft,
            scrollTop: r.scrollTop
        } : o(r)), i(r) ? ((m = t(r)).x += r.clientLeft, m.y += r.clientTop) : u && (m.x = p(u))), {
            x: e.left + d.scrollLeft - m.x,
            y: e.top + d.scrollTop - m.y,
            width: e.width,
            height: e.height
        };
    }
    function d(e) {
        var n = t(e), o = e.offsetWidth, r = e.offsetHeight;
        return 1 >= Math.abs(n.width - o) && (o = n.width), 1 >= Math.abs(n.height - r) && (r = n.height), {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: o,
            height: r
        };
    }
    function m(e) {
        return "html" === s(e) ? e : e.assignedSlot || e.parentNode || (a(e) ? e.host : null) || f(e);
    }
    function h(e) {
        return 0 <= [
            "html",
            "body",
            "#document"
        ].indexOf(s(e)) ? e.ownerDocument.body : i(e) && l(e) ? e : h(m(e));
    }
    function v(e, t) {
        var o;
        void 0 === t && (t = []);
        var r = h(e);
        return e = r === (null == (o = e.ownerDocument) ? void 0 : o.body), o = n(r), r = e ? [
            o
        ].concat(o.visualViewport || [], l(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(v(m(r)));
    }
    function g(e) {
        return i(e) && "fixed" !== c(e).position ? e.offsetParent : null;
    }
    function b(e) {
        for(var t = n(e), o = g(e); o && 0 <= [
            "table",
            "td",
            "th"
        ].indexOf(s(o)) && "static" === c(o).position;)o = g(o);
        if (o && ("html" === s(o) || "body" === s(o) && "static" === c(o).position)) return t;
        if (!o) e: {
            if (o = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox"), -1 === navigator.userAgent.indexOf("Trident") || !i(e) || "fixed" !== c(e).position) for(e = m(e); i(e) && 0 > [
                "html",
                "body"
            ].indexOf(s(e));){
                var r = c(e);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== [
                    "transform",
                    "perspective"
                ].indexOf(r.willChange) || o && "filter" === r.willChange || o && r.filter && "none" !== r.filter) {
                    o = e;
                    break e;
                }
                e = e.parentNode;
            }
            o = null;
        }
        return o || t;
    }
    function y(e) {
        function t(e) {
            o.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
                o.has(e) || (e = n.get(e)) && t(e);
            }), r.push(e);
        }
        var n = new Map, o = new Set, r = [];
        return e.forEach(function(e) {
            n.set(e.name, e);
        }), e.forEach(function(e) {
            o.has(e.name) || t(e);
        }), r;
    }
    function w(e) {
        var t;
        return function() {
            return t || (t = new Promise(function(n) {
                Promise.resolve().then(function() {
                    t = void 0, n(e());
                });
            })), t;
        };
    }
    function x(e) {
        return e.split("-")[0];
    }
    function O(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && a(n)) do {
            if (t && e.isSameNode(t)) return !0;
            t = t.parentNode || t.host;
        }while (t)
        return !1;
    }
    function j(e) {
        return Object.assign({
        }, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        });
    }
    function E(e, r) {
        if ("viewport" === r) {
            r = n(e);
            var a = f(e);
            r = r.visualViewport;
            var s = a.clientWidth;
            a = a.clientHeight;
            var l = 0, u = 0;
            r && (s = r.width, a = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = r.offsetLeft, u = r.offsetTop)), e = j(e = {
                width: s,
                height: a,
                x: l + p(e),
                y: u
            });
        } else i(r) ? ((e = t(r)).top += r.clientTop, e.left += r.clientLeft, e.bottom = e.top + r.clientHeight, e.right = e.left + r.clientWidth, e.width = r.clientWidth, e.height = r.clientHeight, e.x = e.left, e.y = e.top) : (u = f(e), e = f(u), s = o(u), r = null == (a = u.ownerDocument) ? void 0 : a.body, a = U(e.scrollWidth, e.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), l = U(e.scrollHeight, e.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), u = -s.scrollLeft + p(u), s = -s.scrollTop, "rtl" === c(r || e).direction && (u += U(e.clientWidth, r ? r.clientWidth : 0) - a), e = j({
            width: a,
            height: l,
            x: u,
            y: s
        }));
        return e;
    }
    function D(e, t, n) {
        return t = "clippingParents" === t ? (function(e) {
            var t = v(m(e)), n = 0 <= [
                "absolute",
                "fixed"
            ].indexOf(c(e).position) && i(e) ? b(e) : e;
            return r(n) ? t.filter(function(e) {
                return r(e) && O(e, n) && "body" !== s(e);
            }) : [];
        })(e) : [].concat(t), (n = (n = [].concat(t, [
            n
        ])).reduce(function(t, n) {
            return n = E(e, n), t.top = U(n.top, t.top), t.right = z(n.right, t.right), t.bottom = z(n.bottom, t.bottom), t.left = U(n.left, t.left), t;
        }, E(e, n[0]))).width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
    }
    function L(e) {
        return e.split("-")[1];
    }
    function P(e) {
        return 0 <= [
            "top",
            "bottom"
        ].indexOf(e) ? "x" : "y";
    }
    function M(e) {
        var t = e.reference, n = e.element, o = (e = e.placement) ? x(e) : null;
        e = e ? L(e) : null;
        var r = t.x + t.width / 2 - n.width / 2, i = t.y + t.height / 2 - n.height / 2;
        switch(o){
            case "top":
                r = {
                    x: r,
                    y: t.y - n.height
                };
                break;
            case "bottom":
                r = {
                    x: r,
                    y: t.y + t.height
                };
                break;
            case "right":
                r = {
                    x: t.x + t.width,
                    y: i
                };
                break;
            case "left":
                r = {
                    x: t.x - n.width,
                    y: i
                };
                break;
            default:
                r = {
                    x: t.x,
                    y: t.y
                };
        }
        if (null != (o = o ? P(o) : null)) switch(i = "y" === o ? "height" : "width", e){
            case "start":
                r[o] -= t[i] / 2 - n[i] / 2;
                break;
            case "end":
                r[o] += t[i] / 2 - n[i] / 2;
        }
        return r;
    }
    function k(e) {
        return Object.assign({
        }, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e);
    }
    function A(e, t) {
        return t.reduce(function(t, n) {
            return t[n] = e, t;
        }, {
        });
    }
    function B(e, n) {
        void 0 === n && (n = {
        });
        var o = n;
        n = void 0 === (n = o.placement) ? e.placement : n;
        var i = o.boundary, a = void 0 === i ? "clippingParents" : i, s = void 0 === (i = o.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = o.elementContext) ? "popper" : i;
        var p = o.altBoundary, c = void 0 !== p && p;
        o = k("number" != typeof (o = void 0 === (o = o.padding) ? 0 : o) ? o : A(o, N)), p = e.rects.popper, a = D(r(c = e.elements[c ? "popper" === i ? "reference" : "popper" : i]) ? c : c.contextElement || f(e.elements.popper), a, s), c = M({
            reference: s = t(e.elements.reference),
            element: p,
            strategy: "absolute",
            placement: n
        }), p = j(Object.assign({
        }, p, c)), s = "popper" === i ? p : s;
        var l = {
            top: a.top - s.top + o.top,
            bottom: s.bottom - a.bottom + o.bottom,
            left: a.left - s.left + o.left,
            right: s.right - a.right + o.right
        };
        if (e = e.modifiersData.offset, "popper" === i && e) {
            var u = e[n];
            Object.keys(l).forEach(function(e) {
                var t = 0 <= [
                    "right",
                    "bottom"
                ].indexOf(e) ? 1 : -1, n = 0 <= [
                    "top",
                    "bottom"
                ].indexOf(e) ? "y" : "x";
                l[e] += u[n] * t;
            });
        }
        return l;
    }
    function W() {
        for(var e = arguments.length, t = Array(e), n = 0; n < e; n++)t[n] = arguments[n];
        return !t.some(function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
        });
    }
    function T(e) {
        void 0 === e && (e = {
        });
        var t = e.defaultModifiers, n = void 0 === t ? [] : t, o = void 0 === (e = e.defaultOptions) ? X : e;
        return function(e, t, i) {
            function a() {
                f.forEach(function(e) {
                    return e();
                }), f = [];
            }
            void 0 === i && (i = o);
            var s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({
                }, X, o),
                modifiersData: {
                },
                elements: {
                    reference: e,
                    popper: t
                },
                attributes: {
                },
                styles: {
                }
            }, f = [], p = !1, c = {
                state: s,
                setOptions: function(i) {
                    return i = "function" == typeof i ? i(s.options) : i, a(), s.options = Object.assign({
                    }, o, s.options, i), s.scrollParents = {
                        reference: r(e) ? v(e) : e.contextElement ? v(e.contextElement) : [],
                        popper: v(t)
                    }, i = (function(e) {
                        var t = y(e);
                        return _.reduce(function(e, n) {
                            return e.concat(t.filter(function(e) {
                                return e.phase === n;
                            }));
                        }, []);
                    })(function(e) {
                        var t = e.reduce(function(e, t) {
                            var n = e[t.name];
                            return e[t.name] = n ? Object.assign({
                            }, n, t, {
                                options: Object.assign({
                                }, n.options, t.options),
                                data: Object.assign({
                                }, n.data, t.data)
                            }) : t, e;
                        }, {
                        });
                        return Object.keys(t).map(function(e) {
                            return t[e];
                        });
                    }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter(function(e) {
                        return e.enabled;
                    }), s.orderedModifiers.forEach(function(e) {
                        var t = e.name, n = e.options;
                        n = void 0 === n ? {
                        } : n, "function" == typeof (e = e.effect) && (t = e({
                            state: s,
                            name: t,
                            instance: c,
                            options: n
                        }), f.push(t || function() {
                        }));
                    }), c.update();
                },
                forceUpdate: function() {
                    if (!p) {
                        var e = s.elements, t = e.reference;
                        if (W(t, e = e.popper)) for(s.rects = {
                            reference: u(t, b(e), "fixed" === s.options.strategy),
                            popper: d(e)
                        }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach(function(e) {
                            return s.modifiersData[e.name] = Object.assign({
                            }, e.data);
                        }), t = 0; t < s.orderedModifiers.length; t++)if (!0 === s.reset) s.reset = !1, t = -1;
                        else {
                            var n = s.orderedModifiers[t];
                            e = n.fn;
                            var o = n.options;
                            o = void 0 === o ? {
                            } : o, n = n.name, "function" == typeof e && (s = e({
                                state: s,
                                options: o,
                                name: n,
                                instance: c
                            }) || s);
                        }
                    }
                },
                update: w(function() {
                    return new Promise(function(e) {
                        c.forceUpdate(), e(s);
                    });
                }),
                destroy: function() {
                    a(), p = !0;
                }
            };
            return W(e, t) ? (c.setOptions(i).then(function(e) {
                !p && i.onFirstUpdate && i.onFirstUpdate(e);
            }), c) : c;
        };
    }
    function R(e) {
        var t, o = e.popper, r = e.popperRect, i = e.placement, a = e.variation, s = e.offsets, p = e.position, l = e.gpuAcceleration, u = e.adaptive;
        if (!0 === (e = e.roundOffsets)) {
            e = s.y;
            var d = window.devicePixelRatio || 1;
            e = {
                x: F(F(s.x * d) / d) || 0,
                y: F(F(e * d) / d) || 0
            };
        } else e = "function" == typeof e ? e(s) : s;
        e = void 0 === (e = (d = e).x) ? 0 : e, d = void 0 === (d = d.y) ? 0 : d;
        var m = s.hasOwnProperty("x");
        s = s.hasOwnProperty("y");
        var h, v = "left", g = "top", y = window;
        if (u) {
            var w = b(o), x = "clientHeight", O = "clientWidth";
            w === n(o) && "static" !== c(w = f(o)).position && "absolute" === p && (x = "scrollHeight", O = "scrollWidth"), "top" !== i && ("left" !== i && "right" !== i || "end" !== a) || (g = "bottom", d -= w[x] - r.height, d *= l ? 1 : -1), "left" !== i && ("top" !== i && "bottom" !== i || "end" !== a) || (v = "right", e -= w[O] - r.width, e *= l ? 1 : -1);
        }
        return o = Object.assign({
            position: p
        }, u && K), l ? Object.assign({
        }, o, ((h = {
        })[g] = s ? "0" : "", h[v] = m ? "0" : "", h.transform = 1 >= (y.devicePixelRatio || 1) ? "translate(" + e + "px, " + d + "px)" : "translate3d(" + e + "px, " + d + "px, 0)", h)) : Object.assign({
        }, o, ((t = {
        })[g] = s ? d + "px" : "", t[v] = m ? e + "px" : "", t.transform = "", t));
    }
    function H(e) {
        return e.replace(/left|right|bottom|top/g, function(e) {
            return ee[e];
        });
    }
    function S(e) {
        return e.replace(/start|end/g, function(e) {
            return te[e];
        });
    }
    function C(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        };
    }
    function q(e) {
        return [
            "top",
            "right",
            "bottom",
            "left"
        ].some(function(t) {
            return 0 <= e[t];
        });
    }
    var N = [
        "top",
        "bottom",
        "right",
        "left"
    ], V = N.reduce(function(e, t) {
        return e.concat([
            t + "-start",
            t + "-end"
        ]);
    }, []), I = [].concat(N, [
        "auto"
    ]).reduce(function(e, t) {
        return e.concat([
            t,
            t + "-start",
            t + "-end"
        ]);
    }, []), _ = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "), U = Math.max, z = Math.min, F = Math.round, X = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    }, Y = {
        passive: !0
    }, G = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {
        },
        effect: function(e) {
            var t = e.state, o = e.instance, r = (e = e.options).scroll, i = void 0 === r || r, a = void 0 === (e = e.resize) || e, s = n(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return i && f.forEach(function(e) {
                e.addEventListener("scroll", o.update, Y);
            }), a && s.addEventListener("resize", o.update, Y), function() {
                i && f.forEach(function(e) {
                    e.removeEventListener("scroll", o.update, Y);
                }), a && s.removeEventListener("resize", o.update, Y);
            };
        },
        data: {
        }
    }, J = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var t = e.state;
            t.modifiersData[e.name] = M({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement
            });
        },
        data: {
        }
    }, K = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    }, Q = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var t = e.state, n = e.options;
            e = void 0 === (e = n.gpuAcceleration) || e;
            var o = n.adaptive;
            o = void 0 === o || o, n = void 0 === (n = n.roundOffsets) || n, e = {
                placement: x(t.placement),
                variation: L(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: e
            }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({
            }, t.styles.popper, R(Object.assign({
            }, e, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: o,
                roundOffsets: n
            })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({
            }, t.styles.arrow, R(Object.assign({
            }, e, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: n
            })))), t.attributes.popper = Object.assign({
            }, t.attributes.popper, {
                "data-popper-placement": t.placement
            });
        },
        data: {
        }
    }, Z = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach(function(e) {
                var n = t.styles[e] || {
                }, o = t.attributes[e] || {
                }, r = t.elements[e];
                i(r) && s(r) && (Object.assign(r.style, n), Object.keys(o).forEach(function(e) {
                    var t = o[e];
                    !1 === t ? r.removeAttribute(e) : r.setAttribute(e, !0 === t ? "" : t);
                }));
            });
        },
        effect: function(e) {
            var t = e.state, n = {
                popper: {
                    position: t.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {
                }
            };
            return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
                Object.keys(t.elements).forEach(function(e) {
                    var o = t.elements[e], r = t.attributes[e] || {
                    };
                    e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
                        return e[t] = "", e;
                    }, {
                    }), i(o) && s(o) && (Object.assign(o.style, e), Object.keys(r).forEach(function(e) {
                        o.removeAttribute(e);
                    }));
                });
            };
        },
        requires: [
            "computeStyles"
        ]
    }, $ = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: [
            "popperOffsets"
        ],
        fn: function(e) {
            var t = e.state, n = e.name, o = void 0 === (e = e.options.offset) ? [
                0,
                0
            ] : e, r = (e = I.reduce(function(e, n) {
                var r = t.rects, i = x(n), a = 0 <= [
                    "left",
                    "top"
                ].indexOf(i) ? -1 : 1, s = "function" == typeof o ? o(Object.assign({
                }, r, {
                    placement: n
                })) : o;
                return r = (r = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= [
                    "left",
                    "right"
                ].indexOf(i) ? {
                    x: s,
                    y: r
                } : {
                    x: r,
                    y: s
                }, e[n] = i, e;
            }, {
            }))[t.placement], i = r.x;
            r = r.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += r), t.modifiersData[n] = e;
        }
    }, ee = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    }, te = {
        start: "end",
        end: "start"
    }, ne = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options;
            if (e = e.name, !t.modifiersData[e]._skip) {
                var o = n.mainAxis;
                o = void 0 === o || o;
                var r = n.altAxis;
                r = void 0 === r || r;
                var i = n.fallbackPlacements, a = n.padding, s = n.boundary, f = n.rootBoundary, p = n.altBoundary, c = n.flipVariations, l = void 0 === c || c, u = n.allowedAutoPlacements;
                c = x(n = t.options.placement), i = i || (c !== n && l ? (function(e) {
                    if ("auto" === x(e)) return [];
                    var t = H(e);
                    return [
                        S(e),
                        t,
                        S(t)
                    ];
                })(n) : [
                    H(n)
                ]);
                var d = [
                    n
                ].concat(i).reduce(function(e, n) {
                    return e.concat("auto" === x(n) ? function(e, t) {
                        void 0 === t && (t = {
                        });
                        var n = t.boundary, o = t.rootBoundary, r = t.padding, i = t.flipVariations, a = t.allowedAutoPlacements, s = void 0 === a ? I : a, f = L(t.placement);
                        0 === (i = (t = f ? i ? V : V.filter(function(e) {
                            return L(e) === f;
                        }) : N).filter(function(e) {
                            return 0 <= s.indexOf(e);
                        })).length && (i = t);
                        var p = i.reduce(function(t, i) {
                            return t[i] = B(e, {
                                placement: i,
                                boundary: n,
                                rootBoundary: o,
                                padding: r
                            })[x(i)], t;
                        }, {
                        });
                        return Object.keys(p).sort(function(e, t) {
                            return p[e] - p[t];
                        });
                    }(t, {
                        placement: n,
                        boundary: s,
                        rootBoundary: f,
                        padding: a,
                        flipVariations: l,
                        allowedAutoPlacements: u
                    }) : n);
                }, []);
                n = t.rects.reference, i = t.rects.popper;
                var m = new Map;
                c = !0;
                for(var h = d[0], v = 0; v < d.length; v++){
                    var g = d[v], b = x(g), y = "start" === L(g), w = 0 <= [
                        "top",
                        "bottom"
                    ].indexOf(b), O = w ? "width" : "height", j = B(t, {
                        placement: g,
                        boundary: s,
                        rootBoundary: f,
                        altBoundary: p,
                        padding: a
                    });
                    if (y = w ? y ? "right" : "left" : y ? "bottom" : "top", n[O] > i[O] && (y = H(y)), O = H(y), w = [], o && w.push(0 >= j[b]), r && w.push(0 >= j[y], 0 >= j[O]), w.every(function(e) {
                        return e;
                    })) {
                        h = g, c = !1;
                        break;
                    }
                    m.set(g, w);
                }
                if (c) for(o = function(e) {
                    var t = d.find(function(t) {
                        if (t = m.get(t)) return t.slice(0, e).every(function(e) {
                            return e;
                        });
                    });
                    if (t) return h = t, "break";
                }, r = l ? 3 : 1; 0 < r && "break" !== o(r); r--);
                t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0);
            }
        },
        requiresIfExists: [
            "offset"
        ],
        data: {
            _skip: !1
        }
    }, oe = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state, n = e.options;
            e = e.name;
            var o = n.mainAxis, r = void 0 === o || o, i = void 0 !== (o = n.altAxis) && o;
            o = void 0 === (o = n.tether) || o;
            var a = n.tetherOffset, s = void 0 === a ? 0 : a, f = B(t, {
                boundary: n.boundary,
                rootBoundary: n.rootBoundary,
                padding: n.padding,
                altBoundary: n.altBoundary
            });
            n = x(t.placement);
            var p = L(t.placement), c = !p, l = P(n);
            n = "x" === l ? "y" : "x", a = t.modifiersData.popperOffsets;
            var u = t.rects.reference, m = t.rects.popper, h = "function" == typeof s ? s(Object.assign({
            }, t.rects, {
                placement: t.placement
            })) : s;
            if (s = {
                x: 0,
                y: 0
            }, a) {
                if (r || i) {
                    var v = "y" === l ? "top" : "left", g = "y" === l ? "bottom" : "right", y = "y" === l ? "height" : "width", w = a[l], O = a[l] + f[v], j = a[l] - f[g], E = o ? -m[y] / 2 : 0, D = "start" === p ? u[y] : m[y];
                    p = "start" === p ? -m[y] : -u[y], m = t.elements.arrow, m = o && m ? d(m) : {
                        width: 0,
                        height: 0
                    };
                    var M = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    };
                    v = M[v], g = M[g], m = U(0, z(u[y], m[y])), D = c ? u[y] / 2 - E - m - v - h : D - m - v - h, u = c ? -u[y] / 2 + E + m + g + h : p + m + g + h, c = t.elements.arrow && b(t.elements.arrow), h = t.modifiersData.offset ? t.modifiersData.offset[t.placement][l] : 0, c = a[l] + D - h - (c ? "y" === l ? c.clientTop || 0 : c.clientLeft || 0 : 0), u = a[l] + u - h, r && (r = o ? z(O, c) : O, j = o ? U(j, u) : j, r = U(r, z(w, j)), a[l] = r, s[l] = r - w), i && (r = (i = a[n]) + f["x" === l ? "top" : "left"], f = i - f["x" === l ? "bottom" : "right"], r = o ? z(r, c) : r, o = o ? U(f, u) : f, o = U(r, z(i, o)), a[n] = o, s[n] = o - i);
                }
                t.modifiersData[e] = s;
            }
        },
        requiresIfExists: [
            "offset"
        ]
    }, re = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t, n = e.state, o = e.name, r = e.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, s = x(n.placement);
            if (e = P(s), s = 0 <= [
                "left",
                "right"
            ].indexOf(s) ? "height" : "width", i && a) {
                r = k("number" != typeof (r = "function" == typeof (r = r.padding) ? r(Object.assign({
                }, n.rects, {
                    placement: n.placement
                })) : r) ? r : A(r, N));
                var f = d(i), p = "y" === e ? "top" : "left", c = "y" === e ? "bottom" : "right", l = n.rects.reference[s] + n.rects.reference[e] - a[e] - n.rects.popper[s];
                a = a[e] - n.rects.reference[e], a = (i = (i = b(i)) ? "y" === e ? i.clientHeight || 0 : i.clientWidth || 0 : 0) / 2 - f[s] / 2 + (l / 2 - a / 2), s = U(r[p], z(a, i - f[s] - r[c])), n.modifiersData[o] = ((t = {
                })[e] = s, t.centerOffset = s - a, t);
            }
        },
        effect: function(e) {
            var t = e.state;
            if (null != (e = void 0 === (e = e.options.element) ? "[data-popper-arrow]" : e)) {
                if ("string" == typeof e && !(e = t.elements.popper.querySelector(e))) return;
                O(t.elements.popper, e) && (t.elements.arrow = e);
            }
        },
        requires: [
            "popperOffsets"
        ],
        requiresIfExists: [
            "preventOverflow"
        ]
    }, ie = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: [
            "preventOverflow"
        ],
        fn: function(e) {
            var t = e.state;
            e = e.name;
            var n = t.rects.reference, o = t.rects.popper, r = t.modifiersData.preventOverflow, i = B(t, {
                elementContext: "reference"
            }), a = B(t, {
                altBoundary: !0
            });
            n = C(i, n), o = C(a, o, r), r = q(n), a = q(o), t.modifiersData[e] = {
                referenceClippingOffsets: n,
                popperEscapeOffsets: o,
                isReferenceHidden: r,
                hasPopperEscaped: a
            }, t.attributes.popper = Object.assign({
            }, t.attributes.popper, {
                "data-popper-reference-hidden": r,
                "data-popper-escaped": a
            });
        }
    }, ae = T({
        defaultModifiers: [
            G,
            J,
            Q,
            Z
        ]
    }), se = [
        G,
        J,
        Q,
        Z,
        $,
        ne,
        oe,
        re,
        ie
    ], fe = T({
        defaultModifiers: se
    });
    e.applyStyles = Z, e.arrow = re, e.computeStyles = Q, e.createPopper = fe, e.createPopperLite = ae, e.defaultModifiers = se, e.detectOverflow = B, e.eventListeners = G, e.flip = ne, e.hide = ie, e.offset = $, e.popperGenerator = T, e.popperOffsets = J, e.preventOverflow = oe, Object.defineProperty(e, "__esModule", {
        value: !0
    });
});
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) : typeof define === 'function' && define.amd ? define([
        '@popperjs/core'
    ], factory) : (global = global || self, global.tippy = factory(global.Popper));
})(this, function(core) {
    'use strict';
    var css = ".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}";
    function injectCSS(css) {
        var style = document.createElement('style');
        style.textContent = css;
        style.setAttribute('data-tippy-stylesheet', '');
        var head = document.head;
        var firstStyleOrLinkTag = document.querySelector('head>style,head>link');
        if (firstStyleOrLinkTag) {
            head.insertBefore(style, firstStyleOrLinkTag);
        } else {
            head.appendChild(style);
        }
    }
    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    var isIE11 = isBrowser ? !!window.msCrypto : false;
    var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
    var BOX_CLASS = "tippy-box";
    var CONTENT_CLASS = "tippy-content";
    var BACKDROP_CLASS = "tippy-backdrop";
    var ARROW_CLASS = "tippy-arrow";
    var SVG_ARROW_CLASS = "tippy-svg-arrow";
    var TOUCH_OPTIONS = {
        passive: true,
        capture: true
    };
    var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
        return document.body;
    };
    function hasOwnProperty(obj, key) {
        return ({
        }).hasOwnProperty.call(obj, key);
    }
    function getValueAtIndexOrReturn(value, index, defaultValue) {
        if (Array.isArray(value)) {
            var v = value[index];
            return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
        }
        return value;
    }
    function isType(value, type) {
        var str = ({
        }).toString.call(value);
        return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
    }
    function invokeWithArgsOrReturn(value, args) {
        return typeof value === 'function' ? value.apply(void 0, args) : value;
    }
    function debounce(fn, ms) {
        if (ms === 0) {
            return fn;
        }
        var timeout;
        return function(arg) {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                fn(arg);
            }, ms);
        };
    }
    function removeProperties(obj, keys) {
        var clone = Object.assign({
        }, obj);
        keys.forEach(function(key) {
            delete clone[key];
        });
        return clone;
    }
    function splitBySpaces(value) {
        return value.split(/\s+/).filter(Boolean);
    }
    function normalizeToArray(value) {
        return [].concat(value);
    }
    function pushIfUnique(arr, value) {
        if (arr.indexOf(value) === -1) {
            arr.push(value);
        }
    }
    function unique(arr) {
        return arr.filter(function(item, index) {
            return arr.indexOf(item) === index;
        });
    }
    function getBasePlacement(placement) {
        return placement.split('-')[0];
    }
    function arrayFrom(value) {
        return [].slice.call(value);
    }
    function removeUndefinedProps(obj) {
        return Object.keys(obj).reduce(function(acc, key) {
            if (obj[key] !== undefined) {
                acc[key] = obj[key];
            }
            return acc;
        }, {
        });
    }
    function div() {
        return document.createElement('div');
    }
    function isElement(value) {
        return [
            'Element',
            'Fragment'
        ].some(function(type) {
            return isType(value, type);
        });
    }
    function isNodeList(value) {
        return isType(value, 'NodeList');
    }
    function isMouseEvent(value) {
        return isType(value, 'MouseEvent');
    }
    function isReferenceElement(value) {
        return !!(value && value._tippy && value._tippy.reference === value);
    }
    function getArrayOfElements(value) {
        if (isElement(value)) {
            return [
                value
            ];
        }
        if (isNodeList(value)) {
            return arrayFrom(value);
        }
        if (Array.isArray(value)) {
            return value;
        }
        return arrayFrom(document.querySelectorAll(value));
    }
    function setTransitionDuration(els, value) {
        els.forEach(function(el) {
            if (el) {
                el.style.transitionDuration = value + "ms";
            }
        });
    }
    function setVisibilityState(els, state) {
        els.forEach(function(el) {
            if (el) {
                el.setAttribute('data-state', state);
            }
        });
    }
    function getOwnerDocument(elementOrElements) {
        var _element$ownerDocumen;
        var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
        return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
    }
    function isCursorOutsideInteractiveBorder(popperTreeData, event) {
        var clientX = event.clientX, clientY = event.clientY;
        return popperTreeData.every(function(_ref) {
            var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
            var interactiveBorder = props.interactiveBorder;
            var basePlacement = getBasePlacement(popperState.placement);
            var offsetData = popperState.modifiersData.offset;
            if (!offsetData) {
                return true;
            }
            var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
            var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
            var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
            var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
            var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
            var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
            var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
            var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
            return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
        });
    }
    function updateTransitionEndListener(box, action, listener) {
        var method = action + "EventListener";
        [
            'transitionend',
            'webkitTransitionEnd'
        ].forEach(function(event) {
            box[method](event, listener);
        });
    }
    function actualContains(parent, child) {
        var target = child;
        while(target){
            var _target$getRootNode;
            if (parent.contains(target)) {
                return true;
            }
            target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
        }
        return false;
    }
    var currentInput = {
        isTouch: false
    };
    var lastMouseMoveTime = 0;
    function onDocumentTouchStart() {
        if (currentInput.isTouch) {
            return;
        }
        currentInput.isTouch = true;
        if (window.performance) {
            document.addEventListener('mousemove', onDocumentMouseMove);
        }
    }
    function onDocumentMouseMove() {
        var now = performance.now();
        if (now - lastMouseMoveTime < 20) {
            currentInput.isTouch = false;
            document.removeEventListener('mousemove', onDocumentMouseMove);
        }
        lastMouseMoveTime = now;
    }
    function onWindowBlur() {
        var activeElement = document.activeElement;
        if (isReferenceElement(activeElement)) {
            var instance = activeElement._tippy;
            if (activeElement.blur && !instance.state.isVisible) {
                activeElement.blur();
            }
        }
    }
    function bindGlobalEventListeners() {
        document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
        window.addEventListener('blur', onWindowBlur);
    }
    function createMemoryLeakWarning(method) {
        var txt = method === 'destroy' ? 'n already-' : ' ';
        return [
            method + "() was called on a" + txt + "destroyed instance. This is a no-op but",
            'indicates a potential memory leak.'
        ].join(' ');
    }
    function clean(value) {
        var spacesAndTabs = /[ \t]{2,}/g;
        var lineStartWithSpaces = /^[ \t]*/gm;
        return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
    }
    function getDevMessage(message) {
        return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
    }
    function getFormattedMessage(message) {
        return [
            getDevMessage(message),
            'color: #00C584; font-size: 1.3em; font-weight: bold;',
            'line-height: 1.5',
            'color: #a6a095;'
        ];
    }
    var visitedMessages;
    {
        resetVisitedMessages();
    }
    function resetVisitedMessages() {
        visitedMessages = new Set();
    }
    function warnWhen(condition, message) {
        if (condition && !visitedMessages.has(message)) {
            var _console;
            visitedMessages.add(message);
            (_console = console).warn.apply(_console, getFormattedMessage(message));
        }
    }
    function errorWhen(condition, message) {
        if (condition && !visitedMessages.has(message)) {
            var _console2;
            visitedMessages.add(message);
            (_console2 = console).error.apply(_console2, getFormattedMessage(message));
        }
    }
    function validateTargets(targets) {
        var didPassFalsyValue = !targets;
        var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
        errorWhen(didPassFalsyValue, [
            'tippy() was passed',
            '`' + String(targets) + '`',
            'as its targets (first) argument. Valid types are: String, Element,',
            'Element[], or NodeList.'
        ].join(' '));
        errorWhen(didPassPlainObject, [
            'tippy() was passed a plain object which is not supported as an argument',
            'for virtual positioning. Use props.getReferenceClientRect instead.'
        ].join(' '));
    }
    var pluginProps = {
        animateFill: false,
        followCursor: false,
        inlinePositioning: false,
        sticky: false
    };
    var renderProps = {
        allowHTML: false,
        animation: 'fade',
        arrow: true,
        content: '',
        inertia: false,
        maxWidth: 350,
        role: 'tooltip',
        theme: '',
        zIndex: 9999
    };
    var defaultProps = Object.assign({
        appendTo: TIPPY_DEFAULT_APPEND_TO,
        aria: {
            content: 'auto',
            expanded: 'auto'
        },
        delay: 0,
        duration: [
            300,
            250
        ],
        getReferenceClientRect: null,
        hideOnClick: true,
        ignoreAttributes: false,
        interactive: false,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: '',
        offset: [
            0,
            10
        ],
        onAfterUpdate: function onAfterUpdate() {
        },
        onBeforeUpdate: function onBeforeUpdate() {
        },
        onCreate: function onCreate() {
        },
        onDestroy: function onDestroy() {
        },
        onHidden: function onHidden() {
        },
        onHide: function onHide() {
        },
        onMount: function onMount() {
        },
        onShow: function onShow() {
        },
        onShown: function onShown() {
        },
        onTrigger: function onTrigger() {
        },
        onUntrigger: function onUntrigger() {
        },
        onClickOutside: function onClickOutside() {
        },
        placement: 'top',
        plugins: [],
        popperOptions: {
        },
        render: null,
        showOnCreate: false,
        touch: true,
        trigger: 'mouseenter focus',
        triggerTarget: null
    }, pluginProps, renderProps);
    var defaultKeys = Object.keys(defaultProps);
    var setDefaultProps = function setDefaultProps(partialProps) {
        {
            validateProps(partialProps, []);
        }
        var keys = Object.keys(partialProps);
        keys.forEach(function(key) {
            defaultProps[key] = partialProps[key];
        });
    };
    function getExtendedPassedProps(passedProps) {
        var plugins = passedProps.plugins || [];
        var pluginProps = plugins.reduce(function(acc, plugin) {
            var name = plugin.name, defaultValue = plugin.defaultValue;
            if (name) {
                var _name;
                acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
            }
            return acc;
        }, {
        });
        return Object.assign({
        }, passedProps, pluginProps);
    }
    function getDataAttributeProps(reference, plugins) {
        var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({
        }, defaultProps, {
            plugins: plugins
        }))) : defaultKeys;
        var props = propKeys.reduce(function(acc, key) {
            var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();
            if (!valueAsString) {
                return acc;
            }
            if (key === 'content') {
                acc[key] = valueAsString;
            } else {
                try {
                    acc[key] = JSON.parse(valueAsString);
                } catch (e) {
                    acc[key] = valueAsString;
                }
            }
            return acc;
        }, {
        });
        return props;
    }
    function evaluateProps(reference, props) {
        var out = Object.assign({
        }, props, {
            content: invokeWithArgsOrReturn(props.content, [
                reference
            ])
        }, props.ignoreAttributes ? {
        } : getDataAttributeProps(reference, props.plugins));
        out.aria = Object.assign({
        }, defaultProps.aria, out.aria);
        out.aria = {
            expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
            content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
        };
        return out;
    }
    function validateProps(partialProps, plugins) {
        if (partialProps === void 0) {
            partialProps = {
            };
        }
        if (plugins === void 0) {
            plugins = [];
        }
        var keys = Object.keys(partialProps);
        keys.forEach(function(prop) {
            var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
            var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop);
            if (didPassUnknownProp) {
                didPassUnknownProp = plugins.filter(function(plugin) {
                    return plugin.name === prop;
                }).length === 0;
            }
            warnWhen(didPassUnknownProp, [
                "`" + prop + "`",
                "is not a valid prop. You may have spelled it incorrectly, or if it's",
                'a plugin, forgot to pass it in an array as props.plugins.',
                '\n\n',
                'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n',
                'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'
            ].join(' '));
        });
    }
    var innerHTML = function innerHTML() {
        return 'innerHTML';
    };
    function dangerouslySetInnerHTML(element, html) {
        element[innerHTML()] = html;
    }
    function createArrowElement(value) {
        var arrow = div();
        if (value === true) {
            arrow.className = ARROW_CLASS;
        } else {
            arrow.className = SVG_ARROW_CLASS;
            if (isElement(value)) {
                arrow.appendChild(value);
            } else {
                dangerouslySetInnerHTML(arrow, value);
            }
        }
        return arrow;
    }
    function setContent(content, props) {
        if (isElement(props.content)) {
            dangerouslySetInnerHTML(content, '');
            content.appendChild(props.content);
        } else if (typeof props.content !== 'function') {
            if (props.allowHTML) {
                dangerouslySetInnerHTML(content, props.content);
            } else {
                content.textContent = props.content;
            }
        }
    }
    function getChildren(popper) {
        var box = popper.firstElementChild;
        var boxChildren = arrayFrom(box.children);
        return {
            box: box,
            content: boxChildren.find(function(node) {
                return node.classList.contains(CONTENT_CLASS);
            }),
            arrow: boxChildren.find(function(node) {
                return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
            }),
            backdrop: boxChildren.find(function(node) {
                return node.classList.contains(BACKDROP_CLASS);
            })
        };
    }
    function render(instance) {
        var popper = div();
        var box = div();
        box.className = BOX_CLASS;
        box.setAttribute('data-state', 'hidden');
        box.setAttribute('tabindex', '-1');
        var content = div();
        content.className = CONTENT_CLASS;
        content.setAttribute('data-state', 'hidden');
        setContent(content, instance.props);
        popper.appendChild(box);
        box.appendChild(content);
        onUpdate(instance.props, instance.props);
        function onUpdate(prevProps, nextProps) {
            var _getChildren = getChildren(popper), box = _getChildren.box, content = _getChildren.content, arrow = _getChildren.arrow;
            if (nextProps.theme) {
                box.setAttribute('data-theme', nextProps.theme);
            } else {
                box.removeAttribute('data-theme');
            }
            if (typeof nextProps.animation === 'string') {
                box.setAttribute('data-animation', nextProps.animation);
            } else {
                box.removeAttribute('data-animation');
            }
            if (nextProps.inertia) {
                box.setAttribute('data-inertia', '');
            } else {
                box.removeAttribute('data-inertia');
            }
            box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;
            if (nextProps.role) {
                box.setAttribute('role', nextProps.role);
            } else {
                box.removeAttribute('role');
            }
            if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
                setContent(content, instance.props);
            }
            if (nextProps.arrow) {
                if (!arrow) {
                    box.appendChild(createArrowElement(nextProps.arrow));
                } else if (prevProps.arrow !== nextProps.arrow) {
                    box.removeChild(arrow);
                    box.appendChild(createArrowElement(nextProps.arrow));
                }
            } else if (arrow) {
                box.removeChild(arrow);
            }
        }
        return {
            popper: popper,
            onUpdate: onUpdate
        };
    }
    render.$$tippy = true;
    var idCounter = 1;
    var mouseMoveListeners = [];
    var mountedInstances = [];
    function createTippy(reference, passedProps) {
        var props = evaluateProps(reference, Object.assign({
        }, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps))));
        var showTimeout;
        var hideTimeout;
        var scheduleHideAnimationFrame;
        var isVisibleFromClick = false;
        var didHideDueToDocumentMouseDown = false;
        var didTouchMove = false;
        var ignoreOnFirstUpdate = false;
        var lastTriggerEvent;
        var currentTransitionEndListener;
        var onFirstUpdate;
        var listeners = [];
        var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
        var currentTarget;
        var id = idCounter++;
        var popperInstance = null;
        var plugins = unique(props.plugins);
        var state = {
            isEnabled: true,
            isVisible: false,
            isDestroyed: false,
            isMounted: false,
            isShown: false
        };
        var instance = {
            id: id,
            reference: reference,
            popper: div(),
            popperInstance: popperInstance,
            props: props,
            state: state,
            plugins: plugins,
            clearDelayTimeouts: clearDelayTimeouts,
            setProps: setProps,
            setContent: setContent,
            show: show,
            hide: hide,
            hideWithInteractivity: hideWithInteractivity,
            enable: enable,
            disable: disable,
            unmount: unmount,
            destroy: destroy
        };
        if (!props.render) {
            {
                errorWhen(true, 'render() function has not been supplied.');
            }
            return instance;
        }
        var _props$render = props.render(instance), popper = _props$render.popper, onUpdate = _props$render.onUpdate;
        popper.setAttribute('data-tippy-root', '');
        popper.id = "tippy-" + instance.id;
        instance.popper = popper;
        reference._tippy = instance;
        popper._tippy = instance;
        var pluginsHooks = plugins.map(function(plugin) {
            return plugin.fn(instance);
        });
        var hasAriaExpanded = reference.hasAttribute('aria-expanded');
        addListeners();
        handleAriaExpandedAttribute();
        handleStyles();
        invokeHook('onCreate', [
            instance
        ]);
        if (props.showOnCreate) {
            scheduleShow();
        }
        popper.addEventListener('mouseenter', function() {
            if (instance.props.interactive && instance.state.isVisible) {
                instance.clearDelayTimeouts();
            }
        });
        popper.addEventListener('mouseleave', function() {
            if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
                getDocument().addEventListener('mousemove', debouncedOnMouseMove);
            }
        });
        return instance;
        function getNormalizedTouchSettings() {
            var touch = instance.props.touch;
            return Array.isArray(touch) ? touch : [
                touch,
                0
            ];
        }
        function getIsCustomTouchBehavior() {
            return getNormalizedTouchSettings()[0] === 'hold';
        }
        function getIsDefaultRenderFn() {
            var _instance$props$rende;
            return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
        }
        function getCurrentTarget() {
            return currentTarget || reference;
        }
        function getDocument() {
            var parent = getCurrentTarget().parentNode;
            return parent ? getOwnerDocument(parent) : document;
        }
        function getDefaultTemplateChildren() {
            return getChildren(popper);
        }
        function getDelay(isShow) {
            if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
                return 0;
            }
            return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
        }
        function handleStyles(fromHide) {
            if (fromHide === void 0) {
                fromHide = false;
            }
            popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
            popper.style.zIndex = "" + instance.props.zIndex;
        }
        function invokeHook(hook, args, shouldInvokePropsHook) {
            if (shouldInvokePropsHook === void 0) {
                shouldInvokePropsHook = true;
            }
            pluginsHooks.forEach(function(pluginHooks) {
                if (pluginHooks[hook]) {
                    pluginHooks[hook].apply(pluginHooks, args);
                }
            });
            if (shouldInvokePropsHook) {
                var _instance$props;
                (_instance$props = instance.props)[hook].apply(_instance$props, args);
            }
        }
        function handleAriaContentAttribute() {
            var aria = instance.props.aria;
            if (!aria.content) {
                return;
            }
            var attr = "aria-" + aria.content;
            var id = popper.id;
            var nodes = normalizeToArray(instance.props.triggerTarget || reference);
            nodes.forEach(function(node) {
                var currentValue = node.getAttribute(attr);
                if (instance.state.isVisible) {
                    node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
                } else {
                    var nextValue = currentValue && currentValue.replace(id, '').trim();
                    if (nextValue) {
                        node.setAttribute(attr, nextValue);
                    } else {
                        node.removeAttribute(attr);
                    }
                }
            });
        }
        function handleAriaExpandedAttribute() {
            if (hasAriaExpanded || !instance.props.aria.expanded) {
                return;
            }
            var nodes = normalizeToArray(instance.props.triggerTarget || reference);
            nodes.forEach(function(node) {
                if (instance.props.interactive) {
                    node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
                } else {
                    node.removeAttribute('aria-expanded');
                }
            });
        }
        function cleanupInteractiveMouseListeners() {
            getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
            mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
                return listener !== debouncedOnMouseMove;
            });
        }
        function onDocumentPress(event) {
            if (currentInput.isTouch) {
                if (didTouchMove || event.type === 'mousedown') {
                    return;
                }
            }
            var actualTarget = event.composedPath && event.composedPath()[0] || event.target;
            if (instance.props.interactive && actualContains(popper, actualTarget)) {
                return;
            }
            if (normalizeToArray(instance.props.triggerTarget || reference).some(function(el) {
                return actualContains(el, actualTarget);
            })) {
                if (currentInput.isTouch) {
                    return;
                }
                if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
                    return;
                }
            } else {
                invokeHook('onClickOutside', [
                    instance,
                    event
                ]);
            }
            if (instance.props.hideOnClick === true) {
                instance.clearDelayTimeouts();
                instance.hide();
                didHideDueToDocumentMouseDown = true;
                setTimeout(function() {
                    didHideDueToDocumentMouseDown = false;
                });
                if (!instance.state.isMounted) {
                    removeDocumentPress();
                }
            }
        }
        function onTouchMove() {
            didTouchMove = true;
        }
        function onTouchStart() {
            didTouchMove = false;
        }
        function addDocumentPress() {
            var doc = getDocument();
            doc.addEventListener('mousedown', onDocumentPress, true);
            doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
            doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
            doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
        }
        function removeDocumentPress() {
            var doc = getDocument();
            doc.removeEventListener('mousedown', onDocumentPress, true);
            doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
            doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
            doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
        }
        function onTransitionedOut(duration, callback) {
            onTransitionEnd(duration, function() {
                if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
                    callback();
                }
            });
        }
        function onTransitionedIn(duration, callback) {
            onTransitionEnd(duration, callback);
        }
        function onTransitionEnd(duration, callback) {
            var box = getDefaultTemplateChildren().box;
            function listener(event) {
                if (event.target === box) {
                    updateTransitionEndListener(box, 'remove', listener);
                    callback();
                }
            }
            if (duration === 0) {
                return callback();
            }
            updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
            updateTransitionEndListener(box, 'add', listener);
            currentTransitionEndListener = listener;
        }
        function on(eventType, handler, options) {
            if (options === void 0) {
                options = false;
            }
            var nodes = normalizeToArray(instance.props.triggerTarget || reference);
            nodes.forEach(function(node) {
                node.addEventListener(eventType, handler, options);
                listeners.push({
                    node: node,
                    eventType: eventType,
                    handler: handler,
                    options: options
                });
            });
        }
        function addListeners() {
            if (getIsCustomTouchBehavior()) {
                on('touchstart', onTrigger, {
                    passive: true
                });
                on('touchend', onMouseLeave, {
                    passive: true
                });
            }
            splitBySpaces(instance.props.trigger).forEach(function(eventType) {
                if (eventType === 'manual') {
                    return;
                }
                on(eventType, onTrigger);
                switch(eventType){
                    case 'mouseenter':
                        on('mouseleave', onMouseLeave);
                        break;
                    case 'focus':
                        on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
                        break;
                    case 'focusin':
                        on('focusout', onBlurOrFocusOut);
                        break;
                }
            });
        }
        function removeListeners() {
            listeners.forEach(function(_ref) {
                var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
                node.removeEventListener(eventType, handler, options);
            });
            listeners = [];
        }
        function onTrigger(event) {
            var _lastTriggerEvent;
            var shouldScheduleClickHide = false;
            if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
                return;
            }
            var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
            lastTriggerEvent = event;
            currentTarget = event.currentTarget;
            handleAriaExpandedAttribute();
            if (!instance.state.isVisible && isMouseEvent(event)) {
                mouseMoveListeners.forEach(function(listener) {
                    return listener(event);
                });
            }
            if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
                shouldScheduleClickHide = true;
            } else {
                scheduleShow(event);
            }
            if (event.type === 'click') {
                isVisibleFromClick = !shouldScheduleClickHide;
            }
            if (shouldScheduleClickHide && !wasFocused) {
                scheduleHide(event);
            }
        }
        function onMouseMove(event) {
            var target = event.target;
            var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);
            if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
                return;
            }
            var popperTreeData = getNestedPopperTree().concat(popper).map(function(popper) {
                var _instance$popperInsta;
                var instance = popper._tippy;
                var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;
                if (state) {
                    return {
                        popperRect: popper.getBoundingClientRect(),
                        popperState: state,
                        props: props
                    };
                }
                return null;
            }).filter(Boolean);
            if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
                cleanupInteractiveMouseListeners();
                scheduleHide(event);
            }
        }
        function onMouseLeave(event) {
            var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;
            if (shouldBail) {
                return;
            }
            if (instance.props.interactive) {
                instance.hideWithInteractivity(event);
                return;
            }
            scheduleHide(event);
        }
        function onBlurOrFocusOut(event) {
            if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
                return;
            }
            if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
                return;
            }
            scheduleHide(event);
        }
        function isEventListenerStopped(event) {
            return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
        }
        function createPopperInstance() {
            destroyPopperInstance();
            var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
            var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
            var computedReference = getReferenceClientRect ? {
                getBoundingClientRect: getReferenceClientRect,
                contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
            } : reference;
            var tippyModifier = {
                name: '$$tippy',
                enabled: true,
                phase: 'beforeWrite',
                requires: [
                    'computeStyles'
                ],
                fn: function fn(_ref2) {
                    var state = _ref2.state;
                    if (getIsDefaultRenderFn()) {
                        var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
                        [
                            'placement',
                            'reference-hidden',
                            'escaped'
                        ].forEach(function(attr) {
                            if (attr === 'placement') {
                                box.setAttribute('data-placement', state.placement);
                            } else {
                                if (state.attributes.popper["data-popper-" + attr]) {
                                    box.setAttribute("data-" + attr, '');
                                } else {
                                    box.removeAttribute("data-" + attr);
                                }
                            }
                        });
                        state.attributes.popper = {
                        };
                    }
                }
            };
            var modifiers = [
                {
                    name: 'offset',
                    options: {
                        offset: offset
                    }
                },
                {
                    name: 'preventOverflow',
                    options: {
                        padding: {
                            top: 2,
                            bottom: 2,
                            left: 5,
                            right: 5
                        }
                    }
                },
                {
                    name: 'flip',
                    options: {
                        padding: 5
                    }
                },
                {
                    name: 'computeStyles',
                    options: {
                        adaptive: !moveTransition
                    }
                },
                tippyModifier
            ];
            if (getIsDefaultRenderFn() && arrow) {
                modifiers.push({
                    name: 'arrow',
                    options: {
                        element: arrow,
                        padding: 3
                    }
                });
            }
            modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
            instance.popperInstance = core.createPopper(computedReference, popper, Object.assign({
            }, popperOptions, {
                placement: placement,
                onFirstUpdate: onFirstUpdate,
                modifiers: modifiers
            }));
        }
        function destroyPopperInstance() {
            if (instance.popperInstance) {
                instance.popperInstance.destroy();
                instance.popperInstance = null;
            }
        }
        function mount() {
            var appendTo = instance.props.appendTo;
            var parentNode;
            var node = getCurrentTarget();
            if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
                parentNode = node.parentNode;
            } else {
                parentNode = invokeWithArgsOrReturn(appendTo, [
                    node
                ]);
            }
            if (!parentNode.contains(popper)) {
                parentNode.appendChild(popper);
            }
            instance.state.isMounted = true;
            createPopperInstance();
            {
                warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, [
                    'Interactive tippy element may not be accessible via keyboard',
                    'navigation because it is not directly after the reference element',
                    'in the DOM source order.',
                    '\n\n',
                    'Using a wrapper <div> or <span> tag around the reference element',
                    'solves this by creating a new parentNode context.',
                    '\n\n',
                    'Specifying `appendTo: document.body` silences this warning, but it',
                    'assumes you are using a focus management solution to handle',
                    'keyboard navigation.',
                    '\n\n',
                    'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'
                ].join(' '));
            }
        }
        function getNestedPopperTree() {
            return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
        }
        function scheduleShow(event) {
            instance.clearDelayTimeouts();
            if (event) {
                invokeHook('onTrigger', [
                    instance,
                    event
                ]);
            }
            addDocumentPress();
            var delay = getDelay(true);
            var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
            if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
                delay = touchDelay;
            }
            if (delay) {
                showTimeout = setTimeout(function() {
                    instance.show();
                }, delay);
            } else {
                instance.show();
            }
        }
        function scheduleHide(event) {
            instance.clearDelayTimeouts();
            invokeHook('onUntrigger', [
                instance,
                event
            ]);
            if (!instance.state.isVisible) {
                removeDocumentPress();
                return;
            }
            if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && [
                'mouseleave',
                'mousemove'
            ].indexOf(event.type) >= 0 && isVisibleFromClick) {
                return;
            }
            var delay = getDelay(false);
            if (delay) {
                hideTimeout = setTimeout(function() {
                    if (instance.state.isVisible) {
                        instance.hide();
                    }
                }, delay);
            } else {
                scheduleHideAnimationFrame = requestAnimationFrame(function() {
                    instance.hide();
                });
            }
        }
        function enable() {
            instance.state.isEnabled = true;
        }
        function disable() {
            instance.hide();
            instance.state.isEnabled = false;
        }
        function clearDelayTimeouts() {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
            cancelAnimationFrame(scheduleHideAnimationFrame);
        }
        function setProps(partialProps) {
            {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
            }
            if (instance.state.isDestroyed) {
                return;
            }
            invokeHook('onBeforeUpdate', [
                instance,
                partialProps
            ]);
            removeListeners();
            var prevProps = instance.props;
            var nextProps = evaluateProps(reference, Object.assign({
            }, prevProps, removeUndefinedProps(partialProps), {
                ignoreAttributes: true
            }));
            instance.props = nextProps;
            addListeners();
            if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
                cleanupInteractiveMouseListeners();
                debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
            }
            if (prevProps.triggerTarget && !nextProps.triggerTarget) {
                normalizeToArray(prevProps.triggerTarget).forEach(function(node) {
                    node.removeAttribute('aria-expanded');
                });
            } else if (nextProps.triggerTarget) {
                reference.removeAttribute('aria-expanded');
            }
            handleAriaExpandedAttribute();
            handleStyles();
            if (onUpdate) {
                onUpdate(prevProps, nextProps);
            }
            if (instance.popperInstance) {
                createPopperInstance();
                getNestedPopperTree().forEach(function(nestedPopper) {
                    requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
                });
            }
            invokeHook('onAfterUpdate', [
                instance,
                partialProps
            ]);
        }
        function setContent(content) {
            instance.setProps({
                content: content
            });
        }
        function show() {
            {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
            }
            var isAlreadyVisible = instance.state.isVisible;
            var isDestroyed = instance.state.isDestroyed;
            var isDisabled = !instance.state.isEnabled;
            var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
            var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
            if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
                return;
            }
            if (getCurrentTarget().hasAttribute('disabled')) {
                return;
            }
            invokeHook('onShow', [
                instance
            ], false);
            if (instance.props.onShow(instance) === false) {
                return;
            }
            instance.state.isVisible = true;
            if (getIsDefaultRenderFn()) {
                popper.style.visibility = 'visible';
            }
            handleStyles();
            addDocumentPress();
            if (!instance.state.isMounted) {
                popper.style.transition = 'none';
            }
            if (getIsDefaultRenderFn()) {
                var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
                setTransitionDuration([
                    box,
                    content
                ], 0);
            }
            onFirstUpdate = function onFirstUpdate() {
                var _instance$popperInsta2;
                if (!instance.state.isVisible || ignoreOnFirstUpdate) {
                    return;
                }
                ignoreOnFirstUpdate = true;
                void popper.offsetHeight;
                popper.style.transition = instance.props.moveTransition;
                if (getIsDefaultRenderFn() && instance.props.animation) {
                    var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
                    setTransitionDuration([
                        _box,
                        _content
                    ], duration);
                    setVisibilityState([
                        _box,
                        _content
                    ], 'visible');
                }
                handleAriaContentAttribute();
                handleAriaExpandedAttribute();
                pushIfUnique(mountedInstances, instance);
                (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
                invokeHook('onMount', [
                    instance
                ]);
                if (instance.props.animation && getIsDefaultRenderFn()) {
                    onTransitionedIn(duration, function() {
                        instance.state.isShown = true;
                        invokeHook('onShown', [
                            instance
                        ]);
                    });
                }
            };
            mount();
        }
        function hide() {
            {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
            }
            var isAlreadyHidden = !instance.state.isVisible;
            var isDestroyed = instance.state.isDestroyed;
            var isDisabled = !instance.state.isEnabled;
            var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
            if (isAlreadyHidden || isDestroyed || isDisabled) {
                return;
            }
            invokeHook('onHide', [
                instance
            ], false);
            if (instance.props.onHide(instance) === false) {
                return;
            }
            instance.state.isVisible = false;
            instance.state.isShown = false;
            ignoreOnFirstUpdate = false;
            isVisibleFromClick = false;
            if (getIsDefaultRenderFn()) {
                popper.style.visibility = 'hidden';
            }
            cleanupInteractiveMouseListeners();
            removeDocumentPress();
            handleStyles(true);
            if (getIsDefaultRenderFn()) {
                var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
                if (instance.props.animation) {
                    setTransitionDuration([
                        box,
                        content
                    ], duration);
                    setVisibilityState([
                        box,
                        content
                    ], 'hidden');
                }
            }
            handleAriaContentAttribute();
            handleAriaExpandedAttribute();
            if (instance.props.animation) {
                if (getIsDefaultRenderFn()) {
                    onTransitionedOut(duration, instance.unmount);
                }
            } else {
                instance.unmount();
            }
        }
        function hideWithInteractivity(event) {
            {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
            }
            getDocument().addEventListener('mousemove', debouncedOnMouseMove);
            pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
            debouncedOnMouseMove(event);
        }
        function unmount() {
            {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
            }
            if (instance.state.isVisible) {
                instance.hide();
            }
            if (!instance.state.isMounted) {
                return;
            }
            destroyPopperInstance();
            getNestedPopperTree().forEach(function(nestedPopper) {
                nestedPopper._tippy.unmount();
            });
            if (popper.parentNode) {
                popper.parentNode.removeChild(popper);
            }
            mountedInstances = mountedInstances.filter(function(i) {
                return i !== instance;
            });
            instance.state.isMounted = false;
            invokeHook('onHidden', [
                instance
            ]);
        }
        function destroy() {
            {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
            }
            if (instance.state.isDestroyed) {
                return;
            }
            instance.clearDelayTimeouts();
            instance.unmount();
            removeListeners();
            delete reference._tippy;
            instance.state.isDestroyed = true;
            invokeHook('onDestroy', [
                instance
            ]);
        }
    }
    function tippy(targets, optionalProps) {
        if (optionalProps === void 0) {
            optionalProps = {
            };
        }
        var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
        {
            validateTargets(targets);
            validateProps(optionalProps, plugins);
        }
        bindGlobalEventListeners();
        var passedProps = Object.assign({
        }, optionalProps, {
            plugins: plugins
        });
        var elements = getArrayOfElements(targets);
        {
            var isSingleContentElement = isElement(passedProps.content);
            var isMoreThanOneReferenceElement = elements.length > 1;
            warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, [
                'tippy() was passed an Element as the `content` prop, but more than',
                'one tippy instance was created by this invocation. This means the',
                'content element will only be appended to the last tippy instance.',
                '\n\n',
                'Instead, pass the .innerHTML of the element, or use a function that',
                'returns a cloned version of the element instead.',
                '\n\n',
                '1) content: element.innerHTML\n',
                '2) content: () => element.cloneNode(true)'
            ].join(' '));
        }
        var instances = elements.reduce(function(acc, reference) {
            var instance = reference && createTippy(reference, passedProps);
            if (instance) {
                acc.push(instance);
            }
            return acc;
        }, []);
        return isElement(targets) ? instances[0] : instances;
    }
    tippy.defaultProps = defaultProps;
    tippy.setDefaultProps = setDefaultProps;
    tippy.currentInput = currentInput;
    var hideAll = function hideAll(_temp) {
        var _ref = _temp === void 0 ? {
        } : _temp, excludedReferenceOrInstance = _ref.exclude, duration = _ref.duration;
        mountedInstances.forEach(function(instance) {
            var isExcluded = false;
            if (excludedReferenceOrInstance) {
                isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
            }
            if (!isExcluded) {
                var originalDuration = instance.props.duration;
                instance.setProps({
                    duration: duration
                });
                instance.hide();
                if (!instance.state.isDestroyed) {
                    instance.setProps({
                        duration: originalDuration
                    });
                }
            }
        });
    };
    var applyStylesModifier = Object.assign({
    }, core.applyStyles, {
        effect: function effect(_ref) {
            var state = _ref.state;
            var initialStyles = {
                popper: {
                    position: state.options.strategy,
                    left: '0',
                    top: '0',
                    margin: '0'
                },
                arrow: {
                    position: 'absolute'
                },
                reference: {
                }
            };
            Object.assign(state.elements.popper.style, initialStyles.popper);
            state.styles = initialStyles;
            if (state.elements.arrow) {
                Object.assign(state.elements.arrow.style, initialStyles.arrow);
            }
        }
    });
    var createSingleton = function createSingleton(tippyInstances, optionalProps) {
        var _optionalProps$popper;
        if (optionalProps === void 0) {
            optionalProps = {
            };
        }
        {
            errorWhen(!Array.isArray(tippyInstances), [
                'The first argument passed to createSingleton() must be an array of',
                'tippy instances. The passed value was',
                String(tippyInstances)
            ].join(' '));
        }
        var individualInstances = tippyInstances;
        var references = [];
        var triggerTargets = [];
        var currentTarget;
        var overrides = optionalProps.overrides;
        var interceptSetPropsCleanups = [];
        var shownOnCreate = false;
        function setTriggerTargets() {
            triggerTargets = individualInstances.map(function(instance) {
                return normalizeToArray(instance.props.triggerTarget || instance.reference);
            }).reduce(function(acc, item) {
                return acc.concat(item);
            }, []);
        }
        function setReferences() {
            references = individualInstances.map(function(instance) {
                return instance.reference;
            });
        }
        function enableInstances(isEnabled) {
            individualInstances.forEach(function(instance) {
                if (isEnabled) {
                    instance.enable();
                } else {
                    instance.disable();
                }
            });
        }
        function interceptSetProps(singleton) {
            return individualInstances.map(function(instance) {
                var originalSetProps = instance.setProps;
                instance.setProps = function(props) {
                    originalSetProps(props);
                    if (instance.reference === currentTarget) {
                        singleton.setProps(props);
                    }
                };
                return function() {
                    instance.setProps = originalSetProps;
                };
            });
        }
        function prepareInstance(singleton, target) {
            var index = triggerTargets.indexOf(target);
            if (target === currentTarget) {
                return;
            }
            currentTarget = target;
            var overrideProps = (overrides || []).concat('content').reduce(function(acc, prop) {
                acc[prop] = individualInstances[index].props[prop];
                return acc;
            }, {
            });
            singleton.setProps(Object.assign({
            }, overrideProps, {
                getReferenceClientRect: typeof overrideProps.getReferenceClientRect === 'function' ? overrideProps.getReferenceClientRect : function() {
                    var _references$index;
                    return (_references$index = references[index]) == null ? void 0 : _references$index.getBoundingClientRect();
                }
            }));
        }
        enableInstances(false);
        setReferences();
        setTriggerTargets();
        var plugin = {
            fn: function fn() {
                return {
                    onDestroy: function onDestroy() {
                        enableInstances(true);
                    },
                    onHidden: function onHidden() {
                        currentTarget = null;
                    },
                    onClickOutside: function onClickOutside(instance) {
                        if (instance.props.showOnCreate && !shownOnCreate) {
                            shownOnCreate = true;
                            currentTarget = null;
                        }
                    },
                    onShow: function onShow(instance) {
                        if (instance.props.showOnCreate && !shownOnCreate) {
                            shownOnCreate = true;
                            prepareInstance(instance, references[0]);
                        }
                    },
                    onTrigger: function onTrigger(instance, event) {
                        prepareInstance(instance, event.currentTarget);
                    }
                };
            }
        };
        var singleton = tippy(div(), Object.assign({
        }, removeProperties(optionalProps, [
            'overrides'
        ]), {
            plugins: [
                plugin
            ].concat(optionalProps.plugins || []),
            triggerTarget: triggerTargets,
            popperOptions: Object.assign({
            }, optionalProps.popperOptions, {
                modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [
                    applyStylesModifier
                ])
            })
        }));
        var originalShow = singleton.show;
        singleton.show = function(target) {
            originalShow();
            if (!currentTarget && target == null) {
                return prepareInstance(singleton, references[0]);
            }
            if (currentTarget && target == null) {
                return;
            }
            if (typeof target === 'number') {
                return references[target] && prepareInstance(singleton, references[target]);
            }
            if (individualInstances.indexOf(target) >= 0) {
                var ref = target.reference;
                return prepareInstance(singleton, ref);
            }
            if (references.indexOf(target) >= 0) {
                return prepareInstance(singleton, target);
            }
        };
        singleton.showNext = function() {
            var first = references[0];
            if (!currentTarget) {
                return singleton.show(0);
            }
            var index = references.indexOf(currentTarget);
            singleton.show(references[index + 1] || first);
        };
        singleton.showPrevious = function() {
            var last = references[references.length - 1];
            if (!currentTarget) {
                return singleton.show(last);
            }
            var index = references.indexOf(currentTarget);
            var target = references[index - 1] || last;
            singleton.show(target);
        };
        var originalSetProps = singleton.setProps;
        singleton.setProps = function(props) {
            overrides = props.overrides || overrides;
            originalSetProps(props);
        };
        singleton.setInstances = function(nextInstances) {
            enableInstances(true);
            interceptSetPropsCleanups.forEach(function(fn) {
                return fn();
            });
            individualInstances = nextInstances;
            enableInstances(false);
            setReferences();
            setTriggerTargets();
            interceptSetPropsCleanups = interceptSetProps(singleton);
            singleton.setProps({
                triggerTarget: triggerTargets
            });
        };
        interceptSetPropsCleanups = interceptSetProps(singleton);
        return singleton;
    };
    var BUBBLING_EVENTS_MAP = {
        mouseover: 'mouseenter',
        focusin: 'focus',
        click: 'click'
    };
    function delegate(targets, props) {
        {
            errorWhen(!(props && props.target), [
                'You must specity a `target` prop indicating a CSS selector string matching',
                'the target elements that should receive a tippy.'
            ].join(' '));
        }
        var listeners = [];
        var childTippyInstances = [];
        var disabled = false;
        var target = props.target;
        var nativeProps = removeProperties(props, [
            'target'
        ]);
        var parentProps = Object.assign({
        }, nativeProps, {
            trigger: 'manual',
            touch: false
        });
        var childProps = Object.assign({
            touch: defaultProps.touch
        }, nativeProps, {
            showOnCreate: true
        });
        var returnValue = tippy(targets, parentProps);
        var normalizedReturnValue = normalizeToArray(returnValue);
        function onTrigger(event) {
            if (!event.target || disabled) {
                return;
            }
            var targetNode = event.target.closest(target);
            if (!targetNode) {
                return;
            }
            var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger;
            if (targetNode._tippy) {
                return;
            }
            if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
                return;
            }
            if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
                return;
            }
            var instance = tippy(targetNode, childProps);
            if (instance) {
                childTippyInstances = childTippyInstances.concat(instance);
            }
        }
        function on(node, eventType, handler, options) {
            if (options === void 0) {
                options = false;
            }
            node.addEventListener(eventType, handler, options);
            listeners.push({
                node: node,
                eventType: eventType,
                handler: handler,
                options: options
            });
        }
        function addEventListeners(instance) {
            var reference = instance.reference;
            on(reference, 'touchstart', onTrigger, TOUCH_OPTIONS);
            on(reference, 'mouseover', onTrigger);
            on(reference, 'focusin', onTrigger);
            on(reference, 'click', onTrigger);
        }
        function removeEventListeners() {
            listeners.forEach(function(_ref) {
                var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
                node.removeEventListener(eventType, handler, options);
            });
            listeners = [];
        }
        function applyMutations(instance) {
            var originalDestroy = instance.destroy;
            var originalEnable = instance.enable;
            var originalDisable = instance.disable;
            instance.destroy = function(shouldDestroyChildInstances) {
                if (shouldDestroyChildInstances === void 0) {
                    shouldDestroyChildInstances = true;
                }
                if (shouldDestroyChildInstances) {
                    childTippyInstances.forEach(function(instance) {
                        instance.destroy();
                    });
                }
                childTippyInstances = [];
                removeEventListeners();
                originalDestroy();
            };
            instance.enable = function() {
                originalEnable();
                childTippyInstances.forEach(function(instance) {
                    return instance.enable();
                });
                disabled = false;
            };
            instance.disable = function() {
                originalDisable();
                childTippyInstances.forEach(function(instance) {
                    return instance.disable();
                });
                disabled = true;
            };
            addEventListeners(instance);
        }
        normalizedReturnValue.forEach(applyMutations);
        return returnValue;
    }
    var animateFill = {
        name: 'animateFill',
        defaultValue: false,
        fn: function fn(instance) {
            var _instance$props$rende;
            if (!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy)) {
                {
                    errorWhen(instance.props.animateFill, 'The `animateFill` plugin requires the default render function.');
                }
                return {
                };
            }
            var _getChildren = getChildren(instance.popper), box = _getChildren.box, content = _getChildren.content;
            var backdrop = instance.props.animateFill ? createBackdropElement() : null;
            return {
                onCreate: function onCreate() {
                    if (backdrop) {
                        box.insertBefore(backdrop, box.firstElementChild);
                        box.setAttribute('data-animatefill', '');
                        box.style.overflow = 'hidden';
                        instance.setProps({
                            arrow: false,
                            animation: 'shift-away'
                        });
                    }
                },
                onMount: function onMount() {
                    if (backdrop) {
                        var transitionDuration = box.style.transitionDuration;
                        var duration = Number(transitionDuration.replace('ms', ''));
                        content.style.transitionDelay = Math.round(duration / 10) + "ms";
                        backdrop.style.transitionDuration = transitionDuration;
                        setVisibilityState([
                            backdrop
                        ], 'visible');
                    }
                },
                onShow: function onShow() {
                    if (backdrop) {
                        backdrop.style.transitionDuration = '0ms';
                    }
                },
                onHide: function onHide() {
                    if (backdrop) {
                        setVisibilityState([
                            backdrop
                        ], 'hidden');
                    }
                }
            };
        }
    };
    function createBackdropElement() {
        var backdrop = div();
        backdrop.className = BACKDROP_CLASS;
        setVisibilityState([
            backdrop
        ], 'hidden');
        return backdrop;
    }
    var mouseCoords = {
        clientX: 0,
        clientY: 0
    };
    var activeInstances = [];
    function storeMouseCoords(_ref) {
        var clientX = _ref.clientX, clientY = _ref.clientY;
        mouseCoords = {
            clientX: clientX,
            clientY: clientY
        };
    }
    function addMouseCoordsListener(doc) {
        doc.addEventListener('mousemove', storeMouseCoords);
    }
    function removeMouseCoordsListener(doc) {
        doc.removeEventListener('mousemove', storeMouseCoords);
    }
    var followCursor = {
        name: 'followCursor',
        defaultValue: false,
        fn: function fn(instance) {
            var reference = instance.reference;
            var doc = getOwnerDocument(instance.props.triggerTarget || reference);
            var isInternalUpdate = false;
            var wasFocusEvent = false;
            var isUnmounted = true;
            var prevProps = instance.props;
            function getIsInitialBehavior() {
                return instance.props.followCursor === 'initial' && instance.state.isVisible;
            }
            function addListener() {
                doc.addEventListener('mousemove', onMouseMove);
            }
            function removeListener() {
                doc.removeEventListener('mousemove', onMouseMove);
            }
            function unsetGetReferenceClientRect() {
                isInternalUpdate = true;
                instance.setProps({
                    getReferenceClientRect: null
                });
                isInternalUpdate = false;
            }
            function onMouseMove(event) {
                var isCursorOverReference = event.target ? reference.contains(event.target) : true;
                var followCursor = instance.props.followCursor;
                var clientX = event.clientX, clientY = event.clientY;
                var rect = reference.getBoundingClientRect();
                var relativeX = clientX - rect.left;
                var relativeY = clientY - rect.top;
                if (isCursorOverReference || !instance.props.interactive) {
                    instance.setProps({
                        getReferenceClientRect: function getReferenceClientRect() {
                            var rect = reference.getBoundingClientRect();
                            var x = clientX;
                            var y = clientY;
                            if (followCursor === 'initial') {
                                x = rect.left + relativeX;
                                y = rect.top + relativeY;
                            }
                            var top = followCursor === 'horizontal' ? rect.top : y;
                            var right = followCursor === 'vertical' ? rect.right : x;
                            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
                            var left = followCursor === 'vertical' ? rect.left : x;
                            return {
                                width: right - left,
                                height: bottom - top,
                                top: top,
                                right: right,
                                bottom: bottom,
                                left: left
                            };
                        }
                    });
                }
            }
            function create() {
                if (instance.props.followCursor) {
                    activeInstances.push({
                        instance: instance,
                        doc: doc
                    });
                    addMouseCoordsListener(doc);
                }
            }
            function destroy() {
                activeInstances = activeInstances.filter(function(data) {
                    return data.instance !== instance;
                });
                if (activeInstances.filter(function(data) {
                    return data.doc === doc;
                }).length === 0) {
                    removeMouseCoordsListener(doc);
                }
            }
            return {
                onCreate: create,
                onDestroy: destroy,
                onBeforeUpdate: function onBeforeUpdate() {
                    prevProps = instance.props;
                },
                onAfterUpdate: function onAfterUpdate(_, _ref2) {
                    var followCursor = _ref2.followCursor;
                    if (isInternalUpdate) {
                        return;
                    }
                    if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
                        destroy();
                        if (followCursor) {
                            create();
                            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
                                addListener();
                            }
                        } else {
                            removeListener();
                            unsetGetReferenceClientRect();
                        }
                    }
                },
                onMount: function onMount() {
                    if (instance.props.followCursor && !wasFocusEvent) {
                        if (isUnmounted) {
                            onMouseMove(mouseCoords);
                            isUnmounted = false;
                        }
                        if (!getIsInitialBehavior()) {
                            addListener();
                        }
                    }
                },
                onTrigger: function onTrigger(_, event) {
                    if (isMouseEvent(event)) {
                        mouseCoords = {
                            clientX: event.clientX,
                            clientY: event.clientY
                        };
                    }
                    wasFocusEvent = event.type === 'focus';
                },
                onHidden: function onHidden() {
                    if (instance.props.followCursor) {
                        unsetGetReferenceClientRect();
                        removeListener();
                        isUnmounted = true;
                    }
                }
            };
        }
    };
    function getProps(props, modifier) {
        var _props$popperOptions;
        return {
            popperOptions: Object.assign({
            }, props.popperOptions, {
                modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function(_ref) {
                    var name = _ref.name;
                    return name !== modifier.name;
                }), [
                    modifier
                ])
            })
        };
    }
    var inlinePositioning = {
        name: 'inlinePositioning',
        defaultValue: false,
        fn: function fn(instance) {
            var reference = instance.reference;
            function isEnabled() {
                return !!instance.props.inlinePositioning;
            }
            var placement;
            var cursorRectIndex = -1;
            var isInternalUpdate = false;
            var triedPlacements = [];
            var modifier = {
                name: 'tippyInlinePositioning',
                enabled: true,
                phase: 'afterWrite',
                fn: function fn(_ref2) {
                    var state = _ref2.state;
                    if (isEnabled()) {
                        if (triedPlacements.indexOf(state.placement) !== -1) {
                            triedPlacements = [];
                        }
                        if (placement !== state.placement && triedPlacements.indexOf(state.placement) === -1) {
                            triedPlacements.push(state.placement);
                            instance.setProps({
                                getReferenceClientRect: function getReferenceClientRect() {
                                    return _getReferenceClientRect(state.placement);
                                }
                            });
                        }
                        placement = state.placement;
                    }
                }
            };
            function _getReferenceClientRect(placement) {
                return getInlineBoundingClientRect(getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
            }
            function setInternalProps(partialProps) {
                isInternalUpdate = true;
                instance.setProps(partialProps);
                isInternalUpdate = false;
            }
            function addModifier() {
                if (!isInternalUpdate) {
                    setInternalProps(getProps(instance.props, modifier));
                }
            }
            return {
                onCreate: addModifier,
                onAfterUpdate: addModifier,
                onTrigger: function onTrigger(_, event) {
                    if (isMouseEvent(event)) {
                        var rects = arrayFrom(instance.reference.getClientRects());
                        var cursorRect = rects.find(function(rect) {
                            return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
                        });
                        var index = rects.indexOf(cursorRect);
                        cursorRectIndex = index > -1 ? index : cursorRectIndex;
                    }
                },
                onHidden: function onHidden() {
                    cursorRectIndex = -1;
                }
            };
        }
    };
    function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
        if (clientRects.length < 2 || currentBasePlacement === null) {
            return boundingRect;
        }
        if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
            return clientRects[cursorRectIndex] || boundingRect;
        }
        switch(currentBasePlacement){
            case 'top':
            case 'bottom':
                {
                    var firstRect = clientRects[0];
                    var lastRect = clientRects[clientRects.length - 1];
                    var isTop = currentBasePlacement === 'top';
                    var top = firstRect.top;
                    var bottom = lastRect.bottom;
                    var left = isTop ? firstRect.left : lastRect.left;
                    var right = isTop ? firstRect.right : lastRect.right;
                    var width = right - left;
                    var height = bottom - top;
                    return {
                        top: top,
                        bottom: bottom,
                        left: left,
                        right: right,
                        width: width,
                        height: height
                    };
                }
            case 'left':
            case 'right':
                {
                    var minLeft = Math.min.apply(Math, clientRects.map(function(rects) {
                        return rects.left;
                    }));
                    var maxRight = Math.max.apply(Math, clientRects.map(function(rects) {
                        return rects.right;
                    }));
                    var measureRects = clientRects.filter(function(rect) {
                        return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
                    });
                    var _top = measureRects[0].top;
                    var _bottom = measureRects[measureRects.length - 1].bottom;
                    var _left = minLeft;
                    var _right = maxRight;
                    var _width = _right - _left;
                    var _height = _bottom - _top;
                    return {
                        top: _top,
                        bottom: _bottom,
                        left: _left,
                        right: _right,
                        width: _width,
                        height: _height
                    };
                }
            default:
                {
                    return boundingRect;
                }
        }
    }
    var sticky = {
        name: 'sticky',
        defaultValue: false,
        fn: function fn(instance) {
            var reference = instance.reference, popper = instance.popper;
            function getReference() {
                return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
            }
            function shouldCheck(value) {
                return instance.props.sticky === true || instance.props.sticky === value;
            }
            var prevRefRect = null;
            var prevPopRect = null;
            function updatePosition() {
                var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
                var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;
                if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
                    if (instance.popperInstance) {
                        instance.popperInstance.update();
                    }
                }
                prevRefRect = currentRefRect;
                prevPopRect = currentPopRect;
                if (instance.state.isMounted) {
                    requestAnimationFrame(updatePosition);
                }
            }
            return {
                onMount: function onMount() {
                    if (instance.props.sticky) {
                        updatePosition();
                    }
                }
            };
        }
    };
    function areRectsDifferent(rectA, rectB) {
        if (rectA && rectB) {
            return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
        }
        return true;
    }
    if (isBrowser) {
        injectCSS(css);
    }
    tippy.setDefaultProps({
        plugins: [
            animateFill,
            followCursor,
            inlinePositioning,
            sticky
        ],
        render: render
    });
    tippy.createSingleton = createSingleton;
    tippy.delegate = delegate;
    tippy.hideAll = hideAll;
    tippy.roundArrow = ROUND_ARROW;
    return tippy;
});
class LazyImages {
    startLoadImage(url) {
        let img = new Image();
        img.src = url;
        return img;
    }
    start() {
        const observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach((entrie, n)=>{
                if (entrie.isIntersecting) {
                    let element = entrie.target;
                    if (!element.classList.contains('is-load')) {
                        let image = element.getAttribute('data-src');
                        this.startLoadImage(image).onload = ()=>{
                            element.style.backgroundImage = `url("${image}")`;
                            element.classList.add('is-loaded');
                        };
                    }
                }
            });
        });
        const images = document.querySelectorAll('.image.is-lazy');
        images.forEach((image, n)=>observer.observe(image)
        );
    }
}
class Navbar {
    static checkActiveLinks() {
        const links = document.querySelectorAll('.navbar-links .nav-item');
        for (const link of links){
            const path = link.dataset.nav;
            link.classList.remove('is-active');
            if (path == document.location.pathname) {
                link.classList.add('is-active');
            }
        }
    }
}
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e || self).autosize = t();
}(this, function() {
    var e, t, n = "function" == typeof Map ? new Map : (e = [], t = [], {
        has: function(t) {
            return e.indexOf(t) > -1;
        },
        get: function(n) {
            return t[e.indexOf(n)];
        },
        set: function(n, o) {
            -1 === e.indexOf(n) && (e.push(n), t.push(o));
        },
        delete: function(n) {
            var o = e.indexOf(n);
            o > -1 && (e.splice(o, 1), t.splice(o, 1));
        }
    }), o = function(e) {
        return new Event(e, {
            bubbles: !0
        });
    };
    try {
        new Event("test");
    } catch (e1) {
        o = function(e) {
            var t = document.createEvent("Event");
            return t.initEvent(e, !0, !1), t;
        };
    }
    function r(e) {
        var t = n.get(e);
        t && t.destroy();
    }
    function i(e) {
        var t = n.get(e);
        t && t.update();
    }
    var l = null;
    return "undefined" == typeof window || "function" != typeof window.getComputedStyle ? ((l = function(e) {
        return e;
    }).destroy = function(e) {
        return e;
    }, l.update = function(e) {
        return e;
    }) : ((l = function(e, t) {
        return e && Array.prototype.forEach.call(e.length ? e : [
            e
        ], function(e) {
            return (function(e) {
                if (e && e.nodeName && "TEXTAREA" === e.nodeName && !n.has(e)) {
                    var t, r = null, i = null, l = null, d = function() {
                        e.clientWidth !== i && c();
                    }, u = (function(t) {
                        window.removeEventListener("resize", d, !1), e.removeEventListener("input", c, !1), e.removeEventListener("keyup", c, !1), e.removeEventListener("autosize:destroy", u, !1), e.removeEventListener("autosize:update", c, !1), Object.keys(t).forEach(function(n) {
                            e.style[n] = t[n];
                        }), n.delete(e);
                    }).bind(e, {
                        height: e.style.height,
                        resize: e.style.resize,
                        overflowY: e.style.overflowY,
                        overflowX: e.style.overflowX,
                        wordWrap: e.style.wordWrap
                    });
                    e.addEventListener("autosize:destroy", u, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", c, !1), window.addEventListener("resize", d, !1), e.addEventListener("input", c, !1), e.addEventListener("autosize:update", c, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", n.set(e, {
                        destroy: u,
                        update: c
                    }), "vertical" === (t = window.getComputedStyle(e, null)).resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), r = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(r) && (r = 0), c();
                }
                function a(t) {
                    var n = e.style.width;
                    e.style.width = "0px", e.style.width = n, e.style.overflowY = t;
                }
                function s() {
                    if (0 !== e.scrollHeight) {
                        var t = function(e) {
                            for(var t = []; e && e.parentNode && e.parentNode instanceof Element;)e.parentNode.scrollTop && t.push({
                                node: e.parentNode,
                                scrollTop: e.parentNode.scrollTop
                            }), e = e.parentNode;
                            return t;
                        }(e), n = document.documentElement && document.documentElement.scrollTop;
                        e.style.height = "", e.style.height = e.scrollHeight + r + "px", i = e.clientWidth, t.forEach(function(e) {
                            e.node.scrollTop = e.scrollTop;
                        }), n && (document.documentElement.scrollTop = n);
                    }
                }
                function c() {
                    s();
                    var t = Math.round(parseFloat(e.style.height)), n = window.getComputedStyle(e, null), r = "content-box" === n.boxSizing ? Math.round(parseFloat(n.height)) : e.offsetHeight;
                    if (r < t ? "hidden" === n.overflowY && (a("scroll"), s(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== n.overflowY && (a("hidden"), s(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), l !== r) {
                        l = r;
                        var i = o("autosize:resized");
                        try {
                            e.dispatchEvent(i);
                        } catch (e2) {
                        }
                    }
                }
            })(e);
        }), e;
    }).destroy = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [
            e
        ], r), e;
    }, l.update = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [
            e
        ], i), e;
    }), l;
});
class Router {
    constructor(){
        this.pagesFunctions = [];
    }
    getPath() {
        return window.location.pathname;
    }
    static getPath() {
        return window.location.pathname;
    }
    onPage(page, callback) {
        if (typeof page == 'undefined' || typeof callback == 'undefined') {
            console.warn('No se agrego la funcion por que no se pasaron los parametros');
        } else {
            this.pagesFunctions.push({
                page: page,
                function: callback
            });
        }
    }
    run() {
        this.pagesFunctions.forEach((fun)=>{
            let matches = this.getPath().match(new RegExp('^' + fun.page + '$'));
            matches = matches == null ? false : matches;
            if (matches && typeof fun.function === 'function') {
                if (matches.length > 1) {
                    matches = matches.slice(1);
                    fun.function(...matches);
                } else {
                    fun.function();
                }
            }
        });
    }
}
const global = (name, content)=>{
    window[name] = content;
};
const sharePost = ()=>{
    const copyUrl = (url)=>{
        navigator.clipboard.writeText(url).then(function() {
            alert('Enlace copiado');
        }, function(err) {
            alert('error al copiar');
        });
    };
    global('copyPostUrl', copyUrl);
    tippy('.share-post', {
        content: (reference)=>{
            const url = encodeURIComponent(reference.dataset.url);
            const links = {
                facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?text=${url}`,
                whatsapp: `https://api.whatsapp.com/send?text=${url}`
            };
            return `<div class="post-share">
        <a href="${links.facebook}" target='_blank'>
            <i class="brand-facebook"></i>&nbsp;
            Facebook
        </a>
        <a href="${links.twitter}" target='_blank'>
            <i class="brand-twitter"></i>&nbsp;
            Twitter
        </a>
        <a href="${links.whatsapp}" target='_blank'>
            <i class="brand-whatsapp"></i>&nbsp;
            WhatsApp
        </a>
        <button onclick='copyPostUrl("${reference.dataset.url}")'>
            <i data-icon='content_copy'></i>&nbsp;
            Copiar
        </button>
    </div>`;
        },
        interactive: true,
        placement: 'bottom',
        trigger: 'click',
        allowHTML: true,
        theme: 'socialcube'
    });
};
class Scrolly {
    load = false;
    loadall = false;
    offset = 5;
    scrollPosition() {
        const scrollHeight = document.body.scrollHeight;
        const scrollbarHeight = window.innerHeight;
        const viewposition = window.scrollY + scrollbarHeight - 5;
        return 100 * viewposition / scrollHeight;
    }
    reset() {
        this.load = false;
        this.loadall = false;
        this.offset = 5;
    }
    finish() {
        document.getElementById('loading-svg').style.display = 'none';
    }
    start() {
        window.addEventListener("scroll", (event)=>{
            const userPosts = /^\/@/.test(Router.getPath());
            const checkPath = Router.getPath() === '/' || userPosts ? true : false;
            if (this.scrollPosition() > 70 && !this.load && !this.loadall && checkPath) {
                this.load = true;
                const container = document.getElementById('posts-container');
                const url = `${baseUrl}api/content?limit=5&offset=${this.offset}${userPosts ? '&user=' + Router.getPath().match(/\w+/g)[0] : ''}`;
                console.log(url);
                fetch(url).then((r)=>r.json()
                ).then((response)=>{
                    this.offset += 5;
                    container.insertAdjacentHTML('beforeend', response.content);
                    if (!response.next) {
                        this.loadall = true;
                        this.finish();
                    }
                    const lazyImages = new LazyImages();
                    lazyImages.start();
                    sharePost();
                    this.load = false;
                });
            }
        });
    }
}
const router = new Router();
const scrolly = new Scrolly();
scrolly.start();
router.onPage('/', ()=>{
    scrolly.reset();
    sharePost();
});
router.onPage('/@(.*)', ()=>{
    scrolly.reset();
    sharePost();
});
router.onPage('/p/(.*)', ()=>{
    sharePost();
});
router.onPage('/new', ()=>{
    autosize(document.querySelectorAll('textarea'));
});
router.onPage('/user/update', ()=>{
    autosize(document.querySelectorAll('textarea'));
});
class Store {
    static store = {
    };
    static get(name) {
        if (name in this.store) {
            return this.store[name];
        } else {
            return false;
        }
    }
    static set(name, value) {
        this.store[name] = value;
    }
    static print(json = false) {
        console.log(json ? JSON.stringify(this.store) : this.store);
    }
    static start(init = {
    }) {
        this.store = init;
    }
}
(function e(t, n) {
    if (typeof exports === "object" && typeof module === "object") module.exports = n();
    else if (typeof define === "function" && define.amd) define([], n);
    else if (typeof exports === "object") exports["Swup"] = n();
    else t["Swup"] = n();
})(window, function() {
    return (function(e) {
        var t = {
        };
        function n(r) {
            if (t[r]) {
                return t[r].exports;
            }
            var i = t[r] = {
                i: r,
                l: false,
                exports: {
                }
            };
            e[r].call(i.exports, i, i.exports, n);
            i.l = true;
            return i.exports;
        }
        n.m = e;
        n.c = t;
        n.d = function(e, t, r) {
            if (!n.o(e, t)) {
                Object.defineProperty(e, t, {
                    enumerable: true,
                    get: r
                });
            }
        };
        n.r = function(e) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        };
        n.t = function(e, t) {
            if (t & 1) e = n(e);
            if (t & 8) return e;
            if (t & 4 && typeof e === "object" && e && e.__esModule) return e;
            var r = Object.create(null);
            n.r(r);
            Object.defineProperty(r, "default", {
                enumerable: true,
                value: e
            });
            if (t & 2 && typeof e != "string") for(var i in e)n.d(r, i, (function(t) {
                return e[t];
            }).bind(null, i));
            return r;
        };
        n.n = function(e) {
            var t = e && e.__esModule ? function t() {
                return e["default"];
            } : function t() {
                return e;
            };
            n.d(t, "a", t);
            return t;
        };
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        };
        n.p = "";
        return n(n.s = 2);
    })([
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.Link = t.markSwupElements = t.getCurrentUrl = t.transitionEnd = t.fetch = t.getDataFromHtml = t.createHistoryRecord = t.classify = undefined;
            var r = n(8);
            var i = w(r);
            var a = n(9);
            var o = w(a);
            var s = n(10);
            var u = w(s);
            var l = n(11);
            var c = w(l);
            var f = n(12);
            var d = w(f);
            var h = n(13);
            var p = w(h);
            var v = n(14);
            var g = w(v);
            var m = n(15);
            var y = w(m);
            function w(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var b = t.classify = i.default;
            var E = t.createHistoryRecord = o.default;
            var P = t.getDataFromHtml = u.default;
            var _ = t.fetch = c.default;
            var k = t.transitionEnd = d.default;
            var S = t.getCurrentUrl = p.default;
            var O = t.markSwupElements = g.default;
            var j = t.Link = y.default;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = t.query = function e(t) {
                var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
                if (typeof t !== "string") {
                    return t;
                }
                return n.querySelector(t);
            };
            var i = t.queryAll = function e(t) {
                var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
                if (typeof t !== "string") {
                    return t;
                }
                return Array.prototype.slice.call(n.querySelectorAll(t));
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(3);
            var i = a(r);
            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = i.default;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = Object.assign || function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = arguments[t];
                    for(var r in n){
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            var i = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            var a = n(4);
            var o = M(a);
            var s = n(6);
            var u = M(s);
            var l = n(7);
            var c = M(l);
            var f = n(16);
            var d = M(f);
            var h = n(17);
            var p = M(h);
            var v = n(18);
            var g = M(v);
            var m = n(19);
            var y = M(m);
            var w = n(20);
            var b = M(w);
            var E = n(21);
            var P = M(E);
            var _ = n(22);
            var k = M(_);
            var S = n(23);
            var O = n(1);
            var j = n(0);
            function M(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function H(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var L = function() {
                function e(t) {
                    H(this, e);
                    var n = {
                        animateHistoryBrowsing: false,
                        animationSelector: '[class*="transition-"]',
                        linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
                        cache: true,
                        containers: [
                            "#swup"
                        ],
                        requestHeaders: {
                            "X-Requested-With": "swup",
                            Accept: "text/html, application/xhtml+xml"
                        },
                        plugins: [],
                        skipPopStateHandling: function e(t) {
                            return !(t.state && t.state.source === "swup");
                        }
                    };
                    var i = r({
                    }, n, t);
                    this._handlers = {
                        animationInDone: [],
                        animationInStart: [],
                        animationOutDone: [],
                        animationOutStart: [],
                        animationSkipped: [],
                        clickLink: [],
                        contentReplaced: [],
                        disabled: [],
                        enabled: [],
                        openPageInNewTab: [],
                        pageLoaded: [],
                        pageRetrievedFromCache: [],
                        pageView: [],
                        popState: [],
                        samePage: [],
                        samePageWithHash: [],
                        serverError: [],
                        transitionStart: [],
                        transitionEnd: [],
                        willReplaceContent: []
                    };
                    this.scrollToElement = null;
                    this.preloadPromise = null;
                    this.options = i;
                    this.plugins = [];
                    this.transition = {
                    };
                    this.delegatedListeners = {
                    };
                    this.boundPopStateHandler = this.popStateHandler.bind(this);
                    this.cache = new u.default;
                    this.cache.swup = this;
                    this.loadPage = c.default;
                    this.renderPage = d.default;
                    this.triggerEvent = p.default;
                    this.on = g.default;
                    this.off = y.default;
                    this.updateTransition = b.default;
                    this.getAnimationPromises = P.default;
                    this.getPageData = k.default;
                    this.log = function() {
                    };
                    this.use = S.use;
                    this.unuse = S.unuse;
                    this.findPlugin = S.findPlugin;
                    this.enable();
                }
                i(e, [
                    {
                        key: "enable",
                        value: function e() {
                            var t = this;
                            if (typeof Promise === "undefined") {
                                console.warn("Promise is not supported");
                                return;
                            }
                            this.delegatedListeners.click = (0, o.default)(document, this.options.linkSelector, "click", this.linkClickHandler.bind(this));
                            window.addEventListener("popstate", this.boundPopStateHandler);
                            var n = (0, j.getDataFromHtml)(document.documentElement.outerHTML, this.options.containers);
                            n.url = n.responseURL = (0, j.getCurrentUrl)();
                            if (this.options.cache) {
                                this.cache.cacheUrl(n);
                            }
                            (0, j.markSwupElements)(document.documentElement, this.options.containers);
                            this.options.plugins.forEach(function(e) {
                                t.use(e);
                            });
                            window.history.replaceState(Object.assign({
                            }, window.history.state, {
                                url: window.location.href,
                                random: Math.random(),
                                source: "swup"
                            }), document.title, window.location.href);
                            this.triggerEvent("enabled");
                            document.documentElement.classList.add("swup-enabled");
                            this.triggerEvent("pageView");
                        }
                    },
                    {
                        key: "destroy",
                        value: function e() {
                            var t = this;
                            this.delegatedListeners.click.destroy();
                            window.removeEventListener("popstate", this.boundPopStateHandler);
                            this.cache.empty();
                            this.options.plugins.forEach(function(e) {
                                t.unuse(e);
                            });
                            (0, O.queryAll)("[data-swup]").forEach(function(e) {
                                e.removeAttribute("data-swup");
                            });
                            this.off();
                            this.triggerEvent("disabled");
                            document.documentElement.classList.remove("swup-enabled");
                        }
                    },
                    {
                        key: "linkClickHandler",
                        value: function e(t) {
                            if (!t.metaKey && !t.ctrlKey && !t.shiftKey && !t.altKey) {
                                if (t.button === 0) {
                                    this.triggerEvent("clickLink", t);
                                    t.preventDefault();
                                    var n = new j.Link(t.delegateTarget);
                                    if (n.getAddress() == (0, j.getCurrentUrl)() || n.getAddress() == "") {
                                        if (n.getHash() != "") {
                                            this.triggerEvent("samePageWithHash", t);
                                            var r = document.querySelector(n.getHash());
                                            if (r != null) {
                                                history.replaceState({
                                                    url: n.getAddress() + n.getHash(),
                                                    random: Math.random(),
                                                    source: "swup"
                                                }, document.title, n.getAddress() + n.getHash());
                                            } else {
                                                console.warn("Element for offset not found (" + n.getHash() + ")");
                                            }
                                        } else {
                                            this.triggerEvent("samePage", t);
                                        }
                                    } else {
                                        if (n.getHash() != "") {
                                            this.scrollToElement = n.getHash();
                                        }
                                        var i = t.delegateTarget.getAttribute("data-swup-transition");
                                        this.loadPage({
                                            url: n.getAddress(),
                                            customTransition: i
                                        }, false);
                                    }
                                }
                            } else {
                                this.triggerEvent("openPageInNewTab", t);
                            }
                        }
                    },
                    {
                        key: "popStateHandler",
                        value: function e(t) {
                            if (this.options.skipPopStateHandling(t)) return;
                            var n = new j.Link(t.state ? t.state.url : window.location.pathname);
                            if (n.getHash() !== "") {
                                this.scrollToElement = n.getHash();
                            } else {
                                t.preventDefault();
                            }
                            this.triggerEvent("popState", t);
                            this.loadPage({
                                url: n.getAddress()
                            }, t);
                        }
                    }
                ]);
                return e;
            }();
            t.default = L;
        },
        function(e, t, n) {
            var r = n(5);
            function i(e, t, n, r, i) {
                var o = a.apply(this, arguments);
                e.addEventListener(n, o, i);
                return {
                    destroy: function() {
                        e.removeEventListener(n, o, i);
                    }
                };
            }
            function a(e, t, n, i) {
                return function(n) {
                    n.delegateTarget = r(n.target, t);
                    if (n.delegateTarget) {
                        i.call(e, n);
                    }
                };
            }
            e.exports = i;
        },
        function(e, t) {
            var n = 9;
            if (typeof Element !== "undefined" && !Element.prototype.matches) {
                var r = Element.prototype;
                r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector;
            }
            function i(e, t) {
                while(e && e.nodeType !== n){
                    if (typeof e.matches === "function" && e.matches(t)) {
                        return e;
                    }
                    e = e.parentNode;
                }
            }
            e.exports = i;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            function i(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var a = t.Cache = function() {
                function e() {
                    i(this, e);
                    this.pages = {
                    };
                    this.last = null;
                }
                r(e, [
                    {
                        key: "cacheUrl",
                        value: function e(t) {
                            if (t.url in this.pages === false) {
                                this.pages[t.url] = t;
                            }
                            this.last = this.pages[t.url];
                            this.swup.log("Cache (" + Object.keys(this.pages).length + ")", this.pages);
                        }
                    },
                    {
                        key: "getPage",
                        value: function e(t) {
                            return this.pages[t];
                        }
                    },
                    {
                        key: "getCurrentPage",
                        value: function e() {
                            return this.getPage(window.location.pathname + window.location.search);
                        }
                    },
                    {
                        key: "exists",
                        value: function e(t) {
                            return t in this.pages;
                        }
                    },
                    {
                        key: "empty",
                        value: function e() {
                            this.pages = {
                            };
                            this.last = null;
                            this.swup.log("Cache cleared");
                        }
                    },
                    {
                        key: "remove",
                        value: function e(t) {
                            delete this.pages[t];
                        }
                    }
                ]);
                return e;
            }();
            t.default = a;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = Object.assign || function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = arguments[t];
                    for(var r in n){
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            var i = n(0);
            var a = function e(t, n) {
                var a = this;
                var o = [], s = void 0;
                var u = function e() {
                    a.triggerEvent("animationOutStart");
                    document.documentElement.classList.add("is-changing");
                    document.documentElement.classList.add("is-leaving");
                    document.documentElement.classList.add("is-animating");
                    if (n) {
                        document.documentElement.classList.add("is-popstate");
                    }
                    document.documentElement.classList.add("to-" + (0, i.classify)(t.url));
                    o = a.getAnimationPromises("out");
                    Promise.all(o).then(function() {
                        a.triggerEvent("animationOutDone");
                    });
                    if (!n) {
                        var r = void 0;
                        if (a.scrollToElement != null) {
                            r = t.url + a.scrollToElement;
                        } else {
                            r = t.url;
                        }
                        (0, i.createHistoryRecord)(r);
                    }
                };
                this.triggerEvent("transitionStart", n);
                if (t.customTransition != null) {
                    this.updateTransition(window.location.pathname, t.url, t.customTransition);
                    document.documentElement.classList.add("to-" + (0, i.classify)(t.customTransition));
                } else {
                    this.updateTransition(window.location.pathname, t.url);
                }
                if (!n || this.options.animateHistoryBrowsing) {
                    u();
                } else {
                    this.triggerEvent("animationSkipped");
                }
                if (this.cache.exists(t.url)) {
                    s = new Promise(function(e) {
                        e();
                    });
                    this.triggerEvent("pageRetrievedFromCache");
                } else {
                    if (!this.preloadPromise || this.preloadPromise.route != t.url) {
                        s = new Promise(function(e, n) {
                            (0, i.fetch)(r({
                            }, t, {
                                headers: a.options.requestHeaders
                            }), function(r) {
                                if (r.status === 500) {
                                    a.triggerEvent("serverError");
                                    n(t.url);
                                    return;
                                } else {
                                    var i = a.getPageData(r);
                                    if (i != null) {
                                        i.url = t.url;
                                    } else {
                                        n(t.url);
                                        return;
                                    }
                                    a.cache.cacheUrl(i);
                                    a.triggerEvent("pageLoaded");
                                }
                                e();
                            });
                        });
                    } else {
                        s = this.preloadPromise;
                    }
                }
                Promise.all(o.concat([
                    s
                ])).then(function() {
                    a.renderPage(a.cache.getPage(t.url), n);
                    a.preloadPromise = null;
                }).catch(function(e) {
                    a.options.skipPopStateHandling = function() {
                        window.location = e;
                        return true;
                    };
                    window.history.go(-1);
                });
            };
            t.default = a;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e(t) {
                var n = t.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
                if (n[0] === "/") n = n.splice(1);
                if (n === "") n = "homepage";
                return n;
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e(t) {
                window.history.pushState({
                    url: t || window.location.href.split(window.location.hostname)[1],
                    random: Math.random(),
                    source: "swup"
                }, document.getElementsByTagName("title")[0].innerText, t || window.location.href.split(window.location.hostname)[1]);
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
                return typeof e;
            } : function(e) {
                return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            };
            var i = n(1);
            var a = function e(t, n) {
                var a = document.createElement("html");
                a.innerHTML = t;
                var o = [];
                var s = function e(t) {
                    if (a.querySelector(n[t]) == null) {
                        return {
                            v: null
                        };
                    } else {
                        (0, i.queryAll)(n[t]).forEach(function(e, r) {
                            (0, i.queryAll)(n[t], a)[r].setAttribute("data-swup", o.length);
                            o.push((0, i.queryAll)(n[t], a)[r].outerHTML);
                        });
                    }
                };
                for(var u = 0; u < n.length; u++){
                    var l = s(u);
                    if ((typeof l === "undefined" ? "undefined" : r(l)) === "object") return l.v;
                }
                var c = {
                    title: a.querySelector("title").innerText,
                    pageClass: a.querySelector("body").className,
                    originalContent: t,
                    blocks: o
                };
                a.innerHTML = "";
                a = null;
                return c;
            };
            t.default = a;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = Object.assign || function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = arguments[t];
                    for(var r in n){
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            var i = function e(t) {
                var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var i = {
                    url: window.location.pathname + window.location.search,
                    method: "GET",
                    data: null,
                    headers: {
                    }
                };
                var a = r({
                }, i, t);
                var o = new XMLHttpRequest;
                o.onreadystatechange = function() {
                    if (o.readyState === 4) {
                        if (o.status !== 500) {
                            n(o);
                        } else {
                            n(o);
                        }
                    }
                };
                o.open(a.method, a.url, true);
                Object.keys(a.headers).forEach(function(e) {
                    o.setRequestHeader(e, a.headers[e]);
                });
                o.send(a.data);
                return o;
            };
            t.default = i;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e() {
                var t = document.createElement("div");
                var n = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for(var r in n){
                    if (t.style[r] !== undefined) {
                        return n[r];
                    }
                }
                return false;
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e() {
                return window.location.pathname + window.location.search;
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = n(1);
            var i = function e(t, n) {
                var i = 0;
                var a = function e(a) {
                    if (t.querySelector(n[a]) == null) {
                        console.warn("Element " + n[a] + " is not in current page.");
                    } else {
                        (0, r.queryAll)(n[a]).forEach(function(e, o) {
                            (0, r.queryAll)(n[a], t)[o].setAttribute("data-swup", i);
                            i++;
                        });
                    }
                };
                for(var o = 0; o < n.length; o++){
                    a(o);
                }
            };
            t.default = i;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            function i(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var a = function() {
                function e(t) {
                    i(this, e);
                    if (t instanceof Element || t instanceof SVGElement) {
                        this.link = t;
                    } else {
                        this.link = document.createElement("a");
                        this.link.href = t;
                    }
                }
                r(e, [
                    {
                        key: "getPath",
                        value: function e() {
                            var t = this.link.pathname;
                            if (t[0] !== "/") {
                                t = "/" + t;
                            }
                            return t;
                        }
                    },
                    {
                        key: "getAddress",
                        value: function e() {
                            var t = this.link.pathname + this.link.search;
                            if (this.link.getAttribute("xlink:href")) {
                                t = this.link.getAttribute("xlink:href");
                            }
                            if (t[0] !== "/") {
                                t = "/" + t;
                            }
                            return t;
                        }
                    },
                    {
                        key: "getHash",
                        value: function e() {
                            return this.link.hash;
                        }
                    }
                ]);
                return e;
            }();
            t.default = a;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = Object.assign || function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = arguments[t];
                    for(var r in n){
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            var i = n(1);
            var a = n(0);
            var o = function e(t, n) {
                var i = this;
                document.documentElement.classList.remove("is-leaving");
                var o = new a.Link(t.responseURL);
                if (window.location.pathname !== o.getPath()) {
                    window.history.replaceState({
                        url: o.getPath(),
                        random: Math.random(),
                        source: "swup"
                    }, document.title, o.getPath());
                    this.cache.cacheUrl(r({
                    }, t, {
                        url: o.getPath()
                    }));
                }
                if (!n || this.options.animateHistoryBrowsing) {
                    document.documentElement.classList.add("is-rendering");
                }
                this.triggerEvent("willReplaceContent", n);
                for(var s = 0; s < t.blocks.length; s++){
                    document.body.querySelector('[data-swup="' + s + '"]').outerHTML = t.blocks[s];
                }
                document.title = t.title;
                this.triggerEvent("contentReplaced", n);
                this.triggerEvent("pageView", n);
                if (!this.options.cache) {
                    this.cache.empty();
                }
                setTimeout(function() {
                    if (!n || i.options.animateHistoryBrowsing) {
                        i.triggerEvent("animationInStart");
                        document.documentElement.classList.remove("is-animating");
                    }
                }, 10);
                if (!n || this.options.animateHistoryBrowsing) {
                    var u = this.getAnimationPromises("in");
                    Promise.all(u).then(function() {
                        i.triggerEvent("animationInDone");
                        i.triggerEvent("transitionEnd", n);
                        document.documentElement.className.split(" ").forEach(function(e) {
                            if (new RegExp("^to-").test(e) || e === "is-changing" || e === "is-rendering" || e === "is-popstate") {
                                document.documentElement.classList.remove(e);
                            }
                        });
                    });
                } else {
                    this.triggerEvent("transitionEnd", n);
                }
                this.scrollToElement = null;
            };
            t.default = o;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e(t, n) {
                this._handlers[t].forEach(function(e) {
                    try {
                        e(n);
                    } catch (e1) {
                        console.error(e1);
                    }
                });
                var r = new CustomEvent("swup:" + t, {
                    detail: t
                });
                document.dispatchEvent(r);
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e(t, n) {
                if (this._handlers[t]) {
                    this._handlers[t].push(n);
                } else {
                    console.warn("Unsupported event " + t + ".");
                }
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e(t, n) {
                var r = this;
                if (t != null) {
                    if (n != null) {
                        if (this._handlers[t] && this._handlers[t].filter(function(e) {
                            return e === n;
                        }).length) {
                            var i = this._handlers[t].filter(function(e) {
                                return e === n;
                            })[0];
                            var a = this._handlers[t].indexOf(i);
                            if (a > -1) {
                                this._handlers[t].splice(a, 1);
                            }
                        } else {
                            console.warn("Handler for event '" + t + "' no found.");
                        }
                    } else {
                        this._handlers[t] = [];
                    }
                } else {
                    Object.keys(this._handlers).forEach(function(e) {
                        r._handlers[e] = [];
                    });
                }
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function e(t, n, r) {
                this.transition = {
                    from: t,
                    to: n,
                    custom: r
                };
            };
            t.default = r;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = n(1);
            var i = n(0);
            var a = function e() {
                var t = [];
                var n = (0, r.queryAll)(this.options.animationSelector);
                n.forEach(function(e) {
                    var n = new Promise(function(t) {
                        e.addEventListener((0, i.transitionEnd)(), function(n) {
                            if (e == n.target) {
                                t();
                            }
                        });
                    });
                    t.push(n);
                });
                return t;
            };
            t.default = a;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = n(0);
            var i = function e(t) {
                var n = t.responseText;
                var i = (0, r.getDataFromHtml)(n, this.options.containers);
                if (i) {
                    i.responseURL = t.responseURL ? t.responseURL : window.location.href;
                } else {
                    console.warn("Received page is invalid.");
                    return null;
                }
                return i;
            };
            t.default = i;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = t.use = function e(t) {
                if (!t.isSwupPlugin) {
                    console.warn("Not swup plugin instance " + t + ".");
                    return;
                }
                this.plugins.push(t);
                t.swup = this;
                if (typeof t._beforeMount === "function") {
                    t._beforeMount();
                }
                t.mount();
                return this.plugins;
            };
            var i = t.unuse = function e(t) {
                var n = void 0;
                if (typeof t === "string") {
                    n = this.plugins.find(function(e) {
                        return t === e.name;
                    });
                } else {
                    n = t;
                }
                if (!n) {
                    console.warn("No such plugin.");
                    return;
                }
                n.unmount();
                if (typeof n._afterUnmount === "function") {
                    n._afterUnmount();
                }
                var r = this.plugins.indexOf(n);
                this.plugins.splice(r, 1);
                return this.plugins;
            };
            var a = t.findPlugin = function e(t) {
                return this.plugins.find(function(e) {
                    return t === e.name;
                });
            };
        }
    ]);
});
(function e(t, n) {
    if (typeof exports === "object" && typeof module === "object") module.exports = n();
    else if (typeof define === "function" && define.amd) define([], n);
    else if (typeof exports === "object") exports["SwupProgressPlugin"] = n();
    else t["SwupProgressPlugin"] = n();
})(window, function() {
    return (function(e) {
        var t = {
        };
        function n(r) {
            if (t[r]) {
                return t[r].exports;
            }
            var i = t[r] = {
                i: r,
                l: false,
                exports: {
                }
            };
            e[r].call(i.exports, i, i.exports, n);
            i.l = true;
            return i.exports;
        }
        n.m = e;
        n.c = t;
        n.d = function(e, t, r) {
            if (!n.o(e, t)) {
                Object.defineProperty(e, t, {
                    enumerable: true,
                    get: r
                });
            }
        };
        n.r = function(e) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        };
        n.t = function(e, t) {
            if (t & 1) e = n(e);
            if (t & 8) return e;
            if (t & 4 && typeof e === "object" && e && e.__esModule) return e;
            var r = Object.create(null);
            n.r(r);
            Object.defineProperty(r, "default", {
                enumerable: true,
                value: e
            });
            if (t & 2 && typeof e != "string") for(var i in e)n.d(r, i, (function(t) {
                return e[t];
            }).bind(null, i));
            return r;
        };
        n.n = function(e) {
            var t = e && e.__esModule ? function t() {
                return e["default"];
            } : function t() {
                return e;
            };
            n.d(t, "a", t);
            return t;
        };
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        };
        n.p = "";
        return n(n.s = 0);
    })([
        function(e, t, n) {
            "use strict";
            var r = n(1);
            var i = o(r);
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = i.default;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = Object.assign || function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = arguments[t];
                    for(var r in n){
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            var i = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            var o = n(2);
            var s = l(o);
            var a = n(3);
            var u = l(a);
            function l(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function f(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            function c(e, t) {
                if (!e) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return t && (typeof t === "object" || typeof t === "function") ? t : e;
            }
            function h(e, t) {
                if (typeof t !== "function" && t !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                }
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
            }
            var p = function(e) {
                h(t, e);
                function t(e) {
                    f(this, t);
                    var n = c(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    n.name = "SwupProgressPlugin";
                    n.startShowingProgress = function() {
                        n.progressBar.setValue(0);
                        n.showProgressBarAfterDelay();
                    };
                    n.stopShowingProgress = function() {
                        n.progressBar.setValue(1);
                        n.hideProgressBar();
                    };
                    n.showProgressBar = function() {
                        n.progressBar.show();
                    };
                    n.showProgressBarAfterDelay = function() {
                        n.progressBarTimeout = window.setTimeout(n.showProgressBar, n.options.delay);
                    };
                    n.hideProgressBar = function() {
                        n.progressBar.hide();
                        if (n.progressBarTimeout != null) {
                            window.clearTimeout(n.progressBarTimeout);
                            delete n.progressBarTimeout;
                        }
                    };
                    var i = {
                        className: "swup-progress-bar",
                        transition: 300,
                        delay: 300
                    };
                    n.options = r({
                    }, i, e);
                    n.progressBarTimeout = null;
                    n.progressBar = new u.default({
                        className: n.options.className,
                        animationDuration: n.options.transition
                    });
                    return n;
                }
                i(t, [
                    {
                        key: "mount",
                        value: function e() {
                            this.swup.on("transitionStart", this.startShowingProgress);
                            this.swup.on("contentReplaced", this.stopShowingProgress);
                        }
                    },
                    {
                        key: "unmount",
                        value: function e() {
                            this.swup.off("transitionStart", this.startShowingProgress);
                            this.swup.off("contentReplaced", this.stopShowingProgress);
                        }
                    }
                ]);
                return t;
            }(s.default);
            t.default = p;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            function i(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var o = function() {
                function e() {
                    i(this, e);
                    this.isSwupPlugin = true;
                }
                r(e, [
                    {
                        key: "mount",
                        value: function e() {
                        }
                    },
                    {
                        key: "unmount",
                        value: function e() {
                        }
                    },
                    {
                        key: "_beforeMount",
                        value: function e() {
                        }
                    },
                    {
                        key: "_afterUnmount",
                        value: function e() {
                        }
                    }
                ]);
                return e;
            }();
            t.default = o;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            function i(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var o = function() {
                function e(t) {
                    var n = this;
                    var r = t.className, o = r === undefined ? null : r, s = t.animationDuration, a = s === undefined ? null : s;
                    i(this, e);
                    this.className = "progress-bar";
                    this.animationDuration = 300;
                    this.minValue = 0.1;
                    this.stylesheetElement = null;
                    this.progressElement = null;
                    this.hiding = false;
                    this.trickleInterval = null;
                    this.value = 0;
                    this.visible = false;
                    this.trickle = function() {
                        var e = Math.random() * 3 / 100;
                        n.setValue(n.value + e);
                    };
                    if (o !== null) {
                        this.className = o;
                    }
                    if (a !== null) {
                        this.animationDuration = a;
                    }
                    this.stylesheetElement = this.createStylesheetElement();
                    this.progressElement = this.createProgressElement();
                }
                r(e, [
                    {
                        key: "show",
                        value: function e() {
                            if (!this.visible) {
                                this.visible = true;
                                this.installStylesheetElement();
                                this.installProgressElement();
                                this.startTrickling();
                            }
                        }
                    },
                    {
                        key: "hide",
                        value: function e() {
                            var t = this;
                            if (this.visible && !this.hiding) {
                                this.hiding = true;
                                this.fadeProgressElement(function() {
                                    t.uninstallProgressElement();
                                    t.stopTrickling();
                                    t.visible = false;
                                    t.hiding = false;
                                });
                            }
                        }
                    },
                    {
                        key: "setValue",
                        value: function e(t) {
                            this.value = Math.max(this.minValue, t);
                            this.refresh();
                        }
                    },
                    {
                        key: "installStylesheetElement",
                        value: function e() {
                            document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
                        }
                    },
                    {
                        key: "installProgressElement",
                        value: function e() {
                            this.progressElement.style.width = "0";
                            this.progressElement.style.opacity = "1";
                            document.documentElement.insertBefore(this.progressElement, document.body);
                            this.refresh();
                        }
                    },
                    {
                        key: "fadeProgressElement",
                        value: function e(t) {
                            this.progressElement.style.opacity = "0";
                            setTimeout(t, this.animationDuration * 1.5);
                        }
                    },
                    {
                        key: "uninstallProgressElement",
                        value: function e() {
                            if (this.progressElement.parentNode) {
                                document.documentElement.removeChild(this.progressElement);
                            }
                        }
                    },
                    {
                        key: "startTrickling",
                        value: function e() {
                            if (!this.trickleInterval) {
                                this.trickleInterval = window.setInterval(this.trickle, this.animationDuration);
                            }
                        }
                    },
                    {
                        key: "stopTrickling",
                        value: function e() {
                            window.clearInterval(this.trickleInterval);
                            delete this.trickleInterval;
                        }
                    },
                    {
                        key: "refresh",
                        value: function e() {
                            var t = this;
                            requestAnimationFrame(function() {
                                t.progressElement.style.width = 10 + t.value * 90 + "%";
                            });
                        }
                    },
                    {
                        key: "createStylesheetElement",
                        value: function e() {
                            var t = document.createElement("style");
                            t.setAttribute("data-progressbar-styles", "");
                            t.textContent = this.defaultCSS;
                            return t;
                        }
                    },
                    {
                        key: "createProgressElement",
                        value: function e() {
                            var t = document.createElement("div");
                            t.className = this.className;
                            return t;
                        }
                    },
                    {
                        key: "defaultCSS",
                        get: function e() {
                            return "\n    ." + this.className + " {\n        position: fixed;\n        display: block;\n        top: 0;\n        left: 0;\n        height: 3px;\n        background-color: black;\n        z-index: 9999;\n        transition:\n          width " + this.animationDuration + "ms ease-out,\n          opacity " + this.animationDuration / 2 + "ms " + this.animationDuration / 2 + "ms ease-in;\n        transform: translate3d(0, 0, 0);\n      }\n    ";
                        }
                    }
                ]);
                return e;
            }();
            t.default = o;
        }
    ]);
});
(function e(t, n) {
    if (typeof exports === "object" && typeof module === "object") module.exports = n();
    else if (typeof define === "function" && define.amd) define([], n);
    else if (typeof exports === "object") exports["SwupFormsPlugin"] = n();
    else t["SwupFormsPlugin"] = n();
})(window, function() {
    return (function(e) {
        var t = {
        };
        function n(r) {
            if (t[r]) {
                return t[r].exports;
            }
            var o = t[r] = {
                i: r,
                l: false,
                exports: {
                }
            };
            e[r].call(o.exports, o, o.exports, n);
            o.l = true;
            return o.exports;
        }
        n.m = e;
        n.c = t;
        n.d = function(e, t, r) {
            if (!n.o(e, t)) {
                Object.defineProperty(e, t, {
                    enumerable: true,
                    get: r
                });
            }
        };
        n.r = function(e) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        };
        n.t = function(e, t) {
            if (t & 1) e = n(e);
            if (t & 8) return e;
            if (t & 4 && typeof e === "object" && e && e.__esModule) return e;
            var r = Object.create(null);
            n.r(r);
            Object.defineProperty(r, "default", {
                enumerable: true,
                value: e
            });
            if (t & 2 && typeof e != "string") for(var o in e)n.d(r, o, (function(t) {
                return e[t];
            }).bind(null, o));
            return r;
        };
        n.n = function(e) {
            var t = e && e.__esModule ? function t() {
                return e["default"];
            } : function t() {
                return e;
            };
            n.d(t, "a", t);
            return t;
        };
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        };
        n.p = "";
        return n(n.s = 0);
    })([
        function(e, t, n) {
            "use strict";
            var r = n(1);
            var o = i(r);
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = o.default;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = Object.assign || function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = arguments[t];
                    for(var r in n){
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            var o = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            var i = n(2);
            var u = p(i);
            var a = n(3);
            var f = p(a);
            var l = n(5);
            var c = n(6);
            var s = p(c);
            function p(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function d(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            function m(e, t) {
                if (!e) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return t && (typeof t === "object" || typeof t === "function") ? t : e;
            }
            function v(e, t) {
                if (typeof t !== "function" && t !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                }
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
            }
            var y = function(e) {
                v(t, e);
                function t(e) {
                    d(this, t);
                    var n = m(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    n.name = "FormsPlugin";
                    var o = {
                        formSelector: "form[data-swup-form]"
                    };
                    n.options = r({
                    }, o, e);
                    return n;
                }
                o(t, [
                    {
                        key: "mount",
                        value: function e() {
                            var t = this.swup;
                            t._handlers.submitForm = [];
                            t._handlers.openFormSubmitInNewTab = [];
                            t.delegatedListeners.formSubmit = (0, f.default)(document, this.options.formSelector, "submit", this.onFormSubmit.bind(this));
                        }
                    },
                    {
                        key: "unmount",
                        value: function e() {
                            swup.delegatedListeners.formSubmit.destroy();
                        }
                    },
                    {
                        key: "onFormSubmit",
                        value: function e(t) {
                            var n = this.swup;
                            if (!t.metaKey) {
                                var r = t.target;
                                var o = new FormData(r);
                                var i = r.getAttribute("action") || window.location.href;
                                var u = r.getAttribute("method") || "GET";
                                var a = new s.default(i);
                                n.triggerEvent("submitForm", t);
                                t.preventDefault();
                                if (a.getHash() != "") {
                                    n.scrollToElement = a.getHash();
                                }
                                var f = r.getAttribute("data-swup-transition");
                                if (u.toLowerCase() != "get") {
                                    n.cache.remove(a.getAddress());
                                    n.loadPage({
                                        url: a.getAddress(),
                                        method: u,
                                        data: o,
                                        customTransition: f
                                    });
                                } else {
                                    var c = a.getAddress() || window.location.href;
                                    var p = (0, l.queryAll)("input, select", r);
                                    if (c.indexOf("?") == -1) {
                                        c += "?";
                                    } else {
                                        c += "&";
                                    }
                                    p.forEach(function(e) {
                                        if (e.type == "checkbox" || e.type == "radio") {
                                            if (e.checked) {
                                                c += encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) + "&";
                                            }
                                        } else {
                                            c += encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) + "&";
                                        }
                                    });
                                    c = c.slice(0, -1);
                                    n.cache.remove(c);
                                    n.loadPage({
                                        url: c,
                                        customTransition: f
                                    });
                                }
                            } else {
                                n.triggerEvent("openFormSubmitInNewTab", t);
                            }
                        }
                    }
                ]);
                return t;
            }(u.default);
            t.default = y;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            function o(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var i = function() {
                function e() {
                    o(this, e);
                    this.isSwupPlugin = true;
                }
                r(e, [
                    {
                        key: "mount",
                        value: function e() {
                        }
                    },
                    {
                        key: "unmount",
                        value: function e() {
                        }
                    }
                ]);
                return e;
            }();
            t.default = i;
        },
        function(e, t, n) {
            var r = n(4);
            function o(e, t, n, r, o) {
                var u = i.apply(this, arguments);
                e.addEventListener(n, u, o);
                return {
                    destroy: function() {
                        e.removeEventListener(n, u, o);
                    }
                };
            }
            function i(e, t, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, t);
                    if (n.delegateTarget) {
                        o.call(e, n);
                    }
                };
            }
            e.exports = o;
        },
        function(e, t) {
            var n = 9;
            if (typeof Element !== "undefined" && !Element.prototype.matches) {
                var r = Element.prototype;
                r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector;
            }
            function o(e, t) {
                while(e && e.nodeType !== n){
                    if (typeof e.matches === "function" && e.matches(t)) {
                        return e;
                    }
                    e = e.parentNode;
                }
            }
            e.exports = o;
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = t.query = function e(t) {
                var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
                if (typeof t !== "string") {
                    return t;
                }
                return n.querySelector(t);
            };
            var o = t.queryAll = function e(t) {
                var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
                if (typeof t !== "string") {
                    return t;
                }
                return Array.prototype.slice.call(n.querySelectorAll(t));
            };
        },
        function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = function() {
                function e(e, t) {
                    for(var n = 0; n < t.length; n++){
                        var r = t[n];
                        r.enumerable = r.enumerable || false;
                        r.configurable = true;
                        if ("value" in r) r.writable = true;
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    if (n) e(t.prototype, n);
                    if (r) e(t, r);
                    return t;
                };
            }();
            function o(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var i = function() {
                function e(t) {
                    o(this, e);
                    if (t instanceof Element || t instanceof SVGElement) {
                        this.link = t;
                    } else {
                        this.link = document.createElement("a");
                        this.link.href = t;
                    }
                }
                r(e, [
                    {
                        key: "getPath",
                        value: function e() {
                            var t = this.link.pathname;
                            if (t[0] !== "/") {
                                t = "/" + t;
                            }
                            return t;
                        }
                    },
                    {
                        key: "getAddress",
                        value: function e() {
                            var t = this.link.pathname + this.link.search;
                            if (this.link.getAttribute("xlink:href")) {
                                t = this.link.getAttribute("xlink:href");
                            }
                            if (t[0] !== "/") {
                                t = "/" + t;
                            }
                            return t;
                        }
                    },
                    {
                        key: "getHash",
                        value: function e() {
                            return this.link.hash;
                        }
                    }
                ]);
                return e;
            }();
            t.default = i;
        }
    ]);
});
const swup = new Swup({
    cache: false,
    plugins: [
        new SwupProgressPlugin({
            className: 'swup-progress-bar',
            transition: 500,
            delay: 0
        }),
        new SwupFormsPlugin()
    ]
});
var module = {
};
(function main(global, module2, isWorker, workerSize) {
    var canUseWorker = !!(global.Worker && global.Blob && global.Promise && global.OffscreenCanvas && global.OffscreenCanvasRenderingContext2D && global.HTMLCanvasElement && global.HTMLCanvasElement.prototype.transferControlToOffscreen && global.URL && global.URL.createObjectURL);
    function noop() {
    }
    function promise(func) {
        var ModulePromise = module2.exports.Promise;
        var Prom = ModulePromise !== void 0 ? ModulePromise : global.Promise;
        if (typeof Prom === "function") {
            return new Prom(func);
        }
        func(noop, noop);
        return null;
    }
    var raf = function() {
        var TIME = Math.floor(1000 / 60);
        var frame, cancel;
        var frames = {
        };
        var lastFrameTime = 0;
        if (typeof requestAnimationFrame === "function" && typeof cancelAnimationFrame === "function") {
            frame = function(cb) {
                var id = Math.random();
                frames[id] = requestAnimationFrame(function onFrame(time) {
                    if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
                        lastFrameTime = time;
                        delete frames[id];
                        cb();
                    } else {
                        frames[id] = requestAnimationFrame(onFrame);
                    }
                });
                return id;
            };
            cancel = function(id) {
                if (frames[id]) {
                    cancelAnimationFrame(frames[id]);
                }
            };
        } else {
            frame = function(cb) {
                return setTimeout(cb, TIME);
            };
            cancel = function(timer) {
                return clearTimeout(timer);
            };
        }
        return {
            frame,
            cancel
        };
    }();
    var getWorker = function() {
        var worker;
        var prom;
        var resolves = {
        };
        function decorate(worker2) {
            function execute(options, callback) {
                worker2.postMessage({
                    options: options || {
                    },
                    callback
                });
            }
            worker2.init = function initWorker(canvas) {
                var offscreen = canvas.transferControlToOffscreen();
                worker2.postMessage({
                    canvas: offscreen
                }, [
                    offscreen
                ]);
            };
            worker2.fire = function fireWorker(options, size, done) {
                if (prom) {
                    execute(options, null);
                    return prom;
                }
                var id = Math.random().toString(36).slice(2);
                prom = promise(function(resolve) {
                    function workerDone(msg) {
                        if (msg.data.callback !== id) {
                            return;
                        }
                        delete resolves[id];
                        worker2.removeEventListener("message", workerDone);
                        prom = null;
                        done();
                        resolve();
                    }
                    worker2.addEventListener("message", workerDone);
                    execute(options, id);
                    resolves[id] = workerDone.bind(null, {
                        data: {
                            callback: id
                        }
                    });
                });
                return prom;
            };
            worker2.reset = function resetWorker() {
                worker2.postMessage({
                    reset: true
                });
                for(var id in resolves){
                    resolves[id]();
                    delete resolves[id];
                }
            };
        }
        return function() {
            if (worker) {
                return worker;
            }
            if (!isWorker && canUseWorker) {
                var code = [
                    "var CONFETTI, SIZE = {}, module = {};",
                    "(" + main.toString() + ")(this, module, true, SIZE);",
                    "onmessage = function(msg) {",
                    "  if (msg.data.options) {",
                    "    CONFETTI(msg.data.options).then(function () {",
                    "      if (msg.data.callback) {",
                    "        postMessage({ callback: msg.data.callback });",
                    "      }",
                    "    });",
                    "  } else if (msg.data.reset) {",
                    "    CONFETTI.reset();",
                    "  } else if (msg.data.resize) {",
                    "    SIZE.width = msg.data.resize.width;",
                    "    SIZE.height = msg.data.resize.height;",
                    "  } else if (msg.data.canvas) {",
                    "    SIZE.width = msg.data.canvas.width;",
                    "    SIZE.height = msg.data.canvas.height;",
                    "    CONFETTI = module.exports.create(msg.data.canvas);",
                    "  }",
                    "}"
                ].join("\n");
                try {
                    worker = new Worker(URL.createObjectURL(new Blob([
                        code
                    ])));
                } catch (e) {
                    typeof console !== void 0 && typeof console.warn === "function" ? console.warn("\u{1F38A} Could not load worker", e) : null;
                    return null;
                }
                decorate(worker);
            }
            return worker;
        };
    }();
    var defaults = {
        particleCount: 50,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        x: 0.5,
        y: 0.5,
        shapes: [
            "square",
            "circle"
        ],
        zIndex: 100,
        colors: [
            "#26ccff",
            "#a25afd",
            "#ff5e7e",
            "#88ff5a",
            "#fcff42",
            "#ffa62d",
            "#ff36ff"
        ],
        disableForReducedMotion: false,
        scalar: 1
    };
    function convert(val, transform) {
        return transform ? transform(val) : val;
    }
    function isOk(val) {
        return !(val === null || val === void 0);
    }
    function prop(options, name, transform) {
        return convert(options && isOk(options[name]) ? options[name] : defaults[name], transform);
    }
    function onlyPositiveInt(number) {
        return number < 0 ? 0 : Math.floor(number);
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function toDecimal(str) {
        return parseInt(str, 16);
    }
    function colorsToRgb(colors) {
        return colors.map(hexToRgb);
    }
    function hexToRgb(str) {
        var val = String(str).replace(/[^0-9a-f]/gi, "");
        if (val.length < 6) {
            val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
        }
        return {
            r: toDecimal(val.substring(0, 2)),
            g: toDecimal(val.substring(2, 4)),
            b: toDecimal(val.substring(4, 6))
        };
    }
    function getOrigin(options) {
        var origin = prop(options, "origin", Object);
        origin.x = prop(origin, "x", Number);
        origin.y = prop(origin, "y", Number);
        return origin;
    }
    function setCanvasWindowSize(canvas) {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    }
    function setCanvasRectSize(canvas) {
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    function getCanvas(zIndex) {
        var canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = zIndex;
        return canvas;
    }
    function ellipse(context, x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
        context.save();
        context.translate(x, y);
        context.rotate(rotation);
        context.scale(radiusX, radiusY);
        context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
        context.restore();
    }
    function randomPhysics(opts) {
        var radAngle = opts.angle * (Math.PI / 180);
        var radSpread = opts.spread * (Math.PI / 180);
        return {
            x: opts.x,
            y: opts.y,
            wobble: Math.random() * 10,
            velocity: opts.startVelocity * 0.5 + Math.random() * opts.startVelocity,
            angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
            tiltAngle: Math.random() * Math.PI,
            color: opts.color,
            shape: opts.shape,
            tick: 0,
            totalTicks: opts.ticks,
            decay: opts.decay,
            drift: opts.drift,
            random: Math.random() + 5,
            tiltSin: 0,
            tiltCos: 0,
            wobbleX: 0,
            wobbleY: 0,
            gravity: opts.gravity * 3,
            ovalScalar: 0.6,
            scalar: opts.scalar
        };
    }
    function updateFetti(context, fetti) {
        fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
        fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
        fetti.wobble += 0.1;
        fetti.velocity *= fetti.decay;
        fetti.tiltAngle += 0.1;
        fetti.tiltSin = Math.sin(fetti.tiltAngle);
        fetti.tiltCos = Math.cos(fetti.tiltAngle);
        fetti.random = Math.random() + 5;
        fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
        fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);
        var progress = (fetti.tick++) / fetti.totalTicks;
        var x1 = fetti.x + fetti.random * fetti.tiltCos;
        var y1 = fetti.y + fetti.random * fetti.tiltSin;
        var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
        var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;
        context.fillStyle = "rgba(" + fetti.color.r + ", " + fetti.color.g + ", " + fetti.color.b + ", " + (1 - progress) + ")";
        context.beginPath();
        if (fetti.shape === "circle") {
            context.ellipse ? context.ellipse(fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI) : ellipse(context, fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI);
        } else {
            context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
            context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
            context.lineTo(Math.floor(x2), Math.floor(y2));
            context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
        }
        context.closePath();
        context.fill();
        return fetti.tick < fetti.totalTicks;
    }
    function animate(canvas, fettis, resizer, size, done) {
        var animatingFettis = fettis.slice();
        var context = canvas.getContext("2d");
        var animationFrame;
        var destroy;
        var prom = promise(function(resolve) {
            function onDone() {
                animationFrame = destroy = null;
                context.clearRect(0, 0, size.width, size.height);
                done();
                resolve();
            }
            function update() {
                if (isWorker && !(size.width === workerSize.width && size.height === workerSize.height)) {
                    size.width = canvas.width = workerSize.width;
                    size.height = canvas.height = workerSize.height;
                }
                if (!size.width && !size.height) {
                    resizer(canvas);
                    size.width = canvas.width;
                    size.height = canvas.height;
                }
                context.clearRect(0, 0, size.width, size.height);
                animatingFettis = animatingFettis.filter(function(fetti) {
                    return updateFetti(context, fetti);
                });
                if (animatingFettis.length) {
                    animationFrame = raf.frame(update);
                } else {
                    onDone();
                }
            }
            animationFrame = raf.frame(update);
            destroy = onDone;
        });
        return {
            addFettis: function(fettis2) {
                animatingFettis = animatingFettis.concat(fettis2);
                return prom;
            },
            canvas,
            promise: prom,
            reset: function() {
                if (animationFrame) {
                    raf.cancel(animationFrame);
                }
                if (destroy) {
                    destroy();
                }
            }
        };
    }
    function confettiCannon(canvas, globalOpts) {
        var isLibCanvas = !canvas;
        var allowResize = !!prop(globalOpts || {
        }, "resize");
        var globalDisableForReducedMotion = prop(globalOpts, "disableForReducedMotion", Boolean);
        var shouldUseWorker = canUseWorker && !!prop(globalOpts || {
        }, "useWorker");
        var worker = shouldUseWorker ? getWorker() : null;
        var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
        var initialized = canvas && worker ? !!canvas.__confetti_initialized : false;
        var preferLessMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion)").matches;
        var animationObj;
        function fireLocal(options, size, done) {
            var particleCount = prop(options, "particleCount", onlyPositiveInt);
            var angle = prop(options, "angle", Number);
            var spread = prop(options, "spread", Number);
            var startVelocity = prop(options, "startVelocity", Number);
            var decay = prop(options, "decay", Number);
            var gravity = prop(options, "gravity", Number);
            var drift = prop(options, "drift", Number);
            var colors = prop(options, "colors", colorsToRgb);
            var ticks = prop(options, "ticks", Number);
            var shapes = prop(options, "shapes");
            var scalar = prop(options, "scalar");
            var origin = getOrigin(options);
            var temp = particleCount;
            var fettis = [];
            var startX = canvas.width * origin.x;
            var startY = canvas.height * origin.y;
            while(temp--){
                fettis.push(randomPhysics({
                    x: startX,
                    y: startY,
                    angle,
                    spread,
                    startVelocity,
                    color: colors[temp % colors.length],
                    shape: shapes[randomInt(0, shapes.length)],
                    ticks,
                    decay,
                    gravity,
                    drift,
                    scalar
                }));
            }
            if (animationObj) {
                return animationObj.addFettis(fettis);
            }
            animationObj = animate(canvas, fettis, resizer, size, done);
            return animationObj.promise;
        }
        function fire(options) {
            var disableForReducedMotion = globalDisableForReducedMotion || prop(options, "disableForReducedMotion", Boolean);
            var zIndex = prop(options, "zIndex", Number);
            if (disableForReducedMotion && preferLessMotion) {
                return promise(function(resolve) {
                    resolve();
                });
            }
            if (isLibCanvas && animationObj) {
                canvas = animationObj.canvas;
            } else if (isLibCanvas && !canvas) {
                canvas = getCanvas(zIndex);
                document.body.appendChild(canvas);
            }
            if (allowResize && !initialized) {
                resizer(canvas);
            }
            var size = {
                width: canvas.width,
                height: canvas.height
            };
            if (worker && !initialized) {
                worker.init(canvas);
            }
            initialized = true;
            if (worker) {
                canvas.__confetti_initialized = true;
            }
            function onResize() {
                if (worker) {
                    var obj = {
                        getBoundingClientRect: function() {
                            if (!isLibCanvas) {
                                return canvas.getBoundingClientRect();
                            }
                        }
                    };
                    resizer(obj);
                    worker.postMessage({
                        resize: {
                            width: obj.width,
                            height: obj.height
                        }
                    });
                    return;
                }
                size.width = size.height = null;
            }
            function done() {
                animationObj = null;
                if (allowResize) {
                    global.removeEventListener("resize", onResize);
                }
                if (isLibCanvas && canvas) {
                    document.body.removeChild(canvas);
                    canvas = null;
                    initialized = false;
                }
            }
            if (allowResize) {
                global.addEventListener("resize", onResize, false);
            }
            if (worker) {
                return worker.fire(options, size, done);
            }
            return fireLocal(options, size, done);
        }
        fire.reset = function() {
            if (worker) {
                worker.reset();
            }
            if (animationObj) {
                animationObj.reset();
            }
        };
        return fire;
    }
    module2.exports = confettiCannon(null, {
        useWorker: true,
        resize: true
    });
    module2.exports.create = confettiCannon;
})(function() {
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    return this || {
    };
}(), module, false);
var confetti_module = module.exports;
class Api {
    like(event, id) {
        const likesContainer = event.target.querySelector('span');
        const iconContainer = event.target.querySelector('i');
        const liked = iconContainer.dataset.icon === 'favorite' ? true : false;
        const likes = parseInt(likesContainer.textContent);
        if (liked) {
            event.target.classList.remove('text:secondary');
            iconContainer.dataset.icon = 'favorite_border';
            likesContainer.textContent = likes - 1;
        } else {
            event.target.classList.add('text:secondary');
            iconContainer.dataset.icon = 'favorite';
            likesContainer.textContent = likes + 1;
        }
        fetch(`${baseUrl}api/like?id=${id}`);
    }
    async unlock() {
        const id = Store.get('unlock').id;
        const key = document.getElementById('unlock-key').value;
        const response = await fetch(`${baseUrl}api/unlock`, {
            method: 'POST',
            body: JSON.stringify({
                id,
                key
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r)=>r.json()
        );
        if (response.unlocked) {
            confetti_module();
            swup.loadPage({
                url: `${baseUrl}p/${response.url}`
            });
        } else {
            alert('La contraseña es incorrecta, intentelo de nuevo');
        }
    }
}
const unlock = (description, id)=>{
    Store.set('unlock', {
        id
    });
    document.getElementById('unlock-description').textContent = description;
    MicroModal.show('unlock');
};
const lazyImages = new LazyImages();
lazyImages.start();
Navbar.checkActiveLinks();
router.run();
global('api', new Api);
global('unlock', unlock);
MicroModal.init();
swup.on('contentReplaced', ()=>{
    lazyImages.start();
    Navbar.checkActiveLinks();
    router.run();
});
