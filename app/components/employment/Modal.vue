<template>
  <BaseInteractiveModal v-if="modalContent" v-model="modalOpen" @close="emit('close')">
    <div class="flex flex-col p-4">
      <h2 class="text-2xl font-bold text-brand-primary pb-2 border-b border-b-brand-primary mb-4">{{ modalContent.title }}</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-bold mb-2">Job Description</h3>
          <p>{{ modalContent.description }}</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-2">Job Responsibilities</h3>
          <ul class="list-disc ml-8">
            <li v-for="responsibility in modalContent.responsibilities" :key="responsibility">
              {{ responsibility }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-2">Shifts</h3>
          <ul class="list-disc ml-8">
            <li v-for="shift in modalContent.shifts" :key="shift">
              {{ shift }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-2">Minimum Qualifications</h3>
          <ul class="list-disc ml-8">
            <li v-for="qualification in modalContent.qualifications" :key="qualification">
              {{ qualification }}
            </li>
          </ul>
        </div>
      </div>
      <BaseUiAction :to="`/company/employment/apply?select=${modalContent.select}`" class="py-2 px-4 self-center mt-8">Apply Now</BaseUiAction>
    </div>
  </BaseInteractiveModal>
</template>

<script lang="ts" setup>
import type { JobDescription } from '../../models/JobDescription.js';

defineProps<{
  modalContent: JobDescription | null;
}>()

const modalOpen = ref<boolean>(false);

const emit = defineEmits<{
  close: []
}>();

</script>

<style>

</style>