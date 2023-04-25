<template>
  <v-container fluid class="pa-6">
    <v-row justify="center">
      <v-card>
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody v-if="context == 'temperatura'">
            <tr
              v-for="(sensores, index) in temperatura"
              :key="'temperatura-' + (sensores?.id ?? index)"
            >
              <td>{{ sensores?.id ?? "" }}</td>
              <td>{{ sensores?.valor ?? "" }}</td>
            </tr>
          </tbody>
          <tbody v-if="context == 'humidade'">
            <tr
              v-for="(sensores, index) in humidade"
              :key="'humidade-' + (sensores?.id ?? index)"
            >
              <td>{{ sensores?.id ?? "" }}</td>
              <td>{{ sensores?.valor ?? "" }}</td>
            </tr>
          </tbody>
          <tbody v-if="context == 'ph'">
            <tr
              v-for="(sensores, index) in ph"
              :key="'ph-' + (sensores?.id ?? index)"
            >
              <td>{{ sensores?.id ?? "" }}</td>
              <td>{{ sensores?.valor ?? "" }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import SensorService from "../services/SensorService";
import { HumidadeInterface } from "../Models/Humidade";
import { PhInterface } from "../Models/Ph";
import { TemperaturaInterface } from "../Models/Temperatura";

export default defineComponent({
  name: "SensorTable",
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
      temperatura: ([] as Array<TemperaturaInterface>) || [],
      humidade: ([] as Array<HumidadeInterface>) || [],
      ph: ([] as Array<PhInterface>) || [],
    };
  },

  async created() {
    await this.updateTable();
  },
  watch: {
    pagination: "updateTable",
    page: "updateTable",
  },
  methods: {
    async updateTable() {
      switch (this.context) {
        case "temperatura": {
          this.temperatura = this.pagination;
          break;
        }
        case "humidade": {
          this.humidade = this.pagination;
          break;
        }
        case "ph": {
          this.ph = this.pagination;
          break;
        }
      }
      this.temperatura = this.pagination;
    },
  },
});
</script>

<style>
table {
  border-collapse: separate;
  border-spacing: 0;
  background: linear-gradient(to bottom, #ffffff, #f2f2f2);
}

th,
td {
  border: 1px solid #dddddd;
  padding: 10px;
}
button {
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  width: 100px;
  height: 40px;
}

button:hover {
  background-color: #0063ab;
}

span {
  font-size: 16px;
  color: #0074d9;
  margin: 0 16px;
}
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.4;
}
.custom-table {
  width: 400px;
  height: 100px;
}
table th,
table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

table th {
  background-color: #0074d9;
  color: #fff;
}

table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.pagination button {
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 8px;
}

.pagination button:hover {
  background-color: #0063ab;
}

.pagination span {
  font-size: 16px;
  color: #0074d9;
  margin: 0 16px;
}
</style>
