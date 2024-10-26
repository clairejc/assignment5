<script setup lang="ts">
import router from "@/router";
import { useProfileStore } from "@/stores/profile";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const name = ref("");
const phone = ref();
const age = ref();
const { createUser, loginUser, updateSession } = useUserStore();
const { getProfile } = useProfileStore();


async function register() {
  await createUser(username.value, password.value, name.value, phone.value, age.value);
  await loginUser(username.value, password.value);
  void updateSession();
  await getProfile();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register User</h3>
    <fieldset class="register-items">
      <div class="pure-control-group">
        <label for="aligned-username">Username</label>
        <input v-model.trim="username" type="uname" id="aligned-username" placeholder="Username" required />
      </div>

      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="pass" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>

      <div class="pure-control-group">
        <label for="aligned-name">Name</label>
        <input type="name" v-model.trim="name" id="aligned-name" placeholder="Name" required />
      </div>

      <div class="pure-control-group">
        <label for="aligned-phone">Phone</label>
        <input type="phone" v-model.trim="phone" id="aligned-phone" placeholder="Phone" required />
      </div>

      <div class="pure-control-group">
        <label for="aligned-age">Age</label>
        <input type="age" v-model.trim="age" id="aligned-age" placeholder="Age" required />
      </div>

      <div>
        <button type="submit" class="pure-button pure-button-primary">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.register-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pure-control-group {
  margin: 0px;
}

button {
  margin: 4px;
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
