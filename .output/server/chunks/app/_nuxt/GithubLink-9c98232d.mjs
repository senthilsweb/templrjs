import { l as useRuntimeConfig } from '../server.mjs';
import { defineComponent, computed, useSlots } from 'vue';
import { joinURL } from 'ufo';
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
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'defu';
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
import '@supabase/supabase-js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'mitt';
import 'vue-i18n';
import 'underscore.string';
import 'vue/server-renderer';
import 'lodash-es';

const GithubLink = /* @__PURE__ */ defineComponent({
  props: {
    owner: {
      type: String,
      default: () => {
        var _a, _b;
        return (_b = (_a = useRuntimeConfig()) == null ? void 0 : _a.github) == null ? void 0 : _b.owner;
      },
      required: false
    },
    repo: {
      type: String,
      default: () => {
        var _a, _b;
        return (_b = (_a = useRuntimeConfig()) == null ? void 0 : _a.github) == null ? void 0 : _b.repo;
      },
      required: false
    },
    branch: {
      type: String,
      default: () => {
        var _a, _b;
        return (_b = (_a = useRuntimeConfig()) == null ? void 0 : _a.github) == null ? void 0 : _b.branch;
      },
      required: false
    },
    dir: {
      type: String,
      default: () => {
        var _a, _b;
        return (_b = (_a = useRuntimeConfig()) == null ? void 0 : _a.github) == null ? void 0 : _b.dir;
      },
      required: false
    },
    source: {
      type: String,
      required: false,
      default: void 0
    },
    page: {
      type: Object,
      required: false,
      default: void 0
    },
    contentDir: {
      type: String,
      required: false,
      default: "content"
    },
    edit: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props) {
    if (!props.owner || !props.repo || !props.branch) {
      throw new Error("If you want to use `GithubLink` component, you must specify: `owner`, `repo` and `branch`.");
    }
    const source = computed(() => {
      var _a, _b;
      let { repo, owner, branch, contentDir } = props;
      let prefix = "";
      if ((_b = (_a = useRuntimeConfig()) == null ? void 0 : _a.public) == null ? void 0 : _b.content) {
        let source2;
        const { sources } = useRuntimeConfig().public.content;
        for (const key in sources || []) {
          if (props.page._id.startsWith(key)) {
            source2 = sources[key];
            break;
          }
        }
        if ((source2 == null ? void 0 : source2.driver) === "github") {
          repo = source2.repo || props.repo || "";
          owner = source2.owner || props.owner || "";
          branch = source2.branch || props.branch || "main";
          contentDir = source2.dir || props.contentDir || "";
          prefix = source2.prefix || "";
        }
      }
      return { repo, owner, branch, contentDir, prefix };
    });
    const base = computed(() => joinURL("https://github.com", `${source.value.owner}/${source.value.repo}`));
    const path = computed(() => {
      var _a;
      const dirParts = [];
      if ((_a = props == null ? void 0 : props.page) == null ? void 0 : _a._path) {
        if (source.value.contentDir) {
          dirParts.push(source.value.contentDir);
        }
        dirParts.push(props.page._file.substring(source.value.prefix.length));
        return dirParts;
      }
      if (props.dir) {
        dirParts.push(props.dir);
      }
      if (props.source) {
        dirParts.push(props.source);
      }
      return dirParts;
    });
    const url = computed(() => {
      const parts = [base.value];
      if (props.edit) {
        parts.push("edit");
      } else {
        parts.push("tree");
      }
      parts.push(source.value.branch, ...path.value);
      return parts.filter(Boolean).join("/");
    });
    return {
      url
    };
  },
  render(ctx) {
    var _a;
    const { url } = ctx;
    const slots = useSlots();
    return (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots, { url });
  }
});

export { GithubLink as default };
