import type { RideRequestFormData, RideRequestStatus } from "~/models/admin/RideRequestForm";
import type { Pagination } from "~/models/Pagination";

export const useRideRequests = () => {
  const rideRequests = ref<RideRequestFormData[]>([]);
  const rideRequestsPagination = ref<Pagination | null>(null)
  const loadingRideRequests = ref<boolean>(true);
  const authStore = useAuthStore();
  const requestPage = ref<number>(1)

  const fetchRideRequests = async (isLoading: boolean = true, pageSize: number = 5, page: number = 1) => {
    if(isLoading)
          loadingRideRequests.value = true;
        try {
          const idToken = await authStore.getIdToken();
    
          const response = await $fetch<{ success: boolean, data: RideRequestFormData[], pagination: Pagination }>(`/api/ride-request?page=${page}&pageSize=${pageSize}`, {
              baseURL: 'https://api.goldengatemanor.com',
              method: 'GET',
              headers: {
                      'Authorization': `Bearer ${idToken}`,
                  }
            })
    
          if(response.success) {
            rideRequests.value = response.data
            rideRequestsPagination.value = response.pagination
          }
        } catch (error) {
          console.error((error as Error).message)
        } finally {
          loadingRideRequests.value = false;
        }
  }

  const updateRideStatus = async (messageData: {id: string, status: RideRequestStatus}, pageSize: number = 5) => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch<{ success: boolean }>(`/api/ride-request/${messageData.id}/status`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({ status: messageData.status })
        })

        if(response.success) {
            fetchRideRequests(false, pageSize);
        }
    } catch (error) {
        console.error((error as Error).message)
    }
  }

  const updateRideTags = async (messageData: { id: string, tags: string[]}, pageSize: number = 5) => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch<{ success: boolean }>(`/api/ride-request/${messageData.id}/tags`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({ tags: messageData.tags })
        })

        if(response.success) {
            fetchRideRequests(false, pageSize);
        }
    } catch (error) {
        console.error((error as Error).message)
    }
  }

  const exportRidePDF = async ({ id }: RideRequestFormData | { id: string }) => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch.raw(`/api/ride-request/export/pdf/${id}`, {
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

  const deleteRideRequest = async (id: string, pageSize: number = 5) => {
    try {
      const idToken = await authStore.getIdToken();

      const response = await $fetch<{ success: boolean }>(`/api/ride-request/${id}`, {
          baseURL: 'https://api.goldengatemanor.com',
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${idToken}`,
          }
      })

      if(response.success) {
          fetchRideRequests(false, pageSize);
      }
    } catch (error) {
        console.error((error as Error).message)
    }
  }

  return {
    fetchRideRequests,
    updateRideStatus,
    updateRideTags,
    exportRidePDF,
    deleteRideRequest,
    rideRequests,
    loadingRideRequests,
    rideRequestsPagination,
    requestPage
  }
}
