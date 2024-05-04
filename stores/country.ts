import { defineStore } from 'pinia';

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    loaded: false,
  }),
  getters: {
    list_all: (state) => () => {
      return state.countries; // assuming you mean to return all countries here
    },
    country_by_code: (state) => (code) => {
      const result = state.countries.filter((object) => object.code === code);
      return result.length > 0 ? result[0].name : '';
    },
    country_by_name: (state) => (name) => {
      const result = state.countries.filter((object) => object.name === name);
      return result.length > 0 ? result[0] : undefined;
    },
  },
  actions: {
    updateCountry(item) {
      this.countries.push(item);
    },
    reloadCountry(items) {
      console.log('Reloading country...');
      this.countries = items;
      this.loaded = true; // Directly update loaded state
      console.log('Countries loaded');
    },
    async loadCountriesIfNeeded(config) {
      if (this.loaded) return;

      try {
        const response = await fetch(`${config.TEMPLRJS_CONFIG_ROOT_PATH}/countries.json`, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to load countries');
        }
        const items = await response.json();
        this.reloadCountry(items);
      } catch (error) {
        console.error('Error loading countries:', error);
      }
    },
  },
});
