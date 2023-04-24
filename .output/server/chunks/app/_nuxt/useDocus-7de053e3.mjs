import { computed } from 'vue';
import { e as useAppConfig, g as useContent, h as useRoute, i as useContentHelpers } from '../server.mjs';

const useDocus = () => {
  const docus = computed(() => {
    var _a;
    return ((_a = useAppConfig()) == null ? void 0 : _a.docus) || {};
  });
  const { navPageFromPath, navDirFromPath, navKeyFromPath } = useContentHelpers();
  const { navigation, page } = useContent();
  const route = useRoute();
  const config = computed(
    () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const titleTemplate = ((_a = docus == null ? void 0 : docus.value) == null ? void 0 : _a.titleTemplate) || navKeyFromPath((_b = page == null ? void 0 : page.value) == null ? void 0 : _b._path, "titleTemplate", navigation.value || []) || `%s \xB7 ${((_c = docus == null ? void 0 : docus.value) == null ? void 0 : _c.title) || "Docus"}`;
      const main = ((_d = docus == null ? void 0 : docus.value) == null ? void 0 : _d.main) || {};
      const header = ((_e = docus == null ? void 0 : docus.value) == null ? void 0 : _e.header) || {};
      const aside = ((_f = docus == null ? void 0 : docus.value) == null ? void 0 : _f.aside) || {};
      const footer = ((_g = docus == null ? void 0 : docus.value) == null ? void 0 : _g.footer) || {};
      return {
        // Raw appConfig
        ...docus.value,
        // Merged attributes
        titleTemplate,
        main: {
          ...main,
          ...navKeyFromPath(route.path, "main", navigation.value || []),
          ...(_h = page.value) == null ? void 0 : _h.main
        },
        header: {
          ...header,
          ...navKeyFromPath(route.path, "header", navigation.value || []),
          ...(_i = page.value) == null ? void 0 : _i.header
        },
        aside: {
          ...aside,
          ...navKeyFromPath(route.path, "aside", navigation.value || []),
          ...(_j = page.value) == null ? void 0 : _j.aside
        },
        footer: {
          ...footer,
          ...navKeyFromPath(route.path, "footer", navigation.value || []),
          ...(_k = page.value) == null ? void 0 : _k.footer
        }
      };
    }
  );
  const tree = computed(() => {
    var _a, _b, _c, _d, _e;
    let nav = navigation.value || [];
    const _path = route.path;
    const level = ((_b = (_a = config == null ? void 0 : config.value) == null ? void 0 : _a.aside) == null ? void 0 : _b.level) || 0;
    const filtered = ((_d = (_c = config == null ? void 0 : config.value) == null ? void 0 : _c.aside) == null ? void 0 : _d.exclude) || [];
    if (level) {
      const path = _path.split("/");
      const leveledPath = path.splice(0, 1 + level).join("/");
      nav = navDirFromPath(leveledPath, nav) || [];
      if (!Array.isArray(nav)) {
        nav = [nav];
      }
    }
    if (nav.length === 0) {
      nav = navPageFromPath(((_e = page.value) == null ? void 0 : _e._path) || "/", navigation.value || []);
      if (!nav) {
        return [];
      }
      if (!Array.isArray(nav)) {
        nav = [nav];
      }
    }
    return nav.filter((item) => {
      if (filtered.includes(item._path)) {
        return false;
      }
      return true;
    });
  });
  return { tree, config };
};

export { useDocus as u };
