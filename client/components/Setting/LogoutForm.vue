<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import {useSettingsStore} from "@/stores/settings";

const { logoutUser } = useSettingsStore();
const { updateSession } = useUserStore();

async function logout() {
  await logoutUser();
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
    <main class="column">
      <button class="pure-button pure-button-primary" @click="logout">Logout</button>
    </main>
</template>
  

<style scoped>
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
</style>
