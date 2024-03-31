<template>
  <TransitionRoot :show="isTcVisible" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-50 p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-md font-medium leading-6 text-gray-900">Zytes, Modern ERP software with programmable bots for small and medium businesses</DialogTitle>
              <DialogDescription>
                This will permanently deactivate your account
              </DialogDescription>
              <p>
                Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
              </p>
              <div class="mt-4">
                <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2" @click="closeModal">Got it, thanks!</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

const isTcVisible = ref(false);

useNuxtApp().$bus.$on('evtZynomiTermsAndConditions', (data) => {

  isTcVisible.value = true;
 
});

function closeModal() {
  isTcVisible.value = false;
}
function openModal() {
  isTcVisible.value = true;
}
</script>
