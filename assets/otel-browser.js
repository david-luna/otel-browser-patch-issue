(() => {
  // node_modules/@opentelemetry/api/build/esm/platform/browser/globalThis.js
  var _globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};

  // node_modules/@opentelemetry/api/build/esm/version.js
  var VERSION = "1.9.0";

  // node_modules/@opentelemetry/api/build/esm/internal/semver.js
  var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
  function _makeCompatibilityCheck(ownVersion) {
    var acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
    var rejectedVersions = /* @__PURE__ */ new Set();
    var myVersionMatch = ownVersion.match(re);
    if (!myVersionMatch) {
      return function() {
        return false;
      };
    }
    var ownVersionParsed = {
      major: +myVersionMatch[1],
      minor: +myVersionMatch[2],
      patch: +myVersionMatch[3],
      prerelease: myVersionMatch[4]
    };
    if (ownVersionParsed.prerelease != null) {
      return function isExactmatch(globalVersion) {
        return globalVersion === ownVersion;
      };
    }
    function _reject(v) {
      rejectedVersions.add(v);
      return false;
    }
    function _accept(v) {
      acceptedVersions.add(v);
      return true;
    }
    return function isCompatible2(globalVersion) {
      if (acceptedVersions.has(globalVersion)) {
        return true;
      }
      if (rejectedVersions.has(globalVersion)) {
        return false;
      }
      var globalVersionMatch = globalVersion.match(re);
      if (!globalVersionMatch) {
        return _reject(globalVersion);
      }
      var globalVersionParsed = {
        major: +globalVersionMatch[1],
        minor: +globalVersionMatch[2],
        patch: +globalVersionMatch[3],
        prerelease: globalVersionMatch[4]
      };
      if (globalVersionParsed.prerelease != null) {
        return _reject(globalVersion);
      }
      if (ownVersionParsed.major !== globalVersionParsed.major) {
        return _reject(globalVersion);
      }
      if (ownVersionParsed.major === 0) {
        if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
          return _accept(globalVersion);
        }
        return _reject(globalVersion);
      }
      if (ownVersionParsed.minor <= globalVersionParsed.minor) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    };
  }
  var isCompatible = _makeCompatibilityCheck(VERSION);

  // node_modules/@opentelemetry/api/build/esm/internal/global-utils.js
  var major = VERSION.split(".")[0];
  var GLOBAL_OPENTELEMETRY_API_KEY = /* @__PURE__ */ Symbol.for("opentelemetry.js.api." + major);
  var _global = _globalThis;
  function registerGlobal(type, instance, diag3, allowOverride) {
    var _a;
    if (allowOverride === void 0) {
      allowOverride = false;
    }
    var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
      version: VERSION
    };
    if (!allowOverride && api[type]) {
      var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
      diag3.error(err.stack || err.message);
      return false;
    }
    if (api.version !== VERSION) {
      var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + VERSION);
      diag3.error(err.stack || err.message);
      return false;
    }
    api[type] = instance;
    diag3.debug("@opentelemetry/api: Registered a global for " + type + " v" + VERSION + ".");
    return true;
  }
  function getGlobal(type) {
    var _a, _b;
    var globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
    if (!globalVersion || !isCompatible(globalVersion)) {
      return;
    }
    return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
  }
  function unregisterGlobal(type, diag3) {
    diag3.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + VERSION + ".");
    var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
    if (api) {
      delete api[type];
    }
  }

  // node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js
  var __read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var DiagComponentLogger = (
    /** @class */
    (function() {
      function DiagComponentLogger2(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      DiagComponentLogger2.prototype.debug = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("debug", this._namespace, args);
      };
      DiagComponentLogger2.prototype.error = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("error", this._namespace, args);
      };
      DiagComponentLogger2.prototype.info = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("info", this._namespace, args);
      };
      DiagComponentLogger2.prototype.warn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("warn", this._namespace, args);
      };
      DiagComponentLogger2.prototype.verbose = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("verbose", this._namespace, args);
      };
      return DiagComponentLogger2;
    })()
  );
  function logProxy(funcName, namespace, args) {
    var logger2 = getGlobal("diag");
    if (!logger2) {
      return;
    }
    args.unshift(namespace);
    return logger2[funcName].apply(logger2, __spreadArray([], __read(args), false));
  }

  // node_modules/@opentelemetry/api/build/esm/diag/types.js
  var DiagLogLevel;
  (function(DiagLogLevel2) {
    DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
    DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
    DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
    DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
    DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
    DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
    DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
  })(DiagLogLevel || (DiagLogLevel = {}));

  // node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js
  function createLogLevelDiagLogger(maxLevel, logger2) {
    if (maxLevel < DiagLogLevel.NONE) {
      maxLevel = DiagLogLevel.NONE;
    } else if (maxLevel > DiagLogLevel.ALL) {
      maxLevel = DiagLogLevel.ALL;
    }
    logger2 = logger2 || {};
    function _filterFunc(funcName, theLevel) {
      var theFunc = logger2[funcName];
      if (typeof theFunc === "function" && maxLevel >= theLevel) {
        return theFunc.bind(logger2);
      }
      return function() {
      };
    }
    return {
      error: _filterFunc("error", DiagLogLevel.ERROR),
      warn: _filterFunc("warn", DiagLogLevel.WARN),
      info: _filterFunc("info", DiagLogLevel.INFO),
      debug: _filterFunc("debug", DiagLogLevel.DEBUG),
      verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
    };
  }

  // node_modules/@opentelemetry/api/build/esm/api/diag.js
  var __read2 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var API_NAME = "diag";
  var DiagAPI = (
    /** @class */
    (function() {
      function DiagAPI2() {
        function _logProxy(funcName) {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var logger2 = getGlobal("diag");
            if (!logger2)
              return;
            return logger2[funcName].apply(logger2, __spreadArray2([], __read2(args), false));
          };
        }
        var self2 = this;
        var setLogger = function(logger2, optionsOrLogLevel) {
          var _a, _b, _c;
          if (optionsOrLogLevel === void 0) {
            optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
          }
          if (logger2 === self2) {
            var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self2.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          var oldLogger = getGlobal("diag");
          var newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger2);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            var stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn("Current logger will be overwritten from " + stack);
            newLogger.warn("Current logger will overwrite one already registered from " + stack);
          }
          return registerGlobal("diag", newLogger, self2, true);
        };
        self2.setLogger = setLogger;
        self2.disable = function() {
          unregisterGlobal(API_NAME, self2);
        };
        self2.createComponentLogger = function(options) {
          return new DiagComponentLogger(options);
        };
        self2.verbose = _logProxy("verbose");
        self2.debug = _logProxy("debug");
        self2.info = _logProxy("info");
        self2.warn = _logProxy("warn");
        self2.error = _logProxy("error");
      }
      DiagAPI2.instance = function() {
        if (!this._instance) {
          this._instance = new DiagAPI2();
        }
        return this._instance;
      };
      return DiagAPI2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js
  var __read3 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var BaggageImpl = (
    /** @class */
    (function() {
      function BaggageImpl2(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      BaggageImpl2.prototype.getEntry = function(key) {
        var entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      };
      BaggageImpl2.prototype.getAllEntries = function() {
        return Array.from(this._entries.entries()).map(function(_a) {
          var _b = __read3(_a, 2), k = _b[0], v = _b[1];
          return [k, v];
        });
      };
      BaggageImpl2.prototype.setEntry = function(key, entry) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntry = function(key) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntries = function() {
        var e_1, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          keys[_i] = arguments[_i];
        }
        var newBaggage = new BaggageImpl2(this._entries);
        try {
          for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            newBaggage._entries.delete(key);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        return newBaggage;
      };
      BaggageImpl2.prototype.clear = function() {
        return new BaggageImpl2();
      };
      return BaggageImpl2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js
  var baggageEntryMetadataSymbol = /* @__PURE__ */ Symbol("BaggageEntryMetadata");

  // node_modules/@opentelemetry/api/build/esm/baggage/utils.js
  var diag = DiagAPI.instance();
  function createBaggage(entries) {
    if (entries === void 0) {
      entries = {};
    }
    return new BaggageImpl(new Map(Object.entries(entries)));
  }
  function baggageEntryMetadataFromString(str) {
    if (typeof str !== "string") {
      diag.error("Cannot create baggage metadata from unknown type: " + typeof str);
      str = "";
    }
    return {
      __TYPE__: baggageEntryMetadataSymbol,
      toString: function() {
        return str;
      }
    };
  }

  // node_modules/@opentelemetry/api/build/esm/context/context.js
  function createContextKey(description) {
    return Symbol.for(description);
  }
  var BaseContext = (
    /** @class */
    /* @__PURE__ */ (function() {
      function BaseContext2(parentContext) {
        var self2 = this;
        self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self2.getValue = function(key) {
          return self2._currentContext.get(key);
        };
        self2.setValue = function(key, value) {
          var context2 = new BaseContext2(self2._currentContext);
          context2._currentContext.set(key, value);
          return context2;
        };
        self2.deleteValue = function(key) {
          var context2 = new BaseContext2(self2._currentContext);
          context2._currentContext.delete(key);
          return context2;
        };
      }
      return BaseContext2;
    })()
  );
  var ROOT_CONTEXT = new BaseContext();

  // node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js
  var __extends = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var NoopMeter = (
    /** @class */
    (function() {
      function NoopMeter2() {
      }
      NoopMeter2.prototype.createGauge = function(_name, _options) {
        return NOOP_GAUGE_METRIC;
      };
      NoopMeter2.prototype.createHistogram = function(_name, _options) {
        return NOOP_HISTOGRAM_METRIC;
      };
      NoopMeter2.prototype.createCounter = function(_name, _options) {
        return NOOP_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createUpDownCounter = function(_name, _options) {
        return NOOP_UP_DOWN_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createObservableGauge = function(_name, _options) {
        return NOOP_OBSERVABLE_GAUGE_METRIC;
      };
      NoopMeter2.prototype.createObservableCounter = function(_name, _options) {
        return NOOP_OBSERVABLE_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createObservableUpDownCounter = function(_name, _options) {
        return NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      };
      NoopMeter2.prototype.addBatchObservableCallback = function(_callback, _observables) {
      };
      NoopMeter2.prototype.removeBatchObservableCallback = function(_callback) {
      };
      return NoopMeter2;
    })()
  );
  var NoopMetric = (
    /** @class */
    /* @__PURE__ */ (function() {
      function NoopMetric2() {
      }
      return NoopMetric2;
    })()
  );
  var NoopCounterMetric = (
    /** @class */
    (function(_super) {
      __extends(NoopCounterMetric2, _super);
      function NoopCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopCounterMetric2.prototype.add = function(_value, _attributes) {
      };
      return NoopCounterMetric2;
    })(NoopMetric)
  );
  var NoopUpDownCounterMetric = (
    /** @class */
    (function(_super) {
      __extends(NoopUpDownCounterMetric2, _super);
      function NoopUpDownCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopUpDownCounterMetric2.prototype.add = function(_value, _attributes) {
      };
      return NoopUpDownCounterMetric2;
    })(NoopMetric)
  );
  var NoopGaugeMetric = (
    /** @class */
    (function(_super) {
      __extends(NoopGaugeMetric2, _super);
      function NoopGaugeMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopGaugeMetric2.prototype.record = function(_value, _attributes) {
      };
      return NoopGaugeMetric2;
    })(NoopMetric)
  );
  var NoopHistogramMetric = (
    /** @class */
    (function(_super) {
      __extends(NoopHistogramMetric2, _super);
      function NoopHistogramMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopHistogramMetric2.prototype.record = function(_value, _attributes) {
      };
      return NoopHistogramMetric2;
    })(NoopMetric)
  );
  var NoopObservableMetric = (
    /** @class */
    (function() {
      function NoopObservableMetric2() {
      }
      NoopObservableMetric2.prototype.addCallback = function(_callback) {
      };
      NoopObservableMetric2.prototype.removeCallback = function(_callback) {
      };
      return NoopObservableMetric2;
    })()
  );
  var NoopObservableCounterMetric = (
    /** @class */
    (function(_super) {
      __extends(NoopObservableCounterMetric2, _super);
      function NoopObservableCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableCounterMetric2;
    })(NoopObservableMetric)
  );
  var NoopObservableGaugeMetric = (
    /** @class */
    (function(_super) {
      __extends(NoopObservableGaugeMetric2, _super);
      function NoopObservableGaugeMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableGaugeMetric2;
    })(NoopObservableMetric)
  );
  var NoopObservableUpDownCounterMetric = (
    /** @class */
    (function(_super) {
      __extends(NoopObservableUpDownCounterMetric2, _super);
      function NoopObservableUpDownCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableUpDownCounterMetric2;
    })(NoopObservableMetric)
  );
  var NOOP_METER = new NoopMeter();
  var NOOP_COUNTER_METRIC = new NoopCounterMetric();
  var NOOP_GAUGE_METRIC = new NoopGaugeMetric();
  var NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
  var NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
  var NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
  var NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
  var NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
  function createNoopMeter() {
    return NOOP_METER;
  }

  // node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js
  var defaultTextMapGetter = {
    get: function(carrier, key) {
      if (carrier == null) {
        return void 0;
      }
      return carrier[key];
    },
    keys: function(carrier) {
      if (carrier == null) {
        return [];
      }
      return Object.keys(carrier);
    }
  };
  var defaultTextMapSetter = {
    set: function(carrier, key, value) {
      if (carrier == null) {
        return;
      }
      carrier[key] = value;
    }
  };

  // node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js
  var __read4 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray3 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var NoopContextManager = (
    /** @class */
    (function() {
      function NoopContextManager2() {
      }
      NoopContextManager2.prototype.active = function() {
        return ROOT_CONTEXT;
      };
      NoopContextManager2.prototype.with = function(_context, fn, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return fn.call.apply(fn, __spreadArray3([thisArg], __read4(args), false));
      };
      NoopContextManager2.prototype.bind = function(_context, target) {
        return target;
      };
      NoopContextManager2.prototype.enable = function() {
        return this;
      };
      NoopContextManager2.prototype.disable = function() {
        return this;
      };
      return NoopContextManager2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/api/context.js
  var __read5 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray4 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var API_NAME2 = "context";
  var NOOP_CONTEXT_MANAGER = new NoopContextManager();
  var ContextAPI = (
    /** @class */
    (function() {
      function ContextAPI2() {
      }
      ContextAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new ContextAPI2();
        }
        return this._instance;
      };
      ContextAPI2.prototype.setGlobalContextManager = function(contextManager) {
        return registerGlobal(API_NAME2, contextManager, DiagAPI.instance());
      };
      ContextAPI2.prototype.active = function() {
        return this._getContextManager().active();
      };
      ContextAPI2.prototype.with = function(context2, fn, thisArg) {
        var _a;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return (_a = this._getContextManager()).with.apply(_a, __spreadArray4([context2, fn, thisArg], __read5(args), false));
      };
      ContextAPI2.prototype.bind = function(context2, target) {
        return this._getContextManager().bind(context2, target);
      };
      ContextAPI2.prototype._getContextManager = function() {
        return getGlobal(API_NAME2) || NOOP_CONTEXT_MANAGER;
      };
      ContextAPI2.prototype.disable = function() {
        this._getContextManager().disable();
        unregisterGlobal(API_NAME2, DiagAPI.instance());
      };
      return ContextAPI2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js
  var TraceFlags;
  (function(TraceFlags2) {
    TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
    TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
  })(TraceFlags || (TraceFlags = {}));

  // node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js
  var INVALID_SPANID = "0000000000000000";
  var INVALID_TRACEID = "00000000000000000000000000000000";
  var INVALID_SPAN_CONTEXT = {
    traceId: INVALID_TRACEID,
    spanId: INVALID_SPANID,
    traceFlags: TraceFlags.NONE
  };

  // node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js
  var NonRecordingSpan = (
    /** @class */
    (function() {
      function NonRecordingSpan2(_spanContext) {
        if (_spanContext === void 0) {
          _spanContext = INVALID_SPAN_CONTEXT;
        }
        this._spanContext = _spanContext;
      }
      NonRecordingSpan2.prototype.spanContext = function() {
        return this._spanContext;
      };
      NonRecordingSpan2.prototype.setAttribute = function(_key, _value) {
        return this;
      };
      NonRecordingSpan2.prototype.setAttributes = function(_attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.addEvent = function(_name, _attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.addLink = function(_link) {
        return this;
      };
      NonRecordingSpan2.prototype.addLinks = function(_links) {
        return this;
      };
      NonRecordingSpan2.prototype.setStatus = function(_status) {
        return this;
      };
      NonRecordingSpan2.prototype.updateName = function(_name) {
        return this;
      };
      NonRecordingSpan2.prototype.end = function(_endTime) {
      };
      NonRecordingSpan2.prototype.isRecording = function() {
        return false;
      };
      NonRecordingSpan2.prototype.recordException = function(_exception, _time) {
      };
      return NonRecordingSpan2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/trace/context-utils.js
  var SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
  function getSpan(context2) {
    return context2.getValue(SPAN_KEY) || void 0;
  }
  function getActiveSpan() {
    return getSpan(ContextAPI.getInstance().active());
  }
  function setSpan(context2, span) {
    return context2.setValue(SPAN_KEY, span);
  }
  function deleteSpan(context2) {
    return context2.deleteValue(SPAN_KEY);
  }
  function setSpanContext(context2, spanContext) {
    return setSpan(context2, new NonRecordingSpan(spanContext));
  }
  function getSpanContext(context2) {
    var _a;
    return (_a = getSpan(context2)) === null || _a === void 0 ? void 0 : _a.spanContext();
  }

  // node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js
  var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
  var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
  function isValidTraceId(traceId) {
    return VALID_TRACEID_REGEX.test(traceId) && traceId !== INVALID_TRACEID;
  }
  function isValidSpanId(spanId) {
    return VALID_SPANID_REGEX.test(spanId) && spanId !== INVALID_SPANID;
  }
  function isSpanContextValid(spanContext) {
    return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
  }
  function wrapSpanContext(spanContext) {
    return new NonRecordingSpan(spanContext);
  }

  // node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js
  var contextApi = ContextAPI.getInstance();
  var NoopTracer = (
    /** @class */
    (function() {
      function NoopTracer2() {
      }
      NoopTracer2.prototype.startSpan = function(name, options, context2) {
        if (context2 === void 0) {
          context2 = contextApi.active();
        }
        var root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan();
        }
        var parentFromContext = context2 && getSpanContext(context2);
        if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
          return new NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan();
        }
      };
      NoopTracer2.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = setSpan(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      };
      return NoopTracer2;
    })()
  );
  function isSpanContext(spanContext) {
    return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
  }

  // node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js
  var NOOP_TRACER = new NoopTracer();
  var ProxyTracer = (
    /** @class */
    (function() {
      function ProxyTracer2(_provider, name, version, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version;
        this.options = options;
      }
      ProxyTracer2.prototype.startSpan = function(name, options, context2) {
        return this._getTracer().startSpan(name, options, context2);
      };
      ProxyTracer2.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
        var tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      };
      ProxyTracer2.prototype._getTracer = function() {
        if (this._delegate) {
          return this._delegate;
        }
        var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
          return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
      };
      return ProxyTracer2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js
  var NoopTracerProvider = (
    /** @class */
    (function() {
      function NoopTracerProvider2() {
      }
      NoopTracerProvider2.prototype.getTracer = function(_name, _version, _options) {
        return new NoopTracer();
      };
      return NoopTracerProvider2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js
  var NOOP_TRACER_PROVIDER = new NoopTracerProvider();
  var ProxyTracerProvider = (
    /** @class */
    (function() {
      function ProxyTracerProvider2() {
      }
      ProxyTracerProvider2.prototype.getTracer = function(name, version, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer(this, name, version, options);
      };
      ProxyTracerProvider2.prototype.getDelegate = function() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
      };
      ProxyTracerProvider2.prototype.setDelegate = function(delegate) {
        this._delegate = delegate;
      };
      ProxyTracerProvider2.prototype.getDelegateTracer = function(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
      };
      return ProxyTracerProvider2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js
  var SamplingDecision;
  (function(SamplingDecision3) {
    SamplingDecision3[SamplingDecision3["NOT_RECORD"] = 0] = "NOT_RECORD";
    SamplingDecision3[SamplingDecision3["RECORD"] = 1] = "RECORD";
    SamplingDecision3[SamplingDecision3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
  })(SamplingDecision || (SamplingDecision = {}));

  // node_modules/@opentelemetry/api/build/esm/trace/span_kind.js
  var SpanKind;
  (function(SpanKind2) {
    SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
    SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
    SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
    SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
    SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
  })(SpanKind || (SpanKind = {}));

  // node_modules/@opentelemetry/api/build/esm/trace/status.js
  var SpanStatusCode;
  (function(SpanStatusCode2) {
    SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
    SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
    SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
  })(SpanStatusCode || (SpanStatusCode = {}));

  // node_modules/@opentelemetry/api/build/esm/context-api.js
  var context = ContextAPI.getInstance();

  // node_modules/@opentelemetry/api/build/esm/diag-api.js
  var diag2 = DiagAPI.instance();

  // node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js
  var NoopMeterProvider = (
    /** @class */
    (function() {
      function NoopMeterProvider2() {
      }
      NoopMeterProvider2.prototype.getMeter = function(_name, _version, _options) {
        return NOOP_METER;
      };
      return NoopMeterProvider2;
    })()
  );
  var NOOP_METER_PROVIDER = new NoopMeterProvider();

  // node_modules/@opentelemetry/api/build/esm/api/metrics.js
  var API_NAME3 = "metrics";
  var MetricsAPI = (
    /** @class */
    (function() {
      function MetricsAPI2() {
      }
      MetricsAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new MetricsAPI2();
        }
        return this._instance;
      };
      MetricsAPI2.prototype.setGlobalMeterProvider = function(provider) {
        return registerGlobal(API_NAME3, provider, DiagAPI.instance());
      };
      MetricsAPI2.prototype.getMeterProvider = function() {
        return getGlobal(API_NAME3) || NOOP_METER_PROVIDER;
      };
      MetricsAPI2.prototype.getMeter = function(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
      };
      MetricsAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME3, DiagAPI.instance());
      };
      return MetricsAPI2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/metrics-api.js
  var metrics = MetricsAPI.getInstance();

  // node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js
  var NoopTextMapPropagator = (
    /** @class */
    (function() {
      function NoopTextMapPropagator2() {
      }
      NoopTextMapPropagator2.prototype.inject = function(_context, _carrier) {
      };
      NoopTextMapPropagator2.prototype.extract = function(context2, _carrier) {
        return context2;
      };
      NoopTextMapPropagator2.prototype.fields = function() {
        return [];
      };
      return NoopTextMapPropagator2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js
  var BAGGAGE_KEY = createContextKey("OpenTelemetry Baggage Key");
  function getBaggage(context2) {
    return context2.getValue(BAGGAGE_KEY) || void 0;
  }
  function getActiveBaggage() {
    return getBaggage(ContextAPI.getInstance().active());
  }
  function setBaggage(context2, baggage) {
    return context2.setValue(BAGGAGE_KEY, baggage);
  }
  function deleteBaggage(context2) {
    return context2.deleteValue(BAGGAGE_KEY);
  }

  // node_modules/@opentelemetry/api/build/esm/api/propagation.js
  var API_NAME4 = "propagation";
  var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator();
  var PropagationAPI = (
    /** @class */
    (function() {
      function PropagationAPI2() {
        this.createBaggage = createBaggage;
        this.getBaggage = getBaggage;
        this.getActiveBaggage = getActiveBaggage;
        this.setBaggage = setBaggage;
        this.deleteBaggage = deleteBaggage;
      }
      PropagationAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new PropagationAPI2();
        }
        return this._instance;
      };
      PropagationAPI2.prototype.setGlobalPropagator = function(propagator) {
        return registerGlobal(API_NAME4, propagator, DiagAPI.instance());
      };
      PropagationAPI2.prototype.inject = function(context2, carrier, setter) {
        if (setter === void 0) {
          setter = defaultTextMapSetter;
        }
        return this._getGlobalPropagator().inject(context2, carrier, setter);
      };
      PropagationAPI2.prototype.extract = function(context2, carrier, getter) {
        if (getter === void 0) {
          getter = defaultTextMapGetter;
        }
        return this._getGlobalPropagator().extract(context2, carrier, getter);
      };
      PropagationAPI2.prototype.fields = function() {
        return this._getGlobalPropagator().fields();
      };
      PropagationAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME4, DiagAPI.instance());
      };
      PropagationAPI2.prototype._getGlobalPropagator = function() {
        return getGlobal(API_NAME4) || NOOP_TEXT_MAP_PROPAGATOR;
      };
      return PropagationAPI2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/propagation-api.js
  var propagation = PropagationAPI.getInstance();

  // node_modules/@opentelemetry/api/build/esm/api/trace.js
  var API_NAME5 = "trace";
  var TraceAPI = (
    /** @class */
    (function() {
      function TraceAPI2() {
        this._proxyTracerProvider = new ProxyTracerProvider();
        this.wrapSpanContext = wrapSpanContext;
        this.isSpanContextValid = isSpanContextValid;
        this.deleteSpan = deleteSpan;
        this.getSpan = getSpan;
        this.getActiveSpan = getActiveSpan;
        this.getSpanContext = getSpanContext;
        this.setSpan = setSpan;
        this.setSpanContext = setSpanContext;
      }
      TraceAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new TraceAPI2();
        }
        return this._instance;
      };
      TraceAPI2.prototype.setGlobalTracerProvider = function(provider) {
        var success = registerGlobal(API_NAME5, this._proxyTracerProvider, DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
      };
      TraceAPI2.prototype.getTracerProvider = function() {
        return getGlobal(API_NAME5) || this._proxyTracerProvider;
      };
      TraceAPI2.prototype.getTracer = function(name, version) {
        return this.getTracerProvider().getTracer(name, version);
      };
      TraceAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME5, DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider();
      };
      return TraceAPI2;
    })()
  );

  // node_modules/@opentelemetry/api/build/esm/trace-api.js
  var trace = TraceAPI.getInstance();

  // node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
  var SUPPRESS_TRACING_KEY = createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
  function suppressTracing(context2) {
    return context2.setValue(SUPPRESS_TRACING_KEY, true);
  }
  function isTracingSuppressed(context2) {
    return context2.getValue(SUPPRESS_TRACING_KEY) === true;
  }

  // node_modules/@opentelemetry/core/build/esm/baggage/constants.js
  var BAGGAGE_KEY_PAIR_SEPARATOR = "=";
  var BAGGAGE_PROPERTIES_SEPARATOR = ";";
  var BAGGAGE_ITEMS_SEPARATOR = ",";
  var BAGGAGE_HEADER = "baggage";
  var BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
  var BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
  var BAGGAGE_MAX_TOTAL_LENGTH = 8192;

  // node_modules/@opentelemetry/core/build/esm/baggage/utils.js
  function serializeKeyPairs(keyPairs) {
    return keyPairs.reduce((hValue, current) => {
      const value = `${hValue}${hValue !== "" ? BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
      return value.length > BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
    }, "");
  }
  function getKeyPairs(baggage) {
    return baggage.getAllEntries().map(([key, value]) => {
      let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
      if (value.metadata !== void 0) {
        entry += BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
      }
      return entry;
    });
  }
  function parsePairKeyValue(entry) {
    if (!entry)
      return;
    const metadataSeparatorIndex = entry.indexOf(BAGGAGE_PROPERTIES_SEPARATOR);
    const keyPairPart = metadataSeparatorIndex === -1 ? entry : entry.substring(0, metadataSeparatorIndex);
    const separatorIndex = keyPairPart.indexOf(BAGGAGE_KEY_PAIR_SEPARATOR);
    if (separatorIndex <= 0)
      return;
    const rawKey = keyPairPart.substring(0, separatorIndex).trim();
    const rawValue = keyPairPart.substring(separatorIndex + 1).trim();
    if (!rawKey || !rawValue)
      return;
    let key;
    let value;
    try {
      key = decodeURIComponent(rawKey);
      value = decodeURIComponent(rawValue);
    } catch {
      return;
    }
    let metadata;
    if (metadataSeparatorIndex !== -1 && metadataSeparatorIndex < entry.length - 1) {
      const metadataString = entry.substring(metadataSeparatorIndex + 1);
      metadata = baggageEntryMetadataFromString(metadataString);
    }
    return { key, value, metadata };
  }

  // node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js
  var W3CBaggagePropagator = class {
    inject(context2, carrier, setter) {
      const baggage = propagation.getBaggage(context2);
      if (!baggage || isTracingSuppressed(context2))
        return;
      const keyPairs = getKeyPairs(baggage).filter((pair) => {
        return pair.length <= BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
      }).slice(0, BAGGAGE_MAX_NAME_VALUE_PAIRS);
      const headerValue = serializeKeyPairs(keyPairs);
      if (headerValue.length > 0) {
        setter.set(carrier, BAGGAGE_HEADER, headerValue);
      }
    }
    extract(context2, carrier, getter) {
      const headerValue = getter.get(carrier, BAGGAGE_HEADER);
      const baggageString = Array.isArray(headerValue) ? headerValue.join(BAGGAGE_ITEMS_SEPARATOR) : headerValue;
      if (!baggageString)
        return context2;
      const baggage = {};
      if (baggageString.length === 0) {
        return context2;
      }
      const pairs = baggageString.split(BAGGAGE_ITEMS_SEPARATOR);
      pairs.forEach((entry) => {
        const keyPair = parsePairKeyValue(entry);
        if (keyPair) {
          const baggageEntry = { value: keyPair.value };
          if (keyPair.metadata) {
            baggageEntry.metadata = keyPair.metadata;
          }
          baggage[keyPair.key] = baggageEntry;
        }
      });
      if (Object.entries(baggage).length === 0) {
        return context2;
      }
      return propagation.setBaggage(context2, propagation.createBaggage(baggage));
    }
    fields() {
      return [BAGGAGE_HEADER];
    }
  };

  // node_modules/@opentelemetry/core/build/esm/common/attributes.js
  function sanitizeAttributes(attributes) {
    const out = {};
    if (typeof attributes !== "object" || attributes == null) {
      return out;
    }
    for (const key in attributes) {
      if (!Object.prototype.hasOwnProperty.call(attributes, key)) {
        continue;
      }
      if (!isAttributeKey(key)) {
        diag2.warn(`Invalid attribute key: ${key}`);
        continue;
      }
      const val = attributes[key];
      if (!isAttributeValue(val)) {
        diag2.warn(`Invalid attribute value set for key: ${key}`);
        continue;
      }
      if (Array.isArray(val)) {
        out[key] = val.slice();
      } else {
        out[key] = val;
      }
    }
    return out;
  }
  function isAttributeKey(key) {
    return typeof key === "string" && key !== "";
  }
  function isAttributeValue(val) {
    if (val == null) {
      return true;
    }
    if (Array.isArray(val)) {
      return isHomogeneousAttributeValueArray(val);
    }
    return isValidPrimitiveAttributeValueType(typeof val);
  }
  function isHomogeneousAttributeValueArray(arr) {
    let type;
    for (const element of arr) {
      if (element == null)
        continue;
      const elementType = typeof element;
      if (elementType === type) {
        continue;
      }
      if (!type) {
        if (isValidPrimitiveAttributeValueType(elementType)) {
          type = elementType;
          continue;
        }
        return false;
      }
      return false;
    }
    return true;
  }
  function isValidPrimitiveAttributeValueType(valType) {
    switch (valType) {
      case "number":
      case "boolean":
      case "string":
        return true;
    }
    return false;
  }

  // node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js
  function loggingErrorHandler() {
    return (ex) => {
      diag2.error(stringifyException(ex));
    };
  }
  function stringifyException(ex) {
    if (typeof ex === "string") {
      return ex;
    } else {
      return JSON.stringify(flattenException(ex));
    }
  }
  function flattenException(ex) {
    const result = {};
    let current = ex;
    while (current !== null) {
      Object.getOwnPropertyNames(current).forEach((propertyName) => {
        if (result[propertyName])
          return;
        const value = current[propertyName];
        if (value) {
          result[propertyName] = String(value);
        }
      });
      current = Object.getPrototypeOf(current);
    }
    return result;
  }

  // node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
  var delegateHandler = loggingErrorHandler();
  function globalErrorHandler(ex) {
    try {
      delegateHandler(ex);
    } catch {
    }
  }

  // node_modules/@opentelemetry/core/build/esm/platform/browser/environment.js
  function getStringFromEnv(_) {
    return void 0;
  }
  function getNumberFromEnv(_) {
    return void 0;
  }

  // node_modules/@opentelemetry/core/build/esm/version.js
  var VERSION2 = "2.6.0";

  // node_modules/@opentelemetry/semantic-conventions/build/esnext/stable_attributes.js
  var ATTR_EXCEPTION_MESSAGE = "exception.message";
  var ATTR_EXCEPTION_STACKTRACE = "exception.stacktrace";
  var ATTR_EXCEPTION_TYPE = "exception.type";
  var ATTR_SERVICE_NAME = "service.name";
  var ATTR_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
  var TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs";
  var ATTR_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
  var ATTR_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
  var ATTR_URL_FULL = "url.full";

  // node_modules/@opentelemetry/core/build/esm/semconv.js
  var ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";

  // node_modules/@opentelemetry/core/build/esm/platform/browser/sdk-info.js
  var SDK_INFO = {
    [ATTR_TELEMETRY_SDK_NAME]: "opentelemetry",
    [ATTR_PROCESS_RUNTIME_NAME]: "browser",
    [ATTR_TELEMETRY_SDK_LANGUAGE]: TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS,
    [ATTR_TELEMETRY_SDK_VERSION]: VERSION2
  };

  // node_modules/@opentelemetry/core/build/esm/platform/browser/index.js
  var otperformance = performance;

  // node_modules/@opentelemetry/core/build/esm/common/time.js
  var NANOSECOND_DIGITS = 9;
  var NANOSECOND_DIGITS_IN_MILLIS = 6;
  var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
  var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
  function millisToHrTime(epochMillis) {
    const epochSeconds = epochMillis / 1e3;
    const seconds = Math.trunc(epochSeconds);
    const nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS);
    return [seconds, nanos];
  }
  function hrTime(performanceNow) {
    const timeOrigin = millisToHrTime(otperformance.timeOrigin);
    const now = millisToHrTime(typeof performanceNow === "number" ? performanceNow : otperformance.now());
    return addHrTimes(timeOrigin, now);
  }
  function timeInputToHrTime(time) {
    if (isTimeInputHrTime(time)) {
      return time;
    } else if (typeof time === "number") {
      if (time < otperformance.timeOrigin) {
        return hrTime(time);
      } else {
        return millisToHrTime(time);
      }
    } else if (time instanceof Date) {
      return millisToHrTime(time.getTime());
    } else {
      throw TypeError("Invalid input type");
    }
  }
  function hrTimeDuration(startTime, endTime) {
    let seconds = endTime[0] - startTime[0];
    let nanos = endTime[1] - startTime[1];
    if (nanos < 0) {
      seconds -= 1;
      nanos += SECOND_TO_NANOSECONDS;
    }
    return [seconds, nanos];
  }
  function hrTimeToMicroseconds(time) {
    return time[0] * 1e6 + time[1] / 1e3;
  }
  function isTimeInputHrTime(value) {
    return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
  }
  function isTimeInput(value) {
    return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
  }
  function addHrTimes(time1, time2) {
    const out = [time1[0] + time2[0], time1[1] + time2[1]];
    if (out[1] >= SECOND_TO_NANOSECONDS) {
      out[1] -= SECOND_TO_NANOSECONDS;
      out[0] += 1;
    }
    return out;
  }

  // node_modules/@opentelemetry/core/build/esm/ExportResult.js
  var ExportResultCode;
  (function(ExportResultCode2) {
    ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
    ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
  })(ExportResultCode || (ExportResultCode = {}));

  // node_modules/@opentelemetry/core/build/esm/propagation/composite.js
  var CompositePropagator = class {
    _propagators;
    _fields;
    /**
     * Construct a composite propagator from a list of propagators.
     *
     * @param [config] Configuration object for composite propagator
     */
    constructor(config = {}) {
      this._propagators = config.propagators ?? [];
      this._fields = Array.from(new Set(this._propagators.map((p) => typeof p.fields === "function" ? p.fields() : []).reduce((x, y) => x.concat(y), [])));
    }
    /**
     * Run each of the configured propagators with the given context and carrier.
     * Propagators are run in the order they are configured, so if multiple
     * propagators write the same carrier key, the propagator later in the list
     * will "win".
     *
     * @param context Context to inject
     * @param carrier Carrier into which context will be injected
     */
    inject(context2, carrier, setter) {
      for (const propagator of this._propagators) {
        try {
          propagator.inject(context2, carrier, setter);
        } catch (err) {
          diag2.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
        }
      }
    }
    /**
     * Run each of the configured propagators with the given context and carrier.
     * Propagators are run in the order they are configured, so if multiple
     * propagators write the same context key, the propagator later in the list
     * will "win".
     *
     * @param context Context to add values to
     * @param carrier Carrier from which to extract context
     */
    extract(context2, carrier, getter) {
      return this._propagators.reduce((ctx, propagator) => {
        try {
          return propagator.extract(ctx, carrier, getter);
        } catch (err) {
          diag2.warn(`Failed to extract with ${propagator.constructor.name}. Err: ${err.message}`);
        }
        return ctx;
      }, context2);
    }
    fields() {
      return this._fields.slice();
    }
  };

  // node_modules/@opentelemetry/core/build/esm/internal/validators.js
  var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
  var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
  var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
  var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
  var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
  var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
  function validateKey(key) {
    return VALID_KEY_REGEX.test(key);
  }
  function validateValue(value) {
    return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
  }

  // node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
  var MAX_TRACE_STATE_ITEMS = 32;
  var MAX_TRACE_STATE_LEN = 512;
  var LIST_MEMBERS_SEPARATOR = ",";
  var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
  var TraceState = class _TraceState {
    _internalState = /* @__PURE__ */ new Map();
    constructor(rawTraceState) {
      if (rawTraceState)
        this._parse(rawTraceState);
    }
    set(key, value) {
      const traceState = this._clone();
      if (traceState._internalState.has(key)) {
        traceState._internalState.delete(key);
      }
      traceState._internalState.set(key, value);
      return traceState;
    }
    unset(key) {
      const traceState = this._clone();
      traceState._internalState.delete(key);
      return traceState;
    }
    get(key) {
      return this._internalState.get(key);
    }
    serialize() {
      return this._keys().reduce((agg, key) => {
        agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
        return agg;
      }, []).join(LIST_MEMBERS_SEPARATOR);
    }
    _parse(rawTraceState) {
      if (rawTraceState.length > MAX_TRACE_STATE_LEN)
        return;
      this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
        const listMember = part.trim();
        const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
        if (i !== -1) {
          const key = listMember.slice(0, i);
          const value = listMember.slice(i + 1, part.length);
          if (validateKey(key) && validateValue(value)) {
            agg.set(key, value);
          } else {
          }
        }
        return agg;
      }, /* @__PURE__ */ new Map());
      if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
      }
    }
    _keys() {
      return Array.from(this._internalState.keys()).reverse();
    }
    _clone() {
      const traceState = new _TraceState();
      traceState._internalState = new Map(this._internalState);
      return traceState;
    }
  };

  // node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
  var TRACE_PARENT_HEADER = "traceparent";
  var TRACE_STATE_HEADER = "tracestate";
  var VERSION3 = "00";
  var VERSION_PART = "(?!ff)[\\da-f]{2}";
  var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
  var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
  var FLAGS_PART = "[\\da-f]{2}";
  var TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
  function parseTraceParent(traceParent) {
    const match = TRACE_PARENT_REGEX.exec(traceParent);
    if (!match)
      return null;
    if (match[1] === "00" && match[5])
      return null;
    return {
      traceId: match[2],
      spanId: match[3],
      traceFlags: parseInt(match[4], 16)
    };
  }
  var W3CTraceContextPropagator = class {
    inject(context2, carrier, setter) {
      const spanContext = trace.getSpanContext(context2);
      if (!spanContext || isTracingSuppressed(context2) || !isSpanContextValid(spanContext))
        return;
      const traceParent = `${VERSION3}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || TraceFlags.NONE).toString(16)}`;
      setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
      if (spanContext.traceState) {
        setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
      }
    }
    extract(context2, carrier, getter) {
      const traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
      if (!traceParentHeader)
        return context2;
      const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
      if (typeof traceParent !== "string")
        return context2;
      const spanContext = parseTraceParent(traceParent);
      if (!spanContext)
        return context2;
      spanContext.isRemote = true;
      const traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
      if (traceStateHeader) {
        const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
        spanContext.traceState = new TraceState(typeof state === "string" ? state : void 0);
      }
      return trace.setSpanContext(context2, spanContext);
    }
    fields() {
      return [TRACE_PARENT_HEADER, TRACE_STATE_HEADER];
    }
  };

  // node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js
  var objectTag = "[object Object]";
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  var objectCtorString = funcToString.call(Object);
  var getPrototypeOf = Object.getPrototypeOf;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  var nativeObjectToString = objectProto.toString;
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
      return false;
    }
    const proto = getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function getRawTag(value) {
    const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    let unmasked = false;
    try {
      value[symToStringTag] = void 0;
      unmasked = true;
    } catch {
    }
    const result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  // node_modules/@opentelemetry/core/build/esm/utils/merge.js
  var MAX_LEVEL = 20;
  function merge(...args) {
    let result = args.shift();
    const objects = /* @__PURE__ */ new WeakMap();
    while (args.length > 0) {
      result = mergeTwoObjects(result, args.shift(), 0, objects);
    }
    return result;
  }
  function takeValue(value) {
    if (isArray(value)) {
      return value.slice();
    }
    return value;
  }
  function mergeTwoObjects(one, two, level = 0, objects) {
    let result;
    if (level > MAX_LEVEL) {
      return void 0;
    }
    level++;
    if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
      result = takeValue(two);
    } else if (isArray(one)) {
      result = one.slice();
      if (isArray(two)) {
        for (let i = 0, j = two.length; i < j; i++) {
          result.push(takeValue(two[i]));
        }
      } else if (isObject(two)) {
        const keys = Object.keys(two);
        for (let i = 0, j = keys.length; i < j; i++) {
          const key = keys[i];
          result[key] = takeValue(two[key]);
        }
      }
    } else if (isObject(one)) {
      if (isObject(two)) {
        if (!shouldMerge(one, two)) {
          return two;
        }
        result = Object.assign({}, one);
        const keys = Object.keys(two);
        for (let i = 0, j = keys.length; i < j; i++) {
          const key = keys[i];
          const twoValue = two[key];
          if (isPrimitive(twoValue)) {
            if (typeof twoValue === "undefined") {
              delete result[key];
            } else {
              result[key] = twoValue;
            }
          } else {
            const obj1 = result[key];
            const obj2 = twoValue;
            if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
              delete result[key];
            } else {
              if (isObject(obj1) && isObject(obj2)) {
                const arr1 = objects.get(obj1) || [];
                const arr2 = objects.get(obj2) || [];
                arr1.push({ obj: one, key });
                arr2.push({ obj: two, key });
                objects.set(obj1, arr1);
                objects.set(obj2, arr2);
              }
              result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
            }
          }
        }
      } else {
        result = two;
      }
    }
    return result;
  }
  function wasObjectReferenced(obj, key, objects) {
    const arr = objects.get(obj[key]) || [];
    for (let i = 0, j = arr.length; i < j; i++) {
      const info = arr[i];
      if (info.key === key && info.obj === obj) {
        return true;
      }
    }
    return false;
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isObject(value) {
    return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
  }
  function isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
  }
  function shouldMerge(one, two) {
    if (!isPlainObject(one) || !isPlainObject(two)) {
      return false;
    }
    return true;
  }

  // node_modules/@opentelemetry/core/build/esm/utils/timeout.js
  var TimeoutError = class _TimeoutError extends Error {
    constructor(message) {
      super(message);
      Object.setPrototypeOf(this, _TimeoutError.prototype);
    }
  };
  function callWithTimeout(promise, timeout) {
    let timeoutHandle;
    const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
      timeoutHandle = setTimeout(function timeoutHandler() {
        reject(new TimeoutError("Operation timed out."));
      }, timeout);
    });
    return Promise.race([promise, timeoutPromise]).then((result) => {
      clearTimeout(timeoutHandle);
      return result;
    }, (reason) => {
      clearTimeout(timeoutHandle);
      throw reason;
    });
  }

  // node_modules/@opentelemetry/core/build/esm/utils/promise.js
  var Deferred = class {
    _promise;
    _resolve;
    _reject;
    constructor() {
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
    }
    get promise() {
      return this._promise;
    }
    resolve(val) {
      this._resolve(val);
    }
    reject(err) {
      this._reject(err);
    }
  };

  // node_modules/@opentelemetry/core/build/esm/utils/callback.js
  var BindOnceFuture = class {
    _isCalled = false;
    _deferred = new Deferred();
    _callback;
    _that;
    constructor(callback, that) {
      this._callback = callback;
      this._that = that;
    }
    get isCalled() {
      return this._isCalled;
    }
    get promise() {
      return this._deferred.promise;
    }
    call(...args) {
      if (!this._isCalled) {
        this._isCalled = true;
        try {
          Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
        } catch (err) {
          this._deferred.reject(err);
        }
      }
      return this._deferred.promise;
    }
  };

  // node_modules/@opentelemetry/core/build/esm/internal/exporter.js
  function _export(exporter, arg) {
    return new Promise((resolve) => {
      context.with(suppressTracing(context.active()), () => {
        exporter.export(arg, resolve);
      });
    });
  }

  // node_modules/@opentelemetry/core/build/esm/index.js
  var internal = {
    _export
  };

  // node_modules/@opentelemetry/api-logs/build/esm/types/LogRecord.js
  var SeverityNumber;
  (function(SeverityNumber2) {
    SeverityNumber2[SeverityNumber2["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    SeverityNumber2[SeverityNumber2["TRACE"] = 1] = "TRACE";
    SeverityNumber2[SeverityNumber2["TRACE2"] = 2] = "TRACE2";
    SeverityNumber2[SeverityNumber2["TRACE3"] = 3] = "TRACE3";
    SeverityNumber2[SeverityNumber2["TRACE4"] = 4] = "TRACE4";
    SeverityNumber2[SeverityNumber2["DEBUG"] = 5] = "DEBUG";
    SeverityNumber2[SeverityNumber2["DEBUG2"] = 6] = "DEBUG2";
    SeverityNumber2[SeverityNumber2["DEBUG3"] = 7] = "DEBUG3";
    SeverityNumber2[SeverityNumber2["DEBUG4"] = 8] = "DEBUG4";
    SeverityNumber2[SeverityNumber2["INFO"] = 9] = "INFO";
    SeverityNumber2[SeverityNumber2["INFO2"] = 10] = "INFO2";
    SeverityNumber2[SeverityNumber2["INFO3"] = 11] = "INFO3";
    SeverityNumber2[SeverityNumber2["INFO4"] = 12] = "INFO4";
    SeverityNumber2[SeverityNumber2["WARN"] = 13] = "WARN";
    SeverityNumber2[SeverityNumber2["WARN2"] = 14] = "WARN2";
    SeverityNumber2[SeverityNumber2["WARN3"] = 15] = "WARN3";
    SeverityNumber2[SeverityNumber2["WARN4"] = 16] = "WARN4";
    SeverityNumber2[SeverityNumber2["ERROR"] = 17] = "ERROR";
    SeverityNumber2[SeverityNumber2["ERROR2"] = 18] = "ERROR2";
    SeverityNumber2[SeverityNumber2["ERROR3"] = 19] = "ERROR3";
    SeverityNumber2[SeverityNumber2["ERROR4"] = 20] = "ERROR4";
    SeverityNumber2[SeverityNumber2["FATAL"] = 21] = "FATAL";
    SeverityNumber2[SeverityNumber2["FATAL2"] = 22] = "FATAL2";
    SeverityNumber2[SeverityNumber2["FATAL3"] = 23] = "FATAL3";
    SeverityNumber2[SeverityNumber2["FATAL4"] = 24] = "FATAL4";
  })(SeverityNumber || (SeverityNumber = {}));

  // node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js
  var NoopLogger = class {
    emit(_logRecord) {
    }
  };
  var NOOP_LOGGER = new NoopLogger();

  // node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js
  var GLOBAL_LOGS_API_KEY = /* @__PURE__ */ Symbol.for("io.opentelemetry.js.api.logs");
  var _global2 = globalThis;
  function makeGetter(requiredVersion, instance, fallback) {
    return (version) => version === requiredVersion ? instance : fallback;
  }
  var API_BACKWARDS_COMPATIBILITY_VERSION = 1;

  // node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js
  var NoopLoggerProvider = class {
    getLogger(_name, _version, _options) {
      return new NoopLogger();
    }
  };
  var NOOP_LOGGER_PROVIDER = new NoopLoggerProvider();

  // node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js
  var ProxyLogger = class {
    constructor(provider, name, version, options) {
      this._provider = provider;
      this.name = name;
      this.version = version;
      this.options = options;
    }
    /**
     * Emit a log record. This method should only be used by log appenders.
     *
     * @param logRecord
     */
    emit(logRecord) {
      this._getLogger().emit(logRecord);
    }
    /**
     * Try to get a logger from the proxy logger provider.
     * If the proxy logger provider has no delegate, return a noop logger.
     */
    _getLogger() {
      if (this._delegate) {
        return this._delegate;
      }
      const logger2 = this._provider._getDelegateLogger(this.name, this.version, this.options);
      if (!logger2) {
        return NOOP_LOGGER;
      }
      this._delegate = logger2;
      return this._delegate;
    }
  };

  // node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js
  var ProxyLoggerProvider = class {
    getLogger(name, version, options) {
      var _a;
      return (_a = this._getDelegateLogger(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyLogger(this, name, version, options);
    }
    /**
     * Get the delegate logger provider.
     * Used by tests only.
     * @internal
     */
    _getDelegate() {
      var _a;
      return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_LOGGER_PROVIDER;
    }
    /**
     * Set the delegate logger provider
     * @internal
     */
    _setDelegate(delegate) {
      this._delegate = delegate;
    }
    /**
     * @internal
     */
    _getDelegateLogger(name, version, options) {
      var _a;
      return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getLogger(name, version, options);
    }
  };

  // node_modules/@opentelemetry/api-logs/build/esm/api/logs.js
  var LogsAPI = class _LogsAPI {
    constructor() {
      this._proxyLoggerProvider = new ProxyLoggerProvider();
    }
    static getInstance() {
      if (!this._instance) {
        this._instance = new _LogsAPI();
      }
      return this._instance;
    }
    setGlobalLoggerProvider(provider) {
      if (_global2[GLOBAL_LOGS_API_KEY]) {
        return this.getLoggerProvider();
      }
      _global2[GLOBAL_LOGS_API_KEY] = makeGetter(API_BACKWARDS_COMPATIBILITY_VERSION, provider, NOOP_LOGGER_PROVIDER);
      this._proxyLoggerProvider._setDelegate(provider);
      return provider;
    }
    /**
     * Returns the global logger provider.
     *
     * @returns LoggerProvider
     */
    getLoggerProvider() {
      var _a, _b;
      return (_b = (_a = _global2[GLOBAL_LOGS_API_KEY]) === null || _a === void 0 ? void 0 : _a.call(_global2, API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && _b !== void 0 ? _b : this._proxyLoggerProvider;
    }
    /**
     * Returns a logger from the global logger provider.
     *
     * @returns Logger
     */
    getLogger(name, version, options) {
      return this.getLoggerProvider().getLogger(name, version, options);
    }
    /** Remove the global logger provider */
    disable() {
      delete _global2[GLOBAL_LOGS_API_KEY];
      this._proxyLoggerProvider = new ProxyLoggerProvider();
    }
  };

  // node_modules/@opentelemetry/api-logs/build/esm/index.js
  var logs = LogsAPI.getInstance();

  // node_modules/@opentelemetry/resources/build/esm/default-service-name.js
  var serviceName;
  function defaultServiceName() {
    if (serviceName === void 0) {
      try {
        const argv0 = globalThis.process.argv0;
        serviceName = argv0 ? `unknown_service:${argv0}` : "unknown_service";
      } catch {
        serviceName = "unknown_service";
      }
    }
    return serviceName;
  }

  // node_modules/@opentelemetry/resources/build/esm/utils.js
  var isPromiseLike = (val) => {
    return val !== null && typeof val === "object" && typeof val.then === "function";
  };

  // node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js
  var ResourceImpl = class _ResourceImpl {
    _rawAttributes;
    _asyncAttributesPending = false;
    _schemaUrl;
    _memoizedAttributes;
    static FromAttributeList(attributes, options) {
      const res = new _ResourceImpl({}, options);
      res._rawAttributes = guardedRawAttributes(attributes);
      res._asyncAttributesPending = attributes.filter(([_, val]) => isPromiseLike(val)).length > 0;
      return res;
    }
    constructor(resource, options) {
      const attributes = resource.attributes ?? {};
      this._rawAttributes = Object.entries(attributes).map(([k, v]) => {
        if (isPromiseLike(v)) {
          this._asyncAttributesPending = true;
        }
        return [k, v];
      });
      this._rawAttributes = guardedRawAttributes(this._rawAttributes);
      this._schemaUrl = validateSchemaUrl(options?.schemaUrl);
    }
    get asyncAttributesPending() {
      return this._asyncAttributesPending;
    }
    async waitForAsyncAttributes() {
      if (!this.asyncAttributesPending) {
        return;
      }
      for (let i = 0; i < this._rawAttributes.length; i++) {
        const [k, v] = this._rawAttributes[i];
        this._rawAttributes[i] = [k, isPromiseLike(v) ? await v : v];
      }
      this._asyncAttributesPending = false;
    }
    get attributes() {
      if (this.asyncAttributesPending) {
        diag2.error("Accessing resource attributes before async attributes settled");
      }
      if (this._memoizedAttributes) {
        return this._memoizedAttributes;
      }
      const attrs = {};
      for (const [k, v] of this._rawAttributes) {
        if (isPromiseLike(v)) {
          diag2.debug(`Unsettled resource attribute ${k} skipped`);
          continue;
        }
        if (v != null) {
          attrs[k] ??= v;
        }
      }
      if (!this._asyncAttributesPending) {
        this._memoizedAttributes = attrs;
      }
      return attrs;
    }
    getRawAttributes() {
      return this._rawAttributes;
    }
    get schemaUrl() {
      return this._schemaUrl;
    }
    merge(resource) {
      if (resource == null)
        return this;
      const mergedSchemaUrl = mergeSchemaUrl(this, resource);
      const mergedOptions = mergedSchemaUrl ? { schemaUrl: mergedSchemaUrl } : void 0;
      return _ResourceImpl.FromAttributeList([...resource.getRawAttributes(), ...this.getRawAttributes()], mergedOptions);
    }
  };
  function resourceFromAttributes(attributes, options) {
    return ResourceImpl.FromAttributeList(Object.entries(attributes), options);
  }
  function defaultResource() {
    return resourceFromAttributes({
      [ATTR_SERVICE_NAME]: defaultServiceName(),
      [ATTR_TELEMETRY_SDK_LANGUAGE]: SDK_INFO[ATTR_TELEMETRY_SDK_LANGUAGE],
      [ATTR_TELEMETRY_SDK_NAME]: SDK_INFO[ATTR_TELEMETRY_SDK_NAME],
      [ATTR_TELEMETRY_SDK_VERSION]: SDK_INFO[ATTR_TELEMETRY_SDK_VERSION]
    });
  }
  function guardedRawAttributes(attributes) {
    return attributes.map(([k, v]) => {
      if (isPromiseLike(v)) {
        return [
          k,
          v.catch((err) => {
            diag2.debug("promise rejection for resource attribute: %s - %s", k, err);
            return void 0;
          })
        ];
      }
      return [k, v];
    });
  }
  function validateSchemaUrl(schemaUrl) {
    if (typeof schemaUrl === "string" || schemaUrl === void 0) {
      return schemaUrl;
    }
    diag2.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", schemaUrl);
    return void 0;
  }
  function mergeSchemaUrl(old, updating) {
    const oldSchemaUrl = old?.schemaUrl;
    const updatingSchemaUrl = updating?.schemaUrl;
    const isOldEmpty = oldSchemaUrl === void 0 || oldSchemaUrl === "";
    const isUpdatingEmpty = updatingSchemaUrl === void 0 || updatingSchemaUrl === "";
    if (isOldEmpty) {
      return updatingSchemaUrl;
    }
    if (isUpdatingEmpty) {
      return oldSchemaUrl;
    }
    if (oldSchemaUrl === updatingSchemaUrl) {
      return oldSchemaUrl;
    }
    diag2.warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', oldSchemaUrl, updatingSchemaUrl);
    return void 0;
  }

  // node_modules/@opentelemetry/sdk-logs/build/esm/utils/validation.js
  function isLogAttributeValue(val) {
    return isLogAttributeValueInternal(val, /* @__PURE__ */ new WeakSet());
  }
  function isLogAttributeValueInternal(val, visited) {
    if (val == null) {
      return true;
    }
    if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
      return true;
    }
    if (val instanceof Uint8Array) {
      return true;
    }
    if (typeof val === "object") {
      if (visited.has(val)) {
        return false;
      }
      visited.add(val);
      if (Array.isArray(val)) {
        return val.every((item) => isLogAttributeValueInternal(item, visited));
      }
      const obj = val;
      if (obj.constructor !== Object && obj.constructor !== void 0) {
        return false;
      }
      return Object.values(obj).every((item) => isLogAttributeValueInternal(item, visited));
    }
    return false;
  }

  // node_modules/@opentelemetry/sdk-logs/build/esm/LogRecordImpl.js
  var LogRecordImpl = class {
    hrTime;
    hrTimeObserved;
    spanContext;
    resource;
    instrumentationScope;
    attributes = {};
    _severityText;
    _severityNumber;
    _body;
    _eventName;
    totalAttributesCount = 0;
    _isReadonly = false;
    _logRecordLimits;
    set severityText(severityText) {
      if (this._isLogRecordReadonly()) {
        return;
      }
      this._severityText = severityText;
    }
    get severityText() {
      return this._severityText;
    }
    set severityNumber(severityNumber) {
      if (this._isLogRecordReadonly()) {
        return;
      }
      this._severityNumber = severityNumber;
    }
    get severityNumber() {
      return this._severityNumber;
    }
    set body(body) {
      if (this._isLogRecordReadonly()) {
        return;
      }
      this._body = body;
    }
    get body() {
      return this._body;
    }
    get eventName() {
      return this._eventName;
    }
    set eventName(eventName) {
      if (this._isLogRecordReadonly()) {
        return;
      }
      this._eventName = eventName;
    }
    get droppedAttributesCount() {
      return this.totalAttributesCount - Object.keys(this.attributes).length;
    }
    constructor(_sharedState, instrumentationScope, logRecord) {
      const { timestamp, observedTimestamp, eventName, severityNumber, severityText, body, attributes = {}, exception, context: context2 } = logRecord;
      const now = Date.now();
      this.hrTime = timeInputToHrTime(timestamp ?? now);
      this.hrTimeObserved = timeInputToHrTime(observedTimestamp ?? now);
      if (context2) {
        const spanContext = trace.getSpanContext(context2);
        if (spanContext && isSpanContextValid(spanContext)) {
          this.spanContext = spanContext;
        }
      }
      this.severityNumber = severityNumber;
      this.severityText = severityText;
      this.body = body;
      this.resource = _sharedState.resource;
      this.instrumentationScope = instrumentationScope;
      this._logRecordLimits = _sharedState.logRecordLimits;
      this._eventName = eventName;
      this.setAttributes(attributes);
      if (exception != null) {
        this._setException(exception);
      }
    }
    setAttribute(key, value) {
      if (this._isLogRecordReadonly()) {
        return this;
      }
      if (key.length === 0) {
        diag2.warn(`Invalid attribute key: ${key}`);
        return this;
      }
      if (!isLogAttributeValue(value)) {
        diag2.warn(`Invalid attribute value set for key: ${key}`);
        return this;
      }
      this.totalAttributesCount += 1;
      if (Object.keys(this.attributes).length >= this._logRecordLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
        if (this.droppedAttributesCount === 1) {
          diag2.warn("Dropping extra attributes.");
        }
        return this;
      }
      this.attributes[key] = this._truncateToSize(value);
      return this;
    }
    setAttributes(attributes) {
      for (const [k, v] of Object.entries(attributes)) {
        this.setAttribute(k, v);
      }
      return this;
    }
    setBody(body) {
      this.body = body;
      return this;
    }
    setEventName(eventName) {
      this.eventName = eventName;
      return this;
    }
    setSeverityNumber(severityNumber) {
      this.severityNumber = severityNumber;
      return this;
    }
    setSeverityText(severityText) {
      this.severityText = severityText;
      return this;
    }
    /**
     * @internal
     * A LogRecordProcessor may freely modify logRecord for the duration of the OnEmit call.
     * If logRecord is needed after OnEmit returns (i.e. for asynchronous processing) only reads are permitted.
     */
    _makeReadonly() {
      this._isReadonly = true;
    }
    _truncateToSize(value) {
      const limit = this._logRecordLimits.attributeValueLengthLimit;
      if (limit <= 0) {
        diag2.warn(`Attribute value limit must be positive, got ${limit}`);
        return value;
      }
      if (value == null) {
        return value;
      }
      if (typeof value === "string") {
        return this._truncateToLimitUtil(value, limit);
      }
      if (value instanceof Uint8Array) {
        return value;
      }
      if (Array.isArray(value)) {
        return value.map((val) => this._truncateToSize(val));
      }
      if (typeof value === "object") {
        const truncatedObj = {};
        for (const [k, v] of Object.entries(value)) {
          truncatedObj[k] = this._truncateToSize(v);
        }
        return truncatedObj;
      }
      return value;
    }
    _setException(exception) {
      let hasMinimumAttributes = false;
      if (typeof exception === "string" || typeof exception === "number") {
        if (!Object.hasOwn(this.attributes, ATTR_EXCEPTION_MESSAGE)) {
          this.setAttribute(ATTR_EXCEPTION_MESSAGE, String(exception));
        }
        hasMinimumAttributes = true;
      } else if (exception && typeof exception === "object") {
        const exceptionObj = exception;
        if (exceptionObj.code) {
          if (!Object.hasOwn(this.attributes, ATTR_EXCEPTION_TYPE)) {
            this.setAttribute(ATTR_EXCEPTION_TYPE, exceptionObj.code.toString());
          }
          hasMinimumAttributes = true;
        } else if (exceptionObj.name) {
          if (!Object.hasOwn(this.attributes, ATTR_EXCEPTION_TYPE)) {
            this.setAttribute(ATTR_EXCEPTION_TYPE, exceptionObj.name);
          }
          hasMinimumAttributes = true;
        }
        if (exceptionObj.message) {
          if (!Object.hasOwn(this.attributes, ATTR_EXCEPTION_MESSAGE)) {
            this.setAttribute(ATTR_EXCEPTION_MESSAGE, exceptionObj.message);
          }
          hasMinimumAttributes = true;
        }
        if (exceptionObj.stack) {
          if (!Object.hasOwn(this.attributes, ATTR_EXCEPTION_STACKTRACE)) {
            this.setAttribute(ATTR_EXCEPTION_STACKTRACE, exceptionObj.stack);
          }
          hasMinimumAttributes = true;
        }
      }
      if (!hasMinimumAttributes) {
        diag2.warn(`Failed to record an exception ${exception}`);
      }
    }
    _truncateToLimitUtil(value, limit) {
      if (value.length <= limit) {
        return value;
      }
      return value.substring(0, limit);
    }
    _isLogRecordReadonly() {
      if (this._isReadonly) {
        diag2.warn("Can not execute the operation on emitted log record");
      }
      return this._isReadonly;
    }
  };

  // node_modules/@opentelemetry/sdk-logs/build/esm/Logger.js
  var Logger = class {
    instrumentationScope;
    _sharedState;
    _loggerConfig;
    constructor(instrumentationScope, sharedState) {
      this.instrumentationScope = instrumentationScope;
      this._sharedState = sharedState;
      this._loggerConfig = this._sharedState.getLoggerConfig(this.instrumentationScope);
    }
    emit(logRecord) {
      const loggerConfig = this._loggerConfig;
      const currentContext = logRecord.context || context.active();
      const recordSeverity = logRecord.severityNumber ?? SeverityNumber.UNSPECIFIED;
      if (recordSeverity !== SeverityNumber.UNSPECIFIED && recordSeverity < loggerConfig.minimumSeverity) {
        return;
      }
      if (loggerConfig.traceBased) {
        const spanContext = trace.getSpanContext(currentContext);
        if (spanContext && isSpanContextValid(spanContext)) {
          const isSampled = (spanContext.traceFlags & TraceFlags.SAMPLED) === TraceFlags.SAMPLED;
          if (!isSampled) {
            return;
          }
        }
      }
      const logRecordInstance = new LogRecordImpl(this._sharedState, this.instrumentationScope, {
        context: currentContext,
        ...logRecord
      });
      this._sharedState.activeProcessor.onEmit(logRecordInstance, currentContext);
      logRecordInstance._makeReadonly();
    }
  };

  // node_modules/@opentelemetry/sdk-logs/build/esm/export/NoopLogRecordProcessor.js
  var NoopLogRecordProcessor = class {
    forceFlush() {
      return Promise.resolve();
    }
    onEmit(_logRecord, _context) {
    }
    shutdown() {
      return Promise.resolve();
    }
  };

  // node_modules/@opentelemetry/sdk-logs/build/esm/MultiLogRecordProcessor.js
  var MultiLogRecordProcessor = class {
    processors;
    forceFlushTimeoutMillis;
    constructor(processors, forceFlushTimeoutMillis) {
      this.processors = processors;
      this.forceFlushTimeoutMillis = forceFlushTimeoutMillis;
    }
    async forceFlush() {
      const timeout = this.forceFlushTimeoutMillis;
      await Promise.all(this.processors.map((processor) => callWithTimeout(processor.forceFlush(), timeout)));
    }
    onEmit(logRecord, context2) {
      this.processors.forEach((processors) => processors.onEmit(logRecord, context2));
    }
    async shutdown() {
      await Promise.all(this.processors.map((processor) => processor.shutdown()));
    }
  };

  // node_modules/@opentelemetry/sdk-logs/build/esm/internal/utils.js
  function getInstrumentationScopeKey(scope) {
    return `${scope.name}@${scope.version || ""}:${scope.schemaUrl || ""}`;
  }

  // node_modules/@opentelemetry/sdk-logs/build/esm/internal/LoggerProviderSharedState.js
  var DEFAULT_LOGGER_CONFIG = {
    disabled: false,
    minimumSeverity: SeverityNumber.UNSPECIFIED,
    traceBased: false
  };
  var DEFAULT_LOGGER_CONFIGURATOR = () => ({
    ...DEFAULT_LOGGER_CONFIG
  });
  var LoggerProviderSharedState = class {
    loggers = /* @__PURE__ */ new Map();
    activeProcessor;
    registeredLogRecordProcessors = [];
    resource;
    forceFlushTimeoutMillis;
    logRecordLimits;
    processors;
    _loggerConfigurator;
    _loggerConfigs = /* @__PURE__ */ new Map();
    constructor(resource, forceFlushTimeoutMillis, logRecordLimits, processors, loggerConfigurator) {
      this.resource = resource;
      this.forceFlushTimeoutMillis = forceFlushTimeoutMillis;
      this.logRecordLimits = logRecordLimits;
      this.processors = processors;
      if (processors.length > 0) {
        this.registeredLogRecordProcessors = processors;
        this.activeProcessor = new MultiLogRecordProcessor(this.registeredLogRecordProcessors, this.forceFlushTimeoutMillis);
      } else {
        this.activeProcessor = new NoopLogRecordProcessor();
      }
      this._loggerConfigurator = loggerConfigurator ?? DEFAULT_LOGGER_CONFIGURATOR;
    }
    /**
     * Get the LoggerConfig for a given instrumentation scope.
     * Uses the LoggerConfigurator function to compute the config on first access
     * and caches the result.
     *
     * @experimental This feature is in development as per the OpenTelemetry specification.
     */
    getLoggerConfig(instrumentationScope) {
      const key = getInstrumentationScopeKey(instrumentationScope);
      let config = this._loggerConfigs.get(key);
      if (config) {
        return config;
      }
      config = this._loggerConfigurator(instrumentationScope);
      this._loggerConfigs.set(key, config);
      return config;
    }
  };

  // node_modules/@opentelemetry/sdk-logs/build/esm/LoggerProvider.js
  var DEFAULT_LOGGER_NAME = "unknown";
  var LoggerProvider = class {
    _shutdownOnce;
    _sharedState;
    constructor(config = {}) {
      const mergedConfig = {
        resource: config.resource ?? defaultResource(),
        forceFlushTimeoutMillis: config.forceFlushTimeoutMillis ?? 3e4,
        logRecordLimits: {
          attributeCountLimit: config.logRecordLimits?.attributeCountLimit ?? 128,
          attributeValueLengthLimit: config.logRecordLimits?.attributeValueLengthLimit ?? Infinity
        },
        loggerConfigurator: config.loggerConfigurator ?? DEFAULT_LOGGER_CONFIGURATOR,
        processors: config.processors ?? []
      };
      this._sharedState = new LoggerProviderSharedState(mergedConfig.resource, mergedConfig.forceFlushTimeoutMillis, mergedConfig.logRecordLimits, mergedConfig.processors, mergedConfig.loggerConfigurator);
      this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
    }
    /**
     * Get a logger with the configuration of the LoggerProvider.
     */
    getLogger(name, version, options) {
      if (this._shutdownOnce.isCalled) {
        diag2.warn("A shutdown LoggerProvider cannot provide a Logger");
        return NOOP_LOGGER;
      }
      if (!name) {
        diag2.warn("Logger requested without instrumentation scope name.");
      }
      const loggerName = name || DEFAULT_LOGGER_NAME;
      const key = `${loggerName}@${version || ""}:${options?.schemaUrl || ""}`;
      if (!this._sharedState.loggers.has(key)) {
        this._sharedState.loggers.set(key, new Logger({ name: loggerName, version, schemaUrl: options?.schemaUrl }, this._sharedState));
      }
      return this._sharedState.loggers.get(key);
    }
    /**
     * Notifies all registered LogRecordProcessor to flush any buffered data.
     *
     * Returns a promise which is resolved when all flushes are complete.
     */
    forceFlush() {
      if (this._shutdownOnce.isCalled) {
        diag2.warn("invalid attempt to force flush after LoggerProvider shutdown");
        return this._shutdownOnce.promise;
      }
      return this._sharedState.activeProcessor.forceFlush();
    }
    /**
     * Flush all buffered data and shut down the LoggerProvider and all registered
     * LogRecordProcessor.
     *
     * Returns a promise which is resolved when all flushes are complete.
     */
    shutdown() {
      if (this._shutdownOnce.isCalled) {
        diag2.warn("shutdown may only be called once per LoggerProvider");
        return this._shutdownOnce.promise;
      }
      return this._shutdownOnce.call();
    }
    _shutdown() {
      return this._sharedState.activeProcessor.shutdown();
    }
  };

  // node_modules/@opentelemetry/sdk-logs/build/esm/export/ConsoleLogRecordExporter.js
  var ConsoleLogRecordExporter = class {
    /**
     * Export logs.
     * @param logs
     * @param resultCallback
     */
    export(logs2, resultCallback) {
      this._sendLogRecords(logs2, resultCallback);
    }
    /**
     * Shutdown the exporter.
     */
    shutdown() {
      return Promise.resolve();
    }
    /**
     * converts logRecord info into more readable format
     * @param logRecord
     */
    _exportInfo(logRecord) {
      return {
        resource: {
          attributes: logRecord.resource.attributes
        },
        instrumentationScope: logRecord.instrumentationScope,
        timestamp: hrTimeToMicroseconds(logRecord.hrTime),
        traceId: logRecord.spanContext?.traceId,
        spanId: logRecord.spanContext?.spanId,
        traceFlags: logRecord.spanContext?.traceFlags,
        severityText: logRecord.severityText,
        severityNumber: logRecord.severityNumber,
        eventName: logRecord.eventName,
        body: logRecord.body,
        attributes: logRecord.attributes
      };
    }
    /**
     * Showing logs  in console
     * @param logRecords
     * @param done
     */
    _sendLogRecords(logRecords, done) {
      for (const logRecord of logRecords) {
        console.dir(this._exportInfo(logRecord), { depth: 3 });
      }
      done?.({ code: ExportResultCode.SUCCESS });
    }
  };

  // node_modules/@opentelemetry/sdk-logs/build/esm/export/SimpleLogRecordProcessor.js
  var SimpleLogRecordProcessor = class {
    _exporter;
    _shutdownOnce;
    _unresolvedExports;
    constructor(exporter) {
      this._exporter = exporter;
      this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
      this._unresolvedExports = /* @__PURE__ */ new Set();
    }
    onEmit(logRecord) {
      if (this._shutdownOnce.isCalled) {
        return;
      }
      const doExport = () => internal._export(this._exporter, [logRecord]).then((result) => {
        if (result.code !== ExportResultCode.SUCCESS) {
          globalErrorHandler(result.error ?? new Error(`SimpleLogRecordProcessor: log record export failed (status ${result})`));
        }
      }).catch(globalErrorHandler);
      if (logRecord.resource.asyncAttributesPending) {
        const exportPromise = logRecord.resource.waitForAsyncAttributes?.().then(() => {
          this._unresolvedExports.delete(exportPromise);
          return doExport();
        }, globalErrorHandler);
        if (exportPromise != null) {
          this._unresolvedExports.add(exportPromise);
        }
      } else {
        void doExport();
      }
    }
    async forceFlush() {
      await Promise.all(Array.from(this._unresolvedExports));
    }
    shutdown() {
      return this._shutdownOnce.call();
    }
    _shutdown() {
      return this._exporter.shutdown();
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/enums.js
  var ExceptionEventName = "exception";

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/Span.js
  var SpanImpl = class {
    // Below properties are included to implement ReadableSpan for export
    // purposes but are not intended to be written-to directly.
    _spanContext;
    kind;
    parentSpanContext;
    attributes = {};
    links = [];
    events = [];
    startTime;
    resource;
    instrumentationScope;
    _droppedAttributesCount = 0;
    _droppedEventsCount = 0;
    _droppedLinksCount = 0;
    _attributesCount = 0;
    name;
    status = {
      code: SpanStatusCode.UNSET
    };
    endTime = [0, 0];
    _ended = false;
    _duration = [-1, -1];
    _spanProcessor;
    _spanLimits;
    _attributeValueLengthLimit;
    _recordEndMetrics;
    _performanceStartTime;
    _performanceOffset;
    _startTimeProvided;
    /**
     * Constructs a new SpanImpl instance.
     */
    constructor(opts) {
      const now = Date.now();
      this._spanContext = opts.spanContext;
      this._performanceStartTime = otperformance.now();
      this._performanceOffset = now - (this._performanceStartTime + otperformance.timeOrigin);
      this._startTimeProvided = opts.startTime != null;
      this._spanLimits = opts.spanLimits;
      this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
      this._spanProcessor = opts.spanProcessor;
      this.name = opts.name;
      this.parentSpanContext = opts.parentSpanContext;
      this.kind = opts.kind;
      this.links = opts.links || [];
      this.startTime = this._getTime(opts.startTime ?? now);
      this.resource = opts.resource;
      this.instrumentationScope = opts.scope;
      this._recordEndMetrics = opts.recordEndMetrics;
      if (opts.attributes != null) {
        this.setAttributes(opts.attributes);
      }
      this._spanProcessor.onStart(this, opts.context);
    }
    spanContext() {
      return this._spanContext;
    }
    setAttribute(key, value) {
      if (value == null || this._isSpanEnded())
        return this;
      if (key.length === 0) {
        diag2.warn(`Invalid attribute key: ${key}`);
        return this;
      }
      if (!isAttributeValue(value)) {
        diag2.warn(`Invalid attribute value set for key: ${key}`);
        return this;
      }
      const { attributeCountLimit } = this._spanLimits;
      const isNewKey = !Object.prototype.hasOwnProperty.call(this.attributes, key);
      if (attributeCountLimit !== void 0 && this._attributesCount >= attributeCountLimit && isNewKey) {
        this._droppedAttributesCount++;
        return this;
      }
      this.attributes[key] = this._truncateToSize(value);
      if (isNewKey) {
        this._attributesCount++;
      }
      return this;
    }
    setAttributes(attributes) {
      for (const [k, v] of Object.entries(attributes)) {
        this.setAttribute(k, v);
      }
      return this;
    }
    /**
     *
     * @param name Span Name
     * @param [attributesOrStartTime] Span attributes or start time
     *     if type is {@type TimeInput} and 3rd param is undefined
     * @param [timeStamp] Specified time stamp for the event
     */
    addEvent(name, attributesOrStartTime, timeStamp) {
      if (this._isSpanEnded())
        return this;
      const { eventCountLimit } = this._spanLimits;
      if (eventCountLimit === 0) {
        diag2.warn("No events allowed.");
        this._droppedEventsCount++;
        return this;
      }
      if (eventCountLimit !== void 0 && this.events.length >= eventCountLimit) {
        if (this._droppedEventsCount === 0) {
          diag2.debug("Dropping extra events.");
        }
        this.events.shift();
        this._droppedEventsCount++;
      }
      if (isTimeInput(attributesOrStartTime)) {
        if (!isTimeInput(timeStamp)) {
          timeStamp = attributesOrStartTime;
        }
        attributesOrStartTime = void 0;
      }
      const attributes = sanitizeAttributes(attributesOrStartTime);
      this.events.push({
        name,
        attributes,
        time: this._getTime(timeStamp),
        droppedAttributesCount: 0
      });
      return this;
    }
    addLink(link) {
      this.links.push(link);
      return this;
    }
    addLinks(links) {
      this.links.push(...links);
      return this;
    }
    setStatus(status) {
      if (this._isSpanEnded())
        return this;
      this.status = { ...status };
      if (this.status.message != null && typeof status.message !== "string") {
        diag2.warn(`Dropping invalid status.message of type '${typeof status.message}', expected 'string'`);
        delete this.status.message;
      }
      return this;
    }
    updateName(name) {
      if (this._isSpanEnded())
        return this;
      this.name = name;
      return this;
    }
    end(endTime) {
      if (this._isSpanEnded()) {
        diag2.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
        return;
      }
      this.endTime = this._getTime(endTime);
      this._duration = hrTimeDuration(this.startTime, this.endTime);
      if (this._duration[0] < 0) {
        diag2.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
        this.endTime = this.startTime.slice();
        this._duration = [0, 0];
      }
      if (this._droppedEventsCount > 0) {
        diag2.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
      }
      if (this._spanProcessor.onEnding) {
        this._spanProcessor.onEnding(this);
      }
      this._recordEndMetrics?.();
      this._ended = true;
      this._spanProcessor.onEnd(this);
    }
    _getTime(inp) {
      if (typeof inp === "number" && inp <= otperformance.now()) {
        return hrTime(inp + this._performanceOffset);
      }
      if (typeof inp === "number") {
        return millisToHrTime(inp);
      }
      if (inp instanceof Date) {
        return millisToHrTime(inp.getTime());
      }
      if (isTimeInputHrTime(inp)) {
        return inp;
      }
      if (this._startTimeProvided) {
        return millisToHrTime(Date.now());
      }
      const msDuration = otperformance.now() - this._performanceStartTime;
      return addHrTimes(this.startTime, millisToHrTime(msDuration));
    }
    isRecording() {
      return this._ended === false;
    }
    recordException(exception, time) {
      const attributes = {};
      if (typeof exception === "string") {
        attributes[ATTR_EXCEPTION_MESSAGE] = exception;
      } else if (exception) {
        if (exception.code) {
          attributes[ATTR_EXCEPTION_TYPE] = exception.code.toString();
        } else if (exception.name) {
          attributes[ATTR_EXCEPTION_TYPE] = exception.name;
        }
        if (exception.message) {
          attributes[ATTR_EXCEPTION_MESSAGE] = exception.message;
        }
        if (exception.stack) {
          attributes[ATTR_EXCEPTION_STACKTRACE] = exception.stack;
        }
      }
      if (attributes[ATTR_EXCEPTION_TYPE] || attributes[ATTR_EXCEPTION_MESSAGE]) {
        this.addEvent(ExceptionEventName, attributes, time);
      } else {
        diag2.warn(`Failed to record an exception ${exception}`);
      }
    }
    get duration() {
      return this._duration;
    }
    get ended() {
      return this._ended;
    }
    get droppedAttributesCount() {
      return this._droppedAttributesCount;
    }
    get droppedEventsCount() {
      return this._droppedEventsCount;
    }
    get droppedLinksCount() {
      return this._droppedLinksCount;
    }
    _isSpanEnded() {
      if (this._ended) {
        const error = new Error(`Operation attempted on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
        diag2.warn(`Cannot execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`, error);
      }
      return this._ended;
    }
    // Utility function to truncate given value within size
    // for value type of string, will truncate to given limit
    // for type of non-string, will return same value
    _truncateToLimitUtil(value, limit) {
      if (value.length <= limit) {
        return value;
      }
      return value.substring(0, limit);
    }
    /**
     * If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
     * return string with truncated to {@code attributeValueLengthLimit} characters
     *
     * If the given attribute value is array of strings then
     * return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
     *
     * Otherwise return same Attribute {@code value}
     *
     * @param value Attribute value
     * @returns truncated attribute value if required, otherwise same value
     */
    _truncateToSize(value) {
      const limit = this._attributeValueLengthLimit;
      if (limit <= 0) {
        diag2.warn(`Attribute value limit must be positive, got ${limit}`);
        return value;
      }
      if (typeof value === "string") {
        return this._truncateToLimitUtil(value, limit);
      }
      if (Array.isArray(value)) {
        return value.map((val) => typeof val === "string" ? this._truncateToLimitUtil(val, limit) : val);
      }
      return value;
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/Sampler.js
  var SamplingDecision2;
  (function(SamplingDecision3) {
    SamplingDecision3[SamplingDecision3["NOT_RECORD"] = 0] = "NOT_RECORD";
    SamplingDecision3[SamplingDecision3["RECORD"] = 1] = "RECORD";
    SamplingDecision3[SamplingDecision3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
  })(SamplingDecision2 || (SamplingDecision2 = {}));

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOffSampler.js
  var AlwaysOffSampler = class {
    shouldSample() {
      return {
        decision: SamplingDecision2.NOT_RECORD
      };
    }
    toString() {
      return "AlwaysOffSampler";
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOnSampler.js
  var AlwaysOnSampler = class {
    shouldSample() {
      return {
        decision: SamplingDecision2.RECORD_AND_SAMPLED
      };
    }
    toString() {
      return "AlwaysOnSampler";
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/ParentBasedSampler.js
  var ParentBasedSampler = class {
    _root;
    _remoteParentSampled;
    _remoteParentNotSampled;
    _localParentSampled;
    _localParentNotSampled;
    constructor(config) {
      this._root = config.root;
      if (!this._root) {
        globalErrorHandler(new Error("ParentBasedSampler must have a root sampler configured"));
        this._root = new AlwaysOnSampler();
      }
      this._remoteParentSampled = config.remoteParentSampled ?? new AlwaysOnSampler();
      this._remoteParentNotSampled = config.remoteParentNotSampled ?? new AlwaysOffSampler();
      this._localParentSampled = config.localParentSampled ?? new AlwaysOnSampler();
      this._localParentNotSampled = config.localParentNotSampled ?? new AlwaysOffSampler();
    }
    shouldSample(context2, traceId, spanName, spanKind, attributes, links) {
      const parentContext = trace.getSpanContext(context2);
      if (!parentContext || !isSpanContextValid(parentContext)) {
        return this._root.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
      }
      if (parentContext.isRemote) {
        if (parentContext.traceFlags & TraceFlags.SAMPLED) {
          return this._remoteParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        return this._remoteParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
      }
      if (parentContext.traceFlags & TraceFlags.SAMPLED) {
        return this._localParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
      }
      return this._localParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
    }
    toString() {
      return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/TraceIdRatioBasedSampler.js
  var TraceIdRatioBasedSampler = class {
    _ratio;
    _upperBound;
    constructor(ratio = 0) {
      this._ratio = this._normalize(ratio);
      this._upperBound = Math.floor(this._ratio * 4294967295);
    }
    shouldSample(context2, traceId) {
      return {
        decision: isValidTraceId(traceId) && this._accumulate(traceId) < this._upperBound ? SamplingDecision2.RECORD_AND_SAMPLED : SamplingDecision2.NOT_RECORD
      };
    }
    toString() {
      return `TraceIdRatioBased{${this._ratio}}`;
    }
    _normalize(ratio) {
      if (typeof ratio !== "number" || isNaN(ratio))
        return 0;
      return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
    }
    _accumulate(traceId) {
      let accumulation = 0;
      for (let i = 0; i < traceId.length / 8; i++) {
        const pos = i * 8;
        const part = parseInt(traceId.slice(pos, pos + 8), 16);
        accumulation = (accumulation ^ part) >>> 0;
      }
      return accumulation;
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/config.js
  var TracesSamplerValues;
  (function(TracesSamplerValues2) {
    TracesSamplerValues2["AlwaysOff"] = "always_off";
    TracesSamplerValues2["AlwaysOn"] = "always_on";
    TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
    TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
    TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
    TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
  })(TracesSamplerValues || (TracesSamplerValues = {}));
  var DEFAULT_RATIO = 1;
  function loadDefaultConfig() {
    return {
      sampler: buildSamplerFromEnv(),
      forceFlushTimeoutMillis: 3e4,
      generalLimits: {
        attributeValueLengthLimit: getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
        attributeCountLimit: getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128
      },
      spanLimits: {
        attributeValueLengthLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
        attributeCountLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? 128,
        linkCountLimit: getNumberFromEnv("OTEL_SPAN_LINK_COUNT_LIMIT") ?? 128,
        eventCountLimit: getNumberFromEnv("OTEL_SPAN_EVENT_COUNT_LIMIT") ?? 128,
        attributePerEventCountLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT") ?? 128,
        attributePerLinkCountLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT") ?? 128
      }
    };
  }
  function buildSamplerFromEnv() {
    const sampler = getStringFromEnv("OTEL_TRACES_SAMPLER") ?? TracesSamplerValues.ParentBasedAlwaysOn;
    switch (sampler) {
      case TracesSamplerValues.AlwaysOn:
        return new AlwaysOnSampler();
      case TracesSamplerValues.AlwaysOff:
        return new AlwaysOffSampler();
      case TracesSamplerValues.ParentBasedAlwaysOn:
        return new ParentBasedSampler({
          root: new AlwaysOnSampler()
        });
      case TracesSamplerValues.ParentBasedAlwaysOff:
        return new ParentBasedSampler({
          root: new AlwaysOffSampler()
        });
      case TracesSamplerValues.TraceIdRatio:
        return new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv());
      case TracesSamplerValues.ParentBasedTraceIdRatio:
        return new ParentBasedSampler({
          root: new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv())
        });
      default:
        diag2.error(`OTEL_TRACES_SAMPLER value "${sampler}" invalid, defaulting to "${TracesSamplerValues.ParentBasedAlwaysOn}".`);
        return new ParentBasedSampler({
          root: new AlwaysOnSampler()
        });
    }
  }
  function getSamplerProbabilityFromEnv() {
    const probability = getNumberFromEnv("OTEL_TRACES_SAMPLER_ARG");
    if (probability == null) {
      diag2.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
      return DEFAULT_RATIO;
    }
    if (probability < 0 || probability > 1) {
      diag2.error(`OTEL_TRACES_SAMPLER_ARG=${probability} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
      return DEFAULT_RATIO;
    }
    return probability;
  }

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/utility.js
  var DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
  var DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
  function mergeConfig(userConfig) {
    const perInstanceDefaults = {
      sampler: buildSamplerFromEnv()
    };
    const DEFAULT_CONFIG = loadDefaultConfig();
    const target = Object.assign({}, DEFAULT_CONFIG, perInstanceDefaults, userConfig);
    target.generalLimits = Object.assign({}, DEFAULT_CONFIG.generalLimits, userConfig.generalLimits || {});
    target.spanLimits = Object.assign({}, DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
    return target;
  }
  function reconfigureLimits(userConfig) {
    const spanLimits = Object.assign({}, userConfig.spanLimits);
    spanLimits.attributeCountLimit = userConfig.spanLimits?.attributeCountLimit ?? userConfig.generalLimits?.attributeCountLimit ?? getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? DEFAULT_ATTRIBUTE_COUNT_LIMIT;
    spanLimits.attributeValueLengthLimit = userConfig.spanLimits?.attributeValueLengthLimit ?? userConfig.generalLimits?.attributeValueLengthLimit ?? getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
    return Object.assign({}, userConfig, { spanLimits });
  }

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/browser/RandomIdGenerator.js
  var TRACE_ID_BYTES = 16;
  var SPAN_ID_BYTES = 8;
  var TRACE_BUFFER = new Uint8Array(TRACE_ID_BYTES);
  var SPAN_BUFFER = new Uint8Array(SPAN_ID_BYTES);
  var HEX = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function randomFill(buf) {
    for (let i = 0; i < buf.length; i++) {
      buf[i] = Math.random() * 256 >>> 0;
    }
    for (let i = 0; i < buf.length; i++) {
      if (buf[i] > 0)
        return;
    }
    buf[buf.length - 1] = 1;
  }
  function toHex(buf) {
    let hex = "";
    for (let i = 0; i < buf.length; i++) {
      hex += HEX[buf[i]];
    }
    return hex;
  }
  var RandomIdGenerator = class {
    /**
     * Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
     * characters corresponding to 128 bits.
     */
    generateTraceId() {
      randomFill(TRACE_BUFFER);
      return toHex(TRACE_BUFFER);
    }
    /**
     * Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
     * characters corresponding to 64 bits.
     */
    generateSpanId() {
      randomFill(SPAN_BUFFER);
      return toHex(SPAN_BUFFER);
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/semconv.js
  var ATTR_OTEL_SPAN_PARENT_ORIGIN = "otel.span.parent.origin";
  var ATTR_OTEL_SPAN_SAMPLING_RESULT = "otel.span.sampling_result";
  var METRIC_OTEL_SDK_SPAN_LIVE = "otel.sdk.span.live";
  var METRIC_OTEL_SDK_SPAN_STARTED = "otel.sdk.span.started";

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/TracerMetrics.js
  var TracerMetrics = class {
    startedSpans;
    liveSpans;
    constructor(meter) {
      this.startedSpans = meter.createCounter(METRIC_OTEL_SDK_SPAN_STARTED, {
        unit: "{span}",
        description: "The number of created spans."
      });
      this.liveSpans = meter.createUpDownCounter(METRIC_OTEL_SDK_SPAN_LIVE, {
        unit: "{span}",
        description: "The number of currently live spans."
      });
    }
    startSpan(parentSpanCtx, samplingDecision) {
      const samplingDecisionStr = samplingDecisionToString(samplingDecision);
      this.startedSpans.add(1, {
        [ATTR_OTEL_SPAN_PARENT_ORIGIN]: parentOrigin(parentSpanCtx),
        [ATTR_OTEL_SPAN_SAMPLING_RESULT]: samplingDecisionStr
      });
      if (samplingDecision === SamplingDecision2.NOT_RECORD) {
        return () => {
        };
      }
      const liveSpanAttributes = {
        [ATTR_OTEL_SPAN_SAMPLING_RESULT]: samplingDecisionStr
      };
      this.liveSpans.add(1, liveSpanAttributes);
      return () => {
        this.liveSpans.add(-1, liveSpanAttributes);
      };
    }
  };
  function parentOrigin(parentSpanContext) {
    if (!parentSpanContext) {
      return "none";
    }
    if (parentSpanContext.isRemote) {
      return "remote";
    }
    return "local";
  }
  function samplingDecisionToString(decision) {
    switch (decision) {
      case SamplingDecision2.RECORD_AND_SAMPLED:
        return "RECORD_AND_SAMPLE";
      case SamplingDecision2.RECORD:
        return "RECORD_ONLY";
      case SamplingDecision2.NOT_RECORD:
        return "DROP";
    }
  }

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/version.js
  var VERSION4 = "2.6.0";

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/Tracer.js
  var Tracer = class {
    _sampler;
    _generalLimits;
    _spanLimits;
    _idGenerator;
    instrumentationScope;
    _resource;
    _spanProcessor;
    _tracerMetrics;
    /**
     * Constructs a new Tracer instance.
     */
    constructor(instrumentationScope, config, resource, spanProcessor) {
      const localConfig = mergeConfig(config);
      this._sampler = localConfig.sampler;
      this._generalLimits = localConfig.generalLimits;
      this._spanLimits = localConfig.spanLimits;
      this._idGenerator = config.idGenerator || new RandomIdGenerator();
      this._resource = resource;
      this._spanProcessor = spanProcessor;
      this.instrumentationScope = instrumentationScope;
      const meter = localConfig.meterProvider ? localConfig.meterProvider.getMeter("@opentelemetry/sdk-trace", VERSION4) : createNoopMeter();
      this._tracerMetrics = new TracerMetrics(meter);
    }
    /**
     * Starts a new Span or returns the default NoopSpan based on the sampling
     * decision.
     */
    startSpan(name, options = {}, context2 = context.active()) {
      if (options.root) {
        context2 = trace.deleteSpan(context2);
      }
      const parentSpan = trace.getSpan(context2);
      if (isTracingSuppressed(context2)) {
        diag2.debug("Instrumentation suppressed, returning Noop Span");
        const nonRecordingSpan = trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
        return nonRecordingSpan;
      }
      const parentSpanContext = parentSpan?.spanContext();
      const spanId = this._idGenerator.generateSpanId();
      let validParentSpanContext;
      let traceId;
      let traceState;
      if (!parentSpanContext || !trace.isSpanContextValid(parentSpanContext)) {
        traceId = this._idGenerator.generateTraceId();
      } else {
        traceId = parentSpanContext.traceId;
        traceState = parentSpanContext.traceState;
        validParentSpanContext = parentSpanContext;
      }
      const spanKind = options.kind ?? SpanKind.INTERNAL;
      const links = (options.links ?? []).map((link) => {
        return {
          context: link.context,
          attributes: sanitizeAttributes(link.attributes)
        };
      });
      const attributes = sanitizeAttributes(options.attributes);
      const samplingResult = this._sampler.shouldSample(context2, traceId, name, spanKind, attributes, links);
      const recordEndMetrics = this._tracerMetrics.startSpan(parentSpanContext, samplingResult.decision);
      traceState = samplingResult.traceState ?? traceState;
      const traceFlags = samplingResult.decision === SamplingDecision.RECORD_AND_SAMPLED ? TraceFlags.SAMPLED : TraceFlags.NONE;
      const spanContext = { traceId, spanId, traceFlags, traceState };
      if (samplingResult.decision === SamplingDecision.NOT_RECORD) {
        diag2.debug("Recording is off, propagating context in a non-recording span");
        const nonRecordingSpan = trace.wrapSpanContext(spanContext);
        return nonRecordingSpan;
      }
      const initAttributes = sanitizeAttributes(Object.assign(attributes, samplingResult.attributes));
      const span = new SpanImpl({
        resource: this._resource,
        scope: this.instrumentationScope,
        context: context2,
        spanContext,
        name,
        kind: spanKind,
        links,
        parentSpanContext: validParentSpanContext,
        attributes: initAttributes,
        startTime: options.startTime,
        spanProcessor: this._spanProcessor,
        spanLimits: this._spanLimits,
        recordEndMetrics
      });
      return span;
    }
    startActiveSpan(name, arg2, arg3, arg4) {
      let opts;
      let ctx;
      let fn;
      if (arguments.length < 2) {
        return;
      } else if (arguments.length === 2) {
        fn = arg2;
      } else if (arguments.length === 3) {
        opts = arg2;
        fn = arg3;
      } else {
        opts = arg2;
        ctx = arg3;
        fn = arg4;
      }
      const parentContext = ctx ?? context.active();
      const span = this.startSpan(name, opts, parentContext);
      const contextWithSpanSet = trace.setSpan(parentContext, span);
      return context.with(contextWithSpanSet, fn, void 0, span);
    }
    /** Returns the active {@link GeneralLimits}. */
    getGeneralLimits() {
      return this._generalLimits;
    }
    /** Returns the active {@link SpanLimits}. */
    getSpanLimits() {
      return this._spanLimits;
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/MultiSpanProcessor.js
  var MultiSpanProcessor = class {
    _spanProcessors;
    constructor(spanProcessors) {
      this._spanProcessors = spanProcessors;
    }
    forceFlush() {
      const promises = [];
      for (const spanProcessor of this._spanProcessors) {
        promises.push(spanProcessor.forceFlush());
      }
      return new Promise((resolve) => {
        Promise.all(promises).then(() => {
          resolve();
        }).catch((error) => {
          globalErrorHandler(error || new Error("MultiSpanProcessor: forceFlush failed"));
          resolve();
        });
      });
    }
    onStart(span, context2) {
      for (const spanProcessor of this._spanProcessors) {
        spanProcessor.onStart(span, context2);
      }
    }
    onEnding(span) {
      for (const spanProcessor of this._spanProcessors) {
        if (spanProcessor.onEnding) {
          spanProcessor.onEnding(span);
        }
      }
    }
    onEnd(span) {
      for (const spanProcessor of this._spanProcessors) {
        spanProcessor.onEnd(span);
      }
    }
    shutdown() {
      const promises = [];
      for (const spanProcessor of this._spanProcessors) {
        promises.push(spanProcessor.shutdown());
      }
      return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => {
          resolve();
        }, reject);
      });
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/BasicTracerProvider.js
  var ForceFlushState;
  (function(ForceFlushState2) {
    ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
    ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
    ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
    ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
  })(ForceFlushState || (ForceFlushState = {}));
  var BasicTracerProvider = class {
    _config;
    _tracers = /* @__PURE__ */ new Map();
    _resource;
    _activeSpanProcessor;
    constructor(config = {}) {
      const mergedConfig = merge({}, loadDefaultConfig(), reconfigureLimits(config));
      this._resource = mergedConfig.resource ?? defaultResource();
      this._config = Object.assign({}, mergedConfig, {
        resource: this._resource
      });
      const spanProcessors = [];
      if (config.spanProcessors?.length) {
        spanProcessors.push(...config.spanProcessors);
      }
      this._activeSpanProcessor = new MultiSpanProcessor(spanProcessors);
    }
    getTracer(name, version, options) {
      const key = `${name}@${version || ""}:${options?.schemaUrl || ""}`;
      if (!this._tracers.has(key)) {
        this._tracers.set(key, new Tracer({ name, version, schemaUrl: options?.schemaUrl }, this._config, this._resource, this._activeSpanProcessor));
      }
      return this._tracers.get(key);
    }
    forceFlush() {
      const timeout = this._config.forceFlushTimeoutMillis;
      const promises = this._activeSpanProcessor["_spanProcessors"].map((spanProcessor) => {
        return new Promise((resolve) => {
          let state;
          const timeoutInterval = setTimeout(() => {
            resolve(new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
            state = ForceFlushState.timeout;
          }, timeout);
          spanProcessor.forceFlush().then(() => {
            clearTimeout(timeoutInterval);
            if (state !== ForceFlushState.timeout) {
              state = ForceFlushState.resolved;
              resolve(state);
            }
          }).catch((error) => {
            clearTimeout(timeoutInterval);
            state = ForceFlushState.error;
            resolve(error);
          });
        });
      });
      return new Promise((resolve, reject) => {
        Promise.all(promises).then((results) => {
          const errors = results.filter((result) => result !== ForceFlushState.resolved);
          if (errors.length > 0) {
            reject(errors);
          } else {
            resolve();
          }
        }).catch((error) => reject([error]));
      });
    }
    shutdown() {
      return this._activeSpanProcessor.shutdown();
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/export/ConsoleSpanExporter.js
  var ConsoleSpanExporter = class {
    /**
     * Export spans.
     * @param spans
     * @param resultCallback
     */
    export(spans, resultCallback) {
      return this._sendSpans(spans, resultCallback);
    }
    /**
     * Shutdown the exporter.
     */
    shutdown() {
      this._sendSpans([]);
      return this.forceFlush();
    }
    /**
     * Exports any pending spans in exporter
     */
    forceFlush() {
      return Promise.resolve();
    }
    /**
     * converts span info into more readable format
     * @param span
     */
    _exportInfo(span) {
      return {
        resource: {
          attributes: span.resource.attributes
        },
        instrumentationScope: span.instrumentationScope,
        traceId: span.spanContext().traceId,
        parentSpanContext: span.parentSpanContext,
        traceState: span.spanContext().traceState?.serialize(),
        name: span.name,
        id: span.spanContext().spanId,
        kind: span.kind,
        timestamp: hrTimeToMicroseconds(span.startTime),
        duration: hrTimeToMicroseconds(span.duration),
        attributes: span.attributes,
        status: span.status,
        events: span.events,
        links: span.links
      };
    }
    /**
     * Showing spans in console
     * @param spans
     * @param done
     */
    _sendSpans(spans, done) {
      for (const span of spans) {
        console.dir(this._exportInfo(span), { depth: 3 });
      }
      if (done) {
        return done({ code: ExportResultCode.SUCCESS });
      }
    }
  };

  // node_modules/@opentelemetry/sdk-trace-base/build/esm/export/SimpleSpanProcessor.js
  var SimpleSpanProcessor = class {
    _exporter;
    _shutdownOnce;
    _pendingExports;
    constructor(exporter) {
      this._exporter = exporter;
      this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
      this._pendingExports = /* @__PURE__ */ new Set();
    }
    async forceFlush() {
      await Promise.all(Array.from(this._pendingExports));
      if (this._exporter.forceFlush) {
        await this._exporter.forceFlush();
      }
    }
    onStart(_span, _parentContext) {
    }
    onEnd(span) {
      if (this._shutdownOnce.isCalled) {
        return;
      }
      if ((span.spanContext().traceFlags & TraceFlags.SAMPLED) === 0) {
        return;
      }
      const pendingExport = this._doExport(span).catch((err) => globalErrorHandler(err));
      this._pendingExports.add(pendingExport);
      void pendingExport.finally(() => this._pendingExports.delete(pendingExport));
    }
    async _doExport(span) {
      if (span.resource.asyncAttributesPending) {
        await span.resource.waitForAsyncAttributes?.();
      }
      const result = await internal._export(this._exporter, [span]);
      if (result.code !== ExportResultCode.SUCCESS) {
        throw result.error ?? new Error(`SimpleSpanProcessor: span export failed (status ${result})`);
      }
    }
    shutdown() {
      return this._shutdownOnce.call();
    }
    _shutdown() {
      return this._exporter.shutdown();
    }
  };

  // node_modules/@opentelemetry/sdk-trace-web/build/esm/StackContextManager.js
  var StackContextManager = class {
    /**
     * whether the context manager is enabled or not
     */
    _enabled = false;
    /**
     * Keeps the reference to current context
     */
    _currentContext = ROOT_CONTEXT;
    /**
     *
     * @param context
     * @param target Function to be executed within the context
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    _bindFunction(context2 = ROOT_CONTEXT, target) {
      const manager = this;
      const contextWrapper = function(...args) {
        return manager.with(context2, () => target.apply(this, args));
      };
      Object.defineProperty(contextWrapper, "length", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: target.length
      });
      return contextWrapper;
    }
    /**
     * Returns the active context
     */
    active() {
      return this._currentContext;
    }
    /**
     * Binds a the certain context or the active one to the target function and then returns the target
     * @param context A context (span) to be bind to target
     * @param target a function or event emitter. When target or one of its callbacks is called,
     *  the provided context will be used as the active context for the duration of the call.
     */
    bind(context2, target) {
      if (context2 === void 0) {
        context2 = this.active();
      }
      if (typeof target === "function") {
        return this._bindFunction(context2, target);
      }
      return target;
    }
    /**
     * Disable the context manager (clears the current context)
     */
    disable() {
      this._currentContext = ROOT_CONTEXT;
      this._enabled = false;
      return this;
    }
    /**
     * Enables the context manager and creates a default(root) context
     */
    enable() {
      if (this._enabled) {
        return this;
      }
      this._enabled = true;
      this._currentContext = ROOT_CONTEXT;
      return this;
    }
    /**
     * Calls the callback function [fn] with the provided [context]. If [context] is undefined then it will use the window.
     * The context will be set as active
     * @param context
     * @param fn Callback function
     * @param thisArg optional receiver to be used for calling fn
     * @param args optional arguments forwarded to fn
     */
    with(context2, fn, thisArg, ...args) {
      const previousContext = this._currentContext;
      this._currentContext = context2 || ROOT_CONTEXT;
      try {
        return fn.call(thisArg, ...args);
      } finally {
        this._currentContext = previousContext;
      }
    }
  };

  // node_modules/@opentelemetry/sdk-trace-web/build/esm/WebTracerProvider.js
  function setupContextManager(contextManager) {
    if (contextManager === null) {
      return;
    }
    if (contextManager === void 0) {
      const defaultContextManager = new StackContextManager();
      defaultContextManager.enable();
      context.setGlobalContextManager(defaultContextManager);
      return;
    }
    contextManager.enable();
    context.setGlobalContextManager(contextManager);
  }
  function setupPropagator(propagator) {
    if (propagator === null) {
      return;
    }
    if (propagator === void 0) {
      propagation.setGlobalPropagator(new CompositePropagator({
        propagators: [
          new W3CTraceContextPropagator(),
          new W3CBaggagePropagator()
        ]
      }));
      return;
    }
    propagation.setGlobalPropagator(propagator);
  }
  var WebTracerProvider = class extends BasicTracerProvider {
    /**
     * Constructs a new Tracer instance.
     * @param config Web Tracer config
     */
    constructor(config = {}) {
      super(config);
    }
    /**
     * Register this TracerProvider for use with the OpenTelemetry API.
     * Undefined values may be replaced with defaults, and
     * null values will be skipped.
     *
     * @param config Configuration object for SDK registration
     */
    register(config = {}) {
      trace.setGlobalTracerProvider(this);
      setupPropagator(config.propagator);
      setupContextManager(config.contextManager);
    }
  };

  // node_modules/@opentelemetry/sdk-trace-web/build/esm/utils.js
  function getElementXPath(target, optimised) {
    if (target.nodeType === Node.DOCUMENT_NODE) {
      return "/";
    }
    const targetValue = getNodeValue(target, optimised);
    if (optimised && targetValue.indexOf("@id") > 0) {
      return targetValue;
    }
    let xpath = "";
    if (target.parentNode) {
      xpath += getElementXPath(target.parentNode, optimised);
    }
    xpath += targetValue;
    return xpath;
  }
  function getNodeIndex(target) {
    if (!target.parentNode) {
      return 0;
    }
    const allowedTypes = [target.nodeType];
    if (target.nodeType === Node.CDATA_SECTION_NODE) {
      allowedTypes.push(Node.TEXT_NODE);
    }
    let elements = Array.from(target.parentNode.childNodes);
    elements = elements.filter((element) => {
      const localName = element.localName;
      return allowedTypes.indexOf(element.nodeType) >= 0 && localName === target.localName;
    });
    if (elements.length >= 1) {
      return elements.indexOf(target) + 1;
    }
    return 0;
  }
  function getNodeValue(target, optimised) {
    const nodeType = target.nodeType;
    const index = getNodeIndex(target);
    let nodeValue = "";
    if (nodeType === Node.ELEMENT_NODE) {
      const id = target.getAttribute("id");
      if (optimised && id) {
        return `//*[@id="${id}"]`;
      }
      nodeValue = target.localName;
    } else if (nodeType === Node.TEXT_NODE || nodeType === Node.CDATA_SECTION_NODE) {
      nodeValue = "text()";
    } else if (nodeType === Node.COMMENT_NODE) {
      nodeValue = "comment()";
    } else {
      return "";
    }
    if (nodeValue && index > 1) {
      return `/${nodeValue}[${index}]`;
    }
    return `/${nodeValue}`;
  }

  // node_modules/@opentelemetry/instrumentation/build/esm/autoLoaderUtils.js
  function enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider) {
    for (let i = 0, j = instrumentations.length; i < j; i++) {
      const instrumentation = instrumentations[i];
      if (tracerProvider) {
        instrumentation.setTracerProvider(tracerProvider);
      }
      if (meterProvider) {
        instrumentation.setMeterProvider(meterProvider);
      }
      if (loggerProvider && instrumentation.setLoggerProvider) {
        instrumentation.setLoggerProvider(loggerProvider);
      }
      if (!instrumentation.getConfig().enabled) {
        instrumentation.enable();
      }
    }
  }
  function disableInstrumentations(instrumentations) {
    instrumentations.forEach((instrumentation) => instrumentation.disable());
  }

  // node_modules/@opentelemetry/instrumentation/build/esm/autoLoader.js
  function registerInstrumentations(options) {
    const tracerProvider = options.tracerProvider || trace.getTracerProvider();
    const meterProvider = options.meterProvider || metrics.getMeterProvider();
    const loggerProvider = options.loggerProvider || logs.getLoggerProvider();
    const instrumentations = options.instrumentations?.flat() ?? [];
    enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider);
    return () => {
      disableInstrumentations(instrumentations);
    };
  }

  // node_modules/@opentelemetry/instrumentation/build/esm/shimmer.js
  var logger = console.error.bind(console);
  function defineProperty(obj, name, value) {
    const enumerable = !!obj[name] && Object.prototype.propertyIsEnumerable.call(obj, name);
    Object.defineProperty(obj, name, {
      configurable: true,
      enumerable,
      writable: true,
      value
    });
  }
  var wrap = (nodule, name, wrapper) => {
    if (!nodule || !nodule[name]) {
      logger("no original function " + String(name) + " to wrap");
      return;
    }
    if (!wrapper) {
      logger("no wrapper function");
      logger(new Error().stack);
      return;
    }
    const original = nodule[name];
    if (typeof original !== "function" || typeof wrapper !== "function") {
      logger("original object and wrapper must be functions");
      return;
    }
    const wrapped = wrapper(original, name);
    defineProperty(wrapped, "__original", original);
    defineProperty(wrapped, "__unwrap", () => {
      if (nodule[name] === wrapped) {
        defineProperty(nodule, name, original);
      }
    });
    defineProperty(wrapped, "__wrapped", true);
    defineProperty(nodule, name, wrapped);
    return wrapped;
  };
  var massWrap = (nodules, names, wrapper) => {
    if (!nodules) {
      logger("must provide one or more modules to patch");
      logger(new Error().stack);
      return;
    } else if (!Array.isArray(nodules)) {
      nodules = [nodules];
    }
    if (!(names && Array.isArray(names))) {
      logger("must provide one or more functions to wrap on modules");
      return;
    }
    nodules.forEach((nodule) => {
      names.forEach((name) => {
        wrap(nodule, name, wrapper);
      });
    });
  };
  var unwrap = (nodule, name) => {
    if (!nodule || !nodule[name]) {
      logger("no function to unwrap.");
      logger(new Error().stack);
      return;
    }
    const wrapped = nodule[name];
    if (!wrapped.__unwrap) {
      logger("no original to unwrap to -- has " + String(name) + " already been unwrapped?");
    } else {
      wrapped.__unwrap();
      return;
    }
  };
  var massUnwrap = (nodules, names) => {
    if (!nodules) {
      logger("must provide one or more modules to patch");
      logger(new Error().stack);
      return;
    } else if (!Array.isArray(nodules)) {
      nodules = [nodules];
    }
    if (!(names && Array.isArray(names))) {
      logger("must provide one or more functions to unwrap on modules");
      return;
    }
    nodules.forEach((nodule) => {
      names.forEach((name) => {
        unwrap(nodule, name);
      });
    });
  };
  function shimmer(options) {
    if (options && options.logger) {
      if (typeof options.logger !== "function") {
        logger("new logger isn't a function, not replacing");
      } else {
        logger = options.logger;
      }
    }
  }
  shimmer.wrap = wrap;
  shimmer.massWrap = massWrap;
  shimmer.unwrap = unwrap;
  shimmer.massUnwrap = massUnwrap;

  // node_modules/@opentelemetry/instrumentation/build/esm/instrumentation.js
  var InstrumentationAbstract = class {
    _config = {};
    _tracer;
    _meter;
    _logger;
    _diag;
    instrumentationName;
    instrumentationVersion;
    constructor(instrumentationName, instrumentationVersion, config) {
      this.instrumentationName = instrumentationName;
      this.instrumentationVersion = instrumentationVersion;
      this.setConfig(config);
      this._diag = diag2.createComponentLogger({
        namespace: instrumentationName
      });
      this._tracer = trace.getTracer(instrumentationName, instrumentationVersion);
      this._meter = metrics.getMeter(instrumentationName, instrumentationVersion);
      this._logger = logs.getLogger(instrumentationName, instrumentationVersion);
      this._updateMetricInstruments();
    }
    /* Api to wrap instrumented method */
    _wrap = wrap;
    /* Api to unwrap instrumented methods */
    _unwrap = unwrap;
    /* Api to mass wrap instrumented method */
    _massWrap = massWrap;
    /* Api to mass unwrap instrumented methods */
    _massUnwrap = massUnwrap;
    /* Returns meter */
    get meter() {
      return this._meter;
    }
    /**
     * Sets MeterProvider to this plugin
     * @param meterProvider
     */
    setMeterProvider(meterProvider) {
      this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
      this._updateMetricInstruments();
    }
    /* Returns logger */
    get logger() {
      return this._logger;
    }
    /**
     * Sets LoggerProvider to this plugin
     * @param loggerProvider
     */
    setLoggerProvider(loggerProvider) {
      this._logger = loggerProvider.getLogger(this.instrumentationName, this.instrumentationVersion);
    }
    /**
     * @experimental
     *
     * Get module definitions defined by {@link init}.
     * This can be used for experimental compile-time instrumentation.
     *
     * @returns an array of {@link InstrumentationModuleDefinition}
     */
    getModuleDefinitions() {
      const initResult = this.init() ?? [];
      if (!Array.isArray(initResult)) {
        return [initResult];
      }
      return initResult;
    }
    /**
     * Sets the new metric instruments with the current Meter.
     */
    _updateMetricInstruments() {
      return;
    }
    /* Returns InstrumentationConfig */
    getConfig() {
      return this._config;
    }
    /**
     * Sets InstrumentationConfig to this plugin
     * @param config
     */
    setConfig(config) {
      this._config = {
        enabled: true,
        ...config
      };
    }
    /**
     * Sets TraceProvider to this plugin
     * @param tracerProvider
     */
    setTracerProvider(tracerProvider) {
      this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
    }
    /* Returns tracer */
    get tracer() {
      return this._tracer;
    }
    /**
     * Execute span customization hook, if configured, and log any errors.
     * Any semantics of the trigger and info are defined by the specific instrumentation.
     * @param hookHandler The optional hook handler which the user has configured via instrumentation config
     * @param triggerName The name of the trigger for executing the hook for logging purposes
     * @param span The span to which the hook should be applied
     * @param info The info object to be passed to the hook, with useful data the hook may use
     */
    _runSpanCustomizationHook(hookHandler, triggerName, span, info) {
      if (!hookHandler) {
        return;
      }
      try {
        hookHandler(span, info);
      } catch (e) {
        this._diag.error(`Error running span customization hook due to exception in handler`, { triggerName }, e);
      }
    }
  };

  // node_modules/@opentelemetry/instrumentation/build/esm/platform/browser/instrumentation.js
  var InstrumentationBase = class extends InstrumentationAbstract {
    constructor(instrumentationName, instrumentationVersion, config) {
      super(instrumentationName, instrumentationVersion, config);
      if (this._config.enabled) {
        this.enable();
      }
    }
  };

  // node_modules/@opentelemetry/instrumentation/build/esm/utils.js
  function isWrapped(func) {
    return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
  }

  // node_modules/@opentelemetry/instrumentation-browser-navigation/build/esm/version.js
  var PACKAGE_VERSION = "0.6.0";
  var PACKAGE_NAME = "@opentelemetry/instrumentation-browser-navigation";

  // node_modules/@opentelemetry/instrumentation-browser-navigation/build/esm/utils.js
  function isHashChange(fromUrl, toUrl) {
    try {
      const a = new URL(fromUrl, window.location.origin);
      const b = new URL(toUrl, window.location.origin);
      const sameBase = a.origin === b.origin && a.pathname === b.pathname && a.search === b.search;
      const fromHasHash = a.hash !== "";
      const toHasHash = b.hash !== "";
      const hashesAreDifferent = a.hash !== b.hash;
      return sameBase && hashesAreDifferent && (fromHasHash && toHasHash || !fromHasHash && toHasHash);
    } catch {
      const fromBase = fromUrl.split("#")[0];
      const toBase = toUrl.split("#")[0];
      const fromHash = fromUrl.split("#")[1] || "";
      const toHash = toUrl.split("#")[1] || "";
      const sameBase = fromBase === toBase;
      const hashesAreDifferent = fromHash !== toHash;
      const notRemovingHash = toHash !== "";
      return sameBase && hashesAreDifferent && notRemovingHash;
    }
  }

  // node_modules/@opentelemetry/instrumentation-browser-navigation/build/esm/instrumentation.js
  var EVENT_NAME = "browser.navigation";
  var ATTR_BROWSER_NAVIGATION_SAME_DOCUMENT = "browser.navigation.same_document";
  var ATTR_BROWSER_NAVIGATION_HASH_CHANGE = "browser.navigation.hash_change";
  var ATTR_BROWSER_NAVIGATION_TYPE = "browser.navigation.type";
  var BrowserNavigationInstrumentation = class extends InstrumentationBase {
    applyCustomLogRecordData = void 0;
    _lastUrl = location.href;
    _hasProcessedInitialLoad = false;
    /**
     *
     * @param config
     */
    constructor(config) {
      super(PACKAGE_NAME, PACKAGE_VERSION, config);
      this.applyCustomLogRecordData = config?.applyCustomLogRecordData;
      this.sanitizeUrl = config?.sanitizeUrl;
    }
    init() {
    }
    /**
     * callback to be executed when using hard navigation
     */
    _onHardNavigation() {
      const navLogRecord = {
        eventName: EVENT_NAME,
        attributes: {
          [ATTR_URL_FULL]: this.sanitizeUrl ? this.sanitizeUrl(document.documentURI) : document.documentURI,
          [ATTR_BROWSER_NAVIGATION_SAME_DOCUMENT]: false,
          [ATTR_BROWSER_NAVIGATION_HASH_CHANGE]: false
        }
      };
      this._applyCustomLogRecordData(navLogRecord, this.applyCustomLogRecordData);
      this.logger.emit(navLogRecord);
    }
    /**
     * callback to be executed when using soft navigation
     */
    _onSoftNavigation(changeState, navigationEvent) {
      const referrerUrl = this._lastUrl;
      const currentUrl = changeState === "currententrychange" && navigationEvent?.target?.currentEntry?.url ? navigationEvent.target.currentEntry.url : location.href;
      if (referrerUrl === currentUrl) {
        return;
      }
      const navType = this._mapChangeStateToType(changeState, navigationEvent);
      const sameDocument = this._determineSameDocument(changeState, navigationEvent, referrerUrl, currentUrl);
      const hashChange = this._determineHashChange(changeState, navigationEvent, referrerUrl, currentUrl);
      const navLogRecord = {
        eventName: EVENT_NAME,
        attributes: {
          [ATTR_URL_FULL]: this.sanitizeUrl ? this.sanitizeUrl(currentUrl) : currentUrl,
          [ATTR_BROWSER_NAVIGATION_SAME_DOCUMENT]: sameDocument,
          [ATTR_BROWSER_NAVIGATION_HASH_CHANGE]: hashChange,
          ...navType ? { [ATTR_BROWSER_NAVIGATION_TYPE]: navType } : {}
        }
      };
      this._applyCustomLogRecordData(navLogRecord, this.applyCustomLogRecordData);
      this.logger.emit(navLogRecord);
      this._lastUrl = currentUrl;
    }
    /**
     * executes callback {_onDOMContentLoaded } when the page is viewed
     */
    _waitForPageLoad() {
      if (document.readyState === "complete" && !this._hasProcessedInitialLoad) {
        this._hasProcessedInitialLoad = true;
        this._onHardNavigation();
        return;
      }
      if (this._onLoadHandler) {
        document.removeEventListener("DOMContentLoaded", this._onLoadHandler);
      }
      this._onLoadHandler = () => {
        if (!this._hasProcessedInitialLoad) {
          this._hasProcessedInitialLoad = true;
          this._onHardNavigation();
        }
      };
      document.addEventListener("DOMContentLoaded", this._onLoadHandler);
    }
    /**
     * implements enable function
     */
    enable() {
      if (this._isEnabled) {
        return;
      }
      this._isEnabled = true;
      const cfg = this.getConfig();
      const useNavigationApiIfAvailable = !!cfg.useNavigationApiIfAvailable;
      const navigationApi = useNavigationApiIfAvailable && window.navigation;
      if (!navigationApi) {
        this._patchHistoryApi();
      }
      this._waitForPageLoad();
      if (navigationApi) {
        if (this._onNavigateHandler) {
          navigationApi.removeEventListener("currententrychange", this._onNavigateHandler);
          this._onNavigateHandler = void 0;
        }
        this._onNavigateHandler = (event) => {
          this._onSoftNavigation("currententrychange", event);
        };
        navigationApi.addEventListener("currententrychange", this._onNavigateHandler);
      } else {
        if (this._onPopStateHandler) {
          window.removeEventListener("popstate", this._onPopStateHandler);
          this._onPopStateHandler = void 0;
        }
        this._onPopStateHandler = () => {
          this._onSoftNavigation("popstate");
        };
        window.addEventListener("popstate", this._onPopStateHandler);
      }
    }
    /**
     * implements disable function
     */
    disable() {
      if (!this._isEnabled) {
        return;
      }
      this._isEnabled = false;
      this._unpatchHistoryApi();
      if (this._onLoadHandler) {
        document.removeEventListener("DOMContentLoaded", this._onLoadHandler);
        this._onLoadHandler = void 0;
      }
      if (this._onPopStateHandler) {
        window.removeEventListener("popstate", this._onPopStateHandler);
        this._onPopStateHandler = void 0;
      }
      if (this._onNavigateHandler) {
        try {
          const navigationApi = window.navigation;
          navigationApi?.removeEventListener?.("currententrychange", this._onNavigateHandler);
        } catch {
        }
        this._onNavigateHandler = void 0;
      }
      this._hasProcessedInitialLoad = false;
    }
    /**
     * Patches the history api method
     */
    _patchHistoryMethod(changeState) {
      const plugin = this;
      return (original) => {
        return function patchHistoryMethod(...args) {
          const result = original.apply(this, args);
          const currentUrl = location.href;
          if (currentUrl !== plugin._lastUrl) {
            plugin._onSoftNavigation(changeState);
          }
          return result;
        };
      };
    }
    _patchHistoryApi() {
      this._wrap(history, "replaceState", this._patchHistoryMethod("replaceState"));
      this._wrap(history, "pushState", this._patchHistoryMethod("pushState"));
    }
    /**
     * unpatch the history api methods
     */
    _unpatchHistoryApi() {
      if (isWrapped(history.replaceState))
        this._unwrap(history, "replaceState");
      if (isWrapped(history.pushState))
        this._unwrap(history, "pushState");
    }
    /**
     *
     * @param logRecord
     * @param applyCustomLogRecordData
     * Add custom data to the event
     */
    _applyCustomLogRecordData(logRecord, applyCustomLogRecordData) {
      if (applyCustomLogRecordData) {
        applyCustomLogRecordData(logRecord);
      }
    }
    _determineSameDocument(changeState, navigationEvent, fromUrl, toUrl) {
      if (changeState === "currententrychange") {
        if (fromUrl && toUrl) {
          try {
            const fromURL = new URL(fromUrl);
            const toURL = new URL(toUrl);
            return fromURL.origin === toURL.origin;
          } catch {
            return true;
          }
        }
        return true;
      }
      if (fromUrl && toUrl) {
        try {
          const fromURL = new URL(fromUrl);
          const toURL = new URL(toUrl);
          return fromURL.origin === toURL.origin;
        } catch {
          return true;
        }
      }
      return true;
    }
    /**
     * Determines if navigation is a hash change based on URL comparison
     * A hash change is true if the URLs are the same except for the hash part
     */
    _determineHashChange(changeState, navigationEvent, fromUrl, toUrl) {
      if (changeState === "currententrychange") {
        if (fromUrl && toUrl) {
          return isHashChange(fromUrl, toUrl);
        }
        return false;
      }
      if (fromUrl && toUrl) {
        return isHashChange(fromUrl, toUrl);
      }
      return false;
    }
    _mapChangeStateToType(changeState, navigationEvent) {
      if (changeState === "currententrychange") {
        if (navigationEvent?.navigationType) {
          const navType = navigationEvent.navigationType;
          switch (navType) {
            case "traverse":
              return "traverse";
            case "replace":
              return "replace";
            case "reload":
              return "reload";
            case "push":
            default:
              return "push";
          }
        }
        return "push";
      }
      switch (changeState) {
        case "pushState":
          return "push";
        case "replaceState":
          return "replace";
        case "popstate":
          return "traverse";
        // Default to traverse, but hash changes will be handled specially
        case "hashchange":
          return "push";
        case "navigate":
          return "push";
        default:
          return void 0;
      }
    }
  };

  // node_modules/@opentelemetry/instrumentation-user-interaction/build/esm/enums/AttributeNames.js
  var AttributeNames;
  (function(AttributeNames2) {
    AttributeNames2["EVENT_TYPE"] = "event_type";
    AttributeNames2["TARGET_ELEMENT"] = "target_element";
    AttributeNames2["TARGET_XPATH"] = "target_xpath";
    AttributeNames2["HTTP_URL"] = "http.url";
  })(AttributeNames || (AttributeNames = {}));

  // node_modules/@opentelemetry/instrumentation-user-interaction/build/esm/version.js
  var PACKAGE_VERSION2 = "0.57.0";
  var PACKAGE_NAME2 = "@opentelemetry/instrumentation-user-interaction";

  // node_modules/@opentelemetry/instrumentation-user-interaction/build/esm/instrumentation.js
  var ZONE_CONTEXT_KEY = "OT_ZONE_CONTEXT";
  var EVENT_NAVIGATION_NAME = "Navigation:";
  var DEFAULT_EVENT_NAMES = ["click"];
  function defaultShouldPreventSpanCreation() {
    return false;
  }
  var UserInteractionInstrumentation = class extends InstrumentationBase {
    version = PACKAGE_VERSION2;
    moduleName = "user-interaction";
    _spansData = /* @__PURE__ */ new WeakMap();
    // for addEventListener/removeEventListener state
    _wrappedListeners = /* @__PURE__ */ new WeakMap();
    // for event bubbling
    _eventsSpanMap = /* @__PURE__ */ new WeakMap();
    _eventNames;
    _shouldPreventSpanCreation;
    constructor(config = {}) {
      super(PACKAGE_NAME2, PACKAGE_VERSION2, config);
      this._eventNames = new Set(config?.eventNames ?? DEFAULT_EVENT_NAMES);
      this._shouldPreventSpanCreation = typeof config?.shouldPreventSpanCreation === "function" ? config.shouldPreventSpanCreation : defaultShouldPreventSpanCreation;
    }
    init() {
    }
    /**
     * This will check if last task was timeout and will save the time to
     * fix the user interaction when nothing happens
     * This timeout comes from xhr plugin which is needed to collect information
     * about last xhr main request from observer
     * @param task
     * @param span
     */
    _checkForTimeout(task, span) {
      const spanData = this._spansData.get(span);
      if (spanData) {
        if (task.source === "setTimeout") {
          spanData.hrTimeLastTimeout = hrTime();
        } else if (task.source !== "Promise.then" && task.source !== "setTimeout") {
          spanData.hrTimeLastTimeout = void 0;
        }
      }
    }
    /**
     * Controls whether or not to create a span, based on the event type.
     */
    _allowEventName(eventName) {
      return this._eventNames.has(eventName);
    }
    /**
     * Creates a new span
     * @param element
     * @param eventName
     * @param parentSpan
     */
    _createSpan(element, eventName, parentSpan) {
      if (!(element instanceof HTMLElement)) {
        return void 0;
      }
      if (!element.getAttribute) {
        return void 0;
      }
      if (element.hasAttribute("disabled")) {
        return void 0;
      }
      if (!this._allowEventName(eventName)) {
        return void 0;
      }
      const xpath = getElementXPath(element, true);
      try {
        const span = this.tracer.startSpan(eventName, {
          attributes: {
            [AttributeNames.EVENT_TYPE]: eventName,
            [AttributeNames.TARGET_ELEMENT]: element.tagName,
            [AttributeNames.TARGET_XPATH]: xpath,
            [AttributeNames.HTTP_URL]: window.location.href
          }
        }, parentSpan ? trace.setSpan(context.active(), parentSpan) : void 0);
        if (this._shouldPreventSpanCreation(eventName, element, span) === true) {
          return void 0;
        }
        this._spansData.set(span, {
          taskCount: 0
        });
        return span;
      } catch (e) {
        this._diag.error("failed to start create new user interaction span", e);
      }
      return void 0;
    }
    /**
     * Decrement number of tasks that left in zone,
     * This is needed to be able to end span when no more tasks left
     * @param span
     */
    _decrementTask(span) {
      const spanData = this._spansData.get(span);
      if (spanData) {
        spanData.taskCount--;
        if (spanData.taskCount === 0) {
          this._tryToEndSpan(span, spanData.hrTimeLastTimeout);
        }
      }
    }
    /**
     * Return the current span
     * @param zone
     * @private
     */
    _getCurrentSpan(zone) {
      const context2 = zone.get(ZONE_CONTEXT_KEY);
      if (context2) {
        return trace.getSpan(context2);
      }
      return context2;
    }
    /**
     * Increment number of tasks that are run within the same zone.
     *     This is needed to be able to end span when no more tasks left
     * @param span
     */
    _incrementTask(span) {
      const spanData = this._spansData.get(span);
      if (spanData) {
        spanData.taskCount++;
      }
    }
    /**
     * Returns true iff we should use the patched callback; false if it's already been patched
     */
    addPatchedListener(on, type, listener, wrappedListener) {
      let listener2Type = this._wrappedListeners.get(listener);
      if (!listener2Type) {
        listener2Type = /* @__PURE__ */ new Map();
        this._wrappedListeners.set(listener, listener2Type);
      }
      let element2patched = listener2Type.get(type);
      if (!element2patched) {
        element2patched = /* @__PURE__ */ new Map();
        listener2Type.set(type, element2patched);
      }
      if (element2patched.has(on)) {
        return false;
      }
      element2patched.set(on, wrappedListener);
      return true;
    }
    /**
     * Returns the patched version of the callback (or undefined)
     */
    removePatchedListener(on, type, listener) {
      const listener2Type = this._wrappedListeners.get(listener);
      if (!listener2Type) {
        return void 0;
      }
      const element2patched = listener2Type.get(type);
      if (!element2patched) {
        return void 0;
      }
      const patched = element2patched.get(on);
      if (patched) {
        element2patched.delete(on);
        if (element2patched.size === 0) {
          listener2Type.delete(type);
          if (listener2Type.size === 0) {
            this._wrappedListeners.delete(listener);
          }
        }
      }
      return patched;
    }
    // utility method to deal with the Function|EventListener nature of addEventListener
    _invokeListener(listener, target, args) {
      if (typeof listener === "function") {
        return listener.apply(target, args);
      } else {
        return listener.handleEvent(args[0]);
      }
    }
    /**
     * This patches the addEventListener of HTMLElement to be able to
     * auto instrument the click events
     * This is done when zone is not available
     */
    _patchAddEventListener() {
      const plugin = this;
      return (original) => {
        return function addEventListenerPatched(type, listener, useCapture) {
          if (!listener) {
            return original.call(this, type, listener, useCapture);
          }
          const once = useCapture && typeof useCapture === "object" && useCapture.once;
          const patchedListener = function(...args) {
            let parentSpan;
            const event = args[0];
            const target = event?.target;
            if (event) {
              parentSpan = plugin._eventsSpanMap.get(event);
            }
            if (once) {
              plugin.removePatchedListener(this, type, listener);
            }
            const span = plugin._createSpan(target, type, parentSpan);
            if (span) {
              if (event) {
                plugin._eventsSpanMap.set(event, span);
              }
              return context.with(trace.setSpan(context.active(), span), () => {
                const result = plugin._invokeListener(listener, this, args);
                span.end();
                return result;
              });
            } else {
              return plugin._invokeListener(listener, this, args);
            }
          };
          if (plugin.addPatchedListener(this, type, listener, patchedListener)) {
            return original.call(this, type, patchedListener, useCapture);
          }
        };
      };
    }
    /**
     * This patches the removeEventListener of HTMLElement to handle the fact that
     * we patched the original callbacks
     * This is done when zone is not available
     */
    _patchRemoveEventListener() {
      const plugin = this;
      return (original) => {
        return function removeEventListenerPatched(type, listener, useCapture) {
          const wrappedListener = plugin.removePatchedListener(this, type, listener);
          if (wrappedListener) {
            return original.call(this, type, wrappedListener, useCapture);
          } else {
            return original.call(this, type, listener, useCapture);
          }
        };
      };
    }
    /**
     * Most browser provide event listener api via EventTarget in prototype chain.
     * Exception to this is IE 11 which has it on the prototypes closest to EventTarget:
     *
     * * - has addEventListener in IE
     * ** - has addEventListener in all other browsers
     * ! - missing in IE
     *
     * HTMLElement -> Element -> Node * -> EventTarget **! -> Object
     * Document -> Node * -> EventTarget **! -> Object
     * Window * -> WindowProperties ! -> EventTarget **! -> Object
     */
    _getPatchableEventTargets() {
      return window.EventTarget ? [EventTarget.prototype] : [Node.prototype, Window.prototype];
    }
    /**
     * Patches the history api
     */
    _patchHistoryApi() {
      this._unpatchHistoryApi();
      this._wrap(history, "replaceState", this._patchHistoryMethod());
      this._wrap(history, "pushState", this._patchHistoryMethod());
      this._wrap(history, "back", this._patchHistoryMethod());
      this._wrap(history, "forward", this._patchHistoryMethod());
      this._wrap(history, "go", this._patchHistoryMethod());
    }
    /**
     * Patches the certain history api method
     */
    _patchHistoryMethod() {
      const plugin = this;
      return (original) => {
        return function patchHistoryMethod(...args) {
          const url = `${location.pathname}${location.hash}${location.search}`;
          const result = original.apply(this, args);
          const urlAfter = `${location.pathname}${location.hash}${location.search}`;
          if (url !== urlAfter) {
            plugin._updateInteractionName(urlAfter);
          }
          return result;
        };
      };
    }
    /**
     * unpatch the history api methods
     */
    _unpatchHistoryApi() {
      if (isWrapped(history.replaceState))
        this._unwrap(history, "replaceState");
      if (isWrapped(history.pushState))
        this._unwrap(history, "pushState");
      if (isWrapped(history.back))
        this._unwrap(history, "back");
      if (isWrapped(history.forward))
        this._unwrap(history, "forward");
      if (isWrapped(history.go))
        this._unwrap(history, "go");
    }
    /**
     * Updates interaction span name
     * @param url
     */
    _updateInteractionName(url) {
      const span = trace.getSpan(context.active());
      if (span && typeof span.updateName === "function") {
        span.updateName(`${EVENT_NAVIGATION_NAME} ${url}`);
      }
    }
    /**
     * Patches zone cancel task - this is done to be able to correctly
     * decrement the number of remaining tasks
     */
    _patchZoneCancelTask() {
      const plugin = this;
      return (original) => {
        return function patchCancelTask(task) {
          const currentZone = Zone.current;
          const currentSpan = plugin._getCurrentSpan(currentZone);
          if (currentSpan && plugin._shouldCountTask(task, currentZone)) {
            plugin._decrementTask(currentSpan);
          }
          return original.call(this, task);
        };
      };
    }
    /**
     * Patches zone schedule task - this is done to be able to correctly
     * increment the number of tasks running within current zone but also to
     * save time in case of timeout running from xhr plugin when waiting for
     * main request from PerformanceResourceTiming
     */
    _patchZoneScheduleTask() {
      const plugin = this;
      return (original) => {
        return function patchScheduleTask(task) {
          const currentZone = Zone.current;
          const currentSpan = plugin._getCurrentSpan(currentZone);
          if (currentSpan && plugin._shouldCountTask(task, currentZone)) {
            plugin._incrementTask(currentSpan);
            plugin._checkForTimeout(task, currentSpan);
          }
          return original.call(this, task);
        };
      };
    }
    /**
     * Patches zone run task - this is done to be able to create a span when
     * user interaction starts
     * @private
     */
    _patchZoneRunTask() {
      const plugin = this;
      return (original) => {
        return function patchRunTask(task, applyThis, applyArgs) {
          const event = Array.isArray(applyArgs) && applyArgs[0] instanceof Event ? applyArgs[0] : void 0;
          const target = event?.target;
          let span;
          const activeZone = this;
          if (target) {
            span = plugin._createSpan(target, task.eventName);
            if (span) {
              plugin._incrementTask(span);
              return activeZone.run(() => {
                try {
                  return context.with(trace.setSpan(context.active(), span), () => {
                    const currentZone = Zone.current;
                    task._zone = currentZone;
                    return original.call(currentZone, task, applyThis, applyArgs);
                  });
                } finally {
                  plugin._decrementTask(span);
                }
              });
            }
          } else {
            span = plugin._getCurrentSpan(activeZone);
          }
          try {
            return original.call(activeZone, task, applyThis, applyArgs);
          } finally {
            if (span && plugin._shouldCountTask(task, activeZone)) {
              plugin._decrementTask(span);
            }
          }
        };
      };
    }
    /**
     * Decides if task should be counted.
     * @param task
     * @param currentZone
     * @private
     */
    _shouldCountTask(task, currentZone) {
      if (task._zone) {
        currentZone = task._zone;
      }
      if (!currentZone || !task.data || task.data.isPeriodic) {
        return false;
      }
      const currentSpan = this._getCurrentSpan(currentZone);
      if (!currentSpan) {
        return false;
      }
      if (!this._spansData.get(currentSpan)) {
        return false;
      }
      return task.type === "macroTask" || task.type === "microTask";
    }
    /**
     * Will try to end span when such span still exists.
     * @param span
     * @param endTime
     * @private
     */
    _tryToEndSpan(span, endTime) {
      if (span) {
        const spanData = this._spansData.get(span);
        if (spanData) {
          span.end(endTime);
          this._spansData.delete(span);
        }
      }
    }
    /**
     * implements enable function
     */
    enable() {
      const ZoneWithPrototype = this._getZoneWithPrototype();
      this._diag.debug("applying patch to", this.moduleName, this.version, "zone:", !!ZoneWithPrototype);
      if (ZoneWithPrototype) {
        if (isWrapped(ZoneWithPrototype.prototype.runTask)) {
          this._unwrap(ZoneWithPrototype.prototype, "runTask");
          this._diag.debug("removing previous patch from method runTask");
        }
        if (isWrapped(ZoneWithPrototype.prototype.scheduleTask)) {
          this._unwrap(ZoneWithPrototype.prototype, "scheduleTask");
          this._diag.debug("removing previous patch from method scheduleTask");
        }
        if (isWrapped(ZoneWithPrototype.prototype.cancelTask)) {
          this._unwrap(ZoneWithPrototype.prototype, "cancelTask");
          this._diag.debug("removing previous patch from method cancelTask");
        }
        this._zonePatched = true;
        this._wrap(ZoneWithPrototype.prototype, "runTask", this._patchZoneRunTask());
        this._wrap(ZoneWithPrototype.prototype, "scheduleTask", this._patchZoneScheduleTask());
        this._wrap(ZoneWithPrototype.prototype, "cancelTask", this._patchZoneCancelTask());
      } else {
        this._zonePatched = false;
        const targets = this._getPatchableEventTargets();
        targets.forEach((target) => {
          if (isWrapped(target.addEventListener)) {
            this._unwrap(target, "addEventListener");
            this._diag.debug("removing previous patch from method addEventListener");
          }
          if (isWrapped(target.removeEventListener)) {
            this._unwrap(target, "removeEventListener");
            this._diag.debug("removing previous patch from method removeEventListener");
          }
          this._wrap(target, "addEventListener", this._patchAddEventListener());
          this._wrap(target, "removeEventListener", this._patchRemoveEventListener());
        });
      }
      this._patchHistoryApi();
    }
    /**
     * implements unpatch function
     */
    disable() {
      const ZoneWithPrototype = this._getZoneWithPrototype();
      this._diag.debug("removing patch from", this.moduleName, this.version, "zone:", !!ZoneWithPrototype);
      if (ZoneWithPrototype && this._zonePatched) {
        if (isWrapped(ZoneWithPrototype.prototype.runTask)) {
          this._unwrap(ZoneWithPrototype.prototype, "runTask");
        }
        if (isWrapped(ZoneWithPrototype.prototype.scheduleTask)) {
          this._unwrap(ZoneWithPrototype.prototype, "scheduleTask");
        }
        if (isWrapped(ZoneWithPrototype.prototype.cancelTask)) {
          this._unwrap(ZoneWithPrototype.prototype, "cancelTask");
        }
      } else {
        const targets = this._getPatchableEventTargets();
        targets.forEach((target) => {
          if (isWrapped(target.addEventListener)) {
            this._unwrap(target, "addEventListener");
          }
          if (isWrapped(target.removeEventListener)) {
            this._unwrap(target, "removeEventListener");
          }
        });
      }
      this._unpatchHistoryApi();
    }
    /**
     * returns Zone
     */
    _getZoneWithPrototype() {
      const _window = window;
      return _window.Zone;
    }
  };

  // index.js
  globalThis["instrument"] = function instrument() {
    diag2.setLogger(console, { logLevel: DiagLogLevel.DEBUG });
    diag2.debug(`intialization`);
    const resourceAttributes = {};
    const resource = resourceFromAttributes({ ...resourceAttributes, ...SDK_INFO });
    const tracerProvider = new WebTracerProvider({
      resource,
      sampler: new TraceIdRatioBasedSampler(1),
      spanProcessors: [
        new SimpleSpanProcessor(
          new ConsoleSpanExporter()
        )
      ]
    });
    tracerProvider.register();
    const loggerProvider = new LoggerProvider({
      resource,
      processors: [
        new SimpleLogRecordProcessor(
          new ConsoleLogRecordExporter()
        )
      ]
    });
    logs.setGlobalLoggerProvider(loggerProvider);
    registerInstrumentations({
      instrumentations: [
        new BrowserNavigationInstrumentation(),
        new UserInteractionInstrumentation()
      ]
    });
  };
})();
//# sourceMappingURL=otel-browser.js.map
