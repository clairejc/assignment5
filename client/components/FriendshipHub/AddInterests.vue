<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useFriendshipsStore } from "@/stores/friendships";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";

// Define stores
const userStore = useUserStore();
const friendshipsStore = useFriendshipsStore();
const { getFriendInterests } = friendshipsStore;
const { userInterests } = storeToRefs(friendshipsStore);

const newInterestToAdd = ref("");
const newInterestToRemove = ref("");
const interests = ref<string[]>([]);

// Define emitted events
const emit = defineEmits(['interestAdded', 'interestRemoved']);

// Fetch initial interests on component mount
onMounted(async () => {
  await getFriendInterests(); // Ensure interests are fetched
  interests.value = userInterests.value;
});


// Function to add a new interest
async function addFriendInterest() {
  const interestToAdd = newInterestToAdd.value.trim();
  if (interestToAdd) {
    try {
      console.log("Adding interest:", interestToAdd);
      await fetchy("api/friend/profile/addinterest", "PATCH", {
        body: { interest: interestToAdd },
      });

      // Update local interests and store
      interests.value.push(interestToAdd);
      userInterests.value = interests.value;
      newInterestToAdd.value = ""; // Clear the input
      emit('interestAdded'); // Emit event

    } catch (error) {
      console.error("Error adding interest:", error);
    }
  } else {
    console.warn("No interest entered."); // Warn if input is empty
  }
}

// Function to remove an interest
async function removeFriendInterest() {
  const interestToRemove = newInterestToRemove.value.trim();
  if (interestToRemove) {
    try {
      console.log("Removing interest:", interestToRemove);
      await fetchy("api/friend/profile/removeinterest", "PATCH", {
        body: { interest: interestToRemove },
      });

      // Update local interests and store
      interests.value = interests.value.filter(i => i !== interestToRemove);
      userInterests.value = interests.value;
      newInterestToRemove.value = ""; // Clear the input
      emit('interestRemoved'); // Emit event

    } catch (error) {
      console.error("Error removing interest:", error);
    }
  } else {
    console.warn("No interest entered to remove."); // Warn if input is empty
  }
}


</script>

<template>
  <div>
    <h3>Current Interests</h3>
      <div class="interests-list">
        <em v-for="interest in interests" :key="interest">{{ interest }}</em>
        <em v-if="interests.length === 0">You currently have no interests</em>
      </div>
    <!-- Add Interest Form -->
    <form class="pure-form pure-form-aligned interest-form" @submit.prevent="addFriendInterest">
      <div class="pure-control-group">
        <!-- <label for="aligned-add-interest">Add Interest</label> -->
        <input v-model.trim="newInterestToAdd" type="text" id="aligned-add-interest" placeholder="Add an interest" required />
      </div>
      <button type="submit" class="pure-button">Add</button>
    </form>

    <!-- Remove Interest Form -->
    <form class="pure-form pure-form-aligned interest-form" @submit.prevent="removeFriendInterest">
      <div class="pure-control-group">
        <!-- <label for="aligned-remove-interest">Remove Interest</label> -->
        <input v-model.trim="newInterestToRemove" type="text" id="aligned-remove-interest" placeholder="Remove an interest" required />
      </div>
      <button type="submit" class="pure-button">Remove</button>
    </form>
  </div>

</template>

<style scoped>
.interests-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.interest-form {
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
