<script setup lang="ts">

import FriendshipListComponent from "@/components/FriendshipHub/FriendshipListComponent.vue";
import InstructionComponent from "@/components/Instructions/InstructionComponent.vue";
import { useFriendshipsStore } from "@/stores/friendships";
import { storeToRefs } from "pinia";

</script>

<template>
  <main class="column">
    <InstructionComponent :pageType="'friendship'"/>
    <FriendshipListComponent />



  </main>
</template>

