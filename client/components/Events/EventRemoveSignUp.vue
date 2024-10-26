<script setup lang="ts">
import { fetchy } from '@/utils/fetchy';

const props = defineProps(['event']);
// Emit an event to refresh the parent component if sign-up is successful
const emit = defineEmits(['refreshEvents']);
const removeSignUpForEvent = async () => {
    try {
      await fetchy(`/api/eventhosts/removesignups/${props.event._id}`, 'DELETE');
      props.event.spotsLeft += 1; // Decrease the spots left by 1
      emit('refreshEvents');
  
    } catch {
      return;
    }
  };

</script>

<template>
  <div class="event">
    <button @click="removeSignUpForEvent" class="pure-button pure-button-success">Remove Sign Up</button>
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