<script setup lang="ts">
import type {Activity} from "@/interface";

interface Props {
  activities?: Activity[]
}

const props = defineProps<Props>()
</script>

<template>
  <div v-if="props.activities">
    <div class="mt-2">
      <h5>Activities</h5>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">Activity</th>
          <th scope="col">Subject</th>
          <th scope="col">Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="activity in props.activities">
          <td>{{ activity.name }}</td>
          <td>{{ activity.subject }}</td>
          <td>{{ activity.score ?? 'n/a' }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>