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
const api = '/api/inquiries/'; /*To-be customized for each entity */
const grid = useState('grid');
const progress = ref(false);
const search_query_string = ref('');
useNuxtApp().$bus.$on('evtSearchInquiries', (data) => {
  searchInquiriess(data);
});

const gridRef = ref();

const { data: Inquiriess } = await useAsyncData('Inquiriess-list-' + Math.random, () =>
  $fetch('/api/inquiries', {
    initialCache: false,
    method: 'get',
  })
);

async function searchInquiriess(args) {
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
    let response = await useAsyncData('Inquiriess-list-' + Math.random, () =>
      $fetch(`/api/inquiries?${search_query_string.value}`, {
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
      { id: 'id', name: 'Id.', width: '25px' },
      { id: 'name', name: 'Name', width: '100px' },
      { id: 'created_at', data: (row) => useNuxtApp().$dayjs(row.created_at).format('DD-MMM-YYYY'), name: 'Date of inquiry', width: '25px' },
      { id: 'inquiry_reason', name: 'Reason', width: '100px' },
      { id: 'description', name: 'Description', width: '100px' }
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
    data: Inquiriess.value,
  });
  grid.value.render(gridRef.value);
});
</script>
