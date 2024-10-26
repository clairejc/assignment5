<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import {useProfileStore} from "@/stores/profile";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();
const { getProfile } = useProfileStore();
async function login() {
  await loginUser(username.value, password.value);
  void updateSession();
  void getProfile();
  void router.push({ name: "Home" });
}

</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <h3>Login</h3>
    <fieldset class="login-items">
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="name" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="pass" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div>
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.login-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pure-control-group {
  margin: 0px;
}

button {
  margin: 8px 0px 0px 0px;
}

h3 {
  display: flex;
  justify-content: center;
}

button {
  padding: 0.5em 1em;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--primary-darker);
}

input {
  margin: 12px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus{
  outline: 1px solid var(--primary);     /* oranges! yey */
}
</style>
