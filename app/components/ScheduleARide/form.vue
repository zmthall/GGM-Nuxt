<template>
  <form @submit.prevent="submitRequest">
    <div class="sm:mx-4 mt-4 sm:my-8 px-2 py-8 bg-white sm:rounded-lg lg:shadow-primary lg:w-[75%] lg:mx-auto lg:p-8 xl:w-[60%] space-y-8">
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">{{ $t('schedule-form.sections.passenger.title') }}</h2>
        <BaseFormInput v-model="form.name" autocomplete="name" name="name" :label="$t('schedule-form.sections.passenger.fields.name.label')" :placeholder="$t('schedule-form.sections.passenger.fields.name.placeholder')" />
        <BaseFormDatePicker id="dob" v-model="form.dob" autocomplete="bday" :label="$t('schedule-form.sections.passenger.fields.dob.label')" :placeholder="$t('schedule-form.sections.passenger.fields.dob.placeholder')" start-date="January 1, 2000"/>
        <BaseFormInput v-model="form.phone" type="tel" autocomplete="tel" :label="$t('schedule-form.sections.passenger.fields.phone.label')" name="phone" placeholder="(555) 555-5555" />
        <BaseFormInput v-model="form.email" type="email" autocomplete="email" :label="$t('schedule-form.sections.passenger.fields.email.label')" name="email" placeholder="email@email.com" />
        <BaseFormInput v-model="form.med_id" type="text" autocomplete="off" name="medicaid" :label="$t('schedule-form.sections.passenger.fields.medicaid.label')" :placeholder="$t('schedule-form.sections.passenger.fields.medicaid.placeholder')" />
      </BaseLayoutPageSection>
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">{{ $t('schedule-form.sections.trip.title') }}</h2>
        <PleaseNote>
          <div class="space-y-2">
            <p>
              {{ $t('schedule-form.sections.trip.note.paragraphs[0]') }}
            </p>
            <p>
              {{ $t('schedule-form.sections.trip.note.paragraphs[1]') }}
            </p>
            <p>{{ $t('schedule-form.sections.trip.note.paragraphs[2]') }}</p>
            <p>
              {{ $t('schedule-form.sections.trip.note.paragraphs[3]') }}
              <CallRailLink
                  tel="719-543-2525"
                  display="(719) 543-2525"
                  cls="link"
                  :aria-label="$t('schedule-form.sections.trip.note.link.aria')"
              />.
            </p>
          </div>
        </PleaseNote>
        <BaseFormDatePicker id="apt_date" v-model="form.apt_date" autocomplete="off" :label="$t('schedule-form.sections.trip.fields.appointment_date.label')" :placeholder="$t('schedule-form.sections.trip.fields.appointment_date.placeholder')" min-date/>
        <BaseFormTimePicker id="apt_time" v-model="form.apt_time" autocomplete="off" :label="$t('schedule-form.sections.trip.fields.appointment_time.label')" :placeholder="$t('schedule-form.sections.trip.fields.appointment_time.placeholder')" />
        <BaseFormInput v-model="form.pickup_address" type="text" autocomplete="street-address" name="pickup-address" :label="$t('schedule-form.sections.trip.fields.pickup.label')" placeholder="e.g. 300 Colorado Ave., Pueblo, CO, 81004" />
        <BaseFormInput v-model="form.dropoff_address" type="text" autocomplete="street-address" name="dropoff-address" :label="$t('schedule-form.sections.trip.fields.dropoff.label')" placeholder="e.g. 300 Colorado Ave., Pueblo, CO, 81004" />
        <BaseFormTextArea v-model="form.notes" autocomplete="off" name="notes" :label="$t('schedule-form.sections.trip.fields.notes.label')" :placeholder="$t('schedule-form.sections.trip.fields.notes.placeholder')"/>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">{{ $t('schedule-form.sections.terms.title') }}</h2>
        <BaseFormCheckbox v-model="form.acknowledge" name="attestation"><p>{{ $t('schedule-form.sections.terms.checkbox.text') }} <NuxtLink :to="$localePath('/company/policies/ride-cancellation')" rel="noopener" target="_blank" class="link" @click.stop>{{ $t('schedule-form.sections.terms.checkbox.link') }}</NuxtLink>.</p></BaseFormCheckbox>
        <BaseUiAction :disabled="isSubmitting" :aria-disabled="isSubmitting" type="submit" class="py-4 px-8 block !mt-8">
          <span v-if="!isSubmitting">{{ $t('schedule-form.sections.terms.submit.idle') }}</span>
          <span v-else class="animate-pulse">{{ $t('schedule-form.sections.terms.submit.loading') }}</span>
        </BaseUiAction>
        <!-- Recaptcha Privacy Notice -->
        <div class="text-xs text-gray-700">
          <span>
            {{ $t('components.form.recaptcha.text-before') }}&nbsp;
          </span>
          <a href="https://policies.google.com/privacy" class="link">{{ $t('components.form.recaptcha.privacy-policy') }}</a><span>&nbsp;{{ $t('components.form.recaptcha.text-middle') }}&nbsp;</span> 
          <a href="https://policies.google.com/terms" class="link">{{ $t('components.form.recaptcha.terms-of-service') }}</a><span>&nbsp;{{ $t('components.form.recaptcha.text-after') }}</span>
        </div>
      </BaseLayoutPageSection>

      <div 
        v-if="submitResult" class="mt-4 p-3 rounded-md" 
        :class="submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
        <div v-if="submitResult.success && submitResult.score" class="text-sm">
          {{ $t('schedule-form.feedback.success')}}
        </div>
        <div v-else>
          {{ $t('schedule-form.feedback.error')}}
        </div>
      </div>
      <div v-if="isSubmitting" class="bg-blue-100 mt-4 p-3 rounded-md text-sm">
        {{ $t('schedule-form.feedback.submitting') }}
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
  apt_date: undefined,
  apt_time: undefined,
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

const { trigger: triggerVirtualThankYou } = useVirtualThankYou({
  slug: 'thank-you',
  pageTitle: 'Ride Request - Thank You',
  revertAfterMs: 5000,
  fireGTM: false,      // start false to avoid duplicates
  fireGtag: true,      // GA4 direct
  fireFbq: false,
  fireUet: true,
  successRef: submitResult,
  autoSetSuccessOnThankYou: true,
  extraData: { debug_mode: true } // helps show up in GA4 DebugView
})

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
      await $fetch('/api/ride-request/submit', {
        baseURL: useRuntimeConfig().public.useLocalApi ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
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

      triggerVirtualThankYou();

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