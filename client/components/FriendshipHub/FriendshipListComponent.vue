<script setup lang="ts">
import CreateFriendshipProfile from "@/components/FriendshipHub/CreateFriendshipProfile.vue";
import EditFriendshipProfile from "@/components/FriendshipHub/EditFriendshipProfile.vue";
import DeleteFriendshipProfile from "@/components/FriendshipHub/DeleteFriendshipProfile.vue";
import CompatibleFriendsProfile from "@/components/FriendshipHub/CompatibleFriends.vue";
import AddInterests from "@/components/FriendshipHub/AddInterests.vue"
import FriendRequests from "@/components/FriendshipHub/FriendRequests.vue"

import { useUserStore } from "@/stores/user";
import { useFriendshipsStore } from "@/stores/friendships";

import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { hasFriendshipProfile, userBio, userPronouns } = storeToRefs(useFriendshipsStore());
const { getFriendInterests, getCompatibleFriends } = useFriendshipsStore();

const loaded = ref(false);

const hasProfile = ref(false);
const bio = ref("");
const pronouns = ref("");
const sentRequestFriends = ref([]);
const receivedRequestFriends = ref([]);
const friends = ref([]);

async function getProfile() {
  try {
    const { profile } = await fetchy("/api/friend/profiles", "GET", { alert: false });
    bio.value = profile.bio;
    pronouns.value = profile.genderPronouns;
    hasProfile.value = true;

  } catch {
    bio.value = "";
    pronouns.value = "";
    hasProfile.value = false;
  }
};

async function fetchFriendProfiles() {
    try {
        const sentToUsers = await fetchy("/api/friend/getsentrequests/profile", "GET"); 
        sentRequestFriends.value = sentToUsers;
        const receivedFromUsers = await fetchy("/api/friend/getreceivedrequests/profile", "GET"); 
        receivedRequestFriends.value = receivedFromUsers;
        const currentFriends = await fetchy("/api/friend/getfriends", "GET");
        friends.value = currentFriends; 
    } catch (error) {
        console.error("Error fetching friends (sent, received, and current):", error);
        return;
    }
}

onBeforeMount(async () => {
  await getProfile();
  await fetchFriendProfiles();
  loaded.value = true;
});

</script>

<template>
  <section v-if="isLoggedIn && !hasProfile">
    <CreateFriendshipProfile @profileCreated="getProfile" />
  </section>

  <section v-else-if="isLoggedIn && hasProfile">
    <EditFriendshipProfile @refreshEvents="getProfile" />
    <DeleteFriendshipProfile @profileDeleted="getProfile" />
    <AddInterests @refreshEvents="getFriendInterests" @interestAdded="getCompatibleFriends" @interestRemoved="getCompatibleFriends"/>
    <CompatibleFriendsProfile @refreshFriendProfiles="fetchFriendProfiles"/>
    <FriendRequests :sentRequestFriends="sentRequestFriends" :receivedRequestFriends="receivedRequestFriends" :friends="friends" @refreshFriendProfiles="fetchFriendProfiles"/>

  </section>
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