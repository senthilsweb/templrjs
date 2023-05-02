import { defineStore } from 'pinia';

export const useCountryStore = defineStore('country', {
  state: () => ({
    country: [],
    upserted: false,
  }),
  getters: {
    loaded: (state) => {
      return state.upserted;
    },
    list_all: (state) => () => {
      let result = state.country.filter((object) => {
        return object;
      });
      return result;
    },
    country_by_code: (state) => (code) => {
      let result = state.country.filter((object) => {
        return object.code == code;
      });
      return result.length > 0 ? result[0].name : '';
    },
    country_by_name: (state) => (name) => {
      let result = state.country.filter((object) => {
        return object.name == name;
      });
      return result.length > 0 ? result[0] : undefined;
    },
  },
  actions: {
    updateCountry(item) {
      this.country.push({ item });
    },
    reloadCountry(items) {
      console.log('reloading country');
      this.country = items;
      this.upserted = true;
      console.log('reloaded country');
    },
  },
});
