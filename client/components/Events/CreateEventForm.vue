<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const title = ref("");
const description = ref("");
const date = ref(null);
const spots = ref(null);

const emit = defineEmits(["refreshEvents"]);

const createEvent = async (title: string, description: string, date: number, spots: number) => {
  try {
    await fetchy("/api/eventhosts", "POST", {
      body: { title, description, date, spots },
    });
  } catch (_) {
    return;
  }
  emit("refreshEvents");
  emptyForm();
};

const emptyForm = () => {
  title.value = "";
  description.value = "";
  date.value = null;
  spots.value = null
};
</script>


<template>
  <form @submit.prevent="createEvent(title, description, date, spots)" >
    <fieldset>
      <legend>Create an Event</legend>
        <input type="title" placeholder="Event title" v-model="title" required />
        <input type="description" placeholder="Event description" v-model="description" required />
        <input type="date" placeholder="Event date" v-model="date" required />
        <input type="spots" placeholder="Event spots" v-model="spots" required />
        <button type="Create Event" class="pure-button pure-button-primary">Create Event</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
