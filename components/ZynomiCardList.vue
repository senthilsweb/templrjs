<template>
  <div class="bg-white">
    <div class="mt-6 grid max-w-2xl grid-cols-2 p-2 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 sm:gap-x-6 lg:gap-y-20">
      <div v-for="product in products" :key="product.id">
        <div class="h-72 w-full overflow-hidden lg:h-72 xl:h-80 rounded-md">
          <div class="w-full flex md:flex-col bg-gradient-to-br rounded-md" :class="[product.backgroundCssClass]">
            <div class="sm:max-w-sm sm:flex-none text-white md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
              <h2 class="text-xl lg:line-clamp-1 font-semibold mb-2 text-shadow">{{ product.title }}</h2>
              <p class="font-medium lg:line-clamp-3 text-rose-100 text-shadow mb-4 h-full">{{ $s(product.description).prune(100)._wrapped }}</p>
              <a :class="[product.buttonCssClass]" class="mt-auto bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex" href="/docs/website-settings">{{ product.buttonText }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: 'Case study',
    title: 'Case study',
    buttonText: 'Learn More',
    description: 'Explore transformative web app development with modular architecture in TemplrJS.',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    backgroundCssClass: 'from-pink-500 to-rose-500',
    buttonCssClass: 'bg-rose-900',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    title: 'Books',
    buttonText: 'Explore Titles',
    description: 'Immerse yourself in a world of knowledge with our curated collection of informative and inspiring books.',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    backgroundCssClass: 'from-purple-500 to-indigo-500',
    buttonCssClass: 'bg-indigo-800',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    title: 'Blog',
    buttonText: 'Read Now',
    description: 'Dive into insightful articles that illuminate industry trends, best practices, and cutting-edge technologies.',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    backgroundCssClass: 'from-green-400 to-cyan-500',
    buttonCssClass: 'bg-green-900',
  },
  {
    id: 4,
    name: 'Focus Paper Refill',
    title: 'Careers',
    buttonText: 'Join Us',
    description: 'Unlock growth opportunities and join our dynamic team dedicated to innovation and excellence.',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    backgroundCssClass: 'from-yellow-400 to-orange-500',
    buttonCssClass: 'bg-orange-600',
  },
];
</script>
