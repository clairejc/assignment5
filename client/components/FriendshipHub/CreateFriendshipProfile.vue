<script setup lang="ts">
import { ref } from "vue";
import { useFriendshipsStore } from "@/stores/friendships";

const bio = ref("");
const genderPronouns = ref("");
const friendshipsStore = useFriendshipsStore();

const emit = defineEmits(['profileCreated']);
async function create() {
  await friendshipsStore.createFriendshipHubProfile(bio.value, genderPronouns.value);
  emit('profileCreated'); // This should notify the parent component

}

</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="create">
    <h2>Create FriendshipHub Profile</h2>
    <fieldset class="create-items">
      <div class="pure-control-group">
        <label for="aligned-bio">Bio</label>
        <input v-model.trim="bio" type="text" id="aligned-bio" placeholder="Bio" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-genderPronouns">Gender Pronouns</label>
        <input v-model.trim="genderPronouns" id="aligned-genderPronouns" placeholder="Gender Pronouns" required />
      </div>
      <div>
        <button type="submit" class="pure-button pure-button-primary">Create Profile</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.create-items {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 4px;
  }
}
.pure-button-primary {
  padding: 0.5em 1em;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pure-button-primary:hover {
  background-color: var(--primary-darker);
}
h3 {
  display: flex;
  justify-content: center;
}
</style>
