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
const api = '/api/nav/'; /*To-be customized for each entity */
const grid = useState('grid');
const result_data = useState('result_data');
const progress = ref(false);
const search_query_string = ref('');
useNuxtApp().$bus.$on('evtSearchNavigation', (data) => {
  //alert(JSON.stringify(data));
  searchNavigations(data);
});

const gridRef = ref();

const { data: Navigations } = await useAsyncData('Navigations-list-' + Math.random, () =>
  $fetch('/api/nav', {
    initialCache: false,
    method: 'get',
  })
);

async function searchNavigations(args) {
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
    let response = await useAsyncData('Navigations-list-' + Math.random, () =>
      $fetch(`/api/nav?${search_query_string.value}`, {
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
      { id: 'id', name: 'Id.', hidden: true },
      { id: 'nav_module_code', name: 'Module', width: '100px' },
      { id: 'name', name: 'Title', width: '100px' },
      {
        name: 'Parent Code',
        width: '75px',
        data: (row) => { return h('span', { className: 'truncate', }, useTruncate(row.parent_code, { length: 50, })); }
      },
      {
        name: 'Child Code',
        width: '75px',
       data: (row) => { return h('span', { className: 'truncate', }, useTruncate(row.code, { length: 50, })); }
      },
      {
        name: 'Link',
        width: '75px',
        data: (row) => { return h('span', { className: 'truncate', }, useTruncate(row.href, { length: 50, })); }
      },
      /*{
        name: 'Parent',
        data: (row) => {
          let bgcolor = row.parent_code == undefined ? 'text-green-700 bg-green-50' : '';
          return h(
            'span',
            {
              className: `inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium  ${bgcolor}`,
            },
            row.parent_code == undefined ? 'Yes' : ''
          );
        },
        sort: false,
        width: '10px',
      },*/
      {
        name: 'Action Button',
        data: (row) => {
          let bgcolor = row.is_action_button ? 'text-green-700 bg-green-50' : '';
          return h(
            'span',
            {
              className: `inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium  ${bgcolor}`,
            },
            row.is_action_button ? 'Yes' : ''
          );
        },
        sort: false,
        width: '25px',
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
              onClick: () => useNuxtApp().$bus.$emit('evtDeleteNavigation', row),
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
              onClick: () => useNuxtApp().$bus.$emit('evtUpsertNavigation', row),
            },
            'Edit'
          );
        },
        sort: false,
        width: '10px',
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
    data: Navigations.value,
  });
  grid.value.render(gridRef.value);
});
</script>
