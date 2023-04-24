import { defineStore } from 'pinia';

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
  }),
  getters: {
    parent_properties: (state) => {
      return state.properties.filter((object) => {
        return object.parent_code == undefined;
      });
    },
    child_properties: (state) => {
      return state.properties.filter((object) => {
        return object.parent_code != undefined;
      });
    },
    logo_url: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == 'logo-url';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    logo_url_dark: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == 'logo-url-dark';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    logo_css: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == 'logo-css';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    app_page_head_title: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == 'app-page-head-title';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    //
    app_copyright: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == 'copy-right';
      });
      return result.length > 0 ? result[0].name : '© 2022 company_name. All rights reserved.';
    },
    layout_width: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == 'layout-width';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    megamenu_bg_color: (state) => {
      let result = state.properties.filter((object) => {
        return object.parent_code == 'mega-menu' && object.code == 'bg-color';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    megamenu_text_style: (state) => {
      let result = state.properties.filter((object) => {
        return object.parent_code == 'mega-menu' && object.code == 'text-style';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    megamenu_popover_style: (state) => {
      let result = state.properties.filter((object) => {
        return object.parent_code == 'mega-menu' && object.code == 'popover-style';
      });
      return result.length > 0 ? result[0].name : undefined;
    },
    //
    properties_by_code: (state) => (code) => {
      let result = state.properties.filter((object) => {
        return object.code == code;
      });
      return result.length > 0 ? result[0] : undefined;
    },
    properties_by_parent_code: (state) => (code) => {
      return state.properties.filter((object) => {
        return object.parent_code == code;
      });
    },
  },
  actions: {
    updateProperties(item) {
      this.properties.push({ item });
    },
    reloadProperties(items) {
      this.properties = items;
    },
  },
});
