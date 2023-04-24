import { ref, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "RoleGridTable",
  __ssrInlineRender: true,
  setup(__props) {
    const data = [
      ["Ford", "Fusion", "2011", "Silver"],
      ["Chevrolet", "Cruz", "2018", "White"]
    ];
    const rows = ref(data);
    const limit = ref(2);
    const handleRowClick = (args) => {
      console.log(args);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Grid = resolveComponent("Grid");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 sm:px-4 lg:px-4" }, _attrs))}><div class="mt-8 flex flex-col"><div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">`);
      _push(ssrRenderComponent(_component_Grid, {
        rows: unref(rows),
        columns: ["Make", "Model", "Year", "Color"],
        limit: unref(limit),
        onRowClick: handleRowClick
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/management/roles/RoleGridTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
