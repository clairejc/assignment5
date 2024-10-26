
<script setup lang="ts">
import FriendChatBox from "@/components/FriendshipHub/FriendChatBox.vue";

const emit = defineEmits(['refreshFriendProfiles']);

const props = defineProps({
  sentRequestFriends: {
    type: null,
    required: true
  },
  receivedRequestFriends: {
    type: null,
    required: true
  },
  friends: {
    type: null,
    required: true
  },
});

</script>

<template>
    <div class="friend-requests" @refreshFriendProfiles="">
      <h2>Sent Friend Requests</h2>
        <div class="chat-box" v-for="friend in props.sentRequestFriends">
          <FriendChatBox :type="'sent'" :friendship-profile="friend" @refreshFriendProfiles="$emit('refreshFriendProfiles')"/>
        </div>
  
      <h2>Received Friend Requests</h2>
        <div class="chat-box" v-for="friend in props.receivedRequestFriends">
          <FriendChatBox :type="'received'" :friendship-profile="friend" @refreshFriendProfiles="$emit('refreshFriendProfiles')"/>
        </div>

      <h2>Friends</h2>
      <div class="chat-box" v-for="friend in props.friends">
        <FriendChatBox :type="'current'" :friendship-profile="friend" @refreshFriendProfiles="$emit('refreshFriendProfiles')"/>
      </div>
    </div>
  </template>

<style scoped>
.friend-requests {
  margin-top: 1em;
}

h2 {
  margin-bottom: 0.5em;
}

ul {
  list-style-type: none;
  padding: 0;
}

.chat-box {
  background-color: var(--light);
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 0.5em;
}
</style>
