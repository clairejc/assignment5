<script setup lang="ts">
import router from "@/router";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import InstructionComponent from "@/components/Instructions/InstructionComponent.vue";
import UpdateUserForm from "../components/Profile/UpdateUserForm.vue";

const { currentUsername, currentCity, currentLanguage, currentName, currentState } = storeToRefs(useProfileStore());

</script>

<template>
  <div class="page-background">

  <main class="column">
    <InstructionComponent :pageType="'profile'"/>
    <div class="profile-current-info">
      <h4>Username: {{ currentUsername }}</h4>
      <h4>Name: {{ currentName }}</h4>
      <h4>City: {{ currentCity }}</h4>
      <h4>State: {{ currentState }}</h4>
    </div>
    <UpdateUserForm />
  </main>
  </div>
</template>

<style scoped>

.profile-current-info {
  border: solid 1px;
  border-radius: 8px;
  padding: 8px;
  width: 400px;
  background-color: var(--light);
}


h4 {
  font-weight: 600;
  margin: 24px;
  font-size: 24px;
}

.page-background {
  background-image: url('@/assets/images/potted.webp'); /* Path to your image */
  background-size: 20%; /* Scales the image */
  background-position: left bottom ; /* Adjusts the vertical position downward */
  background-repeat: no-repeat;
  min-height: 100vh;
  opacity: 90%
}


</style>
