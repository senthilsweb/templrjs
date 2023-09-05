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
    async loadNavigationsIfNeeded() {
      console.log('useRuntimeConfig().API_BASE_URL=', useRuntimeConfig().public.API_BASE_URL);
      
      let query_child = "/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/child_nav%22},%22only%22:[%22body%22]}"
      const child = await useFetch(query_child, {
        method: 'get',
      });

      let query_parent = "/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/parent_nav%22},%22only%22:[%22body%22]}"
      const parent = await useFetch(query_parent, {
        method: 'get',
      });
      this.navigations = useUnion(child.data._rawValue[0].body, parent.data._rawValue[0].body);
      this.upserted = true; // Corrected to this.loaded
       //console.log('this.navigations=', JSON.stringify(this.navigations));
  },
  },
  
});
