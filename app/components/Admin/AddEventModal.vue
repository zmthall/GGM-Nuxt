<template>
  <BaseInteractiveModal v-model="modalOpen" hide-close :padding="6">
    <h2 class="text-2xl text-brand-primary font-bold">Add a new event:</h2>
    <form class="h-full flex flex-col justify-between overflow-auto p-4" @submit.prevent="addEvent">
      <div class="bg-[#d2d2ff] p-6 rounded-lg w-full relative my-2">
        <div>
          <div>
            <BaseFormInput v-model="newEvent.title" label="Title" name="title" type="text"/>
          </div>
          <div>
            <BaseFormInput v-model="newEvent.location" label="Location" name="location"  type="text"/>
          </div>
          <div>
            <BaseFormInput v-model="newEvent.address" label="Address" name="address"  type="text"/>
          </div>
          <div>
            <BaseFormTextArea v-model="newEvent.description" label="Description" name="description"  type="text"/>
            <div class="flex justify-end">
              <span v-if="newEvent.description.length < 200">{{ newEvent.description.length }}/200</span>
            </div>
          </div>
        </div>
        <div>
          <div class="space-y-2">
            <BaseFormInput v-model="newEvent.link" label="Link" name="link" type="text"/>
            <BaseFormDatePicker v-model="newEvent.date" label="Date" name="date" date-format="m/d/Y"  />
            <BaseFormDatePicker v-model="newEvent.dateTo" label="Date To" name="date-to"  />
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-8">
        <BaseUiAction type="button" class="py-4 px-8" @click="cancelAddEvent">Cancel</BaseUiAction>
        <BaseUiAction type="submit" class="py-4 px-8">Add Event</BaseUiAction>
      </div>
    </form>
  </BaseInteractiveModal>
</template>

<script lang="ts" setup>
import type { AddEventData } from '../../models/EventsData.js';

const modalOpen = defineModel<boolean>();
const authStore = useAuthStore();

const newEvent = reactive<AddEventData>({
  date: '',
  dateTo: undefined,
  title: '',
  location: '',
  address: '',
  description: '',
  link: ''
})

useHead({
  bodyAttrs: {
    class: computed(() => (modalOpen.value) ? 'no-scroll' : '')
  }
})

const cancelAddEvent = () => {
  modalOpen.value = false
}

const addEvent = async () => {
  const addEventData = { ...newEvent }

  if(addEventData.link && !(addEventData.link.startsWith('http://') || addEventData.link.startsWith('https://')))
    addEventData.link = `https://${addEventData.link}`

  const idToken = await authStore.getIdToken();

  try {
    const response = await $fetch(`/api/events`, {
      baseURL: 'http://127.0.0.1:4000',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addEventData)
    })

    if(response) {
      window.location.reload()
    }
  } catch (err: unknown) {
    console.error('Failed to add event:', err)
  }
}
</script>

<style>

</style>