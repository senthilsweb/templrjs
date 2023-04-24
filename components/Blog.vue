<template>
    <div>
        <div class="bg-white pt-10 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-8">
            <div class="relative max-w-lg mx-auto lg:max-w-7xl">
                <h2 class="text-3xl tracking-tight font-extrabold text-gray-600 sm:text-4xl">
                    News and Events
                </h2>
                <div class="mt-6 pt-5 grid gap-4 place-self-center lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8">
                    <div v-for="article of articles" :key="article._path"
                        class="shadow-lg flex-col flex-direction: column">
                        <a :href="article._path">
                            <div class="flex flex-1 h-48 xxlmin:w-1/2 xxlmax:w-full object-center">
                                <img v-if="article.coverimage" class="w-full object-center overflow-hidden"
                                    :src="article.coverimage" />
                            </div>
                        </a>
                        <div class="flex flex-1 flex-col justify-evenly bg-white p-3">
                            <div class="flex-1">
                                <a href="#" class="inline-block">
                                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                                        :class="article.type == 'Blog' && 'bg-emerald-300 text-emerald-800' || article.type == 'Article' && 'bg-sy-500 text-white' || article.type == 'Event' && 'bg-primary-500 text-white'">
                                        {{ article.type }}
                                    </span>
                                </a>
                                <a :href="article._path">
                                    <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                                        <ClientOnly>
                                            {{ $s(article.description).prune(50)._wrapped }}
                                        </ClientOnly>
                                    </h3>
                                    <p class="mt-3 text-base leading-6 text-gray-500">
                                        <ClientOnly>
                                            {{ $s(article.description).prune(100)._wrapped }}
                                        </ClientOnly>
                                    </p>
                                </a>

                            </div>
                            <div class="mt-3 flex items-center">

                                <p class="text-sm leading-5 font-medium text-gray-900">
                                    {{ article.author }}
                                </p>
                                <span class="mx-1">
                                    &middot;
                                </span>
                                <div class="flex text-sm leading-5 text-gray-500">

                                    {{ $dayjs(article.date).format('DD-MMM-YYYY') }}

                                    <span class="mx-1">
                                        &middot;
                                    </span>
                                    <span>

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        articles: Array,
    },
    filters: {

    },
};
</script>

<style>
.article-card {
    border-radius: 8px;
}

.article-card a {
    background-color: #fff;
    border-radius: 8px;
}

.article-card img div {
    border-radius: 8px 0 0 8px;
}
</style>