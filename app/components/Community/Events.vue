<template>
  <ul v-if="events.length !== 0" class="my-4 space-y-8">
    <li v-for="(event, idx) in events" :key="event.id" class="flex flex-col sm:flex-row lg:w-[75%]">
      <!-- Left/Top Event (date) -->
      <div class="bg-brand-primary text-white font-bold text-2xl text-center py-3 sm:px-8 sm:flex sm:flex-col sm:justify-center min-w-28">
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
      <!-- Right/Bottom Event (description) -->
      <div class="bg-[#d2d2ff] p-4 max-sm:rounded-b-lg sm:rounded-r-lg md:flex md:gap-4 md:items-center w-full md:justify-between">
        <div>
          <h3 class="font-extrabold text-xl mb-2">{{ event.title }}</h3>
          <p class="leading-none font-semibold">{{  event.location }}</p>
          <p class="leading-none font-semibold">{{  event.address }}</p>
          <div>
            <p :class="[{ 'expand': expandedStates[idx] }, 'event-description leading-[1.2] mt-4 mb-2 text-[20px] text-zinc-600 font-semibold']">
              {{ event.description }}
            </p>
            <button 
              class="font-extrabold text-lg" @click="toggleDescription(idx)">
              <span v-if="expandedStates[idx]">less</span>
              <span v-else>more</span>
            </button>
          </div>
        </div>
        <BaseUiAction :href="event.link" rel="nofollow noopener noreferral" target="_blank" class="px-8 py-4 mt-8 group md:flex md:whitespace-nowrap"><span class="text-brand-secondary group-hover:text-brand-primary transition-colors duration-500 ease-in-out font-extrabold">+</span> <span>More Info</span></BaseUiAction>
      </div>
    </li>
  </ul>
  <div v-else class="mt-4 bg-[#d2d2ff] rounded-lg w-full lg:w-[75%]">
    <p class="text-xl text-brand-main-text p-12 sm:py-20 sm:px-24 text-center">New events are being planned! Check back soon or <nuxt-link to="/company/contact-us" class="link">contact us</nuxt-link> to stay updated.</p>
  </div>
</template>

<script lang="ts" setup>
import type { EventsData } from '../../models/EventsData.js';

const expandedStates = ref<boolean[]>([]);

const props = withDefaults(defineProps<{
  events: EventsData;
  style?: 'default' | 'small';
}>(), {
  style: 'default'
})

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

const initializeExpandedStates = () => {
  expandedStates.value = new Array(props.events.length).fill(false);
};

const toggleDescription = (idx: number) => {
  expandedStates.value[idx] = !expandedStates.value[idx];
} 

onMounted(() => {
  initializeExpandedStates();
});
</script>

<style>
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