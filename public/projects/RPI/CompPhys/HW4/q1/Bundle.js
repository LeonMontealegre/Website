/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./site/public/js/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./site/public/js/main.ts":
/*!********************************!*\
  !*** ./site/public/js/main.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_canvas_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/canvas/Canvas */ "./site/public/js/utils/canvas/Canvas.ts");
/* harmony import */ var utils_canvas_Painter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/canvas/Painter */ "./site/public/js/utils/canvas/Painter.ts");
/* harmony import */ var Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Vector */ "./site/public/js/utils/math/Vector.ts");



var MAX_PATHS = 1000;
var W = 500;
var H = 500;
var L = 5;
var colors = ["#ffee58", "#039be5", "#ffb74d"];
var Obj = /** @class */ (function () {
    function Obj(pos, mass) {
        this.pos = pos;
        this.mass = mass;
    }
    return Obj;
}());
function drawTail(tail, color, p) {
    if (tail.length <= 1)
        return;
    p.setLineStyle(new utils_canvas_Painter__WEBPACK_IMPORTED_MODULE_1__["LineStyle"](color, 4, "round"));
    for (var l = 1; l < tail.length; l++) {
        p.setAlpha((l - 1) / tail.length);
        p.drawLine(tail[l - 1], tail[l]);
    }
    p.setAlpha(1.0);
}
function getPlanets() {
    var planets = [];
    var numObjs = Module._num_objs();
    for (var i = 0; i < numObjs; i++) {
        var x = Module._get_obj_x(i);
        var y = Module._get_obj_y(i);
        var m = Module._get_obj_mass(i);
        planets.push(new Obj(Object(Vector__WEBPACK_IMPORTED_MODULE_2__["V"])(x, y), m));
    }
    return planets;
}
Module.onRuntimeInitialized = function () {
    var canvas = new utils_canvas_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"]("canvas", function () { });
    var tails = [[], [], []];
    Module._init(3);
    function step() {
        for (var i = 0; i < 200; i++)
            // Module._step(1);
            Module._step(0.05);
        var planets = getPlanets();
        canvas.draw(function (p) {
            // Draw tails first so they appear behind planets
            tails.forEach(function (tail, i) { return drawTail(tail, colors[i], p); });
            planets.forEach(function (planet, i) {
                // Draw planet circle
                p.setFillColor(colors[i]);
                p.fillCirc(planet.pos, Math.log10(planet.mass) * 5 + 1);
                // Add to tail
                tails[i].push(Object(Vector__WEBPACK_IMPORTED_MODULE_2__["V"])(planet.pos));
                if (tails[i].length > MAX_PATHS)
                    tails[i].splice(0, tails[i].length - MAX_PATHS);
            });
        });
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
};


/***/ }),

/***/ "./site/public/js/utils/canvas/Canvas.ts":
/*!***********************************************!*\
  !*** ./site/public/js/utils/canvas/Canvas.ts ***!
  \***********************************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Vector */ "./site/public/js/utils/math/Vector.ts");
/* harmony import */ var _CanvasPainter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasPainter */ "./site/public/js/utils/canvas/CanvasPainter.ts");


var Canvas = /** @class */ (function () {
    function Canvas(id, onResize) {
        var _this = this;
        this.onResizeCallback = onResize;
        this.canvas = document.getElementById(id);
        this.painter = new _CanvasPainter__WEBPACK_IMPORTED_MODULE_1__["CanvasPainter"](this.canvas);
        window.addEventListener("resize", function () { return _this.onResize(); }, false);
        this.onResize();
    }
    Canvas.prototype.draw = function (func) {
        this.painter.save();
        this.painter.clear();
        this.painter.translate(Object(Vector__WEBPACK_IMPORTED_MODULE_0__["V"])(this.canvas.width / 2, this.canvas.height / 2));
        this.painter.scale(Object(Vector__WEBPACK_IMPORTED_MODULE_0__["V"])(1, -1));
        func(this.painter);
        this.painter.restore();
    };
    Canvas.prototype.createImageData = function (w, h) {
        return this.painter.createImageData(w, h);
    };
    Canvas.prototype.onResize = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.onResizeCallback();
    };
    Object.defineProperty(Canvas.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: true,
        configurable: true
    });
    return Canvas;
}());



/***/ }),

/***/ "./site/public/js/utils/canvas/CanvasPainter.ts":
/*!******************************************************!*\
  !*** ./site/public/js/utils/canvas/CanvasPainter.ts ***!
  \******************************************************/
/*! exports provided: CanvasPainter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasPainter", function() { return CanvasPainter; });
var CanvasPainter = /** @class */ (function () {
    function CanvasPainter(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
    CanvasPainter.prototype.translate = function (p) {
        this.ctx.translate(p.x, p.y);
        this.ctx.getTransform().multiply();
    };
    CanvasPainter.prototype.rotateAbout = function (a, v) {
        this.translate(v);
        this.ctx.rotate(a);
        this.translate(v.scale(-1));
    };
    CanvasPainter.prototype.scaleAbout = function (s, v) {
        this.translate(v);
        this.scale(s);
        this.translate(v.scale(-1));
    };
    CanvasPainter.prototype.scale = function (s) {
        this.ctx.scale(s.x, s.y);
    };
    CanvasPainter.prototype.save = function () {
        this.ctx.save();
    };
    CanvasPainter.prototype.restore = function () {
        this.ctx.restore();
    };
    CanvasPainter.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasPainter.prototype.fillRect = function (pos, size) {
        this.ctx.fillRect(pos.x, pos.y, size.x, size.y);
    };
    CanvasPainter.prototype.fillCirc = function (pos, radius) {
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    };
    CanvasPainter.prototype.drawLine = function (a, b) {
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, a.y);
        this.ctx.lineTo(b.x, b.y);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    CanvasPainter.prototype.drawCurve = function (p1, p2, c1, c2) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    CanvasPainter.prototype.createImageData = function (w, h) {
        return this.ctx.createImageData(w, h);
    };
    CanvasPainter.prototype.putImageData = function (data, dx, dy) {
        if (dx === void 0) { dx = 0; }
        if (dy === void 0) { dy = 0; }
        this.ctx.putImageData(data, dx, dy);
    };
    CanvasPainter.prototype.setStrokeColor = function (col) {
        this.ctx.strokeStyle = col;
    };
    CanvasPainter.prototype.setFillColor = function (col) {
        this.ctx.fillStyle = col;
    };
    CanvasPainter.prototype.setLineStyle = function (style) {
        this.ctx.strokeStyle = style.color;
        this.ctx.lineWidth = style.width;
        this.ctx.lineCap = style.cap;
    };
    CanvasPainter.prototype.setAlpha = function (alpha) {
        this.ctx.globalAlpha = alpha;
    };
    return CanvasPainter;
}());



/***/ }),

/***/ "./site/public/js/utils/canvas/Painter.ts":
/*!************************************************!*\
  !*** ./site/public/js/utils/canvas/Painter.ts ***!
  \************************************************/
/*! exports provided: LineStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineStyle", function() { return LineStyle; });
var LineStyle = /** @class */ (function () {
    function LineStyle(color, width, cap) {
        this.color = color;
        this.width = width;
        this.cap = cap;
    }
    return LineStyle;
}());



/***/ }),

/***/ "./site/public/js/utils/math/Vector.ts":
/*!*********************************************!*\
  !*** ./site/public/js/utils/math/Vector.ts ***!
  \*********************************************/
/*! exports provided: Vector, V */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return V; });
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (x instanceof Vector) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = (y == null ? x : y);
        }
    }
    Vector.prototype.add = function (x, y) {
        var dx = (x instanceof Vector ? x.x : x);
        var dy = (x instanceof Vector ? x.y : (y == null ? x : y));
        return new Vector(this.x + dx, this.y + dy);
    };
    Vector.prototype.sub = function (x, y) {
        var dx = (x instanceof Vector ? x.x : x);
        var dy = (x instanceof Vector ? x.y : (y == null ? x : y));
        return new Vector(this.x - dx, this.y - dy);
    };
    Vector.prototype.scale = function (a) {
        if (a instanceof Vector)
            return new Vector(a.x * this.x, a.y * this.y);
        return new Vector(a * this.x, a * this.y);
    };
    Vector.prototype.abs = function () {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    };
    Vector.prototype.normalize = function () {
        var len = this.len();
        if (len === 0)
            return new Vector(0, 0);
        return this.scale(1 / len);
    };
    Vector.prototype.len = function () {
        return Math.sqrt(this.len2());
    };
    Vector.prototype.len2 = function () {
        return this.dot(this);
    };
    Vector.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.distanceTo = function (v) {
        return this.sub(v).len();
    };
    Vector.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vector.prototype.project = function (v) {
        return this.scale(v.dot(this) / this.len2());
    };
    Vector.prototype.negativeReciprocal = function () {
        return new Vector(this.y, -this.x);
    };
    Vector.prototype.copy = function () {
        return new Vector(this.x, this.y);
    };
    Vector.min = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return new Vector(Math.min.apply(Math, __spread(vectors.map(function (v) { return v.x; }))), Math.min.apply(Math, __spread(vectors.map(function (v) { return v.y; }))));
    };
    Vector.max = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return new Vector(Math.max.apply(Math, __spread(vectors.map(function (v) { return v.x; }))), Math.max.apply(Math, __spread(vectors.map(function (v) { return v.y; }))));
    };
    Vector.clamp = function (x, lo, hi) {
        return Vector.min(Vector.max(x, lo), hi);
    };
    Vector.dir = function (a, b) {
        return b.sub(a).normalize();
    };
    Vector.fromAngle = function (a) {
        return new Vector(Math.cos(a), Math.sin(a));
    };
    return Vector;
}());

function V(x, y) {
    if (x === void 0) { x = 0; }
    if (x instanceof Vector)
        return new Vector(x);
    return new Vector(x, y);
}


/***/ })

/******/ });
//# sourceMappingURL=Bundle.js.map