import { defineStore } from 'pinia';

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
    loaded: false, // Rename to 'loaded' for clarity
  }),
  getters: {
    all_properties: (state) => {
      return state.properties;
    },
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
      this.properties.push(item); // Corrected the push operation
    },
    reloadProperties(items) {
      console.log("reloading properties");
      this.properties = items;
      this.loaded = true; // Use 'loaded' to indicate data is loaded
      console.log("reloaded properties");
    },
    async loadPropertiesIfNeeded(config) {
      if (this.loaded) return; // Prevent reloading if already loaded
      
      try {
        // Replace the fetch URL with the correct path to your JSON file
        const response = await fetch(`${config.TEMPLRJS_CONFIG_ROOT_PATH}/properties.json`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to load properties");
        }
        const items = await response.json();
        this.reloadProperties(items);
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    },
  },
});