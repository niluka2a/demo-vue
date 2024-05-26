<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import UserProfileInfo from "@/components/userProfile/UserProfileInfo.vue";
import UserProfileActivities from "@/components/userProfile/UserProfileActivities.vue";

const userStore = useUserStore()

/**
 * Close modal.
 */
const closeModal = () => {
  userStore.userViewModal = false
  userStore.viewUser = {}
}
</script>

<template>
  <BModal
      v-model="userStore.userViewModal"
      title="Student Info"
      modalClass="demo-modal"
      size="lg"
      hideFooter
      @close="closeModal"
  >
    <div class="user-view-modal-wrapper">
      <UserProfileInfo :user="userStore.viewUser"/>
      <UserProfileActivities :activities="userStore.viewUser.activities"/>
    </div>
  </BModal>
</template>
