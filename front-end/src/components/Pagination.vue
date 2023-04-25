<template>
  <div class="text-center">
    <v-container>
      <v-layout row>
        <v-flex xs12 sm4 class="flex-grow-1">
          <ChartTest
            :pagination="data"
            :page="page"
            :limit="limit"
            :context="context"
          />
        </v-flex>
        <v-flex xs12 sm4 class="flex-grow-1">
          <TableComponent
            :pagination="data"
            :page="page"
            :limit="limit"
            :context="context"
            style="height: 600px; max-height: 600px"
          />
        </v-flex>
      </v-layout>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="totalElements"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableComponent from "./TableComponent.vue";
import SensorService from "../services/SensorService";
import { HumidadeInterface } from "../Models/Humidade";
import { PhInterface } from "../Models/Ph";
import { TemperaturaInterface } from "../Models/Temperatura";
import ChartTest from "./ChartTeste.vue";

export default defineComponent({
  name: "Pagination",
  components: {
    TableComponent,
    ChartTest,
  },
  props: {
    context: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: Array<any | null>,
      page: 1,
      limit: 10,
      totalElements: Number as any,
      temperatura: ([] as Array<TemperaturaInterface | any | null | []>) || [],
      humidade: ([] as Array<HumidadeInterface>) || [],
      ph: ([] as Array<PhInterface>) || [],
    };
  },
  async created() {
    await this.updateTable();
  },
  watch: {
    page: "updateTable",
  },
  methods: {
    async updateTable() {
      switch (this.context) {
        case "temperatura":
          const resultTemp = await SensorService.getTemperaturaPaginated(
            this.page,
            this.limit
          );
          this.data = resultTemp.data[0];
          this.temperatura = this.data || [];
          this.totalElements = resultTemp.totalElements / resultTemp.limit + 1;
          this.$emit("pagination", this.temperatura);
          this.$emit("context", "temperatura");
          break;
        case "humidade":
          const resultUmi = await SensorService.getHumidadePaginated(
            this.page,
            this.limit
          );
          this.data = resultUmi.data[0];
          this.humidade = this.data || [];
          this.totalElements = resultUmi.totalElements / resultUmi.limit + 1;
          this.$emit("pagination", this.humidade);
          this.$emit("context" + "humidade");
          break;
        case "ph":
          const resultPh = await SensorService.getPhPaginated(
            this.page,
            this.limit
          );
          this.data = resultPh.data[0];
          this.ph = this.data || [];
          this.totalElements = resultPh.totalElements / resultPh.limit + 1;
          this.$emit("pagination", this.ph);
          this.$emit("context" + "ph");
          break;
        default:
          console.error(`Unknown context: ${this.context}`);
          break;
      }
    },
  },
});
</script>
