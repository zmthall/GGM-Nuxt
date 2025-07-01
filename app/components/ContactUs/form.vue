<template>
  <form @submit.prevent="submitContact">
    <div>
      <BaseLayoutPageSection :padding="false" class="space-y-1" bg="transparent">
        <BaseFormSelect 
          v-model="form.reason"
          :values="['general', 'complaint', 'question', 'transportation', 'assisted_living', 'medical_supply', 'accessibility']" 
          :labels="['General Contact', 'File a Complaint', 'Question or Inquiry', 'Transportation Services', 'Assisted Living', 'Medical Supplies', 'Accessibility']" 
          label="Reason for Contact"
          />

        <div class="lg:flex lg:gap-2">
          <BaseFormInput v-model="form.first_name" autocomplete="given-name" name="first-name" label="First Name*" />
          <BaseFormInput v-model="form.last_name" autocomplete="family-name" name="last-name" label="Last Name"/>
        </div>

        <BaseFormInput v-model="form.email" type="email" autocomplete="email" name="email" label="Email*" />
        <BaseFormInput v-model="form.phone" type="tel" autocomplete="tel" name="phone" label="Phone" />

        <BaseFormSelect 
          v-model="form.contact_method"
          :values="['email', 'phone']"
          :labels="['Email', 'Phone']"
          label="Preferred Contact Method"
        />

        <BaseFormTextArea v-model="form.message" name="message" label="Comment/Inquiry/Message*"/>

        <BaseUiAction type="submit" class="w-full p-2">Send Message</BaseUiAction>
        <!-- Add feedback -->
      <div 
        v-if="submitResult" class="mt-4 p-3 rounded-md" 
        :class="submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
        <div v-if="submitResult.success && submitResult.score" class="text-sm">
          Message sent successfully!
        </div>
        <div v-else>
          Message failed to send. Please try again.
        </div>
      </div>
      <div v-if="isSubmitting" class="bg-blue-100 mt-4 p-3 rounded-md text-sm">
        Submitting message, please wait...
      </div>
      </BaseLayoutPageSection>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useRecaptcha } from '../../composables/messages/recaptcha';

const form = reactive({
  reason: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  contact_method: '',
  message: ''
})

const { executeRecaptcha, verifyWithServer, loadRecaptcha, unloadRecaptcha } = useRecaptcha()

onMounted(() => {
  loadRecaptcha()
})

// Clean up ReCAPTCHA when component unmounts
onUnmounted(() => {
  unloadRecaptcha()
})

const isSubmitting = ref(false)
const submitResult = ref<{ success: boolean; message: string; score?: number } | null>(null)

const submitContact = async () => {
  try {
    isSubmitting.value = true
    submitResult.value = null
    
    // Validate required fields
    if (!form.first_name || !form.email || !form.message) {
      submitResult.value = {
        success: false,
        message: 'Please fill in all required fields'
      }
      return
    }
  
    const token = await executeRecaptcha('contact_form')
    
    const verification = await verifyWithServer(token)
    
    if (verification.success && verification.data?.valid) {
      await $fetch('/api/email/contact-form', {
        baseURL: 'https://api.goldengatemanor.com',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      
      submitResult.value = {
        success: true,
        message: 'Message sent successfully!',
        score: verification.data.score
      }
      
      // Reset form
      Object.assign(form, {
        reason: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        contact_method: '',
        message: ''
      })

      setTimeout(() => {
        submitResult.value = null;
      }, 5000);
    } else {
      submitResult.value = {
        success: false,
        message: verification.message || 'ReCAPTCHA verification failed'
      }
    }
    
  } catch (error) {
    console.error('Form submission error:', error)
    submitResult.value = {
      success: false,
      message: (error as Error).message || 'An error occurred while submitting the form'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style>

</style>