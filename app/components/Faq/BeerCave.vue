<template>
  <BaseLayoutPageSection margin="default">
    <BaseLayoutPageContainer>
      <div class="accordion-panel">
        <h2 class="text-2xl font-bold text-brand-primary">Beer Cave Pueblo — FAQ</h2>
        <ul class="space-y-4 mt-4">
          <li>
            <BaseInteractiveAccordionButton
              id="where-located"
              :active-id="activeId"
              label="Where exactly is the Beer Cave located?"
              :main-class="mainCls('where-located')"
              :button-class="btnCls('where-located')"
              :content-class="contentCls('where-located')"
              @update:active-id="setId"
            >
              <p class="text-xl text-white">
                Inside Golden Gate Gas & Goods at Prairie & Northern on Pueblo's south side. Come through the main store
                entrance—our double doors to the walk-in beer cooler are straight ahead near close to the slushies and soft drinks.
              </p>
            </BaseInteractiveAccordionButton>
          </li>

          <li>
            <BaseInteractiveAccordionButton
              id="how-cold"
              :active-id="activeId"
              label="How cold do you keep the walk-in beer cooler?"
              :main-class="mainCls('how-cold')"
              :button-class="btnCls('how-cold')"
              :content-class="contentCls('how-cold')"
              @update:active-id="setId"
            >
              <p class="text-xl text-white">
                We target <span class="whitespace-nowrap">34°F–38°F</span> so your beer is ice-cold without freezing. Insulation,
                sealed doors, and stock rotation help us keep it consistent.
              </p>
            </BaseInteractiveAccordionButton>
          </li>

          <li>
            <BaseInteractiveAccordionButton
              id="selection"
              :active-id="activeId"
              label="What selection can I expect?"
              :main-class="mainCls('selection')"
              :button-class="btnCls('selection')"
              :content-class="contentCls('selection')"
              @update:active-id="setId"
            >
              <p class="text-xl text-white">
                Singles, packs, and cases organized by what customers actually buy—popular domestics, local picks, and seasonal finds.
                If something's missing, ask our team and we'll work on it.
              </p>
            </BaseInteractiveAccordionButton>
          </li>

          <li>
            <BaseInteractiveAccordionButton
              id="grab-and-go"
              :active-id="activeId"
              label="Is it easy to grab-and-go?"
              :main-class="mainCls('grab-and-go')"
              :button-class="btnCls('grab-and-go')"
              :content-class="contentCls('grab-and-go')"
              @update:active-id="setId"
            >
              <p class="text-xl text-white">
                Yes. Two side doors support quick stops, and the main double-door entry is perfect for browsing. The layout is designed
                for speed and comfort.
              </p>
            </BaseInteractiveAccordionButton>
          </li>

          <li>
            <BaseInteractiveAccordionButton
              id="extras"
              :active-id="activeId"
              label="Do you carry ice or non-alcoholic options?"
              :main-class="mainCls('extras')"
              :button-class="btnCls('extras')"
              :content-class="contentCls('extras')"
              @update:active-id="setId"
            >
              <p class="text-xl text-white">
                We're expanding ice and soft drink options for more one-stop convenience. You'll also find a growing NA selection.
              </p>
            </BaseInteractiveAccordionButton>
          </li>

          <li>
            <BaseInteractiveAccordionButton
              id="id-checks"
              :active-id="activeId"
              label="What's your ID policy?"
              :main-class="mainCls('id-checks')"
              :button-class="btnCls('id-checks')"
              :content-class="contentCls('id-checks')"
              @update:active-id="setId"
            >
              <p class="text-xl text-white">
                We check valid government-issued photo ID for all alcohol purchases—quick, consistent, and compliant.
              </p>
            </BaseInteractiveAccordionButton>
          </li>
        </ul>
      </div>
    </BaseLayoutPageContainer>
  </BaseLayoutPageSection>
</template>

<script lang="ts" setup>
const activeId = ref<string>('')

function setId(id: string) { activeId.value = id }

function mainCls(id: string) {
  const base = 'bg-[#2E86AB] text-white rounded-lg overflow-hidden group'
  const hover = activeId.value !== id ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''
  return `${base} ${hover}`
}
function btnCls(id: string) {
  const border = activeId.value === id ? 'border-b border-b-white' : ''
  return `px-4 py-2 w-full text-left ${border}`
}
function contentCls(id: string) {
  const hover = activeId.value !== id ? 'group-hover:bg-[#2E86AB]/50' : ''
  return `bg-[#2E86AB] px-4 py-2 ${hover}`
}
</script>
