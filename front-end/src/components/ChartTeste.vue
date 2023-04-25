<template>
  <v-container fluid class="pa-6">
    <v-row justify="center" class="chart-card">
      <v-card width="600" height="600">
        <transition :key="pagination.length + page + limit">
          <LineChart height="600" :chartData="testData.data" />
        </transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import moment from "moment";
Chart.register(...registerables);

export default defineComponent({
  name: "ChartTeste",
  components: { LineChart },
  props: {
    pagination: {
      type: Array<any>,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    context: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataPagination: [],
    };
  },
  setup(props) {
    let dataMap = Array.isArray(props.pagination)
      ? props.pagination.map((el) => el.valor.toString())
      : [];
    let label = Array.isArray(props.pagination)
      ? props.pagination.map((el) => moment(el.created_at).format("HH:mm"))
      : [];
    let dataLabel = "";
    let backgroundCustom = [] as Array<string>;
    let bordColorCustom = [] as Array<string>;
    switch (props.context) {
      case "temperatura":
        dataLabel = "Temperatura";
        backgroundCustom = [
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ];
        bordColorCustom = [
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ];
        break;
      case "humidade":
        dataLabel = "Umidade";
        backgroundCustom = [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ];
        bordColorCustom = [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ];
        break;
      case "ph":
        dataLabel = "Ph";
        backgroundCustom = [
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ];
        bordColorCustom = [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ];
        break;
    }
    const testData = {
      type: "line",
      data: {
        labels: label,
        datasets: [
          {
            label: dataLabel,
            data: dataMap,
            backgroundColor: backgroundCustom,
            borderColor: bordColorCustom,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    watchEffect(() => {
      if (props.pagination && Array.isArray(props.pagination)) {
        let dataMap = Array.isArray(props.pagination)
          ? props.pagination.map((el) => el.valor.toString())
          : [];
        let label = Array.isArray(props.pagination)
          ? props.pagination.map((el) => moment(el.created_at).format("HH:mm"))
          : [];
        testData.data.datasets[0].data = dataMap;
        testData.data.labels = label;
      }
    });
    return { testData };
  },
});
</script>
<style>
.chart-card {
  max-width: 800px;
  margin: auto;
}
</style>
