<script setup lang="ts">
import type {User} from "@/interface";

interface Props {
  user: User
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <h1>{{ props.user.name }}</h1>
    <h4>{{ props.user.role }}</h4>
  </div>
</template>