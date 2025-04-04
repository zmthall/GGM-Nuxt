# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```
GGM-Nuxt
├─ app
│  ├─ app.vue
│  ├─ components
│  │  └─ base
│  │     ├─ form
│  │     │  ├─ BaseCheckbox.vue
│  │     │  ├─ BaseFileUpload.vue
│  │     │  ├─ BaseInput.vue
│  │     │  ├─ BaseRadio.vue
│  │     │  ├─ BaseSelect.vue
│  │     │  ├─ BaseTextArea.vue
│  │     │  └─ BaseToggleSwitch.vue
│  │     ├─ interactive
│  │     │  ├─ BaseAccordion.vue
│  │     │  ├─ BaseMessagePopup.vue
│  │     │  ├─ BaseModal.vue
│  │     │  ├─ BasePopover.vue
│  │     │  └─ BaseSlider.vue
│  │     ├─ layout
│  │     │  ├─ BaseAsideTOC.vue
│  │     │  ├─ BaseCard.vue
│  │     │  ├─ BaseContainer.vue
│  │     │  ├─ BaseDivider.vue
│  │     │  ├─ BaseGrid.vue
│  │     │  ├─ BaseHeading.vue
│  │     │  └─ page
│  │     │     ├─ assisted-living
│  │     │     ├─ BaseContentGrid.vue
│  │     │     ├─ BasePageAside.vue
│  │     │     ├─ BasePageBanner.vue
│  │     │     ├─ BasePageBreadcrumbs.vue
│  │     │     ├─ BasePageCTA.vue
│  │     │     ├─ BasePageHeading.vue
│  │     │     ├─ BasePageSection.vue
│  │     │     ├─ BasePageSectionGroup.vue
│  │     │     └─ BasePageWrapper.vue
│  │     └─ ui
│  │        ├─ Action.vue
│  │        ├─ BaseBadge.vue
│  │        ├─ BaseTooltip.vue
│  │        └─ Icon.vue
│  ├─ models
│  │  └─ BaseComponents.ts
│  └─ pages
│     ├─ about-us
│     │  ├─ index.vue
│     │  ├─ join-our-team.vue
│     │  └─ location.vue
│     ├─ admin
│     │  ├─ index.vue
│     │  ├─ login.vue
│     │  ├─ messages
│     │  │  └─ index.vue
│     │  └─ rides
│     │     └─ index.vue
│     ├─ assisted-living.vue
│     ├─ contact-us
│     │  ├─ index.vue
│     │  └─ schedule-a-ride.vue
│     ├─ index.vue
│     ├─ nemt.vue
│     ├─ news
│     │  ├─ blog
│     │  │  ├─ index.vue
│     │  │  └─ post
│     │  │     └─ [...slug].vue
│     │  ├─ community.vue
│     │  └─ index.vue
│     ├─ non-medical.vue
│     └─ resources
│        ├─ community-resources.vue
│        ├─ faq.vue
│        ├─ how-to
│        │  ├─ prepare-for-first-ride.vue
│        │  ├─ qualify.vue
│        │  └─ schedule-a-ride.vue
│        ├─ policies
│        │  └─ ride-cancellation-policy.vue
│        ├─ service-area-map.vue
│        └─ useful-forms.vue
├─ assets
│  └─ css
│     └─ main.css
├─ eslint.config.mjs
├─ nuxt.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ robots.txt
├─ README.md
├─ server
│  └─ tsconfig.json
├─ tailwind.config.ts
├─ tailwindConfig
└─ tsconfig.json

```