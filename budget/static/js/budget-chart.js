Vue.component('budgetChart', {
    extends: VueChartJs.Doughnut,
    props: ['data', 'options'],
    mounted () {
        this.renderChart(this.data, this.options)
    }
})