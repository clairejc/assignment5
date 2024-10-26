import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchy } from "@/utils/fetchy";

export const useFriendshipsStore = defineStore(
  "friendships",
  () => {
    const hasFriendshipProfile = false;
    const userBio = ref("");
    const userPronouns = ref("");
    const userInterests = ref<string[]>([]); 
    const compatibleFriends = ref<any[]>([]); 

    const getCompatibleFriends = async () => {
      try {
        const response = await fetchy("/api/friend/compatible", "GET");
        compatibleFriends.value = response.friends; 
      } catch (error) {
        console.error("Failed to fetch compatible friends:", error);
      }
    };

    const createFriendshipHubProfile = async (bio: string, genderPronouns: string) => {
      await fetchy("/api/friend/profile", "POST", {
        body: { bio, genderPronouns },
      });
      userBio.value = bio;
      userPronouns.value = genderPronouns;
      userInterests.value = []; 
    };

    const editFriendshipHubProfile = async (bio: string, genderPronouns:string) => {
      await fetchy("/api/friend/profile", "PATCH", {
        body: { bio, genderPronouns },
      });
      userBio.value = bio;
      userPronouns.value = genderPronouns;
    };

    const deleteFriendshipProfile = async () => {
      await fetchy("/api/friend/profile", "DELETE");
      userBio.value = "";
      userPronouns.value = "";
      userInterests.value = [];

    };

    const getFriendInterests = async () => {
      try {
        const interests = await fetchy("/api/friend/profile/getinterests", "GET");
        userInterests.value = interests.interests;
      } catch {
        return;
      }
    };


    const getProfile = async () => {
      try {
        const { bio, genderPronouns, interests } = await fetchy("/api/friend/profiles", "GET", { alert: false });
        userBio.value = bio;
        userPronouns.value = genderPronouns;
        userInterests.value = interests;
        console.log(bio.value)
        console.log(genderPronouns.value)

      } catch {
        userBio.value = "";
        userPronouns.value = "";

      }
    };


    // Initialize store by checking the user's profile

    return {
      hasFriendshipProfile,
      userBio,
      userPronouns,
      userInterests,
      compatibleFriends,
      createFriendshipHubProfile,
      editFriendshipHubProfile,
      deleteFriendshipProfile,
      getFriendInterests,
      getCompatibleFriends,
      getProfile,
    };
  },
  { persist: true }
);
