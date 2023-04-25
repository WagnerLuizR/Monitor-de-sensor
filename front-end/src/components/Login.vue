<template>
  <div class="login-wrapper">
    <v-card class="login-card">
      <v-card-title class="title">Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="username" label="Username"></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <button class="login-btn" @click="login">Login</button>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username == "teste@gmail.com" && this.password == "1234") {
        this.$emit("login-success");
      }
    },
  },
  setup(){
    const loggedIn = ref(false);
  },
  watch: {
    "$parent.menu"(value) {
      if (!value) {
        this.username = "";
        this.password = "";
      }
    },
  },
});
</script>

<style scoped>
.login-btn {
  background-color: #0074d9;
  color: white;
}
.login-btn:hover {
  background-color: #0063ab;
  color: white;
}
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(241, 247, 255);
}
.login-card {
  max-width: 500px;
  width: 100%;
  background-color: #ffffff;
  color: #000000;
}
.title {
  text-align: center;
}
</style>
