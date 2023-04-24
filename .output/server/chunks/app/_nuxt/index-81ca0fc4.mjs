import { l as lefNavLinks, _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { mergeProps, unref, useSSRContext, ref, withAsyncContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import __nuxt_component_2$1 from './Icon-7255ab8c.mjs';
import { p as useAsyncData, r as queryContent } from '../server.mjs';
import { DatePicker } from 'v-calendar';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import './Logo-d1137ce0.mjs';
import '@supabase/supabase-js';
import 'defu';
import '@headlessui/vue';
import 'lodash-es';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/cloudflare-kv-http';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'node:fs';
import 'node:url';
import 'pathe';
import '@octokit/graphql';
import 'remark-github';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';
import 'nanoid';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'mitt';
import 'vue-i18n';
import 'underscore.string';

const _sfc_main$3 = {
  components: {},
  data() {
    return {};
  },
  props: {
    type: String,
    label: String,
    name: String,
    selected_item: String,
    api: String,
    data: Array
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Moisture",
              data: [12, 19, 3, 5, 2, 3, 1, 4, 6, 8, 2, 10, 12],
              backgroundColor: [
                "rgba(29, 78, 216, 1)",
                "rgba(101, 163, 13, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)"
              ],
              borderWidth: 1,
              borderRadius: 5,
              type: "bar",
              order: 1
            },
            {
              label: "Co2",
              data: [10, 8, 1, 3, 0, 1, 0, 2, 3, 5, 6, 7, 8],
              backgroundColor: [
                "rgba(234, 179, 8, 1)"
              ],
              borderColor: "rgba(234, 179, 8, 1)",
              borderWidth: 1,
              borderRadius: 5,
              type: "line",
              order: 0
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "2022 - Month wise, average NYC air pollution"
            }
          }
        }
      });
    }
  },
  mounted() {
    this.renderChart();
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<canvas${ssrRenderAttrs(mergeProps({
    id: "myChart",
    width: "400",
    height: "400"
  }, _attrs))}></canvas>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BarChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = {
  components: {},
  data() {
    return {};
  },
  props: {
    type: String,
    label: String,
    name: String,
    selected_item: String,
    api: String,
    data: Array
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("comboChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31"
          ],
          datasets: [
            {
              label: "Pollution",
              data: [
                "72.5052",
                "70.672",
                "62.4502",
                "57.4714",
                "55.3151",
                "58.0904",
                "62.6202",
                "63.2485",
                "60.5846",
                "56.3154",
                "58.0005",
                "68.7145",
                "73.3057",
                "67.9869",
                "62.2221",
                "33.0329",
                "55.8137",
                "59.9005",
                "65.7655",
                "64.4816",
                "61.0005",
                "57.5322",
                "59.3417",
                "68.1354",
                "56.3154",
                "58.0005",
                "62.2221",
                "57.0329",
                "56.3154",
                "32.3154",
                "56.3154"
              ],
              backgroundColor: [
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)",
                "rgba(29, 78, 216, 1)"
              ],
              borderWidth: 1,
              borderRadius: 5,
              type: "bar",
              order: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 20
              }
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Feb, 2022 - Day wise, average NYC air pollution"
            }
          }
        }
      });
    }
    /*const floatingLabels = {
    			id: "floatingLabels",
    			afterDatasetsDraw(charts, args, options) {
    				console.log(charts)
    			}
    
    		} */
  },
  mounted() {
    this.renderChart();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<canvas${ssrRenderAttrs(mergeProps({
    id: "comboChart",
    class: "w-full h-[32rem]"
  }, _attrs))}></canvas>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ComboChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "dashboard-stats",
  __ssrInlineRender: true,
  props: {
    api_end_point: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const { data: stats2 } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("stats_" + props.api_end_point, () => {
      return queryContent().where({ _path: props.api_end_point }).findOne();
    }, "$0R4mNj8h3W")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-4 sm:gap-px" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(stats2).data, (item, index) => {
        _push(`<div class="relative group bg-white border-gray-200 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500"><span class="${ssrRenderClass([item.iconBackground, "rounded-lg inline-flex p-3 ring-4 ring-white"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: item.icon,
          class: ["h-6 w-6 flex-shrink-0", item.iconForeground]
        }, null, _parent));
        _push(`</span><div class="mt-8"><h3 class="text-lg font-medium"><a href="#" class="focus:outline-none"><span class="absolute inset-0" aria-hidden="true"></span> ${ssrInterpolate(item.name)}</a></h3><p class="mt-2 text-sm text-gray-500">${ssrInterpolate(item.description)}</p></div><p class="ml-16 top-6 absolute text-2xl font-semibold text-gray-900">${ssrInterpolate(item.value)}</p><span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-up-right-solid",
          class: "h-6 w-6"
        }, null, _parent));
        _push(`</span></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard-stats.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main$1;
const data = [
  {
    hidden: false,
    name: "Processes",
    description: "Total number of processes and bot workforces automated",
    value: "06",
    img: "https://res.cloudinary.com/nathansweb/image/upload/v1630897884/zicons/layers_g8nilb.svg",
    paths: [
      "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    ],
    css_class: "bg-primary-50 text-primary-700"
  },
  {
    hidden: false,
    name: "Bots",
    description: "Total number of bots deployed",
    value: "18",
    img: "https://res.cloudinary.com/nathansweb/image/upload/v1630945464/zicons/robot-one_uppryp.svg",
    paths: [
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ],
    css_class: "bg-purple-50 text-purple-700"
  },
  {
    hidden: false,
    name: "Active Runs",
    description: "Total active runs for the seleted time-period",
    value: "1,023",
    img: "https://res.cloudinary.com/nathansweb/image/upload/v1630898722/zicons/rocket-one_nhcglc.svg",
    paths: [
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ],
    css_class: "bg-blue-50 text-blue-700"
  },
  {
    hidden: true,
    name: "Failed Runs",
    description: "Number of failures for the seleted time-period",
    value: "233",
    img: "https://res.cloudinary.com/nathansweb/image/upload/v1630898130/zicons/api_abqyzf.svg",
    paths: [
      "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    ],
    css_class: "bg-yellow-50 text-yellow-700"
  }
];
const stats = {
  data
};
const __default__ = {
  components: {
    DatePicker,
    VueCtkDateTimePicker
  },
  data() {
    const date = ref(/* @__PURE__ */ new Date());
    date.value.setDate(Number((/* @__PURE__ */ new Date()).getDate()) + 35);
    return {
      range: {
        start: /* @__PURE__ */ new Date(),
        end: date.value
      },
      input: { date_range: { start: /* @__PURE__ */ new Date(), end: date.value } },
      stats,
      lefNavLinks
    };
  },
  methods: {},
  async asyncData({ params }) {
  },
  created() {
  },
  mounted() {
    document.getElementById("dt_rng_picker-input").className = "bg-yellow-500 w-[14rem] text-white text-md font-bold rounded focus:ring-yellow-600 focus:border-yellow-600 block min-w-0  border-yellow-600";
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      const _component_BarChart = __nuxt_component_2;
      const _component_ComboChart = __nuxt_component_3;
      const _component_dashboard_stats = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "z-10 h-screen flex overflow-hidden bg-gray-50" }, _attrs))}><div class="z-10 before:hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="z-10 flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><div class="flex-1 flex xl:overflow-hidden"><div class="flex-1 xl:overflow-y-auto"><div class="w-full"><h1 class="text-3xl ml-6 font-bold tracking-tight text-primary-gray-900 pt-4">Data Signals</h1><div class="flex items-center space-x-4 sm:ml-6 sm:space-x-6"><div class="hidden sm:flex sm:space-x-6 pt-8"><a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-900">Sensors</a><a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700">Clients</a><a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700">Invoices</a><a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700">Payments</a>`);
      _push(ssrRenderComponent(unref(VueCtkDateTimePicker), {
        button: "Select date range",
        id: "dt_rng_picker",
        type: "button",
        "button-color": "#eab308",
        "no-button": "false",
        label: "Select date range",
        "no-label": "true",
        modelValue: _ctx.input.date_range,
        "onUpdate:modelValue": ($event) => _ctx.input.date_range = $event,
        right: "true",
        range: "true",
        color: "#eab308",
        onlyDate: "true",
        "no-clear-button": "true",
        format: "YYYY-MM-DD",
        formatted: "L",
        "auto-close": "false"
      }, null, _parent));
      _push(`</div></div><div class="flex flex-row gap-6 m-6"><div class="basis-1/4 bg-white rounded-lg shadow m-2"><div class="m-2">`);
      _push(ssrRenderComponent(_component_BarChart, null, null, _parent));
      _push(`</div></div><div class="basis-3/4 bg-white rounded-lg shadow m-2"><div class="m-2">`);
      _push(ssrRenderComponent(_component_ComboChart, null, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_dashboard_stats, {
        api_end_point: "/_stats/dashboard-stats",
        class: "rounded-lg shadow ml-8 mr-8"
      }, null, _parent));
      _push(`</div></div></div></div></main></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
