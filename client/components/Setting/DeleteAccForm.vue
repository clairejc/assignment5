<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import {useSettingsStore} from "@/stores/settings";
import {useProfileStore} from "@/stores/profile";
import { storeToRefs } from "pinia";


const { deleteUser } = useSettingsStore();
const { updateSession } = useUserStore();
const { getProfile } = useProfileStore();
const { currentUsername } = storeToRefs(useProfileStore());

async function deleteAcc() {
  await deleteUser();
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
    <main class="column">
      <button class="pure-button pure-button-primary" @click="deleteAcc">Delete Account</button>
    </main>
</template>
  

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
