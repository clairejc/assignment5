<script setup lang="ts">
import CreateEventForm from "@/components/Events/CreateEventForm.vue";
import EditEventForm from "@/components/Events/EditEventForm.vue";
import EventComponent from "@/components/Events/EventComponent.vue";
import EventSignUp from "@/components/Events/EventSignUp.vue"; 
import EventRemoveSignUp from "@/components/Events/EventRemoveSignUp.vue"; 
import EventWaitlist from "@/components/Events/EventWaitlist.vue"; 
import EventRemoveWaitlist from "@/components/Events/EventRemoveWaitlist.vue"; 
import SearchEventForm from "@/components/Events/SearchEventForm.vue";


import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
const { currentId, currentUsername } = storeToRefs(useUserStore());


const { isLoggedIn } = storeToRefs(useUserStore());
const emit = defineEmits(["editEvent", "refreshEvents", "cancelEdit"]);


const loaded = ref(false);
let events = ref<Array<Record<string, string>>>([]);
let authors = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

async function getEvents(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let results;
  try {
    results = await fetchy("/api/eventhosts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  events.value = results.events;
  authors.value = results.authors;
}

async function editEvent(updatedEvent: Record<string, string>) {
  try {
    const { _id, title, description, date } = updatedEvent;
    await fetchy(`/api/eventhosts/${_id}`, "PATCH", { body: { title, description, date } });

    const index = events.value.findIndex(event => event._id === _id);
    if (index !== -1) {
      events.value[index] = { ...events.value[index], title, description, date };
    }

    editing.value = ""; 
  } catch (error) {
    console.error("Failed to edit event:", error);
  }
}

async function deleteEvent(eventId: string) {
  try {
    await fetchy(`/api/eventhosts/${eventId}`, "DELETE");
    events.value = events.value.filter(event => event._id !== eventId);
    emit("refreshEvents");

  } catch (error) {
    console.error("Failed to delete event:", error);
  }
}


function updateEditing(id: string) {
  editing.value = id;
}

// const handleEditEvent = (updatedEvent: Record<string, string>) => {
//   editEvent(updatedEvent);
//   editing.value = ""; 
// };

// const cancelEdit = () => {
//   editing.value = ""; 
// };

onBeforeMount(async () => {
  await getEvents();
  loaded.value = true;
});

</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create An Event:</h2>
    <CreateEventForm @refreshEvents="getEvents" />

    <h2>Search Events by Organizer:</h2>
    <SearchEventForm @getEventsbyAuthor="getEvents" />
    
    <h2 v-if="!searchAuthor">Events:</h2>
    <h3 v-else>Events by {{ searchAuthor }}:</h3>
  </section>

  
  <section class="events" v-if="loaded && events.length !== 0">
    <article class="event" v-for="(event, index) in events" :key="event._id">
      <EventComponent v-if="editing !== event._id" :event="event" :author="authors[index]" @refreshEvents="getEvents" @editEvent="updateEditing" />
      <EditEventForm v-else :event="event" @refreshEvents="getEvents" @editEvent="updateEditing" />
      
      <div class="modify-event" v-if="currentId === event.organizer">
      <button class="pure-button pure-button-primary" v-if="editing !== event._id && currentId === event.organizer" @click="updateEditing(event._id)">Edit</button>
      <button class="pure-button pure-button-danger" v-if="currentId === event.organizer" @click="deleteEvent(event._id)">Delete</button>
      </div>

      <div class="event-interaction">
      <EventSignUp v-if="editing !== event._id && currentId != event.organizer && !event.signups.includes(currentId) && !event.waitlists.includes(currentId) && Number(event.spots) - event.signups.length > 0" :event="event" @refreshEvents="getEvents"/>
      <EventRemoveSignUp v-if="editing !== event._id && currentId != event.organizer && event.signups.includes(currentId)" :event="event" @refreshEvents="getEvents"/>
      <EventWaitlist v-if="editing !== event._id && currentId != event.organizer && !event.signups.includes(currentId) && !event.waitlists.includes(currentId) && Number(event.spots) - event.signups.length === 0" :event="event" @refreshEvents="getEvents"/>
      <EventRemoveWaitlist v-if="editing !== event._id && currentId != event.organizer && event.waitlists.includes(currentId) && Number(event.spots) - event.signups.length === 0" :event="event" @refreshEvents="getEvents"/>
      </div>
    </article>
  </section>
</template>

<style scoped>

.modify-event {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  padding: 0px;
  margin: 0px;
}
.event-interaction {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px;
  margin: 0px;
}

h2 {
  margin: 4px 16px;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.events {
  padding: 1em;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: flex-start;
}

.event {
  margin: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
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