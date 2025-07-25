<template>
  <ul v-if="events.length !== 0" class="my-4 space-y-8">
    <li v-for="(event, idx) in currentEvents" :key="event.id" class="flex flex-col sm:flex-row lg:w-[75%]">
      <!-- Left/Top Event (date) -->
      <div class="bg-brand-primary text-white font-bold text-2xl text-center py-3 sm:px-8 sm:flex sm:flex-col sm:justify-center">
        <div v-if="!editModeStates[idx]">
          <div class="flex flex-col">
            <span>{{ getDateMonth(event.date) }}</span>
            <span>{{ getDateDay(event.date) }}</span>
          </div>
          <span v-if="event.dateTo">To</span>
          <div v-if="event.dateTo" class="flex flex-col">
            <span>{{ getDateMonth(event.dateTo) }}</span>
            <span>{{ getDateDay(event.dateTo) }}</span>
          </div>
        </div>
      </div>
      <!-- Right/Bottom Event (description) -->
      <div class="bg-[#d2d2ff] p-4 max-sm:rounded-b-lg sm:rounded-r-lg md:flex md:gap-4 md:items-center w-full md:justify-between relative">
        <div :class="['space-y-2', { 'sm:w-1/2': editModeStates[idx] }]">
          <div>
            <h3 v-if="!editModeStates[idx]" class="font-extrabold text-xl mb-2">{{ event.title }}</h3>
            <BaseFormInput v-else v-model="getEvent(idx).title" label="Title" name="title" type="text"/>
          </div>
          <div>
            <p v-if="!editModeStates[idx]" class="leading-none font-semibold">{{  event.location }}</p>
            <BaseFormInput v-else v-model="getEvent(idx).location" label="Location" name="location"  type="text"/>
          </div>
          <div>
            <p v-if="!editModeStates[idx]" class="leading-none font-semibold">{{  event.address }}</p>
            <BaseFormInput v-else v-model="getEvent(idx).address" label="Address" name="address"  type="text"/>
          </div>
          <div>
            <p v-if="!editModeStates[idx]" :class="['leading-[1.2] mt-4 mb-2 text-[20px] text-zinc-600 font-semibold']">
              {{ event.description }}
            </p>
            <BaseFormTextArea v-else v-model="getEvent(idx).description" label="Description" name="description"  type="text"/>
          </div>
          <div class="absolute bottom-4 right-4 flex gap-2">
            <button v-if="!editModeStates[idx]" @click="toggleEventEditState(idx)">Edit</button>
            <button v-if="editModeStates[idx]" @click="cancelEditEventState(idx)">Cancel</button>
            <button v-if="editModeStates[idx]" @click="saveEdit(idx)">Save</button>
            <button>Delete</button>
          </div>
        </div>
        <div :class="[{ 'sm:w-1/2': editModeStates[idx] }]">
          <BaseUiAction v-if="!editModeStates[idx]" :href="event.link" rel="nofollow noopener noreferral" target="_blank" class="px-8 py-4 mt-8 group md:flex md:whitespace-nowrap"><span class="text-brand-secondary group-hover:text-brand-primary transition-colors duration-500 ease-in-out font-extrabold">+</span> <span>More Info</span></BaseUiAction>
          <div v-else class="space-y-2">
            <BaseFormInput v-model="getEvent(idx).link" label="Link" name="link" type="text"/>
            <BaseFormDatePicker v-model="getEvent(idx).date" label="Date" name="date"  />
            <BaseFormDatePicker v-model="getEvent(idx).dateTo" label="Date To" name="date-to"  />
            <BaseFormToggleSwitch v-model="getEvent(idx).archived" label="Archived" name="archived" />
          </div>
        </div>
      </div>
    </li>
  </ul>
  <div v-if="events.length === 0 && !loading" class="mt-4 bg-[#d2d2ff] rounded-lg w-full lg:w-[75%]">
    <p class="text-xl text-brand-main-text p-12 sm:py-20 sm:px-24 text-center">New events are being planned! Check back soon or <nuxt-link to="/company/contact-us" class="link">contact us</nuxt-link> to stay updated.</p>
  </div>
</template>

<script lang="ts" setup>
import type { EventsData, EventUpdateResponse } from '../../models/EventsData.js';

const props = withDefaults(defineProps<{
  events: EventsData;
  style?: 'default' | 'small';
  loading: boolean;
}>(), {
  style: 'default'
})

const editModeStates = ref<boolean[]>([]);
const currentEvents = ref<EventsData>([])
const lastSavedEvents = ref<EventsData>([])

const createEmptyEvent = (): EventsData[0] => ({
  id: '',
  date: '',
  dateTo: undefined,
  title: '',
  archived: false,
  location: '',
  address: '',
  description: '',
  link: ''
})

const getEvent = (idx: number) => {
  return currentEvents.value[idx] || createEmptyEvent()
}

const getDateMonth = (date: string) => {
    const dateItem = new Date(date);

    if (dateItem && !isNaN(dateItem.getTime())) {
      const dateMonth = dateItem.toLocaleDateString('en-US', { month: 'long' }).length <= 4 ?  
      dateItem.toLocaleDateString('en-US', { month: 'long' }) : 
      dateItem.toLocaleDateString('en-US', { month: 'short' }) + '.';
        return dateMonth
    }
    return null;
};

const getOrdinalSuffix = (day: number): string => {
    // Handle special cases (11th, 12th, 13th)
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    
    // Handle regular cases based on last digit
    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

const getDateDay = (date: string) => {
    const dateItem = new Date(date);

    if (dateItem && !isNaN(dateItem.getTime())) {
        const day = dateItem.getDate();
        return day + getOrdinalSuffix(day);
    }
    return null;
};

const initializeModeStates = () => {
  editModeStates.value = new Array(props.events.length).fill(false);
};

const initializeEvents = () => {
  // Deep copy each event object
  lastSavedEvents.value = props.events.map(event => ({ ...event }))
  currentEvents.value = props.events.map(event => ({ ...event }))
  initializeModeStates()
}

const toggleEventEditState = (idx: number) => {
  editModeStates.value[idx] = !editModeStates.value[idx]
}

const cancelEditEventState = (idx: number) => {
  console.log('Before cancel - currentEvents:', currentEvents.value[idx])
  console.log('Saved event to revert to:', lastSavedEvents.value[idx])
  
  editModeStates.value[idx] = false
  
  const savedEvent = lastSavedEvents.value[idx]
  const originalEvent = props.events[idx]
  
  if (savedEvent && savedEvent.id && savedEvent.date && savedEvent.title) {
    currentEvents.value[idx] = { ...savedEvent }
    console.log('Reverted to saved event:', currentEvents.value[idx])
  } else if (originalEvent) {
    currentEvents.value[idx] = { ...originalEvent }
    console.log('Reverted to original event:', currentEvents.value[idx])
  }
}

const saveEdit = async (idx: number) => {
  try {
    const eventToSave = getEvent(idx)
    
    const response = await $fetch<EventUpdateResponse>(`/api/events/${eventToSave.id}`, {
      method: 'PUT',
      body: eventToSave
    })
    
    editModeStates.value[idx] = false
    
    // Update lastSavedEvents with what we actually sent (or API response if preferred)
    lastSavedEvents.value[idx] = { ...eventToSave }
    
    console.log('Event updated successfully:', response.message)
  } catch (err: unknown) {
    console.error('Failed to save event:', err)
  }
}

onMounted(() => {
  initializeEvents()
})
</script>

<style>
</style>