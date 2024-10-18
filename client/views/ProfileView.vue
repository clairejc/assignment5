<script setup lang="ts">
import router from "@/router";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Profile/UpdateUserForm.vue";

const { currentUsername, currentCity, currentLanguage, currentName, currentState } = storeToRefs(useProfileStore());

</script>

<template>
  <main class="column">
    <h1>Username: {{ currentUsername }}</h1>
    <h1>Name: {{ currentName }}</h1>
    <h1>City: {{ currentCity }}</h1>
    <h1>State: {{ currentState }}</h1>
    <h1>Language: {{ currentLanguage }}</h1>
    <UpdateUserForm />
  </main>
</template>
