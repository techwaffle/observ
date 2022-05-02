var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  AnalyticsProvider: () => AnalyticsProvider,
  Element: () => Element,
  useAnalytics: () => useAnalytics
});
var import_react2 = __toESM(require("react"));

// src/components/Element/index.tsx
var import_react = require("react");

// src/utils/index.ts
var weightedRand = (variants) => {
  let weightSum = 0;
  const r = Math.random();
  for (const i in variants) {
    weightSum += variants[i].weight;
    if (r <= weightSum)
      return i;
  }
};
var getRandomVariant = (variants) => {
  const variantId = weightedRand(variants);
  if (variantId) {
    return variants[variantId];
  }
};
var getExperimentById = (experimentId, experiments) => experiments.find((experiment) => experiment.id === experimentId);
var getVariantFromLocalStorage = (key) => localStorage.getItem(key);
var setVariantToLocalStorage = (key, value) => localStorage.setItem(key, value);

// src/components/Element/index.tsx
var Element = ({
  id,
  experimentId,
  options,
  fallback,
  skeleton
}) => {
  const [option, setOption] = (0, import_react.useState)(null);
  const { sendEvent, logExperimentId, experiments, getAllExperiments } = useAnalytics();
  const fallbackComponent = fallback || null;
  const experimentElementKey = `${experimentId}-${id}`;
  (0, import_react.useEffect)(() => {
    if (!getAllExperiments) {
      throw Error("To use the Element component, you must configure getAllExperiments in the AnalyticsProvider");
    }
  }, [getAllExperiments]);
  (0, import_react.useEffect)(() => {
    if (!option && experiments.length > 0) {
      let selectedVariantElementOption = getVariantFromLocalStorage(experimentElementKey);
      if (!selectedVariantElementOption) {
        const experiment = getExperimentById(experimentId, experiments);
        if (experiment) {
          const selectedVariant = getRandomVariant(experiment.variants);
          if (selectedVariant) {
            selectedVariantElementOption = selectedVariant.elements[id];
            setVariantToLocalStorage(experimentElementKey, selectedVariantElementOption);
            setOption(options[selectedVariantElementOption]);
            sendEvent(selectedVariantElementOption);
            logExperimentId(experimentId);
          } else {
            setOption(fallbackComponent);
          }
        } else {
          setOption(fallbackComponent);
        }
      } else {
        setOption(options[selectedVariantElementOption]);
        sendEvent(selectedVariantElementOption);
        logExperimentId(experimentId);
      }
    }
  }, [
    experiments,
    experimentId,
    id,
    logExperimentId,
    options,
    sendEvent,
    fallbackComponent,
    experimentElementKey,
    option
  ]);
  if (!option) {
    return skeleton || null;
  }
  return option;
};

// src/index.tsx
var defaultAnalyticsConfig = {
  sendEvent: (event) => {
    console.log(event);
  },
  logExperimentId: (id) => {
    console.log(id);
  },
  logPageView: (path) => {
    console.log(path);
  }
};
var AnalyticsContextInstance = import_react2.default.createContext(__spreadProps(__spreadValues({}, defaultAnalyticsConfig), {
  experiments: []
}));
function AnalyticsProvider({
  config,
  children
}) {
  const [experiments, setExperiments] = (0, import_react2.useState)([]);
  (0, import_react2.useEffect)(() => {
    if (experiments.length <= 0 && config && config.getAllExperiments) {
      config.getAllExperiments().then((data) => {
        if (data) {
          setExperiments(data);
        }
      });
    }
  }, [config, experiments]);
  return /* @__PURE__ */ import_react2.default.createElement(AnalyticsContextInstance.Provider, {
    value: __spreadProps(__spreadValues(__spreadValues({}, defaultAnalyticsConfig), config), { experiments })
  }, children);
}
var useAnalytics = () => (0, import_react2.useContext)(AnalyticsContextInstance);
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnalyticsProvider,
  Element,
  useAnalytics
});
