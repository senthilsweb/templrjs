<template>
  <div class="px-4 sm:px-4 lg:px-4">
    <div class="sm:flex sm:items-center">
      <!--Datatable action buttons (start)-->

      <!--right action buttons (start)-->

      <!--right action buttons (end)-->
      <!--Datatable action buttons (End)-->
    </div>
    <div class="mt-2 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div ref="gridRef"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Grid, h, html } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
const api = '/api/supabase/registration/'; /*To-be customized for each entity */
const grid = useState('grid');
const progress = ref(false);
const data = ref([]);
const search_query_string = ref('');
useNuxtApp().$bus.$on('evtSearchRegistration', (data) => {
  searchRegistrations(data);
});

const gridRef = ref();

const { data: Registrations } = await useAsyncData('Registrations-list-' + Math.random, () =>
  $fetch('/api/supabase/registration', {
    initialCache: false,
    method: 'get',
  })
);
//console.log(JSON.stringify(Registrations.value));
data.value = Registrations.value;

//----------------------------------------------------------------------------------------------------------------------------
async function searchRegistrations(args) {
  progress.value = true;
  //(start) Building query to match with supabase (or PostgREST) style queries
  if (args) {
    const query = [];
    useForEach(args, function (value, key) {
      if (useToString(value) != '') query.push(key + '=eq.' + value);
    });
    search_query_string.value = useJoin(query, '&'); //useJoin is lodash method i.e. '_.' replaced with 'use'
  }

  //(end) Building query to match with supabase (or PostgREST) style queries
  try {
    let response = await useAsyncData('Registrations-list-' + Math.random, () =>
      $fetch(`/api/supabase/registration`, {
        initialCache: false,
        method: 'get',
      })
    );
    data.value.length=0;//clear array before fill with new data
    data.value = response.value;

    useState('grid').value.updateConfig({ data: data.value }).forceRender();
    progress.value = false;
  } catch (err) {
    progress.value = false;
    useNuxtApp().$toast.show({ type: 'danger', message: err.message, timeout: 6 });
  }
}

//----------------------------------------------------------------------------------------------------------------------------

onMounted(() => {
  useState('grid').value = new Grid({
    columns: [
      { id: 'id', name: 'Id.', width: '75px', hidden: true },
      { id: 'name', data: (row) => row.salutation_in_tamil + '.' + row.full_name_english, name: 'Name', width: '200px' },
      { id: 'email', name: 'Email', width: '100px' },
      { id: 'cell_phone_number', name: 'Mobile', width: '100px' },
      { id: 'whatsapp_number', name: 'WhatsApp', width: '100px' },
      //{ id: 'created_at', data: (row) => useNuxtApp().$dayjs(row.created_at).format('DD-MMM-YYYY'), name: 'Reg. Date', width: '25px' },
      {
        id: 'btnDelete',
        name: '',
        formatter: (cell, row) => {
          return h(
            'button',
            {
              className: 'inline-flex items-center rounded-full border border-transparent bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              onClick: () => useNuxtApp().$bus.$emit('evtDeleteRegistration', row),
            },
            'Delete'
          );
        },
        sort: false,
        width: '10px',
      },
      /*{
        id: 'btnView',
        name: '',
        data: (row) => {
          return h(
            'button',
            {
              className: 'inline-flex items-center rounded-full border border-transparent bg-lime-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              onClick: () => useNuxtApp().$bus.$emit('evtUpsertRegistration', row),
            },
            'View'
          );
        },
        sort: false,
        width: '10px',
      },*/
    ],
    sort: true, //<Icon :name="menu.icon" class="h-6 w-6 flex-shrink-0 text-lime-800" />
    pagination: {
      enabled: true,
      limit: 10,
      summary: true,
    },
    className: {
      td: 'whitespace-nowrap px-2 py-2 text-sm text-gray-500',
      table: 'min-w-full divide-y divide-gray-300',
      thead: 'bg-gray-50',
      th: 'whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900',
    },
    search: true,
    fixedHeader: true,
    data: data.value,
  });
  useState('grid').value.render(gridRef.value);
});
</script>
