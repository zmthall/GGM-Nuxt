<template>
  <div class="max-sm:mt-4">
    <h2 class="text-2xl font-bold text-brand-primary">Assisted Living FAQ's</h2>
    <ul class="space-y-4 mt-4">
      <li>
          <BaseInteractiveAccordionButton
            id="services-assisted-living"
            :active-id="activeAccordionIdAssistedLiving"
            label="What services are included in assisted living?"
            :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'services-assisted-living' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'services-assisted-living' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'services-assisted-living' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
            @update:active-id="updateIdAssistedLiving">
            <div class="space-y-4">
              <div>
                <p class="text-xl text-white">
                  Our assisted living services include:
                </p>
                <ul class="ml-8 list-disc text-xl">
                  <li>
                    Daily care assistance with personal hygiene, dressing, and mobility
                  </li>
                  <li>
                    3 Nutritious meals and snacks provided throughout the day
                  </li>
                  <li>
                    Transportation to medical appointments
                  </li>
                  <li>
                    Medication management and assistance
                  </li>
                  <li>
                    Light housekeeping and laundry services
                  </li>
                  <li>
                    Scheduling and coordination of appointments
                  </li>
                  <li>
                    Access to recreational activities and amenities
                  </li>
                </ul>
              </div>
              <p class="text-xl text-white">
                For a complete list of our amenities and services, please visit our <NuxtLink to="/assisted-living" class="link">Assisted Living page</NuxtLink> or <NuxtLink to="/company/contact-us">Contact Us</NuxtLink> directly.
              </p>
            </div>
          </BaseInteractiveAccordionButton>
        </li>
      <li>
          <BaseInteractiveAccordionButton
            id="assisted-living-right"
            :active-id="activeAccordionIdAssistedLiving"
            label="How do I know if assisted living is for me or my loved one?"
            :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'assisted-living-right' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'assisted-living-right' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'assisted-living-right' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
            @update:active-id="updateIdAssistedLiving">
              <div class="space-y-4">
                <div>
                  <p class="text-xl text-white">
                    If you or your loved one requires one or more of the following, assisted living may be for you:
                  </p>
                  <ul class="ml-8 list-disc text-xl">
                    <li>
                      Needs help with daily activities like bathing, dressing, or medication management
                    </li>
                    <li>
                      Wants to maintain independence while having support available
                    </li>
                    <li>
                      Would benefit from social interaction and community activities
                    </li>
                    <li>
                      Requires assistance with housekeeping, meals, or transportation
                    </li>
                    <li>
                      Is looking for a safe, secure environment with 24-hour staff availability
                    </li>
                    <li>
                      No longer feels comfortable living alone but doesn't need full nursing care
                    </li>
                  </ul>
                </div>
                <p class="text-xl text-white">
                  Our team can help assess your specific needs during a consultation. We encourage you to schedule a tour and speak with our staff to determine if our level of care matches what you're looking for.
                </p>
              </div>
          </BaseInteractiveAccordionButton>
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="cost-of-assisted-living"
            :active-id="activeAccordionIdAssistedLiving"
            label="What is the cost of assisted living at Golden Gate Manor?"
            :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'cost-of-assisted-living' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'cost-of-assisted-living' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'cost-of-assisted-living' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
            @update:active-id="updateIdAssistedLiving">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  Without insurance, out-of-pocket expenses depend on your monthly income, plus there would be monthly fees. The best answer regarding cost would be to contact us directly for a personalized quote.
                </p>
                <p class="text-xl text-white">
                  With Medicaid, there would be an out-of-pocket expense of $797, and Medicaid would cover the rest of the out-of-pocket expenses. There is also a specific amount of spending money allotted, which would require further conversations to understand the exact amount as it can change.
                </p>
                <p class="text-xl text-white">
                  <NuxtLink to="/company/contact-us" class="link">Contact us</NuxtLink> directly to discuss your specific situation and get accurate pricing information.
                </p>
              </div>
          </BaseInteractiveAccordionButton>
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="whats-the-difference"
            :active-id="activeAccordionIdAssistedLiving"
            label="How is assisted living different from nursing homes?"
            :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'whats-the-difference' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'whats-the-difference' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'whats-the-difference' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
            @update:active-id="updateIdAssistedLiving">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  Assisted living focuses on helping residents maintain their independence while providing support with daily activities like bathing, dressing, medication management, and meals. Residents typically have their own private or semi-private rooms and can come and go as they please.
                </p>
                <p class="text-xl text-white">
                  Nursing home care provides more intensive medical care and supervision for individuals who need constant medical attention or have complex health conditions. This includes 24-hour skilled nursing care, physical therapy, and more comprehensive medical services.
                </p>
                <p class="text-xl text-white">
                  At Golden Gate Manor, our assisted living services are designed for people who want to live independently but need some daily assistance. If you're unsure which level of care is appropriate, our staff can help assess your needs during a consultation.
                </p>
              </div>
          </BaseInteractiveAccordionButton>
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="24-hour-staff"
            :active-id="activeAccordionIdAssistedLiving"
            label="Is there 24-hour staff available?"
            :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== '24-hour-staff' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === '24-hour-staff' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== '24-hour-staff' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
            @update:active-id="updateIdAssistedLiving">
              <p class="text-xl text-white">
                Yes, Golden Gate Manor has staff available 24 hours a day to ensure the safety and well-being of our residents. Our trained staff members are on-site around the clock to assist with emergencies, provide support when needed, and give you and your family peace of mind knowing help is always available.
              </p>
          </BaseInteractiveAccordionButton>
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="schedule-a-tour"
            :active-id="activeAccordionIdAssistedLiving"
            label="Can I schedule a tour of the facility?"
            :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'schedule-a-tour' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'schedule-a-tour' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'schedule-a-tour' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
            @update:active-id="updateIdAssistedLiving">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  Absolutely! We encourage prospective residents and their families to schedule a tour of Golden Gate Manor. During your visit, you'll be able to see our facilities, meet our staff, learn about our services, and get a feel for our community atmosphere.
                </p>
                <p class="text-xl text-white">
                  To schedule a tour, please call us at <a href="tel:719-696-8032" class="link">719-696-8032</a> or <NuxtLink to="/company/contact-us" class="link">Contact Us</NuxtLink> through our website. We're happy to accommodate your schedule and answer any questions you may have during your visit.
                </p>
              </div>
          </BaseInteractiveAccordionButton>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:accordionId', id: string): void;
}>()

const activeAccordionIdAssistedLiving = ref<string>('');

const updateIdAssistedLiving = (id: string) => {
  activeAccordionIdAssistedLiving.value = id
  emit('update:accordionId', id);
}

</script>

<style>

</style>