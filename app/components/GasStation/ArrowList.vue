<template>
  <div>
    <BaseLayoutPageArrowListItem v-for="(location, idx) in locations" :key="location.id" :color="location.arrowColor">
          <template #number>{{ `0${idx + 1}`}}</template>
          <template #default>
            <div class="pl-36 md:pl-24 py-4">
              <div class="text-xl font-bold">
                <span>{{ location.title }}</span><span class="max-[950px]:hidden">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><a :href="`tel:${location.phone}`" class="link-light max-[950px]:hidden">{{ locations[0]?.phone }}</a>
              </div>
              <ul class="ml-6 border-l-[4px] border-l-brand-primary pl-2 text-white font-bold">
                <li v-for="detail in location.details" :key="detail">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </template>
        </BaseLayoutPageArrowListItem>
  </div>
</template>

<script lang="ts" setup>
const company = useStaticData()?.company;

type Locations = {
  id: string;
  arrowColor: "red" | "green",
  title: string;
  phone: string;
  details: string[];
}

// Always initialize the variable
const locations: Locations[] = [];

if (company) {
  locations.push(
    {
      id: "ggmc-1",
      arrowColor: "red",
      title: `South Prairie Avenue: ${company.gasStation.ggmc1.address}`,
      phone: company.gasStation.ggmc1.phone,
      details: [
        "Expanded from 152 sq ft to over 1000 sq ft!",
        "Features our new beer cave with expanded selection",
      ],
    },
    {
      id: "ggmc-2",
      arrowColor: "green",
      title: `Elizabeth Street: ${company.gasStation.ggmc2.address}`,
      phone: company.gasStation.ggmc2.phone,
      details: [
        "Completely renovated with modern amenities",
        "Expanded product selection",
      ],
    }
  );
}
</script>

<style>

</style>