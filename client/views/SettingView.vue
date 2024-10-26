<script setup lang="ts">
import InstructionComponent from "@/components/Instructions/InstructionComponent.vue";
import LogoutForm from "@/components/Setting/LogoutForm.vue";
import DeleteAcc from "@/components/Setting/DeleteAccForm.vue";
</script>

<template>
  <main class="column">
    <InstructionComponent :pageType="'setting'"/>
    <h1>Please logout or delete account!</h1>
    <LogoutForm />
    <DeleteAcc />
  </main>
</template>
