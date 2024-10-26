<script setup lang="ts">
import InstructionComponent from "@/components/Instructions/InstructionComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const router = useRouter();

function goToProfile() {
  router.push({ name: 'Profile' });
}
function goToEvents() {
  router.push({ name: 'Events' });
}
function goToFriendshipHub() {
  router.push({ name: 'FriendshipHub' });
}
function goToSettings() {
  router.push({ name: 'Settings' });
}

function goToLogin() {
  router.push({ name: 'Login' });
}
</script>

<template>
  <div class="page-background">

  <main>
    <InstructionComponent :pageType="'home'" />
    <section>
      <h1 v-if="isLoggedIn"><br>Welcome {{ currentUsername }}!</h1>
      <h1 v-if="isLoggedIn"> <br> Get started with something :) <br> <br> </h1>
      <div v-else>
        <h1>Please login or register!</h1>
        <br>
        <section class="button-section">
          <button @click="goToLogin"> Login/Register</button>
        </section>
        </div>
    </section>
    <section class="button-section" v-if="isLoggedIn">
      <button @click="goToProfile">Profile</button>
      <button @click="goToEvents">Events</button>
      <button @click="goToFriendshipHub">Friendship Hub</button>
      <button @click="goToSettings">Settings</button>
    </section>
    <!-- <PostListComponent /> -->
  </main>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.button-section {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.page-background {
  background-image: url('@/assets/images/mountain.png'); /* Path to your image */
  background-size: 100%; /* Scales the image */
  background-position: bottom ; /* Adjusts the vertical position downward */
  background-repeat: no-repeat;
  min-height: 100vh;
  opacity: 90%
}
</style>