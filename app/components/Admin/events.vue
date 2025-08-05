<template>
  <ul v-if="events.length !== 0 && !archived" class="my-4 space-y-8">
    <li v-for="(event, idx) in currentEvents" :key="event.id" class="flex flex-col sm:flex-row lg:w-[75%]">
      <!-- Left/Top Event (date) -->
      <div class="bg-brand-primary text-white font-bold text-2xl text-center py-3 sm:px-8 sm:flex sm:flex-col sm:justify-center min-w-28">
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
        <div :class="['space-y-2', { 'md:w-1/2': editModeStates[idx] }]">
          <div>
            <h3 v-if="!editModeStates[idx]" class="font-extrabold text-xl mb-2">{{ event.title }}</h3>
            <BaseFormInput v-else v-model="getEvent(idx).title" label="Title" :name="`title-${getEvent(idx).id}`" type="text"/>
          </div>
          <div>
            <p v-if="!editModeStates[idx]" class="leading-none font-semibold">{{  event.location }}</p>
            <BaseFormInput v-else v-model="getEvent(idx).location" label="Location" :name="`location-${getEvent(idx).id}`"  type="text"/>
          </div>
          <div>
            <p v-if="!editModeStates[idx]" class="leading-none font-semibold">{{  event.address }}</p>
            <BaseFormInput v-else v-model="getEvent(idx).address" label="Address" :name="`address-${getEvent(idx).id}`"  type="text"/>
          </div>
          <div class="break-words">
            <div v-if="!editModeStates[idx]">
              <p :class="[{ 'expand': expandedStates[idx] }, 'event-description leading-[1.2] mt-4 mb-2 text-[20px] text-zinc-600 font-semibold']">
                {{ event.description }}
              </p>
              <button 
                class="font-extrabold text-lg" @click="toggleDescription(idx)">
                <span v-if="expandedStates[idx]">less</span>
                <span v-else>more</span>
              </button>
            </div>
            <BaseFormTextArea v-else v-model="getEvent(idx).description" label="Description" :name="`description-${getEvent(idx).id}`"  type="text"/>
          </div>
          <div class="absolute bottom-4 right-4 flex gap-2">
            <button v-if="!editModeStates[idx]" @click="toggleEventEditState(idx)">Edit</button>
            <button v-if="editModeStates[idx]" @click="cancelEditEventState(idx)">Cancel</button>
            <button v-if="editModeStates[idx]" @click="saveEdit(idx)">Save</button>
            <button @click="showDeleteConfirmation((idx))">Delete</button>
          </div>
        </div>
        <div :class="[{ 'md:w-1/2 mb-8 sm:mb-0': editModeStates[idx] }]">
          <BaseUiAction v-if="!editModeStates[idx]" :href="event.link" rel="nofollow noopener noreferral" target="_blank" class="px-8 py-4 mt-8 group md:flex md:whitespace-nowrap"><span class="text-brand-secondary group-hover:text-brand-primary transition-colors duration-500 ease-in-out font-extrabold">+</span> <span>More Info</span></BaseUiAction>
          <div v-else class="space-y-2">
            <BaseFormInput v-model="getEvent(idx).link" label="Link" :name="`link-${getEvent(idx).id}`" type="text"/>
            <BaseFormDatePicker v-model="getEvent(idx).date" label="Date" :name="`date-${getEvent(idx).id}`"  />
            <BaseFormDatePicker v-model="getEvent(idx).dateTo" label="Date To" :name="`date-to-${getEvent(idx).id}`"  />
            <BaseFormToggleSwitch v-model="getEvent(idx).archived" label="Archived" :name="`archived-${getEvent(idx).id}`" />
          </div>
        </div>
      </div>
    </li>
  </ul>
  <ul v-if="events.length !== 0 && archived" class="flex flex-col gap-4">
    <li v-for="(event, idx) in currentEvents" :key="event.id" class="flex flex-col sm:flex-row lg:w-[75%]">
      <div class="bg-brand-primary text-white font-bold text-2xl text-center py-3 sm:px-8 sm:flex sm:flex-col sm:justify-center min-w-28">
        <div class="flex flex-col">
          <span>{{ getDateMonth(event.date) }}</span>
          <span>{{ getDateDay(event.date) }}</span>
        </div>
      </div>
      <div class="bg-[#d2d2ff] p-4 max-sm:rounded-b-lg sm:rounded-r-lg flex justify-between items-center w-full relative">
        <div>
          <h3 class="font-extrabold text-xl">{{ event.title }}</h3>
          <p class="leading-none font-semibold">{{  event.location }}</p>
          <p class="leading-none font-semibold">{{  event.address }}</p>
        </div>
        <div class="">
          <BaseFormToggleSwitch v-model="getEvent(idx).archived" label="Archived" :name="`archived-${getEvent(idx).id}`" @change="updateArchive(idx)" />
        </div>
      </div>
    </li>
  </ul>
  <div v-if="currentEvents.length === 0 && !loading && !archived" class="mt-4 bg-[#d2d2ff] rounded-lg w-full lg:w-[75%]">
    <p class="text-xl text-brand-main-text p-12 sm:py-20 sm:px-24 text-center">There are currently no events to edit.</p>
  </div>
  <div v-if="currentEvents.length === 0 && !loading && archived" class="mt-4 bg-[#d2d2ff] rounded-lg w-full lg:w-[75%]">
    <p class="text-xl text-brand-main-text p-12 sm:py-20 sm:px-24 text-center">There are currently no archived events to edit.</p>
  </div>
  <BaseInteractiveModal v-model="deleteConfirmationModal" hide-close tiny-modal :padding="2">
    <p>Are you sure you want to delete this event?</p>
    <div class="flex justify-end mt-2 gap-2">
      <BaseUiAction type="button" class="py-1 px-2" @click="confirmDelete">Yes</BaseUiAction>
      <BaseUiAction type="button" class="py-1 px-2" @click="cancelDelete">No</BaseUiAction>
    </div>
  </BaseInteractiveModal>
</template>

<script lang="ts" setup>
import type { EventsData, EventUpdateResponse } from '../../models/EventsData.js';

const props = withDefaults(defineProps<{
  events: EventsData;
  style?: 'default' | 'small';
  loading: boolean;
  archived?: boolean;
}>(), {
  style: 'default',
  archived: false,
})

const emit = defineEmits<{
  (e: 'eventsUpdated', events: EventsData): void
}>()

const editModeStates = ref<boolean[]>([]);
const expandedStates = ref<boolean[]>([]);
const currentEvents = ref<EventsData>([])
const lastSavedEvents = ref<EventsData>([])
const authStore = useAuthStore();
const result = ref<string | null>(null);

const deleteConfirmationModal = ref<boolean>(false)
const deleteIdx = ref<number | null>(null)

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
  editModeStates.value = new Array(currentEvents.value.length).fill(false);
};

const initializeExpandedStates = () => {
  expandedStates.value = new Array(currentEvents.value.length).fill(false);
};

const syncCurrentEventsWithProps = () => {
  // Deep copy the props.events to currentEvents
  currentEvents.value = props.events.map(event => ({ ...event }));
  lastSavedEvents.value = props.events.map(event => ({ ...event }));
  
  // Reinitialize all state arrays to match the new length
  initializeModeStates();
  initializeExpandedStates();
};

const initializeEvents = () => {
  syncCurrentEventsWithProps();
}

// CRITICAL: Watch for props.events changes (pagination loading more events)
watch(() => props.events, (newEvents, oldEvents) => {
  console.log('Props.events changed', {
    newLength: newEvents.length,
    oldLength: oldEvents ? oldEvents.length : 0
  });
  
  if (newEvents && newEvents.length !== currentEvents.value.length) {
    syncCurrentEventsWithProps();
  }
}, { deep: true, immediate: false });

const toggleEventEditState = (idx: number) => {
  editModeStates.value[idx] = !editModeStates.value[idx]
}

const toggleDescription = (idx: number) => {
  expandedStates.value[idx] = !expandedStates.value[idx];
} 

const cancelEditEventState = (idx: number) => {
  editModeStates.value[idx] = false
  
  const savedEvent = lastSavedEvents.value[idx]
  const originalEvent = props.events[idx]
  
  if (savedEvent && savedEvent.id && savedEvent.date && savedEvent.title) {
    currentEvents.value[idx] = { ...savedEvent }
  } else if (originalEvent) {
    currentEvents.value[idx] = { ...originalEvent }
  }
}

const saveEdit = async (idx: number) => {
  try {
    const eventToSave = getEvent(idx)
    const previousArchivedState = lastSavedEvents.value[idx]?.archived

    const idToken = await authStore.getIdToken();
    
    if (!idToken) {
      result.value = 'Error: No token available';
      return;
    }

    const response = await $fetch<EventUpdateResponse>(`/api/events/${eventToSave.id}`, {
      baseURL: 'https://api.goldengatemanor.com/',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventToSave)
    })
    
    editModeStates.value[idx] = false
    
    // Update lastSavedEvents with what we actually sent (or API response if preferred)
    if(response) {
      lastSavedEvents.value[idx] = { ...eventToSave }
      console.log('Event updated successfully:', response.message)
      emit('eventsUpdated', currentEvents.value)
      if (previousArchivedState !== eventToSave.archived) {
        window.location.reload()
        return
      }
    }
  } catch (err: unknown) {
    console.error('Failed to save event:', err)
  }
}
console.log(await authStore.getIdToken())

const updateArchive = async (idx: number) => {
  try {
    const eventToSave = getEvent(idx)
    const previousArchivedState = lastSavedEvents.value[idx]?.archived

    const idToken = await authStore.getIdToken();
    
    if (!idToken) {
      result.value = 'Error: No token available';
      return;
    }

    const response = await $fetch<EventUpdateResponse>(`/api/events/${eventToSave.id}/archive`, {
      baseURL: 'https://api.goldengatemanor.com/',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      }
    })
    
    editModeStates.value[idx] = false
    
    // Update lastSavedEvents with what we actually sent (or API response if preferred)
    if(response) {
      lastSavedEvents.value[idx] = { ...eventToSave }
      console.log('Event updated successfully:', response.message)
      emit('eventsUpdated', currentEvents.value)
      if (previousArchivedState !== eventToSave.archived) {
        window.location.reload()
        return
      }
    }
  } catch (err: unknown) {
    console.error('Failed to save event:', err)
  }
}

const showDeleteConfirmation = (idx: number) => {
  deleteIdx.value = idx
  deleteConfirmationModal.value = true
}

const cancelDelete = () => {
  deleteConfirmationModal.value = false
  deleteIdx.value = null
}

const confirmDelete = async () => {
  if (deleteIdx.value !== null) {
    await deleteEvent(deleteIdx.value)
  }
  deleteConfirmationModal.value = false
  deleteIdx.value = null
}

const deleteEvent = async (idx: number) => {
  try {
    const eventToDelete = getEvent(idx)

    const idToken = await authStore.getIdToken();
  
    const response = await $fetch<EventUpdateResponse>(`/api/events/${eventToDelete.id}`, {
      baseURL: 'https://api.goldengatemanor.com/',
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      }
    })
  
    if(response) {
      currentEvents.value.splice(idx, 1)
      lastSavedEvents.value.splice(idx, 1)
      editModeStates.value.splice(idx, 1)

      emit('eventsUpdated', currentEvents.value)

      console.log('Event deleted successfully:', response.message)
    }
  } catch (err: unknown) {
    console.error('Failed to save event:', err)
  }
}

onMounted(() => {
  initializeEvents()
})
</script>

<style scoped>
  .event-description {
    --max-lines: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: var(--max-lines);
    -webkit-line-clamp: var(--max-lines);
    position: relative;
  }

  .event-description::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(to bottom, transparent, #d2d2ff);
    width: 100%;
    height: 1.5rem;
    pointer-events: none;
  }

  .event-description.expand::before {
    display: none;
  }

  .event-description.expand {
    display: block;
  }
</style>