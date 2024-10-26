<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import InstructionComponent from "@/components/Instructions/InstructionComponent.vue";
</script>

<template>
  <main class="column">
    <InstructionComponent :pageType="'login'"/>
    <h1>Please login or register!</h1>
    <LoginForm />
    <RegisterForm />
  </main>
</template>
