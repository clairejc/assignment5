<script setup lang="ts">
import EventListComponent from "@/components/Events/EventListComponent.vue";
import InstructionComponent from "@/components/Instructions/InstructionComponent.vue";
</script>

<template>
  <main class="column">
    <InstructionComponent :pageType="'event'"/>
    <EventListComponent />
  </main>
</template>
