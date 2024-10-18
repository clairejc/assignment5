<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import {useSettingsStore} from "@/stores/settings";
import {useProfileStore} from "@/stores/profile";
import { storeToRefs } from "pinia";


const { logoutUser } = useSettingsStore();
const { updateSession } = useUserStore();
const { getProfile } = useProfileStore();
const { currentUsername } = storeToRefs(useProfileStore());

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
</style>
