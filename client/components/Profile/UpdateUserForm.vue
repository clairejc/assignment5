<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useProfileStore } from "@/stores/profile"

import { ref } from "vue";
import { storeToRefs } from "pinia";


let username = ref("");
let currentPassword = ref("");
let newPassword = ref("");
let newName = ref("");
let newCity = ref("");
let newState = ref("");
let newLanguage = ref("");

const { updateSession } = useUserStore();
const { updateUserUsername, updateUserPassword, updateUserName, updateUserLocation, updateUserLanguage, getProfile } = useProfileStore();

async function updateUsername() {
  await updateUserUsername(username.value);
  await updateSession();
  await getProfile();
  username.value = "";
}

async function updatePassword() {
  await updateUserPassword(currentPassword.value, newPassword.value);
  await updateSession();
  currentPassword.value = newPassword.value = "";
}

async function updateName() {
  await updateUserName(newName.value);
  await updateSession();
  await getProfile();
  newName.value = "";
}

async function updateLocation() {
  await updateUserLocation(newCity.value, newState.value);
  await updateSession();
  await getProfile();
  newCity.value = "";
  newState.value = "";
}

async function updateLanguage() {
  await updateUserLanguage(newLanguage.value);
  await updateSession();
  await getProfile();
  newLanguage.value = "";
}

</script>
<template>
  <h2>Update user details</h2>
  <form @submit.prevent="updateUsername" class="pure-form">
    <fieldset>
      <legend>Change your username</legend>
      <input type="user" placeholder="New username" v-model="username" required />
      <button type="submit" class="pure-button pure-button-primary">Update username</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatePassword" class="pure-form">
    <fieldset>
      <legend>Change your password</legend>
      <input type="pass" placeholder="Old password" v-model="currentPassword" required />
      <input type="pass" placeholder="New password" v-model="newPassword" required />
      <button type="submit" class="pure-button pure-button-primary">Update password</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateName" class="pure-form">
    <fieldset>
      <legend>Change your name</legend>
      <input type="name" placeholder="New name" v-model="newName" required />
      <button type="submit" class="pure-button pure-button-primary">Update name</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateLocation" class="pure-form">
    <fieldset>
      <legend>Change your location</legend>
      <input type="city" placeholder="New city" v-model="newCity" required />
      <input type="state" placeholder="New state" v-model="newState" required />
      <button type="submit" class="pure-button pure-button-primary">Update location</button>
    </fieldset>
  </form>

</template>

<style scoped>

input {
  margin: 12px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus{
  outline: 1px solid var(--primary);     /* oranges! yey */
}

.pure-button {
  padding: 0.5em 1em;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 12px;
}

button:hover {
  background-color: var(--primary-darker);
}
</style>