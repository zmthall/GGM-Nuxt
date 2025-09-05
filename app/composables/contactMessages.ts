import type { ContactFormData, ContactFormStatus } from "~/models/admin/ContactForm";
import type { Pagination } from "~/models/Pagination";

export const useContactMessages = () => {
  const contactMessages = ref<ContactFormData[]>([]);
  const contactMessagesPagination = ref<Pagination | null>(null)
  const loadingContactMessages = ref<boolean>(true);
  const authStore = useAuthStore();
  const contactPage = ref<number>(1)

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
      }
    } catch (error) {
      console.error((error as Error).message)
    } finally {
      loadingContactMessages.value = false;
    }
  }


  const updateContactStatus = async (messageData: {id: string, status: ContactFormStatus}) => {
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

  const updateContactTags = async (messageData: { id: string, tags: string[]}) => {
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

  const exportContactPDF = async ({ id }: ContactFormData | { id: string }) => {
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

  const deleteContactMessage = async (id: string) => {
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

  return {
    fetchContactMessages,
    updateContactStatus,
    updateContactTags,
    exportContactPDF,
    deleteContactMessage,
    contactPage,
    contactMessages,
    contactMessagesPagination,
    loadingContactMessages
  }
}
