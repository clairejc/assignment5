<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useFriendshipsStore } from "@/stores/friendships";
import SendMessage from "@/components/FriendshipHub/SendMessage.vue";
import { storeToRefs } from "pinia";
import { fetchy } from "@/utils/fetchy";

const friendshipsStore = useFriendshipsStore();
const { compatibleFriends } = storeToRefs(friendshipsStore);
const currentIndex = ref(0);

const emit = defineEmits(['refreshFriendProfiles']);

const currentFriend = computed(() => {
  return compatibleFriends.value[currentIndex.value];
});

const getCompatibleFriends = async () => {
  try {
    const response = await fetchy("/api/friend/compatible", "GET");
    compatibleFriends.value = response.friends; 
  } catch (error) {
    console.error("Failed to fetch compatible friends:", error);
  }
};

// to the next friend
const nextFriend = () => {
  if (currentIndex.value < compatibleFriends.value.length - 1) {
    currentIndex.value++;
  }
};

// to reset the index
const resetIndex = () => {
  currentIndex.value = 0;
};

// handle the message sent event
const handleMessageSent = (message: string) => {
  console.log("id", currentFriend.value, currentFriend.value.userid);
  console.log(`Message sent to ${currentFriend.value.name}: ${message}`);
};

onMounted(() => {
  getCompatibleFriends();
});
</script>

<template>
  <div>
    <h3>Compatible Friends</h3>
    <div class="compatible-display" v-if="compatibleFriends.length > 0">
      <div class="profile-display">
      <p><strong>Name:</strong> {{ currentFriend?.name }}</p>
      <p><strong>Age:</strong> {{ currentFriend?.age }}</p>
      <p><strong>Bio:</strong> {{ currentFriend?.bio }}</p>
      <p><strong>Gender Pronouns:</strong> {{ currentFriend?.genderPronouns }}</p>
      <p><strong>Interests:</strong> {{ currentFriend?.interests.join(', ') }}</p>
      </div>
      <div class="navigation">
        <button @click="nextFriend" :disabled="currentIndex === compatibleFriends.length - 1">Next</button>
      </div>
      <SendMessage v-if="currentFriend" :to_id="currentFriend.userid" @messageSent="handleMessageSent" @refreshFriendProfiles="emit('refreshFriendProfiles')"/>
    </div>
    <div class="compatible-display" v-else>
      <p>No compatible friends found.</p>
    </div>
  </div>
</template>

<style scoped>
.profile-display {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid;
  border-radius: 8px;
  padding: 8px;
  background-color: var(--light);
}

p {
  margin: 8px 12px;
  font-size: 16px;
}
.compatible-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}
</style>
