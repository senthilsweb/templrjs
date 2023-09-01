<template>
  <NuxtLayout name="landing">
    <div class="bg-white">
      <div class="flex">
        <client-only placeholder="Codemirror Loading...">
          <codemirror :value="code" @ready="handleReady" @change="handleCodeChange" @focus="handleCodeFocus" @blur="handleCodeBlur" placeholder="Select * from users limit 25" :style="{ height: '200px', width: '100%' }" :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" />
        </client-only>
      </div>
      <footer class="border-t flex justify-end px-5 py-4">
        <button @click="clear" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Clear</button>
        &nbsp;
        <button @click="execute" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Execute</button>
      </footer>
    </div>

    <!-- Dynamic Data Table -->
    <div class="gap-y-3" v-if="isDataTableVisible">
      <div class="bg-gray-900 rounded-lg">
        <div class="mx-auto max-w-7xl p-8">
          <div class="bg-gray-900">
            <div class="flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th v-for="column in tableColumns" :key="column.field" class="whitespace-nowrap py-3.5 px-4 text-left text-sm font-semibold text-white sm:pl-0">{{ column.label }}</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-800">
                      <tr v-for="item in currentPageData" :key="item.id">
                        <td v-for="column in tableColumns" :key="column.field" class="whitespace-nowrap text-left text-sm text-gray-300">{{ item[column.field] }}</td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <!--<a href="#" class="text-indigo-400 hover:text-indigo-300"
                            >Edit<span class="sr-only">, {{ item.name }}</span></a
                          >-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="mt-4 hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ $s.numberFormat((currentPage - 1) * itemsPerPage + 1, 0, '.', ',') }}</span>
            to
            <span class="font-medium">{{ $s.numberFormat(Math.min(currentPage * itemsPerPage, tableData.total_rows), 0, '.', ',') }}</span>
            of
            <span class="font-medium">{{ $s.numberFormat(tableData.total_rows, 0, '.', ',') }}</span>
          </p>
        </div>

        <div>
          <!-- Pagination Links -->
          <nav class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination" id="nav_pagination">
            <a href="#" @click.prevent="goToPage(currentPage - 1)" id="prev_page" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </a>

            <!-- ... Loop through paginationLinks ... -->
            <template v-for="pageLink in paginationLinks">
              <a v-if="pageLink <= totalPages" :key="pageLink" href="#" :class="pageLinkClasses(pageLink)" :id="`pg_${pageLink}`" @click.prevent="goToPage(pageLink)">
                {{ pageLink }}
              </a>
            </template>

            <a v-if="currentPage < totalPages" href="#" @click.prevent="goToPage(currentPage + 1)" id="next_page" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
      <div>&nbsp;</div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';
import _ from 'lodash';
const extensions = [javascript(), oneDark];
// Codemirror EditorView instance ref
const view = shallowRef();
const isExecuting = ref(false); // Reactive variable to track execution state
const isDataTableVisible = ref(false); // Default to false

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state;
  const ranges = state.selection.ranges;
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
  const cursor = ranges[0].anchor;
  const length = state.doc.length;
  const lines = state.doc.lines;
  // more state info ...
  // return ...
};

const handleReady = (payload) => {
  view.value = payload.view;
};

const handleCodeChange = (newValue) => {
  // Handle code change event here
  // For example, you might want to update the 'code' data property
  code.value = newValue;
};

const handleCodeFocus = (event) => {
  // Handle code focus event here
};

const handleCodeBlur = (event) => {
  // Handle code blur event here
};

const clear = () => {
  // Clear the code in the codemirror editor
  if (view.value) {
    view.value.dispatch({ changes: { from: 0, to: view.value.state.doc.length, insert: '' } });
  }
};

const execute = () => {
  // Execute the code from the codemirror editor
  const codeToExecute = view.value ? view.value.state.doc.toString() : '';

  // Update the 'code' ref with the code to execute
  code.value = codeToExecute;

  // Call fetchDataForPage(1) to trigger data fetching based on the code
  fetchDataForPage(1);
};

const isCodeEmpty = computed(() => {
  return !view.value || view.value.state.doc.length === 0;
});

// Initialize your 'code' data property here
const code = ref(''); // Initialize with your default code

//--------------------------------------------------------------------------Data Table

// Initialize current page data with the first page

const currentPageData = ref([]);

let currentPage = 1; // Initialize currentPage to 1
const totalPages = ref(0);
const tableData = ref({});
const tableColumns = ref([]);
const paginationLinks = ref([]);

const fetchDataForPage = async (page) => {
  // Make sure the code is not empty before fetching data
  if (!isCodeEmpty.value) {
    // Construct the dynamic API endpoint based on the code entered
    //const dynamicEndpoint = `http://localhost:8080/${code.value}?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`;

    try {
      isDataTableVisible.value = true;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { query: code.value },
      };

      //const response = await $fetch(dynamicEndpoint);

      const response = await $fetch('http://localhost:8080/execute-query', requestOptions);
      //const responseData = await response.json();

      if (response && response.data && Array.isArray(response.data)) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        currentPageData.value = response.data.slice(startIndex, endIndex);
        tableData.value = response;
        console.log('tableData=', tableData.value);
        currentPage = page; // Update currentPage when a page is clicked
        const totalRows = response.total_rows;
        totalPages.value = Math.ceil(totalRows / itemsPerPage); // Corrected calculation

        // Build dynamic column definitions from JSON response attributes
        tableColumns.value = Object.keys(response.data[0]).map((attribute) => {
          return {
            label: _.startCase(attribute),
            field: attribute,
          };
        });

        // Calculate pagination links
        paginationLinks.value = Array.from({ length: totalPages.value }, (_, index) => index + 1);

        console.log('paginationLinks=', JSON.stringify(paginationLinks.value));

        updatePaginationLinks(currentPage, totalRows); // Pass totalRows instead of response.data.total_rows
      } else {
        console.error('Invalid response format or data.');
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const itemsPerPage = 25; // Set the number of items per page
const maxPaginationLinks = 10; // Set the maximum number of pagination links

const updatePaginationLinks = (currentPage, totalRows) => {
  console.log('updatePaginationLinks - currentPage:', currentPage);
  console.log('updatePaginationLinks - totalRows:', totalRows);

  const totalPageCount = Math.ceil(totalRows / itemsPerPage);
  console.log('updatePaginationLinks - totalPageCount:', totalPageCount);

  // Calculate middlePage and adjust it if it exceeds totalPageCount
  const pageLinksToShow = Math.min(totalPageCount, maxPaginationLinks);
  const middlePage = Math.floor(pageLinksToShow / 2);
  console.log('updatePaginationLinks - middlePage:', middlePage);

  // Calculate startPage and endPage considering middlePage and totalPageCount
  let startPage = Math.max(1, currentPage - middlePage);
  let endPage = Math.min(totalPageCount, currentPage + middlePage);

  // Adjust startPage and endPage to ensure they stay within bounds
  if (endPage - startPage + 1 > pageLinksToShow) {
    if (currentPage <= middlePage) {
      endPage = startPage + pageLinksToShow - 1;
    } else if (totalPageCount - currentPage < middlePage) {
      startPage = totalPageCount - pageLinksToShow + 1;
    } else {
      startPage = currentPage - Math.floor(pageLinksToShow / 2);
      endPage = startPage + pageLinksToShow - 1;
    }
  }

  paginationLinks.value = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  console.log('updatePaginationLinks - paginationLinks:', paginationLinks.value);
};

// Function to determine pagination link classes
const pageLinkClasses = (pageLink) => {
  const baseClasses = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0';
  if (pageLink === currentPage) {
    return `${baseClasses} bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`;
  } else {
    return `${baseClasses} text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`;
  }
};

const goToPage = async (page) => {
  if (page < 1 || page > paginationLinks.length) {
    return; // Don't go out of bounds
  }
  fetchDataForPage(page);
};

onMounted(() => {
  //fetchData();
  //setupPaginationLinks(0); // Initial value, can be updated based on your data
  //code.value = 'SELECT * FROM USERS;';
});
</script>
