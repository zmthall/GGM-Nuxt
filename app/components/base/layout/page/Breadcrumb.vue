<template>
  <nav v-if="shouldEmit" aria-label="breadcrumb" class="mx-4 mt-2 p-2 bg-zinc-300 font-bold max-sm:hidden">
    <ol class="flex">
      <li v-if="!isAdmin">
        <NuxtLink to="/" class="link">Home</NuxtLink>
      </li>
      <li v-else>
        <NuxtLink to="/admin" class="link">Dashboard Home</NuxtLink>
      </li>
      <li v-for="crumb in crumbs" :key="crumb.path">
        <template v-if="!crumb.isLast">
         &nbsp;/&nbsp;<NuxtLink :to="crumb.path" class="link">{{ crumb.label }}</NuxtLink>
        </template>
        <template v-else>
          <span>&nbsp;/&nbsp;{{ crumb.label }}</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const { schema, crumbs, shouldEmit, isAdmin } = buildCrumbs()

if (shouldEmit.value) {
  useSchemaOrg([ defineBreadcrumb(schema.value) ])
}
</script>