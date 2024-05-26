<script setup lang="ts">
import type {Course, User} from "@/interface";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()

interface Props {
  courses: Course[]
}

const props = defineProps<Props>()

/**
 * View student info.
 */
const viewStudent = async (student: User) => {
  await userStore.fetchStudent(student)

  userStore.userViewModal = true
}
</script>

<template>
  <div class="teacher-classes" v-if="props.courses">
    <ul class="list-group">
      <li class="list-group-item" v-for="course in props.courses" :key="`course-${course.id}`">
        {{ course.grade }} - Class {{ course.name }}
        <div class="students-list">
            <span class="student-name" v-for="student in course.students" @click="viewStudent(student)">
              {{ student.name }}
            </span>
        </div>
      </li>
    </ul>
  </div>
  <UserViewModal/>
</template>

<style scoped>
.students-list span.student-name {
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #cccccc;
  padding: 3px 8px;
  margin-right: 4px;
  cursor: pointer;
}
</style>