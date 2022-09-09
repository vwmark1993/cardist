<template>
  <div class="chart-container mx-3">
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    props: {
      title: {
        type: String
      },
      xAxisLabels: {
        type: Array
        
      },
      yAxisLabel: {
        type: String
      },
      dataValues: {
        type: Array
      },
      chartId: {
        type: String,
        default: 'bar-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => [Title, Legend]
      }
    },
    data() {
      return {
        chartData: {
          labels: this.xAxisLabels,
          datasets: [ { 
            label: this.yAxisLabel,
            data: this.dataValues,
            backgroundColor: '#0D1B42',
            hoverBackgroundColor: '#132964'
          } ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: this.title
            },
            legend: {
                display: true,
                labels: {
                    color: '#0D1B42'
                }
            }
          },
        }
      }
    }
  }
  </script>

<style scoped>
  .chart-container {
    min-width: 500px;
  }
</style>