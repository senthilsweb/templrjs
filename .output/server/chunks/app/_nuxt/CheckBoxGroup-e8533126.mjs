import { ssrRenderAttrs, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  name: "checkBoxGroup",
  data() {
    return {
      items: this.data,
      checked_value: this.checked_value
    };
  },
  props: {
    type: String,
    name: String,
    checked_value: new Array(),
    api: String,
    data: new Array()
  },
  emits: ["checked_item"],
  methods: {
    checkedOption(option) {
      return _.indexOf(this.checked_value, option) > -1;
    },
    onChangeCheckBox(e) {
      const checkedCode = e.target.value;
      const option = this.items.data.find((option2) => {
        return checkedCode === option2.name;
      });
      try {
        this.checked_value = option.name;
        this.$emit("checked_item", option.name);
      } catch (e2) {
        this.checked_value = "";
        this.$emit("checked_item", "");
      }
    },
    async getCheckbox() {
      alert("getCheckbox");
    },
    created() {
      alert("created called");
    },
    beforeMount() {
      this.getCheckbox();
    }
  },
  async fetch() {
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="mt-1 sm:px-2"><div class="space-y-3"><!--[-->`);
  ssrRenderList(this.items.data, (option, optionIdx) => {
    _push(`<div class="flex items-center mx-2"><input${ssrIncludeBooleanAttr($options.checkedOption(option.code)) ? " checked" : ""}${ssrRenderAttr("id", `${option.code}-${optionIdx}`)}${ssrRenderAttr("name", `${this.items.name}[]`)}${ssrRenderAttr("value", option.name)} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"><label${ssrRenderAttr("for", `${option.code}-${optionIdx}`)} class="ml-3 text-sm text-gray-600">${ssrInterpolate(option.name)}</label></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CheckBoxGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as _ };
