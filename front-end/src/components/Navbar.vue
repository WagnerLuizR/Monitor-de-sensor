<template>
  <v-card>
    <v-layout>
      <v-app-bar density="compact">
        <v-app-bar-title class="align-self-center"></v-app-bar-title>
        <v-menu v-model="menu" :close-on-content-click="true" location="end">
          <template v-slot:activator="{ props }">
            <button class="login-btn" v-bind="props">Menu</button>
          </template>
          <v-card style="display: flex !important" min-width="150">
            <v-card-actions>
              <v-spacer></v-spacer>
              <button class="logout-btn" @click="login">Logout</button>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-main>
        <v-tabs v-model="tab" fixed-tabs>
          <v-tab class="one" value="one">Temperatura</v-tab>
          <v-tab class="two" value="two">Umidade</v-tab>
          <v-tab class="three" value="three">Ph</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item v-show="tab == 'one'" value="one">
              <Pagination context="temperatura" />
            </v-window-item>
            <v-window-item v-show="tab == 'two'" value="two">
              <Pagination context="humidade" />
            </v-window-item>
            <v-window-item v-show="tab == 'three'" value="three">
              <Pagination context="ph" />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TableComponent from "./TableComponent.vue";
import Pagination from "./Pagination.vue";

export default defineComponent({
  name: "App",
  components: {
    TableComponent,
    Pagination,
  },
  data: () => ({
    paginationOptions: [5, 10, 15, 20],
    menu: false,
    tab: "one",
    items: [
      {
        title: "Sair",
      },
    ],
  }),
  setup() {
    const loggedIn = ref(true);
  },
  methods: {
    login() {
      this.$emit("logout-success");
    },
  },
});
</script>
<style>
#customTabStyle {
  color: red !important;
}
.login-btn {
  background-color: white;
  color: #0074d9;
}
.login-btn:hover {
  background-color: #0063ab;
  color: white;
}
.logout-btn {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}
.logout-btn:hover {
  background-color: #f44336;
  color: white;
}
</style>
