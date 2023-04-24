import { defineStore } from 'pinia';

export const useConfigurationsStore = defineStore('configurations', {
  state: () => ({
    configurations: [],
  }),
  getters: {
    app_metadata: (state) => {
      return state.configurations.filter((object) => {
        return object.property_type == 'app-metadata';
      });
    },
    app_title: (state) => {
      let res = state.configurations.filter((object) => {
        return object.property_type == 'app-title';
      });
      //console.log("length=", res.length);
      //return "Title";
      return res.length > 0 ? res[0].name : 'Title';
    },
    app_copyright: (state) => {
      let res = state.configurations.filter((object) => {
        return object.property_type == 'app-copyright';
      });
      return res.length > 0 ? res[0].name : '© 2022 [company name]. All rights reserved.';
    },
    app_hero: (state) => {
      let res = state.configurations.filter((object) => {
        return object.property_type == 'app-hero';
      });
      return res;
    },
  },
  actions: {
    updateConfigurations(item) {
      this.configurations.push({ item });
    },
    reloadConfigurations(items) {
      this.configurations = items;
    },
  },
});
