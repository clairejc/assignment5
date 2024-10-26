<script setup lang="ts">
import { fetchy } from '@/utils/fetchy';

const props = defineProps(['event']);
const emit = defineEmits(['refreshEvents']);
const joinEventWaitlist = async () => {
  try {
    await fetchy(`/api/eventhosts/waitlists/${props.event._id}`, 'PATCH');
    emit('refreshEvents');
  } catch {
    return;
  }
}

</script>

<template>
  <div class="event">
    <button @click="joinEventWaitlist" class="pure-button pure-button-success">Join Waitlist</button>
  </div>
</template>

<style scoped>
button {
  padding: 0.5em 1em;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--primary-dark);
}
</style>