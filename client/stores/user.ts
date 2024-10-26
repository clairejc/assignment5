import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");
    const currentId = ref("");

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const createUser = async (username: string, password: string, name: string, phone: number, age: number) => {
      await fetchy("/api/users", "POST", {
        body: { username, password, name, phone, age },
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });

    };

    const updateSession = async () => {
      try {
        const { username, _id } = await fetchy("/api/session", "GET", { alert: false });
        currentUsername.value = username;
        currentId.value = _id;

      } catch {
        currentUsername.value = "";
        currentId.value = "";
      }
    };


    return {
      currentUsername,
      currentId,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
    };
  },
  { persist: true },
);