<template>
  <form @submit.prevent="submitRequest">
    <div class="sm:mx-4 mt-4 sm:my-8 px-2 py-8 bg-white sm:rounded-lg lg:shadow-primary lg:w-[75%] lg:mx-auto lg:p-8 xl:w-[60%] space-y-8">
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">Passenger Information</h2>
        <BaseFormInput v-model="form.name" autocomplete="name" name="Name" label="Name" placeholder="First and Last" />
        <BaseFormDatePicker id="dob" v-model="form.dob" autocomplete="bday" label="Date of Birth" placeholder="Select your birthdate" start-date="January 1, 2000"/>
        <BaseFormInput v-model="form.phone" type="tel" autocomplete="tel" label="Phone Number" name="phone" placeholder="(555) 555-5555" />
        <BaseFormInput v-model="form.email" type="email" autocomplete="email" label="Email" name="email" placeholder="email@email.com" />
        <BaseFormInput v-model="form.med_id" type="text" autocomplete="off" name="medicaid" label="Medicaid ID" placeholder="Enter your Medicaid ID" />
      </BaseLayoutPageSection>
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">Trip Information</h2>
        <PleaseNote>
          <div class="space-y-2">
            <p>All trips are on a first come first serve basis, with this in mind, please make sure to schedule trips 24-48 hours prior to the trip date to make sure that we can accommodate the trip. We cannot promise availability for trips that were not scheduled 24-48 hours prior to the trip.</p>
            <p>If your trip falls on a Monday, please schedule the ride on the Friday prior so that we can certify that we have received it in ample time to accommodate the trip. We cannot promise availability for trips on Monday that were not scheduled on the prior Friday.</p>
            <p>Golden Gate Manor staff thanks you for your understanding and we appreciate your efforts to ease the scheduling process.</p>
            <p>If you have any questions or concerns regarding our ability to accommodate a trip please call us at <a href="tel:719-543-2525" class="text-brand-primary underline">(719) 543-2525</a>.</p>
          </div>
        </PleaseNote>
        <BaseFormDatePicker id="apt_date" v-model="form.apt_date" autocomplete="off" label="Appointment Date" placeholder="Select a Date" min-date/>
        <BaseFormTimePicker id="apt_time" v-model="form.apt_time" autocomplete="off" label="Appointment Time" placeholder="Select a Time" />
        <BaseFormInput v-model="form.pickup_address" type="text" autocomplete="street-address" name="pickup-address" label="Pickup Address" placeholder="e.g. 300 Colorado Ave., Pueblo, CO, 81004" />
        <BaseFormInput v-model="form.dropoff_address" type="text" autocomplete="street-address" name="dropoff-address" label="Drop-Off Address" placeholder="e.g. 300 Colorado Ave., Pueblo, CO, 81004" />
        <BaseFormTextArea v-model="form.notes" autocomplete="off" name="notes" label="Notes/Messages/Special Requirements" placeholder="If you need anything specific, such as a wheelchair accessible van, request it here."/>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">Agree to Terms</h2>
        <BaseFormCheckbox v-model="form.acknowledge" name="attestation"><p>I certify the information provided is accurate to the best of my knowledge and that I have read Golden Gate Manor's <NuxtLink to="/company/policies/ride-cancellation" rel="noopener" target="_blank" class="link" @click.stop>Ride Cancellation Policy</NuxtLink>.</p></BaseFormCheckbox>
        <BaseUiAction type="submit" class="py-4 px-8 block !mt-8">Submit Request</BaseUiAction>
      </BaseLayoutPageSection>
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
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useRecaptcha } from '../../composables/messages/recaptcha';
const { executeRecaptcha, verifyWithServer, loadRecaptcha, unloadRecaptcha } = useRecaptcha()

const form = reactive({
  name: '',
  dob: undefined,
  phone: '',
  email: '',
  med_id: '',
  apt_date: '',
  apt_time: '',
  pickup_address: '',
  dropoff_address: '',
  notes: '',
  acknowledge: false
})

onMounted(() => {
  loadRecaptcha()
})

// Clean up ReCAPTCHA when component unmounts
onUnmounted(() => {
  unloadRecaptcha()
})

const isSubmitting = ref(false)
const submitResult = ref<{ success: boolean; message: string; score?: number } | null>(null)

const submitRequest = async () => {
  try {
    isSubmitting.value = true
    submitResult.value = null
    
    // Validate required fields
    if (!form.name || !form.dob || !form.phone || !form.email || !form.med_id || !form.apt_date || !form.apt_time || !form.pickup_address || !form.dropoff_address || !form.acknowledge) {
      submitResult.value = {
        success: false,
        message: 'Please fill in all required fields'
      }
      return
    }
  
    const token = await executeRecaptcha('schedule_form')
    
    const verification = await verifyWithServer(token)
    
    if (verification.success && verification.data?.valid) {
      console.log(JSON.stringify(form))
      await $fetch('/api/email/ride-request', {
        baseURL: 'https://api.goldengatemanor.com',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          dob: new Date(form.dob).toISOString().split('T')[0],
          apt_date: new Date(form.apt_date).toISOString().split('T')[0],
          apt_time: new Date(`${form.apt_date} ${form.apt_time}`).toISOString()
        })
      })
      
      submitResult.value = {
        success: true,
        message: 'Request submitted successfully!',
        score: verification.data.score
      }
      
      // Reset form
      Object.assign(form, {
        name: '',
        dob: undefined,
        phone: '',
        email: '',
        med_id: '',
        apt_date: '',
        apt_time: '',
        pickup_address: '',
        dropoff_address: '',
        notes: '',
        acknowledge: false
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