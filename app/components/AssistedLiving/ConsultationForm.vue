<template>
  <form @submit.prevent="submitContact">
    <div>
      <BaseLayoutPageSection :padding="false" class="space-y-2" bg="transparent">
        <!-- Personal Information -->
        <div class="space-y-1">
          <div class="lg:flex lg:gap-2">
            <BaseFormInput v-model="form.personal_information.first_name" autocomplete="given-name" name="first-name" :label="$t('consultation-form.fields.first-name')" required aria-required />
            <BaseFormInput v-model="form.personal_information.last_name" autocomplete="family-name" name="last-name" :label="$t('consultation-form.fields.last-name')" />
          </div>
  
          <BaseFormInput v-model="form.personal_information.email" type="email" autocomplete="email" name="email" :label="$t('consultation-form.fields.email')" required aria-required />
          <BaseFormInput v-model="form.personal_information.phone" type="tel" autocomplete="tel" name="phone" :label="$t('consultation-form.fields.phone')" />
  
          <BaseFormSelect 
            v-model="form.personal_information.contact_method"
            :values="['email', 'phone']"
            :labels="consultationContactMethodOptions"
            :label="$t('consultation-form.fields.contact-method-options.label')"
          />
        </div>

        <div class="space-y-1">
          <BaseFormRadios 
            v-model="form.individual_care_information.person_seeking_care"
            :values="['self', 'parent', 'family-member', 'friend', 'client|patient', 'other']"
            :labels="consultationPersonSeekingCareOptions"
            :label="$t('consultation-form.fields.person-seeking-care.label')"
            name="seeking-care"
            styling="grid grid-cols-3 gap-2"
          />
        </div>

        <BaseFormInput v-if="personSeekingCareOtherSelected" v-model="form.individual_care_information.person_seeking_care" type="text" name="person-seeking-care-other" :label="$t('consultation-form.fields.person-seeking-care.other')" required aria-required />

        <BaseUiAction :disabled="isSubmitting" :aria-disabled="isSubmitting" type="submit" class="w-full p-2" >
          <span v-if="!isSubmitting">{{ $t('consultation-form.submit.idle') }}</span>
          <span v-else class="animate-pulse">{{ $t('consultation-form.submit.loading') }}</span>
        </BaseUiAction>
        <!-- Recaptcha Privacy Notice -->
        <div class="text-xs text-gray-700">
          <span>
            {{ $t('components.form.recaptcha.text-before') }}&nbsp;
          </span>
          <a href="https://policies.google.com/privacy" class="link">{{ $t('components.form.recaptcha.privacy-policy') }}</a><span>&nbsp;{{ $t('components.form.recaptcha.text-middle') }}&nbsp;</span> 
          <a href="https://policies.google.com/terms" class="link">{{ $t('components.form.recaptcha.terms-of-service') }}</a><span>&nbsp;{{ $t('components.form.recaptcha.text-after') }}</span>
        </div>

          <!-- Add feedback -->
        <div 
          v-if="submitResult" class="mt-4 p-3 rounded-md" 
          :class="submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          <div v-if="submitResult.success && submitResult.score" class="text-sm">
            {{ $t('consultation-form.feedback.success')}}
          </div>
          <div v-else>
            {{ $t('consultation-form.feedback.error')}}
          </div>
        </div>
        <div v-if="isSubmitting" class="bg-blue-100 mt-4 p-3 rounded-md text-sm">
          {{ $t('consultation-form.feedback.submitting')}}
        </div>
      </BaseLayoutPageSection>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useRecaptcha } from '../../composables/messages/recaptcha';

const form = reactive({
  personal_information: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    contact_method: 'phone',
  },
  individual_care_information: {
    person_seeking_care: 'self',
    person_seeking_care_other: ''
  },
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

const consultationContactMethodOptions = computed(() => {
  return [$t('consultation-form.fields.contact-method-options.labels.email'), $t('consultation-form.fields.contact-method-options.labels.phone')]
})

const consultationPersonSeekingCareOptions = computed(() => {
  return [
    $t('consultation-form.fields.person-seeking-care.labels.self'),
    $t('consultation-form.fields.person-seeking-care.labels.parent'),
    $t('consultation-form.fields.person-seeking-care.labels.family-member'),
    $t('consultation-form.fields.person-seeking-care.labels.friend'),
    $t('consultation-form.fields.person-seeking-care.labels.client-patient'),
    $t('consultation-form.fields.person-seeking-care.labels.other')
  ]
})

const personSeekingCareOtherSelected = computed(() => {
  return form.individual_care_information.person_seeking_care === 'other'
})

const { trigger: triggerVirtualThankYou } = useVirtualThankYou({
  slug: 'thank-you',
  pageTitle: 'Contact – Thank You',
  revertAfterMs: 5000,
  fireGTM: false,      // start false to avoid duplicates
  fireGtag: true,      // GA4 direct
  fireFbq: false,
  fireUet: true,
  successRef: submitResult,
  autoSetSuccessOnThankYou: true,
  extraData: { debug_mode: true } // helps show up in GA4 DebugView
})

const submitContact = async () => {
  try {
    isSubmitting.value = true
    submitResult.value = null
    
    // Validate required fields
    if (!form.personal_information.first_name || !form.personal_information.email || !form.message) {
      submitResult.value = {
        success: false,
        message: $t('consultation-form.feedback.required-fields')
      }
      return
    }
  
    const token = await executeRecaptcha('contact_form')
    
    const verification = await verifyWithServer(token)
    
    if (verification.success && verification.data?.valid) {
      await $fetch('/api/consultation-form/submit', {
        baseURL: useRuntimeConfig().public.useLocalApi ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
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

      triggerVirtualThankYou();
      
      // Reset form
      Object.assign(form, {
        reason: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        contact_method: 'phone',
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