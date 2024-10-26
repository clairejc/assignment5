<script setup lang="ts">

import { fetchy } from '@/utils/fetchy';

const props = defineProps(['event']);
// Emit an event to refresh the parent component if sign-up is successful
const emit = defineEmits(['refreshEvents']);
const signUpForEvent = async () => {
  try {
    await fetchy(`/api/eventhosts/signups/${props.event._id}`, 'PATCH');
    emit('refreshEvents');
  } catch {
    return;
  }
};
</script>

<template>
  <div>
    <button @click="signUpForEvent" class="pure-button pure-button-success">Sign Up</button>
  </div>
</template>

<style scoped>
.pure-button {
  /* padding: 0.5em 1em; */
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 12px;
}

button:hover {
  background-color: var(--primary-darker);
}
</style>