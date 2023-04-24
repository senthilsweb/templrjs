<template>
  <form class="pt-4 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1">
    <div class="max-w-lg mx-auto lg:max-w-none">
      <section aria-labelledby="payment-heading" class="">
        <h2 id="payment-heading" class="text-lg font-medium text-gray-900">Payment details</h2>

        <div class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
          <div class="col-span-3 sm:col-span-4">
            <label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label>
            <div class="mt-1">
              <input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div class="col-span-3 sm:col-span-4">
            <label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label>
            <div class="mt-1">
              <input type="text" id="card-number" name="card-number" autocomplete="cc-number"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div class="col-span-2 sm:col-span-3">
            <label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
            <div class="mt-1">
              <input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
            <div class="mt-1">
              <input type="text" name="cvc" id="cvc" autocomplete="csc"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="shipping-heading" class="mt-10">
        <h2 id="shipping-heading" class="text-lg font-medium text-gray-900">Billing information</h2>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
          <div class="sm:col-span-3">
            <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
            <div class="mt-1">
              <input type="text" id="company" name="company"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <div class="mt-1">
              <input type="text" id="address" name="address" autocomplete="street-address"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label>
            <div class="mt-1">
              <input type="text" id="apartment" name="apartment"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <div class="mt-1">
              <input type="text" id="city" name="city" autocomplete="address-level2"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
            <div class="mt-1">
              <input type="text" id="region" name="region" autocomplete="address-level1"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
            <div class="mt-1">
              <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code"
                class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </section>
      <div class="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
        <button type="submit"
          class="w-full bg-green-600 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500 sm:ml-6 sm:order-last sm:w-auto">Continue</button>
        <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">You won't be charged until the next step.
        </p>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  async asyncData({ params }) { },
  created() { },
};
</script>
