<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const title = ref("");
const description = ref("");
const date = ref();
const time = ref("");
const spots = ref();

const emit = defineEmits(["refreshEvents"]);

const createEvent = async (title: string, description: string, date: number, time: string, spots: number) => {
  try {
    await fetchy("/api/eventhosts", "POST", {
      body: { title, description, date, time, spots },
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
  time.value = "";
  spots.value = null;
};
</script>


<template>
  <form @submit.prevent="createEvent(title, description, date, time, spots)" >
    <fieldset class="create-event-fields">
        <div class="create-event-inputs">
        <input type="title" placeholder="Event title" v-model="title" required />
        <input type="description" placeholder="Event description" v-model="description" required />
        <input type="date" placeholder="Event date" v-model="date" required />
        <input type="time" placeholder="Event time" v-model="time" required />
        <input type="spots" placeholder="Event spots" v-model="spots" required />
        </div>
        <button type="submit" class="pure-button pure-button-primary">Create Event</button>
    </fieldset>
  </form>
</template>

<style scoped>
.create-event-fields {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin: 8px;
}

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
