<template>
  <div>
    <!-- Hero Section -->
    <BaseLayoutPageSection margin="top" class="cv-auto">
      <BaseLayoutPageContainer>
        <section
          class="relative w-full overflow-hidden rounded-xl bg-brand-primary h-[460px] max-sm:h-[500px]"
        >
          <!-- Background -->
          <img
            :src="heroShot.right.image"
            :alt="heroShot.right.alt"
            class="absolute inset-0 h-full w-full object-cover object-right"
          >
          
          <!-- Overlay -->
          <div
            class="absolute inset-0 max-sm:bg-brand-primary/80 sm:bg-[linear-gradient(90deg,#121b75_0%,#121b75_30%,rgba(18,27,117,.95)_42%,rgba(18,27,117,.72)_54%,rgba(18,27,117,.28)_66%,transparent_80%)]"
          />

          <!-- Content -->
          <div class="absolute inset-0 z-10 flex heroShots-center pt-6">
            <div class="max-w-[34rem] pl-4 sm:pl-16 pr-8">

              <!-- Eyebrow -->
              <p class="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-secondary">
                {{ $t(`news.information.medidrive.hero.left.eyebrow`) }}
              </p>

              <!-- Headline -->
              <h2 class="font-serif text-[2.6rem] font-bold leading-[1.05] text-shadow">
                <span
                    v-for="(line, idx) in getHeadlineLines()"
                    :key="idx"
                    class="block"
                    :class="idx === 0 ? 'text-brand-secondary' : 'text-white'"
                >
                    {{ $rt(line) }}
                </span>
              </h2>

              <!-- Description -->
              <p class="mt-6 max-w-md text-[16px] leading-7 text-white/90 text-shadow">
                {{ $t('news.information.medidrive.hero.left.description') }}
              </p>
            </div>
          </div>
        </section>

        <!-- Top Page -->
        <section class="flex flex-col gap-3 my-8">
          <h2 class="text-2xl text-brand-primary font-bold">
            {{ $t('news.information.medidrive.top-page.title') }}
          </h2>


          <div class="flex flex-col gap-3">
            <p v-for="paragraph in $tm('news.information.medidrive.top-page.paragraph')" :key="paragraph" class="text-lg sm:text-2xl">
              {{ $rt(paragraph) }}
            </p>
          </div>
          <h3 class="text-md underline font-bold text-brand-primary text-center">
            {{ $t('news.information.medidrive.top-page.links.title') }}
          </h3>
          <div class="flex gap-8 justify-center">
            <BaseUiAction href="https://medidrive.com/facilities/co" no-follow new-page class="px-4 py-2">
              {{ $t('news.information.medidrive.top-page.links.visit-medidrive') }}
            </BaseUiAction>

            <BaseUiAction href="https://member.medidrive.com/login" no-follow new-page variant="blank" class="px-4 py-2 text-brand-primary first-line:font-bold border-2 border-brand-primary rounded-md hover:bg-brand-secondary">
              {{ $t('news.information.medidrive.top-page.links.member-portal') }}
            </BaseUiAction>
          </div>
          <div>
            <p class="text-lg text-brand-primary -mb-4">
              <span class="font-bold">
                {{ $t('news.information.medidrive.top-page.questions.bold') }}
              </span> 
              {{ $t('news.information.medidrive.top-page.questions.text') }}
            </p>
          </div>
        </section>
        <section>
          <PostAtAGlance class="w-full" full-width>
            <ul class="space-y-3">
              <li
                v-for="item in $tm('news.information.medidrive.at-a-glance')"
                :key="$rt(item.id)"
              >
                <a
                  :href="`#${$rt(item.id)}`"
                  class="group block rounded-lg px-3 py-2 transition-colors hover:bg-brand-primary/5"
                >
                  <div class="flex items-start gap-3">
                    <BaseIcon
                      name="material-symbols:arrow-forward-rounded"
                      class="mt-1 text-brand-primary transition-transform group-hover:translate-x-1"
                    />

                    <div>
                      <h3 class="font-bold text-brand-primary group-hover:underline">
                        {{ $rt(item.bold) }}
                      </h3>

                      <p class="text-brand-main-text">
                        {{ $rt(item.text) }}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </PostAtAGlance>
        </section>

        <!-- Official MediDrive Resources -->
        <section id="official-medidrive-resources" class="my-12 space-y-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.resources.title') }}
            </h2>

            <p class="text-lg leading-8 text-brand-main-text">
              {{ $t('news.information.medidrive.resources.description') }}
            </p>
          </div>

          <div class="grid gap-6 lg:grid-cols-3">
            <article
              v-for="resource in $tm('news.information.medidrive.resources.items')"
              :key="$rt(resource.title)"
              class="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <BaseIcon
                :name="$rt(resource.icon)"
                class="mb-4 text-brand-primary"
                size="2rem"
              />

              <h3 class="text-xl font-bold text-brand-primary">
                {{ $rt(resource.title) }}
              </h3>

              <p class="mt-3 flex-grow text-lg leading-8 text-brand-main-text">
                {{ $rt(resource.description) }}
              </p>

              <BaseUiAction
                class="mt-6 px-4 py-2"
                :href="$rt(resource.link).startsWith('http') ? $rt(resource.link) : undefined"
                :to="!$rt(resource.link).startsWith('http') ? $localePath($rt(resource.link)) : undefined"
              >
                {{ $rt(resource.button) }}
              </BaseUiAction>
            </article>
          </div>
        </section>

        <!-- Requesting Golden Gate Manor -->
        <section id="request-golden-gate" class="space-y-4 mt-8">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.requesting-ggm.title') }}
            </h2>

            <h3 class="text-xl font-semibold">
              {{ $t('news.information.medidrive.requesting-ggm.eyebrow') }}
            </h3>

            <p
              v-for="paragraph in $tm('news.information.medidrive.requesting-ggm.paragraph')"
              :key="$rt(paragraph)"
              class="text-lg sm:text-2xl text-brand-main-text"
            >
              {{ $rt(paragraph) }}
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.requesting-ggm.why-us.title') }}
            </h2>

            <p
              v-for="paragraph in $tm('news.information.medidrive.requesting-ggm.why-us.paragraph')"
              :key="$rt(paragraph)"
              class="text-lg sm:text-2xl text-brand-main-text leading-8"
            >
              {{ $rt(paragraph) }}
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.requesting-ggm.scheduling.title') }}
            </h2>

            <ol class="list-decimal space-y-4 pl-6 marker:text-2xl marker:font-bold marker:text-gray-400 text-brand-main-text">
              <li
                v-for="step in $tm('news.information.medidrive.requesting-ggm.scheduling.steps')"
                :key="$rt(step.title)"
                class="space-y-3 decorative"
              >
                <h3 class="text-xl font-bold">
                  {{ $rt(step.title) }}
                </h3>

                <template v-if="step.paragraph?.length">
                  <p
                    v-for="paragraph in step.paragraph"
                    :key="$rt(paragraph)"
                    class="text-lg sm:text-2xl text-brand-main-text"
                  >
                    {{ $rt(paragraph) }}
                  </p>
                </template>

                <template v-if="step.blockquote?.length">
                  <div
                    v-for="quote in step.blockquote"
                    :key="$rt(quote.title)"
                  >
                    <p class="text-md text-brand-main-text font-bold underline">
                      {{ $rt(quote.title) }}
                    </p>

                    <ProseBlockquote class="text-lg">
                      {{ $rt(quote.quote) }}
                    </ProseBlockquote>
                  </div>
                </template>

                <template v-if="step.paragraph2?.length">
                  <p
                    v-for="paragraph in step.paragraph2"
                    :key="$rt(paragraph)"
                    class="text-lg sm:text-2xl text-brand-main-text"
                  >
                    {{ $rt(paragraph) }}
                  </p>
                </template>

                <template v-if="step.list">
                  <p class="text-lg sm:text-2xl text-brand-main-text font-bold">
                    {{ $rt(step.list.title) }}
                  </p>

                  <ul class="list-disc space-y-1 !mt-0 pl-6 text-lg marker-black sm:text-2xl text-brand-main-text">
                    <li
                      v-for="item in step.list.items"
                      :key="$rt(item)"
                    >
                      {{ $rt(item) }}
                    </li>
                  </ul>
                </template>
              </li>
            </ol>
          </div>
        </section>

        <!-- Frequently Asked Questions -->
        <section id="frequently-asked-questions" class="my-12 space-y-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.faq.title') }}
            </h2>

            <p class="text-lg leading-8 text-brand-main-text">
              {{ $t('news.information.medidrive.faq.description') }}
            </p>
          </div>

          <ul class="space-y-4">
            <li
              v-for="faq in $tm('news.information.medidrive.faq.items')"
              :key="$rt(faq.id)"
            >
              <LazyBaseInteractiveAccordionButton
                :id="$rt(faq.id)"
                :active-id="activeAccordionId"
                :label="$rt(faq.label)"
                :main-class="`overflow-hidden rounded-lg bg-gray-100 group ${activeAccordionId !== $rt(faq.id) ? 'hover:bg-gray-200' : ''}`"
                :button-class="`w-full px-5 py-4 text-left font-bold text-brand-primary ${activeAccordionId === $rt(faq.id) ? 'border-b border-gray-300' : ''}`"
                :content-class="`bg-gray-100 px-5 py-4 ${activeAccordionId !== $rt(faq.id) ? 'group-hover:bg-gray-200' : ''}`"
                @update:active-id="updateId"
              >
                <p class="text-lg leading-8 text-brand-main-text">
                  {{ $rt(faq.paragraph) }}
                </p>
              </LazyBaseInteractiveAccordionButton>
            </li>
          </ul>
        </section>

        <!-- Contact & Support -->
        <section id="contact-support" class="my-12 space-y-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.contact-support.title') }}
            </h2>

            <p class="text-lg leading-8 text-brand-main-text">
              {{ $t('news.information.medidrive.contact-support.description') }}
            </p>
          </div>

          <div class="grid gap-6 lg:grid-cols-2">
            <article class="rounded-xl bg-brand-primary p-6 text-white shadow-primary sm:p-8">
              <BaseIcon name="ic:round-call" class="mb-4 text-brand-secondary" size="2rem" />

              <h3 class="text-2xl font-bold">
                {{ $t('news.information.medidrive.contact-support.member-services.title') }}
              </h3>

              <p class="mt-3 text-lg leading-8 text-white/90">
                {{ $t('news.information.medidrive.contact-support.member-services.description') }}
              </p>

              <a
                href="tel:8554894999"
                class="mt-5 inline-flex text-2xl font-bold underline decoration-brand-secondary underline-offset-4 hover:text-brand-secondary"
              >
                855-489-4999
              </a>

              <div class="mt-6 space-y-3 text-lg leading-8">
                <p>
                  <span class="font-bold">
                    {{ $t('news.information.medidrive.contact-support.member-services.booking-hours-label') }}
                  </span>
                  {{ $t('news.information.medidrive.contact-support.member-services.booking-hours') }}
                </p>

                <p>
                  <span class="font-bold">
                    {{ $t('news.information.medidrive.contact-support.member-services.urgent-label') }}
                  </span>
                  {{ $t('news.information.medidrive.contact-support.member-services.urgent') }}
                </p>

                <p>
                  <span class="font-bold">
                    {{ $t('news.information.medidrive.contact-support.member-services.language-label') }}
                  </span>
                  {{ $t('news.information.medidrive.contact-support.member-services.language') }}
                </p>
              </div>
            </article>

            <article class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <BaseIcon name="material-symbols:code-rounded" class="mb-4 text-brand-primary" size="2rem" />

              <h3 class="text-2xl font-bold text-brand-primary">
                {{ $t('news.information.medidrive.contact-support.technical-support.title') }}
              </h3>

              <p class="mt-3 text-lg leading-8 text-brand-main-text">
                {{ $t('news.information.medidrive.contact-support.technical-support.description') }}
              </p>

              <div class="mt-5 space-y-3 text-lg">
                <a
                  href="tel:7039523036"
                  class="block font-bold text-brand-primary underline underline-offset-4 hover:text-brand-link-hover"
                >
                  703-952-3036
                </a>

                <a
                  href="mailto:techsupport@medidrive.com"
                  class="block font-bold text-brand-primary underline underline-offset-4 hover:text-brand-link-hover"
                >
                  techsupport@medidrive.com
                </a>
              </div>

              <div class="mt-6">
                <p class="mb-2 font-bold text-brand-primary">
                  {{ $t('news.information.medidrive.contact-support.technical-support.help-with-title') }}
                </p>

                <ul class="ml-6 list-disc space-y-1 text-lg text-brand-main-text">
                  <li
                    v-for="item in $tm('news.information.medidrive.contact-support.technical-support.help-with')"
                    :key="$rt(item)"
                  >
                    {{ $rt(item) }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <!-- Mileage Reimbursement -->
        <section id="mileage-reimbursement" class="my-12 space-y-6 rounded-xl bg-brand-primary/5 p-6 sm:p-8">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.mileage-reimbursement.title') }}
            </h2>

            <p
              v-for="paragraph in $tm('news.information.medidrive.mileage-reimbursement.paragraph')"
              :key="$rt(paragraph)"
              class="text-lg leading-8 text-brand-main-text"
            >
              {{ $rt(paragraph) }}
            </p>
          </div>

          <div class="grid gap-6 lg:grid-cols-2">
            <article class="rounded-xl bg-white p-6 shadow-sm">
              <h3 class="text-xl font-bold text-brand-primary">
                {{ $t('news.information.medidrive.mileage-reimbursement.when-to-use.title') }}
              </h3>

              <p class="mt-3 text-lg leading-8 text-brand-main-text">
                {{ $t('news.information.medidrive.mileage-reimbursement.when-to-use.text') }}
              </p>
            </article>

            <article class="rounded-xl bg-white p-6 shadow-sm">
              <h3 class="text-xl font-bold text-brand-primary">
                {{ $t('news.information.medidrive.mileage-reimbursement.how-to-request.title') }}
              </h3>

              <p class="mt-3 text-lg leading-8 text-brand-main-text">
                {{ $t('news.information.medidrive.mileage-reimbursement.how-to-request.text') }}
              </p>
            </article>
          </div>

          <div class="rounded-lg border-l-4 border-brand-secondary bg-white p-4 text-lg leading-8 text-brand-main-text">
            <span class="font-bold text-brand-primary">
              {{ $t('news.information.medidrive.mileage-reimbursement.note.bold') }}
            </span>
            {{ $t('news.information.medidrive.mileage-reimbursement.note.text') }}
          </div>
        </section>

        <!-- Healthcare Facilities -->
        <section id="healthcare-facilities" class="my-12 space-y-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('news.information.medidrive.healthcare-facilities.title') }}
            </h2>

            <p
              v-for="paragraph in $tm('news.information.medidrive.healthcare-facilities.paragraph')"
              :key="$rt(paragraph)"
              class="text-lg leading-8 text-brand-main-text"
            >
              {{ $rt(paragraph) }}
            </p>
          </div>
        </section>

        <!-- Transportation Providers -->
        <section
          id="transportation-providers"
          class="my-12 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8"
        >
          <div class="flex items-start gap-5">
            <div class="hidden rounded-full bg-brand-primary p-4 text-white sm:flex">
              <BaseIcon
                name="material-symbols:local-shipping-rounded"
                size="size-6"
                color="text-white"
              />
            </div>

            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-brand-primary">
                {{ $t('news.information.medidrive.transportation-providers.title') }}
              </h2>

              <p
                v-for="paragraph in $tm('news.information.medidrive.transportation-providers.paragraph')"
                :key="$rt(paragraph)"
                class="text-lg leading-8 text-brand-main-text"
              >
                {{ $rt(paragraph) }}
              </p>

              <div class="rounded-lg border-l-4 border-brand-secondary bg-white p-4">
                <p class="text-lg leading-7 text-brand-main-text">
                  <span class="font-bold text-brand-primary">
                    {{ $t('news.information.medidrive.transportation-providers.note.bold') }}
                  </span>
                  {{ $t('news.information.medidrive.transportation-providers.note.text') }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Golden Gate Manor Contact -->
        <section
          id="golden-gate-contact"
          class="my-12 rounded-xl bg-brand-primary p-6 text-white shadow-primary sm:p-8"
        >
          <div class="grid gap-8 lg:grid-cols-[1.4fr_.8fr] lg:items-center">
            <div class="space-y-4">
              <p class="text-sm font-bold uppercase tracking-wide text-brand-secondary">
                {{ $t('news.information.medidrive.ggm-contact.eyebrow') }}
              </p>

              <h2 class="text-2xl font-bold">
                {{ $t('news.information.medidrive.ggm-contact.title') }}
              </h2>

              <p
                v-for="paragraph in $tm('news.information.medidrive.ggm-contact.paragraph')"
                :key="$rt(paragraph)"
                class="text-lg leading-8 text-white/90"
              >
                {{ $rt(paragraph) }}
              </p>

              <p class="rounded-lg border-l-4 border-brand-secondary bg-white/10 p-4 text-base leading-7 text-white/90">
                <span class="font-bold text-brand-secondary">
                  {{ $t('news.information.medidrive.ggm-contact.note.bold') }}
                </span>
                {{ $t('news.information.medidrive.ggm-contact.note.text') }}
              </p>
            </div>

            <div class="rounded-xl bg-white p-6 text-brand-main-text shadow-sm">
              <h3 class="text-xl font-bold text-brand-primary">
                {{ $t('news.information.medidrive.ggm-contact.card.title') }}
              </h3>

              <div class="mt-5 space-y-4">
                <CallRailLink
                  tel="719-544-3231"
                  display="(719) 544-3231"
                  cls="group inline-flex items-center gap-2 text-xl font-bold text-brand-primary hover:text-brand-link-hover"
                  :aria-label="$t('company.csr-phone')"
                >
                  <template #default="{ display }">
                    <BaseIcon name="ic:round-call" color="text-brand-primary" hover-color="group-hover:text-brand-link-hover" />
                    <span>{{ display }}</span>
                  </template>
                </CallRailLink>

                <p class="text-lg leading-8">
                  <span class="font-bold text-brand-primary">
                    {{ $t('news.information.medidrive.ggm-contact.card.hours-label') }}
                  </span>
                  {{ $t('company.hours') }}
                </p>

                <BaseUiAction
                  :to="$localePath('/company/contact-us')"
                  class="mt-4 px-4 py-2"
                >
                  {{ $t('news.information.medidrive.ggm-contact.card.button') }}
                </BaseUiAction>
              </div>
            </div>
          </div>
        </section>

      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script lang="ts" setup>

const activeAccordionId = ref<string>('')

const updateId = (val: string) => {
  activeAccordionId.value = val
}

definePageMeta({
  title: 'Health First Colorado MediDrive Transition Guide',
  breadcrumbLabel: 'Community',
  breadcrumbOverrides: [
    undefined,
    undefined,
    false
  ]
})

function getHeadlineLines() {
  return $tm('news.information.medidrive.hero.left.headline') as string[]
}

const heroShot = {
  id: 'medidrive-update',
  right: {
      image: '/images/pages/home/hero-carousel/van-and-road.png', 
      alt: 'Health First Colorado NEMT rides are now scheduled through MediDrive beginning July 1, 2026'
  },
  to: '/news/information/MediDrive',
  bg: 'nemt'
}

</script>

<style scoped>
.marker-black li::marker {
  color: black;
}
</style>