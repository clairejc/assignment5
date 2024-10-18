import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useSettingsStore = defineStore(
    "settings",
    () => {
      const currentUsername = ref("");

    const logoutUser = async () => {
        await fetchy("/api/logout", "POST");
        currentUsername.value = "";
    };

    const deleteUser = async () => {
        await fetchy("/api/profiles", "DELETE");
        console.log('hi')
        currentUsername.value = "";
    };
  

    return {
        logoutUser,
        deleteUser,
      };
    },
    { persist: true },
);