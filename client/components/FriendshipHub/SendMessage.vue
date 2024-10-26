<script setup lang="ts">
import { ref } from 'vue';
import { fetchy } from "@/utils/fetchy";

const props = defineProps({
  to_id: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['messageSent', 'refreshFriendProfiles']);
const message = ref('');

async function send() {
  const trimmedMessage = message.value.trim();
  if (trimmedMessage) {
    try {
      console.log("Sending message:", trimmedMessage);
      await fetchy("/api/friend/sendrequest", "POST", {
        body: {
          to_id: props.to_id,
          message: trimmedMessage,
        },
      });
      console.log("will emit")
      emit('messageSent', trimmedMessage);
      message.value = ''; 
      emit('refreshFriendProfiles');

    } catch (error) {
      console.error("Error sending message:", error);
    }
  } else {
    console.warn("No message entered."); // Warn if input is empty
  }
}
</script>

<template>
  <div class="send-message">
    <form @submit.prevent="send">
      <div class="pure-control-group">
        <label for="message-input">Message:</label>
        <input
          v-model.trim="message"
          type="text"
          id="message-input"
          placeholder="Type your message here..."
          required
        />
        <button type="submit" class="pure-button">Send</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.send-message {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.pure-control-group {
  display: flex;
  align-items: center;
  gap: 1em;
}

input {
  flex: 1;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
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
