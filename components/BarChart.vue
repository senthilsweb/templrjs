<template>


	<canvas id="myChart" width="400" height="400"></canvas>

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
			const ctx = document.getElementById('myChart');
			const myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					datasets: [{
						label: 'Moisture',
						data: [12, 19, 3, 5, 2, 3, 1, 4, 6, 8, 2, 10, 12],
						backgroundColor: [
							'rgba(29, 78, 216, 1)',
							'rgba(101, 163, 13, 1)',
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
					},
					{
						label: 'Co2',
						data: [10, 8, 1, 3, 0, 1, 0, 2, 3, 5, 6, 7, 8],
						backgroundColor: [
							'rgba(234, 179, 8, 1)'
						],
						borderColor: 'rgba(234, 179, 8, 1)',
						borderWidth: 1,
						borderRadius: 5,
						type: 'line',
						order: 0
					},
					]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					},
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: '2022 - Month wise, average NYC air pollution'
						}
					}
				}
			});
		}
	},
	mounted() {
		this.renderChart()
	},
};
</script>
