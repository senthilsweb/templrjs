import { defineComponent, inject, computed, unref, Transition, h } from 'vue';
import { h as useRoute, z as layouts, A as appLayoutTransition, _ as _wrapIf } from '../server.mjs';
import { useRoute as useRoute$1 } from 'vue-router';

const LayoutLoader = /* @__PURE__ */ defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, context.attrs, context.slots);
    };
  }
});
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      var _a, _b;
      return (_b = (_a = unref(props.name)) != null ? _a : route.meta.layout) != null ? _b : "default";
    });
    return () => {
      var _a;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a = route.meta.layoutTransition) != null ? _a : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && {
          key: layout.value,
          name: layout.value,
          ...{},
          ...context.attrs
        }, context.slots).default()
      }).default();
    };
  }
});

export { __nuxt_component_0 as _ };
