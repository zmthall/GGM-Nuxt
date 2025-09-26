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
                        @change-status="(payload) => updateContactStatus(payload, 10, contactPage)"
                        @change-tags="(payload) => updateContactTags(payload, 10, contactPage)"
                        @export-pdf="exportContactPDF"
                        @prev-page="fetchContactMessages(false, 10, --contactPage)"
                        @next-page="fetchContactMessages(false, 10, ++contactPage)"
                        @page-change="(contactPage) => { fetchContactMessages(false, 10, contactPage)}"
                    >
                        <template #actions="{ contactMessage }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="deleteContactMessage(contactMessage.id)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="exportContactPDF(contactMessage)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 w-max" @click="openContactModal(contactMessage)">Open Message</button>
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


const authStore = useAuthStore()
defineOptions({
    name: 'AdminMessagesPage'
})

definePageMeta({
    layout: 'admin',
})

const contactModalOpen = ref<boolean>(false);
const contactMessageModalData = ref<ContactFormData | null>(null)

const openContactModal = (contactMessage: ContactFormData) => {
    contactModalOpen.value = true;
    contactMessageModalData.value = contactMessage;
}

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

onMounted(() => {
    fetchContactMessages(true, 10);
})
</script>