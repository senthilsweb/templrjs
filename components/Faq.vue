<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div class="bg-gray-50">
		<div class="px-4 sm:px-6">
			<div class="divide-y-2 divide-gray-200">
				<dl class="mt-6 space-y-6 divide-y divide-gray-200">
					<Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="pt-6" v-slot="{open}">
						<dt class="text-lg">
							<DisclosureButton class="flex w-full items-start justify-between text-left text-gray-400">
								<span class="font-medium text-gray-900">{{ faq.question }}</span>
								<span class="ml-6 flex h-7 items-center">
									<ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']" aria-hidden="true" />
								</span>
							</DisclosureButton>
						</dt>
						<DisclosurePanel as="dd" class="mt-2 pr-12">
							<p class="text-base text-gray-500">{{ faq.answer }}</p>
						</DisclosurePanel>
					</Disclosure>
				</dl>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
	import {ChevronDownIcon} from "@heroicons/vue/24/outline";

	const faqs = [
		{
			question: "What's the best thing about Switzerland?",
			answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		{
			question: "How do you make holy water?",
			answer: "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.",
		},
		{
			question: "What do you call someone with no body and no nose?",
			answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		{
			question: "Why do you never see elephants hiding in trees?",
			answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		{
			question: "Why can't you hear a pterodactyl go to the bathroom?",
			answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
	];
</script>
