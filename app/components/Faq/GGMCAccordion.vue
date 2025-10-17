<template>
  <div class="max-sm:mt-4">
    <h2 class="text-2xl font-bold text-brand-primary">Gas & Goods FAQ's</h2>
    <ul class="space-y-4 mt-4">
      <li>
          <BaseInteractiveAccordionButton
            id="fuel-offered"
            :active-id="activeAccordionIdGasStation"
            label="What types of fuel do you offer?"
            :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'fuel-offered' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'fuel-offered' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'fuel-offered' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
            @update:active-id="updateIdGasStation">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  We offer regular (87 octane), mid-grade (89 octane), and premium (93 octane) unleaded fuels, as well as diesel fuel for trucks and commercial vehicles.
                </p>
                <p class="text-xl text-white">
                  All of our fuel comes from Conoco brand fuel lines, which includes TOP TIER™ detergent additives to help keep your engine clean and running efficiently. Our fuel pumps are regularly inspected and maintained to ensure quality and accuracy.
                </p>
              </div>
          </BaseInteractiveAccordionButton>     
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="accepted-payments"
            :active-id="activeAccordionIdGasStation"
            label="Do you accept credit cards and EBT/SNAP?"
            :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'accepted-payments' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'accepted-payments' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'accepted-payments' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
            @update:active-id="updateIdGasStation">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  We accept all major credit cards including Visa, Mastercard, American Express, and Discover, as well as cash payments. We also accept fleet cards and commercial accounts. 
                </p>
                <p class="text-xl text-white">
                  We will be providing EBT/SNAP services in the future to better serve our community, so stay tuned for updates on when this service becomes available.
                </p>
              </div>
          </BaseInteractiveAccordionButton>     
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="convenience-items"
            :active-id="activeAccordionIdGasStation"
            label="What convenience store items do you carry?"
            :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'convenience-items' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'convenience-items' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'convenience-items' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
            @update:active-id="updateIdGasStation">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  We carry a full range of convenience items to meet your daily needs. Our selection includes popular snack brands, candy, fresh slushies in multiple flavors, F'Real ice cream shakes and smoothies made fresh, cold beer, a variety of sodas and energy drinks, chips, jerky, and various refrigerated items including sandwiches, dairy products, and grab-and-go meals. We also stock basic household items, phone chargers, and travel essentials.
                </p>
              </div>
          </BaseInteractiveAccordionButton>     
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="atm-inside"
            :active-id="activeAccordionIdGasStation"
            label="Do you have an ATM on-site?"
            :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'atm-inside' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'atm-inside' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'atm-inside' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
            @update:active-id="updateIdGasStation">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  Yes, we have a convenient ATM located inside our store with a $2.50 transaction fee. The ATM is available during store hours and accepts most major bank cards. It dispenses $20 bills and provides balance inquiries and mini-statements.
                </p>
              </div>
          </BaseInteractiveAccordionButton>     
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="automotive-supplies"
            :active-id="activeAccordionIdGasStation"
            label="Do you carry automotive supplies (oil, windshield fluid, etc.)?"
            :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'automotive-supplies' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'automotive-supplies' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'automotive-supplies' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
            @update:active-id="updateIdGasStation">
              <div class="space-y-4">
                <p class="text-xl text-white">
                  Yes, we carry essential automotive supplies to help keep you on the road. Our selection includes various grades of motor oil, windshield washer fluid, antifreeze, brake fluid, gas cans in different sizes, basic tools like screwdrivers and wrenches, jumper cables, tire pressure gauges, air fresheners, and emergency road kits. We stock trusted brands and can help you find the right products for your vehicle.
                </p>
              </div>
          </BaseInteractiveAccordionButton>     
      </li>
      <li>
          <BaseInteractiveAccordionButton
            id="sell-lottery"
            :active-id="activeAccordionIdGasStation"
            label="Do you sell lottery tickets?"
            :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'sell-lottery' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
            :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'sell-lottery' ? 'border-b border-b-white' : ''}`"
            :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'sell-lottery' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
            @update:active-id="updateIdGasStation">
            <div class="space-y-4">
              <p class="text-xl text-white">
                Yes, we're an authorized retailer working with Colorado Lottery to provide a full range of lottery options. We sell scratch tickets in various price points from $1 to $30, as well as draw games including Powerball, Mega Millions, Colorado Lotto+, Cash 5, and Pick 3. We can also cash winning tickets up to $500. Our lottery terminal is updated with the latest jackpot amounts and drawing information.
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

const activeAccordionIdGasStation = ref<string>('')
const updateIdGasStation = (id: string) => {
  activeAccordionIdGasStation.value = id
  emit('update:accordionId', id)
}

</script>

<style>

</style>