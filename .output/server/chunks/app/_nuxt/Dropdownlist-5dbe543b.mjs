import { d as useNuxtApp } from '../server.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  name: "dropdownlist",
  data() {
    return {
      items: this.data,
      selected_value: this.selected_value
    };
  },
  props: {
    type: String,
    label: String,
    show_label: Boolean,
    readonly: Boolean,
    name: String,
    selected_value: String,
    selected_text: String,
    api: String,
    data: Array
  },
  emits: ["selected_item"],
  methods: {
    selectedOption(option) {
      return option.code === this.selected_value;
    },
    onChangeDropdown(e) {
      const selectedCode = e.target.value;
      const option = this.items.data.find((option2) => {
        return selectedCode === option2.code;
      });
      try {
        this.selected_value = option.code;
        useNuxtApp().$bus.$emit("selected_item", option.code);
      } catch (e2) {
        this.selected_value = "";
        useNuxtApp().$bus.$emit("selected_item", "");
      }
    },
    async getDropdown() {
      alert("getDropdown");
    },
    created() {
      alert("created called");
    },
    beforeMount() {
      this.getDropdown();
    }
  },
  async fetch() {
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  if ($props.show_label) {
    _push(`<label${ssrRenderAttr("for", this.name)} class="block text-sm font-medium text-gray-700">${ssrInterpolate(this.label)}</label>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="mt-1"><select${ssrRenderAttr("id", this.name)}${ssrRenderAttr("autocomplete", this.name)}${ssrRenderAttr("name", this.name)}${ssrIncludeBooleanAttr(this.readonly == true) ? " readonly" : ""}${ssrIncludeBooleanAttr(this.readonly == true) ? " disabled" : ""} class="h-full py-3 pl-4 pr-8 shadow-sm focus:ring-lime-600 focus:border-lime-600 block w-full text-sm font-medium border-gray-300"><option value="">Select</option><!--[-->`);
  ssrRenderList(this.items.data, (item, index) => {
    _push(`<option${ssrRenderAttr("value", item.code)}${ssrIncludeBooleanAttr($options.selectedOption(item)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
  });
  _push(`<!--]--></select></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dropdownlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dropdownlist = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Dropdownlist as D };
