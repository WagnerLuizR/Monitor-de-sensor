<template>
  <div>
    <Login v-if="!loggedIn" @login-success="loggedIn = true" />
    <Navbar v-if="loggedIn" @logout-success="loggedIn = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Login from "./components/Login.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Login,
  },
  setup() {
    const loggedIn = ref(false);
    return {
      loggedIn,
    };
  },
});
</script>
