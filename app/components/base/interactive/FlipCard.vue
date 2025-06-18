<template>
  <div class="employment-page-opportunity-card w-full xs:w-[330px] h-[350px] relative">
    <!-- Front -->
    <div class="opportunity-card-front" :style="backgroundStyle">
      <div class="opportunity-card-content">
        <slot name="front" />
      </div>
    </div>

    <!-- Back -->
    <div class="opportunity-card-back" :style="backgroundStyle">
      <slot name="back" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ 
  src?: string
}>()

const backgroundStyle = computed(() =>
  props.src
    ? {
        backgroundImage: `url(${props.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}
)
</script>

<style scoped>
.employment-page-opportunity-card:hover > .opportunity-card-back {
  transform: rotateY(360deg);
}

.employment-page-opportunity-card:hover > .opportunity-card-front,
.opportunity-card-back {
  transform: rotateY(180deg);
}

.opportunity-card-back {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

.opportunity-card-front {
  position: absolute;
}

.opportunity-card-back,
.opportunity-card-front {
  width: 100%;
  height: 100%;
  padding: 1rem;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: transform 1s ease-in-out;
  border: 1px solid;
  box-shadow: 2px 5px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  overflow: hidden;
}

.opportunity-card-front {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  z-index: 0;
}

.opportunity-card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Ensure back card content is above the faded background */
.opportunity-card-back > * {
  position: relative;
  z-index: 1;
}

.opportunity-card-front::after,
.opportunity-card-front::before {
  content: "";
  width: 100%;
  height: 30%;
  left: 0;
  position: absolute;
  z-index: 0;
}

.opportunity-card-front::before {
  top: 0;
  background: linear-gradient(to bottom, #fff, transparent);
}

.opportunity-card-front::after {
  bottom: 0;
  background: linear-gradient(to top, #fff, transparent);
}

/* Background images removed - now uses src prop */

.opportunity-card-back::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.75);
  z-index: 0;
}
</style>