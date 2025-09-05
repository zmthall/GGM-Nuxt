<template>
    <div v-if="authStore.authorized">
        <BaseLayoutPageSection margin="top" bg="transparent">
            <BaseLayoutPageContainer>
                <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
                    <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Contact Messages</h2>
                    <AdminContactFormTable 
                        :loading="loadingContactMessages" 
                        :contact-messages="contactMessages" 
                        :pagination="contactMessagesPagination" 
                        :has-toolbar="false" 
                        @change-status="updateStatus"
                        @change-tags="updateTags"
                        @export-pdf="exportPDF"
                        @prev-page="fetchContactMessages(false, --page)"
                        @next-page="fetchContactMessages(false, ++page)"
                        @page-change="(p) => { page = p; fetchContactMessages(false, page)}"
                    >
                        <template #actions="{ contactMessage }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="deleteMessage(contactMessage.id)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="exportPDF(contactMessage)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
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

const authStore = useAuthStore()
defineOptions({
    name: 'AdminMessagesPage'
})

definePageMeta({
    layout: 'admin',
})

const { 
    fetchContactMessages, 
    updateStatus, 
    updateTags, 
    exportPDF,
    deleteMessage,
    page,
    contactMessages,
    contactMessagesPagination,
    loadingContactMessages
} = useContactMessages()

onMounted(() => {
    fetchContactMessages();
})

</script>

<style></style>