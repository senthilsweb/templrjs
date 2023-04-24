import { defineStore } from 'pinia';

export const useGateway_frequencyStore = defineStore('gateway_frequency', {
  state: () => ({
    gateway_frequency: [],
  }),
  getters: {
    gateway_frequency_by_code: (state) => (code) => {
      let result = state.gateway_frequency.filter((object) => {
        return object.code == code;
      });
      return result.length > 0 ? result[0] : undefined;
    },
    gateway_frequency_by_name: (state) => (name) => {
      let result = state.gateway_frequency.filter((object) => {
        return object.name == name;
      });
      return result.length > 0 ? result[0] : undefined;
    },
  },
  actions: {
    updateGateway_frequency(item) {
      this.gateway_frequency.push({ item });
    },
    reloadGateway_frequency(items) {
      this.gateway_frequency = items;
    },
  },
});
