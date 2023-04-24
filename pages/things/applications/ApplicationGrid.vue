<!--
  author: Senthilnathan Karuppaiah
  created_at: 13-Feb-2023
  modified_at: 13-Feb-2023
  description: This is the grid component for the [applications] entity
-->
<template>
  <div class="px-4 sm:px-4 lg:px-4">
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
const api = '/api/things/applications'; /*To-be customized for each entity */
const grid = useState('grid');
const progress = ref(false);
const search_query_string = ref('');
useNuxtApp().$bus.$on('evtSearchApplications', (data) => {
  searchApplications(data);
});

const gridRef = ref();

const { data: Applications } = await useAsyncData('Applications-list-' + Math.random, () =>
  $fetch(api, {
    initialCache: false,
    method: 'get',
  })
);

async function searchApplications(args) {
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
  console.log(`query = [${api}?${search_query_string.value}]`)
  try {
    let response = await useAsyncData('Applications-list-' + Math.random, () =>
      $fetch(`${api}?${search_query_string.value}`, {
        initialCache: false,
        method: 'get',
      })
    );
    useState('grid').value.updateConfig({ data: response.data._rawValue }).forceRender();
    progress.value = false;
  } catch (err) {
    progress.value = false;
    useNuxtApp().$toast.show({ type: 'danger', message: err.message, timeout: 6 });
  }
}

onMounted(() => {
  grid.value = new Grid({
    columns: [
      { id: 'id', name: 'Id.', width: '50px',hidden:true },
      { id: 'code', name: 'Code', width: '150px' },
      {
        name: 'Name',
        data: (row) => {
          return h(
            'span',
            {
              className: 'truncate',
            },
            useTruncate(row.name, {
              length: 50,
            })
          );
        },
      },
      {
        name: 'Status',
        data: (row) => {
          let bgcolor = row.is_active ? 'text-blue-700 bg-blue-50' : 'text-gray-800 bg-gray-50';
          return h(
            'span',
            {
              className: `inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium  ${bgcolor}`,
            },
            row.is_active ? 'Active' : 'Disabled'
          );
        },
        sort: false,
        width: '25px',
      },
      {
        id: 'btnDelete',
        name: '',
        formatter: (cell, row) => {
          return h(
            'button',
            {
              className: 'inline-flex items-center rounded-full border border-transparent bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              onClick: () => useNuxtApp().$bus.$emit('evtDeleteApplications', row),
            },
            'Delete'
          );
        },
        sort: false,
        width: '10px',
      },
      {
        id: 'btnEdit',
        name: '',
        formatter: (cell, row) => {
          return h(
            'button',
            {
              className: 'inline-flex items-center rounded-full border border-transparent bg-lime-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              onClick: () => useNuxtApp().$bus.$emit('evtUpsertApplications', row),
            },
            'Edit'
          );
        },
        sort: false,
        width: '50px',
      },
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
    data: Applications.value,
  });
  grid.value.render(gridRef.value);
});
</script>
