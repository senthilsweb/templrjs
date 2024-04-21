import { defineStore } from "pinia";

export const useNavigationsStore = defineStore("navigations", {
  state: () => ({
    navigations: [],
    loaded: false, // Renamed for clarity
  }),
  getters: {
    navigatioins_by_module: (state) => (code) => {
      return state.navigations.filter((object) => {
        return object.nav_module_code == code;
      });
    },
  },
  actions: {
    async loadNavigationsIfNeeded(config) {
      // Check if the navigation data is already loaded to avoid unnecessary API calls
      if (this.loaded) return;

      try {
        // Fetching child navigations
        const childResponse = await fetch(`${config.TEMPLRJS_CONFIG_ROOT_PATH}/child_nav.json`);
        const childNavigations = await childResponse.json();

        // Fetching parent navigations
        const parentResponse = await fetch(`${config.TEMPLRJS_CONFIG_ROOT_PATH}/parent_nav.json`);
        const parentNavigations = await parentResponse.json();
        
        // Assuming useUnion is a utility function to merge two arrays. Replace this logic based on how you want to merge or handle these navigations.
        this.navigations = [...childNavigations, ...parentNavigations];
        this.loaded = true; // Mark as loaded
        //console.log("Navigations loaded successfully");
      } catch (error) {
        console.error("Failed to load navigations:", error);
      }
    },
    reloadNavigations(items) {
      this.navigations = items;
      this.loaded = true;
      //console.log("Navigations reloaded");
    },
    updateNavigations(item) {
      this.navigations.push(item);
    },
  },
});
