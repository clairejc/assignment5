<script setup lang="ts">
import { ref } from "vue";

const author = ref("");
const emit = defineEmits(["getEventsbyAuthor"]);

function resetAuthor() {
  emit('getEventsbyAuthor', author.value);
  author.value = "";
}
</script>

<template>
  <form @submit.prevent="resetAuthor" class="pure-form">
    <fieldset class="search-fields">
      <input id="author" type="text" v-model="author" placeholder="Username" />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
.search-fields {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  justify-content: center;
  margin: none;
}

.pure-button {
  padding: 0.5em 1em;
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
