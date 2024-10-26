<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  pageType: {
    type: String,
    required: true
  }
});

const instructionToggled = ref(false);

function toggleInstructions() {
    instructionToggled.value = !instructionToggled.value;
}
</script>

<template>
  <div class="instructions-box">
    <button v-if="!instructionToggled"class="instructions-toggler" @click="toggleInstructions">i</button>
    <button v-else class="instructions-toggler" @click="toggleInstructions">X</button>
    <div v-if="instructionToggled">
      <div class="instructions-content" v-if="props.pageType === 'event'">
      Create An Event: <br>

        1. Enter a simple event title. <br>
        2. Write a detailed event description. <br>
        3. Select a date for the event to be on. <br>
        4. Provide the number of spots available for event. <br> 
        5. Click "Create Event". <br>
        
      
      Search events by author: <br>
        1. Enter the username of an organizer whose events you want to view. <br>
        2. Click "Search". <br>


      Events: <br>
        1. Scroll through Events. <br>
        2. Click "Sign Up" to sign up for event. <br>
        3. Click "Remove Sign Up" to remove your sign up for the event. <br>
        4. Click "Join Waitlist" to join waitlist for event. <br>
        5. Click "Remove Waitlist" to remove waitlist sign up for the event. <br>
      </div>
      <div class="instructions-content" v-if="props.pageType === 'friendship'">

        Create FriendshipHub Profile:  <br>
        1. Enter a descriptive bio for other FriendshipHub users to get to know more about you! <br>
        2. Enter your gender pronouns to be displayed on your profile. <br>
        <br>
        Edit FriendshipHub Profile: <br>
        1. Enter an edited bio for other FriendshipHub users to get to know more about you! <br>
        2. Edit your gender pronouns to be displayed on your profile. <br>
        <br>
        Delete FriendshipHub Profile: <br>
        1. If you want to delete you FriendsipHub Profile click “Delete FriendshipHub Profile”. <br>
        <br>
        Add Interest: Adding interests will help reach more friends who share similar interests as you. <br>
        1. Enter a one word string. <br>
        2. Click “Add” button. <br>
        <br>
        Remove Interest:<br>
        1. Look at your current interests.<br>
        2. Enter a one word string from the words displayed that you would like to remove.<br>
        3. Click “Remove” button.<br>

        <br>
        Compatible Friends: See your compatible friends one by one and befriend them if interested. <br>
        1. See a potential friend displayed. <br>
        2. If interested, in Message, type out a message to send a friend request to them. Click “Send”. <br>
        3. If not interested, click “Next” to view next potential friend. <br>
        <br>
        Sent Friend Requests: See your sent requests that are still pending.  <br>
        1. Click each username box to see the current chat status. <br>
        <br>
        Received Friend Requests: See pending requests that other people have sent you. <br>
        1. Click each username box and type/send a message to accept request. <br>
        <br>
        Friends: See all friends and message exchanges with them. <br>
        1. Click each username box and type/send a message to continue the conversation. <br>
      </div>
      <div class="instructions-content" v-if="props.pageType === 'home'">
      Home: <br>
        1. Login first if you have not already <br>
        2. Look at the top right corner of the page. <br>
        3. Select which app feature to navigate to. <br>
        4. Profile: Edit your basic user information. <br>
        5. Events: Create events and sign up for events to meet more people who share your interests! <br>
        6. FriendshipHub: 65+ Create profile and match/chat with friends who share hobbies! <br>
        7. Settings: Logout of or delete your account.
      </div>
      <div class="instructions-content" v-if="props.pageType === 'login'">
      Login: If you already have an account <br>
        1. Enter your TimelessTalk username. <br>
        2. Enter the associated password. <br>
        3. Click “Login” button.  <br>
        <br>
      Signup: If you don’t have an account yet <br>
        1. Enter a unique TimelessTalk username. <br>
        2. Enter a secure password. <br>
        3. Enter your full name (First Last). <br>
        4. Enter your age. <br>
      </div>
      <div class="instructions-content" v-if="props.pageType === 'profile'">
      Profile  <br>
        1. See your current TimelessTalk profile information at the top of the page. <br>
        2. To change your username: Enter a unique and new username and click “Update Username”<br>
        3. To change your password: Enter your old password  and new password and click “Update Password” <br>
        4. To change your name: Enter a new name and click “Update Name” <br>
        5. To change your location: Enter a new City or State and click “Update Location” <br>
      </div>
      <div class="instructions-content" v-if="props.pageType === 'setting'">
      Settings: <br>
        1. To logout of your account after using, click “Logout”. <br>
        2. To delete your current account, click “Delete Account”. <br>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add styling for the button or modal */

.instructions-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 16px;
}

.instructions-toggler {
  align-self: flex-end;
  font-family: "Brush Script MT", cursive;
  font-size: 18px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
</style>


