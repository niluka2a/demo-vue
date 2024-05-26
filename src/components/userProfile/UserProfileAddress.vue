<script setup lang="ts">
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()
</script>

<template>
  <div v-if="userStore.user.address">
    <p class="mb-0 pb-0">
      {{ userStore.user.address?.line_1 }},
      {{ userStore.user.address?.line_2 }}
    </p>
    <p class="mb-0 pb-0">{{ userStore.user.address?.city }}</p>
    <p class="mb-0 pb-0">{{ userStore.user.address?.zip_code }}</p>
  </div>
</template>