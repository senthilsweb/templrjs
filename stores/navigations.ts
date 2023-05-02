import { defineStore } from 'pinia';

export const useNavigationsStore = defineStore('navigations', {
  state: () => ({
    navigations: [],
    upserted: false,
  }),
  getters: {
    loaded: (state) => {
      return state.upserted;
    },
    navigatioins_by_module: (state) => (code) => {
      return state.navigations.filter((object) => {
        return object.nav_module_code == code;
      });
    },
  },
  actions: {
    updateNavigations(item) {
      this.navigations.push({ item });
    },
    reloadNavigations(items) {
      console.log('reloading navigations');
      this.navigations = items;
      this.upserted = true;
      console.log('reloaded navigations');
    },
  },
});
