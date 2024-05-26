<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";
import {useCourseStore} from "@/stores/course";
import {onMounted, ref} from "vue";
import {ROLES} from "@/constants";
import UserProfileTeacherCourses from "@/components/userProfile/UserProfileTeacherCourses.vue";
import UserProfileStudentCourses from "@/components/userProfile/UserProfileStudentCourses.vue";
import UserProfileAddress from "@/components/userProfile/UserProfileAddress.vue";
import UserProfileInfo from "@/components/userProfile/UserProfileInfo.vue";
import UserProfileActivities from "@/components/userProfile/UserProfileActivities.vue";

const authStore = useAuthStore()
const userStore = useUserStore()
const courseStore = useCourseStore()

const pageLoading = ref<boolean>(true)

onMounted(async () => {
  await userStore.fetchUser()

  if (JSON.parse(localStorage.getItem('user')).role_id === ROLES.TEACHER.key) {
    await courseStore.fetchCourses()
  }

  pageLoading.value = false
})

/**
 * Logout.
 */
const logout = async () => {
  await authStore.logout()
}
</script>

<template>
  <section class="vh-100" style="background-color: #f7d450;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-8">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black" v-if="!pageLoading">
                  <div class="mb-3 pb-1">
                    <button type="button" class="btn btn-secondary mb-2" @click="logout()">Logout</button>
                    <UserProfileInfo :user="userStore.user"/>
                    <UserProfileAddress/>
                    <div v-if="userStore.user.role === ROLES.STUDENT.name">
                      <UserProfileStudentCourses :courses="userStore.user.courses"/>
                      <UserProfileActivities :activities="userStore.user.activities"/>
                    </div>
                    <div v-if="userStore.user.role === ROLES.TEACHER.name">
                      <UserProfileTeacherCourses :courses="courseStore.courses"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
