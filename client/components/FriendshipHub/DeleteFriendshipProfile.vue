<script setup lang="ts">
import { useFriendshipsStore } from "@/stores/friendships";
import { ref } from "vue";

const { deleteFriendshipProfile } = useFriendshipsStore();
const showConfirmation = ref(false); 

const emit = defineEmits(['profileDeleted']); // emit after deletion

async function confirmDelete() {
  try {
    await deleteFriendshipProfile(); 
    emit('profileDeleted'); 
  } catch (error) {
    console.error("Failed to delete profile:", error);
  }
}

</script>

<template>
  <div class="deletion-container">
    <div class="button-container">
    <button class="pure-button pure-button-danger" @click="showConfirmation = true">
      Delete Friendship Profile
    </button>
   </div>

    <div v-if="showConfirmation" class="confirmation-dialog">
      <p>Are you sure you want to delete your friendship profile? This action cannot be undone.</p>
      <div class="confirmation-buttons">
        <button class="pure-button pure-button-primary" @click="confirmDelete">Yes, delete</button>
        <button class="pure-button pure-button-danger" @click="showConfirmation = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deletion-container {
  display: flex;
  flex-direction: column;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.confirmation-dialog {
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 1em;

  p {
    font-size: 16px;
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

.pure-button-danger {
  padding: 0.5em 1em;
  background-color: var(--gray);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pure-button-danger:hover {
  background-color: var(--gray-darker);
}

.confirmation-buttons {
  button {
    margin: 4px 8px;
    flex-grow: 2;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>