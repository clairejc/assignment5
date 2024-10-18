import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { fetchy } from "@/utils/fetchy";


export const useProfileStore = defineStore(
    "profile",
    () => {
      const currentUsername = ref("");
      const currentName = ref("");
      const currentLanguage = ref("");
      const currentCity = ref("");
      const currentState = ref("");


    const getProfile = async () => {

        try {
            const { username, name, language, city, state } = await fetchy("/api/profiles/info", "GET");
            currentUsername.value = username;
            currentName.value = name;
            currentLanguage.value = language;
            currentCity.value = city;
            currentState.value = state;

        } catch {
            currentUsername.value = "";
            currentName.value = "";
            currentLanguage.value = "";
            currentCity.value = "";
            currentState.value = "";
        }
    }

    const resetStore = () => {
        currentUsername.value = "";
      };

    const updateUserUsername = async (username: string) => {
        await fetchy("/api/profiles/username", "PATCH", { body: { username } });
    };

    const updateUserPassword = async (currentPassword: string, newPassword: string) => {
        await fetchy("/api/profiles/password", "PATCH", { body: { currentPassword, newPassword } });
    };

    const updateUserName = async (newName: string) => {
        await fetchy("/api/profiles/name", "PATCH", { body: { newName } });
    };

    const updateUserLocation = async (newCity: string, newState: string) => {
        await fetchy("/api/profiles/location", "PATCH", { body: { newCity, newState} });
    };


    const updateUserLanguage = async (newLanguage: string) => {
        await fetchy("/api/profiles/language", "PATCH", { body: { newLanguage} });
    };

  

    return {
        currentUsername,
        currentName,
        currentLanguage,
        currentCity,
        currentState,
        getProfile,
        updateUserUsername,
        updateUserPassword,
        updateUserName,
        updateUserLocation,
        updateUserLanguage,
      };
    },
    { persist: true },
);