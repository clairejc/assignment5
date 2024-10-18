<script setup lang="ts">
import CreateEventForm from "@/components/Events/CreateEventForm.vue";
import EditEventForm from "@/components/Events/EditEventForm.vue";
import EventComponent from "@/components/Events/EventComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchEventForm from "@/components/Events/SearchEventForm.vue";
import LoginFormVue from "../Login/LoginForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

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

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getEvents();
  loaded.value = true;
});

</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create an event:</h2>
    <CreateEventForm @refreshEvents="getEvents" />
  </section>
  <div class="row">
    <h2 v-if="!searchAuthor">Events:</h2>
    <h2 v-else>Events by {{ searchAuthor }}:</h2>
    <SearchEventForm @getEventsbyAuthor="getEvents" />
  </div>
  <section class="events" v-if="loaded && events.length !== 0">
    <article v-for="(event, index) in events" :key="event._id">
      <!-- displaying event compoennt if not editing and as an edit event form if editing it -->
      <EventComponent v-if="editing !== event._id" :event="event" :author="authors[index]" @refreshEvents="getEvents" @editEvent="updateEditing" />
      <EditEventForm v-else :event="event" @refreshEvents="getEvents" @editEvent="updateEditing" />
    </article>
  </section>
  <!-- <p v-else-if="loaded">No events found</p>
  <p v-else>Loading...</p> -->
</template>

<style scoped>
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
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
