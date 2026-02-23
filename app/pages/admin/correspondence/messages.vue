<template>
    <div v-if="authStore.authorized">
        <BaseLayoutPageSection margin="top" bg="transparent">
            <BaseLayoutPageContainer>
                <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
                    <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Contact Messages</h2>
                    <AdminContactFormTable
                        v-model="contactModalOpen"
                        v-model:data="contactMessageModalData" 
                        :loading="loadingContactMessages" 
                        :contact-messages="contactMessages" 
                        :pagination="contactMessagesPagination" 
                        :has-toolbar="false" 
                        @change-status="(payload) => updateContactStatus(payload, 10, contactPage, false)"
                        @change-tags="(payload) => updateContactTags(payload, 10, contactPage, false)"
                        @export-pdf="exportContactPDF"
                        @prev-page="prevContactPage"
                        @next-page="nextContactPage"
                        @page-change="setContactPage"
                    >
                        <template #actions="{ contactMessage }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click.stop="deleteContactMessage(contactMessage.id, 10, false)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click.stop="exportContactPDF(contactMessage)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                            </div>
                        </template>            
                    </AdminContactFormTable>
                </BaseLayoutCard>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
import type { ContactFormData } from '../../../models/admin/ContactForm.js';

const nextContactPage = () => fetchContactMessages(false, 10, contactPage.value + 1, false)
const prevContactPage = () => fetchContactMessages(false, 10, Math.max(1, contactPage.value - 1), false)
const setContactPage  = (p: number) => fetchContactMessages(false, 10, p, false)

const authStore = useAuthStore()
defineOptions({
    name: 'AdminMessagesPage'
})

definePageMeta({
    layout: 'admin',
})

const contactModalOpen = ref<boolean>(false);
const contactMessageModalData = ref<ContactFormData | null>(null)

const { 
    fetchContactMessages, 
    updateContactStatus, 
    updateContactTags, 
    exportContactPDF,
    deleteContactMessage,
    contactPage,
    contactMessages,
    contactMessagesPagination,
    loadingContactMessages
} = useContactMessages();

onMounted(async () => {
  const { $getFirebase } = useNuxtApp()
  await $getFirebase() // ensure Firebase init

  // wait until auth is actually ready and logged in
  if (!(useAuthStore().isFirebaseReady && useAuthStore().authorized)) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => useAuthStore().isFirebaseReady && useAuthStore().authorized,
        (ok) => { if (ok) { stop(); resolve() } }
      )
    })
  }

  // call exactly what this page needs (one time)
  // e.g. Dashboard:
  await Promise.allSettled([
    fetchContactMessages(true, 10, contactPage.value, false),
  ])
})
</script>