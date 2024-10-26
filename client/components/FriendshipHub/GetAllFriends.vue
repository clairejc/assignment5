<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchy } from "@/utils/fetchy";

const friends = ref<any[]>([]);

async function fetchFriends() {
  try {
    const response = await fetchy("/api/friend/getfriends", "GET");
    friends.value = response; 

  } catch (error) {
    console.error("Error fetching friends:", error);
  }
}

onMounted(() => {
  fetchFriends();
});
</script>

<template>
  <div class="friends-list">
    <h2>My Friends</h2>
    <ul>
      <li v-for="friend in friends">
        <FriendChatBox :type="'friend'" :friendshipProfile="friend"/>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.friends-list {
  margin-top: 1em;
}

h2 {
  margin-bottom: 0.5em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5em;
}
</style>
