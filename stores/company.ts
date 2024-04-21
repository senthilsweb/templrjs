import { defineStore } from 'pinia';

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: {},
    loaded: false, // Rename to 'loaded' for clarity
  }),
  getters: {
    organization: (state) => {
      if (state.company.id) {
        return {
          id: state.company.id,
          code: state.company.code,
          company_name: state.company.company_name,
          company_website: state.company.company_website,
          company_email: state.company.company_email,
          phone_number: state.company.phone_number,
          tin_ein_number: state.company.tin_ein_number,
          date_of_incorporation: state.company.date_of_incorporation,
          country_of_incorporation: useCountryStore().country_by_code(state.company.country_of_incorporation),
          address: state.company.address,
        };
      } else {
        return undefined;
      }
    },
    basic_details: (state) => {
      if (state.company.id) {
        return {
          company_name: state.company.company_name,
          tin_ein_number: state.company.tin_ein_number,
          date_of_incorporation: useNuxtApp().$dayjs(state.company.date_of_incorporation).format('DD-MMM-YYYY'),
          country_of_incorporation: useCountryStore().country_by_code(state.company.country_of_incorporation),
        };
      } else {
        return undefined;
      }
    },
    primary_address: (state) => {
      if (state.company.id) {
        return state.company.address;
      } else {
        return undefined;
      }
    },
    primary_address_formatted: (state) => {
      if (state.company.id) {
        var address = state.company.address.appartment != undefined ? state.company.address.appartment + ' ' + state.company.address.street : state.company.address.street + ', ';
        address += state.company.address.city + '-' + state.company.address.postal_code + ', ';
        address += state.company.address.state + ', ' + state.company.address.country_name;
        return {
          address: address,
          company_email: state.company.company_email,
          phone_number: state.company.phone_number,
          company_website: state.company.company_website,
        };
      } else {
        return undefined;
      }
    },
    corporate_headquarters: (state) => {
      if (state.company.id) {
        return state.company.address;
      } else {
        return undefined;
      }
    },
    incorporation: (state) => {
      if (state.company.id) {
        return {
          tin_ein_number: state.company.tin_ein_number,
          date_of_incorporation: useNuxtApp().$dayjs(state.company.date_of_incorporation).format('DD-MMM-YYYY'),
          year_of_incorporation: useNuxtApp().$dayjs(state.company.date_of_incorporation).format('DD-MMM-YYYY'),
          country_of_incorporation: state.company.country_of_incorporation,
        };
      } else {
        return undefined;
      }
    },
    logo_url: (state) => {
      return state.company.logo_url;
    },
  },
  actions: {
    updateCompany(item) {
      // Assuming company is an object, not an array. So, assign instead of push.
      this.company = item;
    },
    reloadCompany(item) {
      console.log('reloading company');
      this.company = item;
      this.loaded = true; // Use 'loaded' to indicate data is loaded
      console.log('reloaded company');
    },
    updateLogoUrl(url) {
      this.company.logo_url = url;
    },
    async loadCompanyIfNeeded(config) {
      if (this.loaded) return; // Prevent reloading if already loaded
      try {
        const response = await fetch(`${config.TEMPLRJS_CONFIG_ROOT_PATH}/company.json`, {
          method: 'GET',
        });
        //console.log("response" + response)
        if (!response.ok) {
          throw new Error('Failed to load company data');
        }
        const item = await response.json();

        this.reloadCompany(item[0]); // Assuming the JSON directly represents the company object
      } catch (error) {
        console.error('Error loading company data:', error);
      }
    },
  },
});
