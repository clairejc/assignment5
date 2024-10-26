<script setup lang="ts">

import { fetchy } from '@/utils/fetchy';

const props = defineProps(['event']);
const emit = defineEmits(['refreshEvents']);
const removeWaitlistEvent = async () => {
  try {
    await fetchy(`/api/eventhosts/removewaitlists/${props.event._id}`, 'DELETE');
    emit('refreshEvents');

  } catch {
    return;
  }
};

</script>

<template>
  <div class="event">
    <button @click="removeWaitlistEvent" class="pure-button pure-button-success">Unjoin Waitlist</button>
  </div>
</template>

<style scoped>
button {
  padding: 0.5em 1em;
  background-color: var(--gray);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--gray-darker);
}
</style>