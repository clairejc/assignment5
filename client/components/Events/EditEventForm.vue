<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["event"]);
const title = ref(props.event.title);
const organizer = ref(props.event.organizer);
const description = ref(props.event.description);
const date = ref(props.event.date);
const time = ref(props.event.time);
const spotsLeft = ref(props.event.spotsLeft);
const tags = ref(props.event.tags)
const emit = defineEmits(["editEvent", "refreshEvents", "cancelEdit"]);

const tag = ref("");
const editEvent = async () => {
  const updatedEvent = {
    _id: props.event._id,
    title: title.value,
    organizer: organizer.value,
    description: description.value,
    date: date.value,
    time: time.value,
    spotsLeft: spotsLeft.value,
    tags: tags.value,
  };

  try {
    await fetchy(`/api/eventhosts/${updatedEvent._id}`, "PATCH", { body: { title: updatedEvent.title, description: updatedEvent.description, date: updatedEvent.date, time: updatedEvent.time } });
    emit("editEvent", updatedEvent); // Emit the updated event
    emit("refreshEvents");
  } catch (e) {
    console.error("Failed to update event:", e);
  }
};

</script>

<template>
  <form @submit.prevent="editEvent">
    <p class="author">{{ props.event.author }}</p>
    <label>
      Title:
      <input v-model="title" placeholder="Event Title" />
    </label>
    <label>
      Description:
      <textarea v-model="description" placeholder="Event Description"></textarea>
    </label>
    <label>
      Date:
      <input type="date" v-model="date" />
    </label>
    <label>
      Time:
      <input type="time" v-model="time" />
    </label>
    <label>
      Spots left:
      <input type="number" v-model="spotsLeft" min="0" />
    </label>

    <!-- Add Event Tag Section -->
    <!-- <label>
      Add Tag:
    </label>
    <div class="tag-input">
      <input v-model="tag" placeholder="New Tag" />
      <button type="button" @click="addEventTag">Add Tag</button>
    </div> -->
    
    <div class="edit-form-bottom">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button-danger" @click="emit('cancelEdit')">Cancel</button></li>
      </menu>
      <div class="date-info">
      <p v-if="props.event.dateCreated !== props.event.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.event.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.event.dateCreated) }}</p>
      </div>
    </div>
  </form>
</template>

<style scoped>
.tag-input {
  display: flex;
  flex-direction: row;
}

.tag-input {
  input {
    margin: 4px;
  }

  button {
    margin: 4px;
  }
}

.tag-input.button {
  margin: 16px;
}

.edit-form-bottom {
  display: flex;
  flex-direction: column;
}

.date-info {
  align-self: flex-end;
  margin: 8px 0px 0px 0px;
}

form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.pure-button-primary {
  padding: 0.5em 1em;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pure-button-primary:hover {
  background-color: var(--primary-darker);
}

.pure-button-danger {
  padding: 0.5em 1em;
  background-color: var(--gray);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pure-button-danger:hover {
  background-color: var(--gray-darker);
}
</style>