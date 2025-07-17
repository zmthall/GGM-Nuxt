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
├─ README.md
├─ app
│  ├─ components
│  │  ├─ AssistedLiving
│  │  │  └─ Carousel.vue
│  │  ├─ Community
│  │  │  └─ Events.vue
│  │  ├─ ContactUs
│  │  │  └─ form.vue
│  │  ├─ GasStation
│  │  │  └─ ArrowList.vue
│  │  ├─ PleaseNote.vue
│  │  ├─ ScheduleARide
│  │  │  └─ form.vue
│  │  ├─ SupportCenter
│  │  │  ├─ Section.vue
│  │  │  └─ Tile.vue
│  │  ├─ base
│  │  │  ├─ admin
│  │  │  │  └─ BaseBadge.vue
│  │  │  ├─ form
│  │  │  │  ├─ Checkbox.vue
│  │  │  │  ├─ DatePicker.vue
│  │  │  │  ├─ FileUpload.vue
│  │  │  │  ├─ Input.vue
│  │  │  │  ├─ Radio.vue
│  │  │  │  ├─ Radios.vue
│  │  │  │  ├─ Select.vue
│  │  │  │  ├─ TextArea.vue
│  │  │  │  ├─ TimePicker.vue
│  │  │  │  └─ ToggleSwitch.vue
│  │  │  ├─ interactive
│  │  │  │  ├─ AccordionButton.vue
│  │  │  │  ├─ AutoImageCarousel.vue
│  │  │  │  ├─ FlipCard.vue
│  │  │  │  ├─ FloatingCard.vue
│  │  │  │  ├─ HoverTile.vue
│  │  │  │  ├─ ImageCarousel.vue
│  │  │  │  ├─ ImageModal.vue
│  │  │  │  ├─ LocationMap.vue
│  │  │  │  ├─ MessagePopup.vue.needed
│  │  │  │  ├─ Modal.vue
│  │  │  │  ├─ Popover.vue.needed
│  │  │  │  └─ ServiceAreaMap.vue
│  │  │  ├─ layout
│  │  │  │  ├─ AsideNav.vue
│  │  │  │  ├─ Card.vue
│  │  │  │  ├─ Footer.vue
│  │  │  │  ├─ Header.vue
│  │  │  │  ├─ Navigation.vue
│  │  │  │  └─ page
│  │  │  │     ├─ ArrowListItem.vue
│  │  │  │     ├─ Aside.vue.needed
│  │  │  │     ├─ Banner.vue
│  │  │  │     ├─ Breadcrumb.vue
│  │  │  │     ├─ CTA.vue
│  │  │  │     ├─ Container.vue
│  │  │  │     ├─ Header.vue
│  │  │  │     ├─ HeroSection.vue
│  │  │  │     ├─ ListItem.vue
│  │  │  │     ├─ Section.vue
│  │  │  │     └─ Wrapper.vue
│  │  │  └─ ui
│  │  │     ├─ Tooltip.vue
│  │  │     └─ action.vue
│  │  ├─ employment
│  │  │  ├─ Application.vue
│  │  │  ├─ ApplyModal.vue
│  │  │  └─ Modal.vue
│  │  └─ global
│  │     └─ BaseIcon.vue
│  ├─ composables
│  │  ├─ assisted-living
│  │  │  └─ Images.ts
│  │  ├─ debounce.ts
│  │  ├─ firebaseAuth.ts
│  │  ├─ messages
│  │  │  └─ recaptcha.ts
│  │  └─ staticData.ts
│  ├─ error.vue
│  ├─ layouts
│  │  ├─ admin.vue
│  │  └─ default.vue
│  ├─ middleware
│  │  ├─ redirects.global.ts
│  │  └─ restricted.ts
│  ├─ models
│  │  ├─ Application.ts
│  │  ├─ AsideNav.ts
│  │  ├─ BaseComponents.ts
│  │  ├─ EventsData.ts
│  │  ├─ Flourish.ts
│  │  ├─ ImagesData.ts
│  │  ├─ JobDescription.ts
│  │  └─ Recaptcha.ts
│  ├─ pages
│  │  ├─ admin
│  │  │  ├─ index.vue
│  │  │  ├─ login.vue
│  │  │  ├─ messages
│  │  │  │  └─ index.vue
│  │  │  └─ rides
│  │  │     └─ index.vue
│  │  ├─ assisted-living.vue
│  │  ├─ company
│  │  │  ├─ about-us
│  │  │  │  └─ index.vue
│  │  │  ├─ contact-us
│  │  │  │  └─ index.vue
│  │  │  ├─ employment
│  │  │  │  ├─ apply.vue
│  │  │  │  └─ index.vue
│  │  │  ├─ index.vue
│  │  │  ├─ location.vue
│  │  │  └─ policies
│  │  │     ├─ accessibility.vue
│  │  │     ├─ index.vue
│  │  │     ├─ privacy.vue
│  │  │     ├─ ride-cancellation.vue
│  │  │     └─ terms-and-conditions.vue
│  │  ├─ gas-and-goods.vue
│  │  ├─ index.vue
│  │  ├─ medical-supplies.vue
│  │  ├─ nemt.vue
│  │  ├─ news
│  │  │  ├─ blog
│  │  │  │  ├─ _index.vue
│  │  │  │  └─ post
│  │  │  │     └─ _[...slug].vue
│  │  │  ├─ community.vue
│  │  │  └─ index.vue
│  │  ├─ non-medical.vue
│  │  └─ resources
│  │     ├─ _community-resources.vue
│  │     ├─ faq.vue
│  │     ├─ forms-and-documents.vue
│  │     ├─ index.vue
│  │     ├─ schedule-a-ride.vue
│  │     ├─ service-area-map.vue
│  │     └─ support-center
│  │        ├─ index.vue
│  │        ├─ ordering-medical-supplies.vue
│  │        ├─ prepare-for-first-ride.vue
│  │        ├─ qualify.vue
│  │        ├─ request-assisted-care.vue
│  │        └─ schedule-a-ride.vue
│  ├─ plugins
│  │  └─ auth.client.ts
│  └─ stores
│     ├─ authStore.ts
│     └─ recaptchaStore.ts
├─ assets
│  └─ css
│     └─ main.css
├─ cspell.json
├─ eslint.config.mjs
├─ nuxt.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ _robots.txt
│  ├─ favicon.ico
│  ├─ fonts
│  │  ├─ Cabin-Italic.woff2
│  │  ├─ Cabin-Regular.woff2
│  │  ├─ NotoSerif-Italic.woff2
│  │  └─ NotoSerif-Regular.woff2
│  ├─ images
│  │  ├─ GGM-Logo-Mobile.png
│  │  ├─ GGM-Logo-Mobile_600.png
│  │  ├─ GGM-Logo-Mobile_600.webp
│  │  ├─ carousel-images
│  │  │  ├─ Backyard-horizon_600.jpg
│  │  │  ├─ backyard-seating-horizon_600.jpg
│  │  │  ├─ front-horizon-edited_600.jpg
│  │  │  ├─ ggmi
│  │  │  │  ├─ ggmi-image-1.jpg
│  │  │  │  ├─ ggmi-image-10.jpg
│  │  │  │  ├─ ggmi-image-11.jpg
│  │  │  │  ├─ ggmi-image-12.jpg
│  │  │  │  ├─ ggmi-image-13.jpg
│  │  │  │  ├─ ggmi-image-14.jpg
│  │  │  │  ├─ ggmi-image-15.jpg
│  │  │  │  ├─ ggmi-image-16.jpg
│  │  │  │  ├─ ggmi-image-17.jpg
│  │  │  │  ├─ ggmi-image-2.jpg
│  │  │  │  ├─ ggmi-image-3.jpg
│  │  │  │  ├─ ggmi-image-4.jpg
│  │  │  │  ├─ ggmi-image-5.jpg
│  │  │  │  ├─ ggmi-image-6.jpg
│  │  │  │  ├─ ggmi-image-7.jpg
│  │  │  │  ├─ ggmi-image-8.jpg
│  │  │  │  └─ ggmi-image-9.jpg
│  │  │  ├─ ggmii
│  │  │  │  ├─ ggmii-image-1.jpg
│  │  │  │  ├─ ggmii-image-10.jpg
│  │  │  │  ├─ ggmii-image-11.jpg
│  │  │  │  ├─ ggmii-image-12.jpg
│  │  │  │  ├─ ggmii-image-13.jpg
│  │  │  │  ├─ ggmii-image-14.jpg
│  │  │  │  ├─ ggmii-image-15.jpg
│  │  │  │  ├─ ggmii-image-16.jpg
│  │  │  │  ├─ ggmii-image-17.jpg
│  │  │  │  ├─ ggmii-image-2.jpg
│  │  │  │  ├─ ggmii-image-3.jpg
│  │  │  │  ├─ ggmii-image-4.jpg
│  │  │  │  ├─ ggmii-image-5.jpg
│  │  │  │  ├─ ggmii-image-6.jpg
│  │  │  │  ├─ ggmii-image-7.jpg
│  │  │  │  ├─ ggmii-image-8.jpg
│  │  │  │  └─ ggmii-image-9.jpg
│  │  │  ├─ ghorizon
│  │  │  │  ├─ ghorizon-image-1.jpg
│  │  │  │  ├─ ghorizon-image-10.jpg
│  │  │  │  ├─ ghorizon-image-11.jpg
│  │  │  │  ├─ ghorizon-image-12.jpg
│  │  │  │  ├─ ghorizon-image-13.jpg
│  │  │  │  ├─ ghorizon-image-14.jpg
│  │  │  │  ├─ ghorizon-image-2.jpg
│  │  │  │  ├─ ghorizon-image-3.jpg
│  │  │  │  ├─ ghorizon-image-4.jpg
│  │  │  │  ├─ ghorizon-image-5.jpg
│  │  │  │  ├─ ghorizon-image-6.jpg
│  │  │  │  ├─ ghorizon-image-7.jpg
│  │  │  │  ├─ ghorizon-image-8.jpg
│  │  │  │  └─ ghorizon-image-9.jpg
│  │  │  ├─ golden-gate-manor-i-house-outside_600.jpg
│  │  │  ├─ golden-gate-manor-ii-house-outside_600.jpg
│  │  │  ├─ golden-valley-house-outside_600.jpg
│  │  │  ├─ golden-view-house-outside_600.jpg
│  │  │  ├─ gvalley
│  │  │  │  ├─ gvalley-image-1.jpg
│  │  │  │  ├─ gvalley-image-10.jpg
│  │  │  │  ├─ gvalley-image-11.jpg
│  │  │  │  ├─ gvalley-image-12.jpg
│  │  │  │  ├─ gvalley-image-13.jpg
│  │  │  │  ├─ gvalley-image-14.jpg
│  │  │  │  ├─ gvalley-image-15.jpg
│  │  │  │  ├─ gvalley-image-2.jpg
│  │  │  │  ├─ gvalley-image-3.jpg
│  │  │  │  ├─ gvalley-image-4.jpg
│  │  │  │  ├─ gvalley-image-5.jpg
│  │  │  │  ├─ gvalley-image-6.jpg
│  │  │  │  ├─ gvalley-image-7.jpg
│  │  │  │  ├─ gvalley-image-8.jpg
│  │  │  │  └─ gvalley-image-9.jpg
│  │  │  ├─ gview
│  │  │  │  ├─ gview-image-1.jpg
│  │  │  │  ├─ gview-image-10.jpg
│  │  │  │  ├─ gview-image-11.jpg
│  │  │  │  ├─ gview-image-12.jpg
│  │  │  │  ├─ gview-image-13.jpg
│  │  │  │  ├─ gview-image-2.jpg
│  │  │  │  ├─ gview-image-3.jpg
│  │  │  │  ├─ gview-image-4.jpg
│  │  │  │  ├─ gview-image-5.jpg
│  │  │  │  ├─ gview-image-6.jpg
│  │  │  │  ├─ gview-image-7.jpg
│  │  │  │  ├─ gview-image-8.jpg
│  │  │  │  └─ gview-image-9.jpg
│  │  │  └─ side-horizon_600.jpg
│  │  ├─ home-images
│  │  │  ├─ gas-station.jpg
│  │  │  ├─ golden-gate-manor-1.jpeg
│  │  │  ├─ golden-gate-manor-2.jpeg
│  │  │  ├─ golden-horizon.jpeg
│  │  │  ├─ golden-valley.jpeg
│  │  │  ├─ golden-view.jpeg
│  │  │  ├─ medical-supply-store.jpeg
│  │  │  └─ transportation-services.jpeg
│  │  ├─ layout
│  │  │  ├─ Full company GGM Logo.png
│  │  │  └─ logo.png
│  │  ├─ pages
│  │  │  ├─ about-us
│  │  │  │  ├─ about-us-car-lineup.jpeg
│  │  │  │  ├─ gas-station-about-us1.jpg
│  │  │  │  ├─ gas-station-about-us2.jpg
│  │  │  │  ├─ gas-station-about-us3.JPG
│  │  │  │  ├─ golden-gate-manor-1.jpeg
│  │  │  │  ├─ golden-gate-manor-2.jpeg
│  │  │  │  ├─ golden-horizon.jpeg
│  │  │  │  ├─ golden-valley.jpeg
│  │  │  │  ├─ golden-view.jpeg
│  │  │  │  ├─ medical-supply-store.jpeg
│  │  │  │  └─ transportation-services.jpeg
│  │  │  ├─ assisted-living
│  │  │  │  ├─ assisted-living-sign.webp
│  │  │  │  └─ nursing-care.jpg
│  │  │  ├─ employment
│  │  │  │  ├─ employment-hero.webp
│  │  │  │  ├─ ggmal-flipcard.jpg
│  │  │  │  ├─ ggmc-flipcard.jpg
│  │  │  │  ├─ ggms-flipcard.jpg
│  │  │  │  └─ ggmt-flipcard.jpg
│  │  │  ├─ gas-and-goods
│  │  │  │  └─ gas-station-banner.jpg
│  │  │  ├─ home
│  │  │  │  └─ hero.jpg
│  │  │  ├─ how-to-schedule-a-ride
│  │  │  │  ├─ calendar.jpg
│  │  │  │  └─ information.png
│  │  │  ├─ medical-supplies
│  │  │  │  ├─ incontinence.jpg
│  │  │  │  ├─ medical-supply-banner.jpg
│  │  │  │  ├─ mobility.jpg
│  │  │  │  ├─ orthotic-shoes.jpg
│  │  │  │  ├─ ostomy.jpg
│  │  │  │  ├─ urology.jpg
│  │  │  │  └─ wound-care.jpg
│  │  │  ├─ nemt
│  │  │  │  ├─ dash-cam.jpg
│  │  │  │  └─ vehicle-camera.jpg
│  │  │  ├─ non-medical
│  │  │  │  ├─ information.png
│  │  │  │  └─ suv-train.jpg
│  │  │  ├─ prepare-for-first-ride
│  │  │  │  ├─ car-shot.jpg
│  │  │  │  └─ confirm-call.jpg
│  │  │  └─ qualify
│  │  │     └─ qualify-top.jpg
│  │  └─ seo
│  │     ├─ ogImage-assisted-living.png
│  │     ├─ ogImage-golden-gate-manor.png
│  │     └─ ogImage-medical-supply.png
│  ├─ map
│  │  └─ colorado-counties.geojson
│  └─ pdfs
│     ├─ dme
│     │  ├─ Certificate_of_Medical_Necessity_Manual_Wheelchairs.pdf
│     │  ├─ Group_1_Support_Surfaces.pdf
│     │  ├─ Group_2_Support_Surfaces.pdf
│     │  ├─ Physicians_Mobility_Order_Form.pdf
│     │  ├─ Prior_Authorization_Request_Blood_Pressure_Unit_or_Monitor.pdf
│     │  ├─ Prior_Authorization_Request_Hospital_Bed.pdf
│     │  ├─ Prior_Authorization_Request_Lift.pdf
│     │  ├─ Prior_Authorization_Request_Orthotics_and_Prosthetics.pdf
│     │  ├─ Prior_Authorization_Request_Pressure_Release_Mattress.pdf
│     │  ├─ Prior_Authorization_Request_TENS_or_NMES.pdf
│     │  └─ Prior_Authorization_Request_Wheelchair_Tilt_or_Recline_Device.pdf
│     └─ nemt
│        └─ nemt-app&medical-certificate-of-trans-services.pdf
├─ server
│  ├─ api
│  │  └─ sitemap-blog.ts
│  └─ tsconfig.json
├─ tailwind.config.ts
├─ tailwindConfig
│  ├─ animation.ts
│  ├─ boxShadow.ts
│  ├─ colors.ts
│  ├─ dropShadow.ts
│  ├─ fontFamily.ts
│  ├─ fontSize.ts
│  ├─ height.ts
│  ├─ index.ts
│  ├─ keyFrames.ts
│  ├─ listStyleType.ts
│  ├─ screens.ts
│  ├─ transitionDuration.ts
│  └─ zIndex.ts
└─ tsconfig.json

```