import { defineStore } from 'pinia';

export const useNavigationsStore = defineStore('navigations', {
  state: () => ({
    navigations: [],
  }),
  getters: {
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
      this.navigations = items;
    },
  },
});
