<template>
	<canvas id="comboChart" class="w-full h-[32rem]"></canvas>
</template>

<script>
export default {
	components: {},
	data() {
		return {

		};
	},
	props: {
		type: String,
		label: String,
		name: String,
		selected_item: String,
		api: String,
		data: Array,
	},
	methods: {
		renderChart() {
			const ctx = document.getElementById('comboChart');
			const comboChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['1',
						'2',
						'3',
						'4',
						'5',
						'6',
						'7',
						'8',
						'9',
						'10',
						'11',
						'12',
						'13',
						'14',
						'15',
						'16',
						'17',
						'18',
						'19',
						'20',
						'21',
						'22',
						'23',
						'24',
						'25',
						'26',
						'27',
						'28',
						'29',
						'30',
						'31',
					],
					datasets: [{
						label: 'Pollution',
						data: ['72.5052',
							'70.672',
							'62.4502',
							'57.4714',
							'55.3151',
							'58.0904',
							'62.6202',
							'63.2485',
							'60.5846',
							'56.3154',
							'58.0005',
							'68.7145',
							'73.3057',
							'67.9869',
							'62.2221',
							'33.0329',
							'55.8137',
							'59.9005',
							'65.7655',
							'64.4816',
							'61.0005',
							'57.5322',
							'59.3417',
							'68.1354',
							'56.3154',
							'58.0005',
							'62.2221',
							'57.0329',
							'56.3154',
							'32.3154',
							'56.3154',
						],
						backgroundColor: [
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
							'rgba(29, 78, 216, 1)',
						],
						borderWidth: 1,
						borderRadius: 5,
						type: 'bar',
						order: 1
					}
					]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								stepSize: 20
							}
						},
					},
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Feb, 2022 - Day wise, average NYC air pollution'
						}
					}
				}
			});
		},
		/*const floatingLabels = {
			id: "floatingLabels",
			afterDatasetsDraw(charts, args, options) {
				console.log(charts)
			}

		} */

	},
	mounted() {
		this.renderChart()
	}

};
</script>
