<template>
  <form @submit.prevent="submitContact">
    <div>
      <BaseLayoutPageSection :padding="false" class="space-y-1" bg="transparent">
        <BaseFormSelect 
          v-model="form.reason"
          :values="['general', 'complaint', 'question', 'translation', 'accessibility', 'transportation', 'assisted_living', 'medical_supply']" 
          :labels="reasonLabel"
          :label="$t('contact-form.reason.label')"
          />

        <div class="lg:flex lg:gap-2">
          <BaseFormInput v-model="form.first_name" autocomplete="given-name" name="first-name" :label="$t('contact-form.fields.first-name')" required aria-required />
          <BaseFormInput v-model="form.last_name" autocomplete="family-name" name="last-name" :label="$t('contact-form.fields.last-name')" />
        </div>

        <BaseFormInput v-model="form.email" type="email" autocomplete="email" name="email" :label="$t('contact-form.fields.email')" required aria-required />
        <BaseFormInput v-model="form.phone" type="tel" autocomplete="tel" name="phone" :label="$t('contact-form.fields.phone')" />

        <BaseFormSelect 
          v-model="form.contact_method"
          :values="['email', 'phone']"
          :labels="contactMethodOptions"
          :label="$t('contact-form.contact-method-options.email')"
        />

        <BaseFormTextArea v-model="form.message" name="message" :label="$t('contact-form.fields.message')" required aria-required />

        <BaseUiAction :disabled="isSubmitting" :aria-disabled="isSubmitting" type="submit" class="w-full p-2" >
          <span v-if="!isSubmitting">{{ $t('contact-form.submit.idle') }}</span>
          <span v-else class="animate-pulse">{{ $t('contact-form.submit.loading') }}</span>
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
            {{ $t('contact-form.feedback.success')}}
          </div>
          <div v-else>
            {{ $t('contact-form.feedback.error')}}
          </div>
        </div>
        <div v-if="isSubmitting" class="bg-blue-100 mt-4 p-3 rounded-md text-sm">
          {{ $t('contact-form.feedback.submitting')}}
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
const reasonLabel = computed(() => {
  return [$t('contact-form.reason.options.general'), $t('contact-form.reason.options.complaint'), $t('contact-form.reason.options.question'), $t('contact-form.reason.options.translation'), $t('contact-form.reason.options.accessibility'), $t('contact-form.reason.options.transportation'), $t('contact-form.reason.options.assisted_living'), $t('contact-form.reason.options.medical_supply')]
})
const contactMethodOptions = computed(() => {
  return [$t('contact-form.contact-method-options.email'), $t('contact-form.contact-method-options.phone')]
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
    if (!form.first_name || !form.email || !form.message) {
      submitResult.value = {
        success: false,
        message: $t('contact-form.feedback.required-fields')
      }
      return
    }
  
    const token = await executeRecaptcha('contact_form')
    
    const verification = await verifyWithServer(token)
    
    if (verification.success && verification.data?.valid) {
      await $fetch('/api/contact-form/submit', {
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