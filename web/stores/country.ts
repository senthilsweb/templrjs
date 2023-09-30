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
    async loadCountriesIfNeeded() {
      let query = `/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/countries%22},%22only%22:[%22body%22]}`;
        const data = await useFetch(query, {
          method: 'get',
        });
        //console.log('compnay=', JSON.stringify(data.data._rawValue.data[0]));
      this.country = data.data._rawValue[0].body;
      this.upserted = true; // Corrected to this.loaded
      //console.log('country=', JSON.stringify(this.country));
  },
  },
});
