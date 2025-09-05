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
import type { ContactFormData, ContactFormStatus } from '../../../models/admin/ContactForm.js'
import type { Pagination } from '../../../models/Pagination.js';

const authStore = useAuthStore()
defineOptions({
    name: 'AdminMessagesPage'
})

definePageMeta({
    layout: 'admin',
})

const contactMessages = ref<ContactFormData[]>([]);
const contactMessagesPagination = ref<Pagination | null>(null)
const loadingContactMessages = ref<boolean>(true);
const page = ref<number>(1)

const fetchContactMessages = async (isLoading: boolean = true, page: number = 1) => {
  if(isLoading)
    loadingContactMessages.value = true;
  try {
    const idToken = await authStore.getIdToken();

    const response = await $fetch<{ success: boolean, data: ContactFormData[], pagination: Pagination }>(`/api/contact-form?page=${page}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'GET',
      headers: {
              'Authorization': `Bearer ${idToken}`,
          }
    })

    if(response.success) {
      contactMessages.value = response.data
      contactMessagesPagination.value = response.pagination

      console.log(contactMessagesPagination)
    }
  } catch (error) {
    console.error((error as Error).message)
  } finally {
    loadingContactMessages.value = false;
  }
}


const updateStatus = async (messageData: {id: string, status: ContactFormStatus}) => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch<{ success: boolean }>(`/api/contact-form/${messageData.id}/status`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({ status: messageData.status })
        })

        if(response.success) {
            fetchContactMessages(false);
        }
    } catch (error) {
        console.error((error as Error).message)
    }
}

const updateTags = async (messageData: { id: string, tags: string[]}) => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch<{ success: boolean }>(`/api/contact-form/${messageData.id}/tags`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({ tags: messageData.tags })
        })

        if(response.success) {
            fetchContactMessages(false);
        }
    } catch (error) {
        console.error((error as Error).message)
    }
}

const exportPDF = async ({ id }: ContactFormData | { id: string }) => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch.raw(`/api/contact-form/export/pdf/${id}`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Accept': 'application/pdf'
            },
            responseType: 'blob'
        })

        if (!response.ok) throw new Error(`Download failed: ${response.status}`);
        
        const filename = response.headers.get('X-Filename') || `contact-form-${id.split('-')[0]}`
        const blob = response._data as Blob

        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement('a'), { href: url, download: filename });
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
        console.error((error as Error).message)
    }
}

const deleteMessage = async (id: string) => {
        try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch<{ success: boolean }>(`/api/contact-form/${id}`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })

        if(response.success) {
            fetchContactMessages(false);
        }
    } catch (error) {
        console.error((error as Error).message)
    }
}

onMounted(() => {
    fetchContactMessages();
})

</script>

<style></style>