<template>
  <section v-if="isUpsertUsersVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title"
    role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
            <div class="flex-1 h-0 overflow-y-auto">
              <header class="space-y-1 py-6 px-4 bg-gray-200 sm:px-6">
                <div class="flex items-center justify-between space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-gray-700">Users</h2>
                  <div class="h-7 flex items-center">
                    <button v-on:click="closeUsersPanel()" aria-label="Close panel"
                      class="text-gray-600 hover:text-white transition ease-in-out duration-150">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <p class="text-sm leading-5 text-gray-500">Create or update user</p>
                </div>
              </header>
              <div class="flex-1 flex flex-col justify-between">
                <div class="px-4 divide-y divide-gray-200 sm:px-6">
                  <div class="space-y-6 pt-6 pb-5">
                    <form name="frmUsers" id="frmUsers" class="space-y-8 divide-y divide-gray-200"
                      @submit.prevent="SaveAndUpdate">
                      <div class="sm:overflow-hidden">
                        <div class="bg-white space-y-6">
                          <div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                            <!--<div class="sm:col-span-6">
                                                        <label for="code" class="block text-sm font-medium text-gray-700">
                                                            Code
                                                        </label>
                                                        <div class="mt-1 rounded-md shadow-sm">
                                                            <input v-model="data.code" type="text" name="code" id="code" placeholder="" value="$RT34@23" autocomplete="code" class="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                                                        </div>
                                                        <p class="mt-2 text-sm text-red-600" id="email-error">Special Characters are not allowed.</p>
                                                    </div>-->
                            <div class="sm:col-span-6">
                              <h2 class="text-xl font-medium text-blue-gray-900">Profile Information</h2>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700"> First name </label>
                              <div class="mt-1 rounded-md shadow-sm">
                                <input v-model="data.firstname" type="text" id="firstname" name="firstname"
                                  autocomplete="firstname"
                                  class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" />
                              </div>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700"> Last name </label>
                              <div class="mt-1 rounded-md shadow-sm">
                                <input v-model="data.lastname" type="text" id="lastname" name="lastname"
                                  autocomplete="lastname"
                                  class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700"> Username </label>
                              <div class="mt-1 rounded-md shadow-sm">
                                <input v-model="data.login" type="text" id="login" name="login" autocomplete="login"
                                  class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" />
                              </div>
                            </div>

                            <div class="sm:col-span-6">
                              <h2 class="text-xl font-medium text-blue-gray-900">Personal Information</h2>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700"> Email </label>
                              <div class="mt-1 rounded-md shadow-sm">
                                <input v-model="data.email" type="text" id="email" name="email" autocomplete="email"
                                  class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700"> Phone </label>
                              <div class="mt-1 rounded-md shadow-sm">
                                <input v-model="data.phone" type="text" id="phone" name="phone" autocomplete="phone"
                                  class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" />
                              </div>
                            </div>

                            <div class="sm:col-span-6">
                              <h2 class="text-xl font-medium text-blue-gray-900">Roles & Administration</h2>
                            </div>

                            <div class="sm:col-span-6">
                              <CheckBoxGroup @checked_item="handleCheckedInRole" v-model="data.role" id="user_role"
                                name="user_role" label="Roles" api="role" :checked_value="Agent" />
                            </div>

                            <div class="sm:col-span-6">
                              <Dropdownlist v-model="data.is_enabled" @selected_item="handleSelectedInStatus"
                                name="is_enabled" label="Status" :data="{
  data: [
    { code: 'true', name: 'Active' },
    { code: 'false', name: 'In-active' },
  ],
}" :selected_value="data.is_enabled" />
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist v-model="data.mark_as_delete" @selected_item="handleSelectedInMarkAsDelete"
                                name="mark_as_delete" label="Mark as delete?" :data="{
  data: [
    { code: 'true', name: 'Yes' },
    { code: 'false', name: 'No' },
  ],
}" :selected_value="data.mark_as_delete" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button type="button"
                  class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="upsertUsers" type="submit"
                  class="zyn-button">Save</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * UsersUpsert.vue
 *
 * @description :: [sails._s.capitalize(table) ] form panel to handle Add New & Edit. Panel visible and hidden managed thru event subscription.
 *                 Additional events published to handle custom functions post "Save" operation.
 *
 * @author      :: Zynobot
 * @help        ::
 *
 * Created at   :: Sun Feb 27 2022 11:48:01 GMT-0500 (Eastern Standard Time)
 * Modified at  :: Sun Feb 27 2022 11:48:01 GMT-0500 (Eastern Standard Time)
 */

export default {
  components: {

  },
  data() {
    return {
      isUpsertUsersVisible: false,
      data: {},
      api: '',
    };
  },
  methods: {
    async upsertUsers(args) {
      try {
        if (this.$_.isUndefined(this.data.id)) {
          const { data } = await this.$axios.post(this.$config.apiURL + 'Users', this.data);
        } else {
          const { data } = await this.$axios.put(this.$config.apiURL + 'Users/' + this.data.id, this.data);
        }
        this.data = {};
        this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
        useNuxtApp().$bus.$emit('evtRefreshUsersDatatable');
        this.$toast.success('Record saved successfully');
      } catch (error) {
        console.log(error);
        this.$toast.error('Oops!Save failed...');
      } finally {
      }
    },
    async deleteUsers() {
      try {
        //Make sure to set the status and delete marker
        this.data.is_enabled = false;
        //end
        const { data } = await this.$axios.delete(this.$config.apiURL + 'Users/' + this.data.id);
        $nuxt.$emit('evtRefreshUsersDatatable');
        this.$toast.success('Record has been deleted successfully');
      } catch (error) {
        this.$toast.error('Oops! delete failed...');
      } finally {
      }
    },
    async bindUsers() {
      try {
      } catch (error) {
        console.log(error);
      }
    },
    async closeUsersPanel() {
      this.data = {};
      this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
    },
    handleSelectedInStatus(data) {
      this.data.is_enabled = data;
    },
    handleSelectedInMarkAsDelete(data) {
      this.data.mark_as_delete = data;
    },
    handleCheckedInRole(data) {
      //alert(data + " -> Checked Item")
      //this.data.role = data;
    },
  },
  computed: {},
  mounted() { },
  created() {
    useNuxtApp().$bus.$on('evtUpsertUsers', (data) => {
      if (data !== undefined) {
        this.data = data;
        this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
        return this.data;
      }
      this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
    });

    //2) Delete Users record and then rebind datatable
    useNuxtApp().$bus.$on('evtDeleteUsers', (data) => {
      if (data !== undefined) {
        this.data = data;
        this.deleteUsers();
      }
    });
  },
  beforeDestroy() {
    useNuxtApp().$bus.$off('evtUpsertUsers');
    useNuxtApp().$bus.$off('evtDeleteUsers');
  },
};
</script>
