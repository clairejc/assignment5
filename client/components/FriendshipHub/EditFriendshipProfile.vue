<script setup lang="ts">
import { ref, onMounted,  } from "vue";
import { useUserStore } from "@/stores/user";
import { useFriendshipsStore } from "@/stores/friendships";
import { storeToRefs } from "pinia";

const bio = ref("");
const genderPronouns = ref("");
const { updateSession } = useUserStore();
const friendshipsStore = useFriendshipsStore();
const { getProfile, editFriendshipHubProfile } = friendshipsStore;
const { userBio, userPronouns} = storeToRefs(friendshipsStore);

onMounted(async () => {
  await getProfile();
  // bio.value = userBio.value; 
  // genderPronouns.value = userPronouns.value; 

});

async function create() {
  await editFriendshipHubProfile(bio.value, genderPronouns.value);
  await updateSession();
  bio.value = "";
  genderPronouns.value = "";
}

</script>

<template>
  <form class="pure-form pure-form-aligned edit-friendship-form" @submit.prevent="create">
    <h3>Edit FriendshipHub Profile</h3>
    <fieldset class="edit-friendship-form">
      <div class="pure-control-group">
        <label for="aligned-bio">Bio</label>
        <input v-model="bio" type="text" id="aligned-bio" :placeholder="userBio" required />
      </div>

      <div class="pure-control-group">
        <label for="aligned-genderPronouns">Gender Pronouns</label>
        <input v-model="genderPronouns" type="text" id="aligned-genderPronouns" :placeholder="userPronouns" required />
      </div>
    

      <div>
        <button type="submit" class="pure-button pure-button-primary">Edit Profile</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.edit-friendship-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 0px;

  button {
    margin: 8px 0px 0px 0px;
  }
}
h3 {
  display: flex;
  justify-content: center;
}

.pure-button {
  background-color: var(--primary);
}

.pure-button:hover {
  background-color: var(--primary-darker);
}
</style>