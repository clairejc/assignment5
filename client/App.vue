<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
    <!-- <div class="page-background"> -->

    <!-- <img src="@/assets/images/logo.svg" /> -->

  <header>
    <nav>
      <div class="title">
        <img src="@/assets/images/logo.png" />
        <RouterLink :to="{ name: 'Home' }">
          <h1>TimelessTalk</h1>
        </RouterLink>
      </div>
      <ul class="router-link-group">
        <li class="router-link">
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li class="router-link" v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Profile' }" :class="{ underline: currentRouteName == 'Profile' }"> Profile </RouterLink>
        </li>
        <li class="router-link" v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Events' }" :class="{ underline: currentRouteName == 'Events' }"> Events </RouterLink>
        </li>
        <li class="router-link" v-if="isLoggedIn">
          <RouterLink :to="{ name: 'FriendshipHub' }" :class="{ underline: currentRouteName == 'FriendshipHub' }"> FriendshipHub </RouterLink>
        </li>
        <li class="router-link" v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li class="router-link" v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
  <!-- </div> -->
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 0.25em 2em;
  /* background-color: lightgray; */
  background-color: var(--primary);
  display: flex;
  align-items: center;
}

title.h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}


</style>
