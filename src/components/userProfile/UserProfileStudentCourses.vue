<script setup lang="ts">
import type {Course} from "@/interface";

interface Props {
  courses: Course[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="student-classes mt-2 mb-2" v-if="props.courses">
    <h5>Course(s)</h5>
    <ul class="list-group">
      <li class="list-group-item" v-for="course in props.courses" :key="`course-${course.id}`">
        {{ course.grade }} - Class {{ course.name }}
      </li>
    </ul>
  </div>
</template>