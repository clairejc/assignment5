<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchy } from "@/utils/fetchy";

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  friendshipProfile: {
    type: null,
    required: true
  }
});

const emit = defineEmits(['refreshFriendProfiles']);

const chatOpened = ref(false);

const msg = ref("");
const chats = ref<any[]>([]);
async function fetchChats() {
  try {
    const response = await fetchy(`/api/friend/profile/chat/${props.friendshipProfile.userid}`, "GET");
    chats.value = response; 

  } catch (error) {
    console.error("Error fetching friends:", error);
  }
}

async function acceptFriendRequest(message: string) {
    try {
        await fetchy("/api/friend/acceptrequest", "PUT",
            {body: {from_id: props.friendshipProfile.userid}});
        await sendMessage(message);
    } catch (error) {
        console.error("Error accepting friend request:", error);
    }
}

async function sendMessage(message: string) {
    try {
        await fetchy(`/api/friend/profile/sendmessage/${props.friendshipProfile.userid}`, "POST", 
            {body : {content: message}})
        emit('refreshFriendProfiles');
        msg.value = "";
        await fetchChats();
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

function toggleOpened() {
    chatOpened.value = !chatOpened.value;
    console.log(chatOpened);
}

onMounted(() => {
    fetchChats();
});
</script>

<template>
  <div class="friends-chat-box">
    <div class="friends-chat-box-preview" @click="toggleOpened">
        {{ props.friendshipProfile.name }}
    </div>
    <div class="chat-box" v-show=chatOpened >
        <br>
        <em>Messages with {{ props.friendshipProfile.name }}</em>
        <ul class="chat-messages">
            <li v-for="chat in chats" class="message" :class="{'your-message': chat.to === props.friendshipProfile.userid, 'their-message': chat.to !== props.friendshipProfile.userid}">
                {{ chat.content }}
            </li>
        </ul>
        <div class="chat-info" v-if="type === 'sent'">
            <em>{{props.friendshipProfile.name}} hasn't accepted your friend request yet</em>
        </div>
        <form class="chat-info" @submit.prevent="acceptFriendRequest(msg)" v-if="type === 'received'">
            <em>Send a message to accept {{props.friendshipProfile.name}}'s friend request</em>
            <fieldset>
                <input class="send-message" v-model="msg" type="message" placeholder="Send a message" required />
            </fieldset>
        </form>
        <form class="chat-info" @submit.prevent="sendMessage(msg)" v-if="type === 'current'">
            <fieldset>
                <input class="send-message" v-model="msg" type="message" placeholder="Send a message" required />
            </fieldset>
        </form>
        
    </div>
  </div>
</template>

<style scoped>
.friends-chat-box {
    min-width: 640px;
}
.friends-chat-box-preview {
    cursor: pointer;
}

.chat-box {
    max-width: 640px;
}
.friends-list {
  margin-top: 1em;
}

.chat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.send-message {
    min-width: 500px;
}

.chat-messages {
    display: flex;
    flex-direction: column;
}

.message {
  border-radius: 8px;
}

.your-message {
    align-self: flex-end;
    background-color: var(--your-chats);
}

.their-message {
    align-self: flex-start;
    background-color: var(--their-chats);
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
