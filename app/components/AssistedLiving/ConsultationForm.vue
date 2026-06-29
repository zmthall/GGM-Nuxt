<template>
  <form @submit.prevent="submitConsultationRequest">
    <div>
      <BaseLayoutPageSection :padding="false" class="space-y-6" bg="transparent">
        <!-- Personal Information -->
        <div class="space-y-1">
          <h3 class="border-b border-b-black/15 text-brand-primary font-bold">Contact Information</h3>
          <div class="lg:flex lg:gap-2">
            <BaseFormInput
              v-model="form.personal_information.first_name"
              autocomplete="given-name"
              name="given-name"
              :label="$t('consultation-form.fields.first-name')"
              required
            />

            <BaseFormInput
              v-model="form.personal_information.last_name"
              autocomplete="family-name"
              name="family-name"
              :label="$t('consultation-form.fields.last-name')"
              required
            />
          </div>
  
          <BaseFormInput v-model="form.personal_information.email" type="email" autocomplete="email" name="email" :label="`${prefersEmailContact ? `${$t('consultation-form.fields.email')}*` : $t('consultation-form.fields.email')}`" :required="prefersEmailContact" :aria-required="prefersEmailContact" />
          <BaseFormInput v-model="form.personal_information.phone" type="tel" autocomplete="tel" name="tel" :label="`${prefersPhoneContact ? `${$t('consultation-form.fields.phone')}*` : $t('consultation-form.fields.phone')}`" :required="prefersPhoneContact" :aria-required="prefersPhoneContact" />
  
          <BaseFormSelect 
            v-model="form.personal_information.contact_method"
            :values="['email', 'phone']"
            :labels="consultationContactMethodLabels"
            :label="$t('consultation-form.fields.contact-method-options.label')"
            no-initial-select
          />
        </div>

        <!-- Individual Seeking Care -->
        <div>
          <h3 class="border-b border-b-black/15 text-brand-primary font-bold">Care Information</h3>
          <div class="space-y-2">
            <BaseFormRadios 
              v-model="form.individual_care_information.person_seeking_care.value"
              :values="['self', 'parent', 'family-member', 'friend', 'client-patient', 'other']"
              :labels="consultationPersonSeekingCareLabels"
              :label="$t('consultation-form.fields.person-seeking-care.label')"
              name="seeking-care"
              styling="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            />
            <BaseFormInput v-if="personSeekingCareOtherSelected" v-model="form.individual_care_information.person_seeking_care.other" type="text" name="person-seeking-care-other" :label="$t('consultation-form.fields.person-seeking-care.other')" required aria-required="true" />
          </div>
          
          <div class="space-y-2">
            <BaseFormRadios 
              v-model="form.individual_care_information.age_range"
              :values="['18-40', '40-55', '55-65', '65-75', '75+', 'no-answer']"
              :labels="['18-40', '40-55', '55-65', '65-75', '75+', $t('consultation-form.fields.age-range.no-answer')]"
              :label="$t('consultation-form.fields.age-range.label')"
              name="age-range"
              styling="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            />
          </div>
        </div>

        <!-- Care and Financial Information -->
        <div class="space-y-4">
          <h3 class="border-b border-b-black/15 text-brand-primary font-bold">Care Support Information</h3>
          <div>
            <BaseFormRadios 
              v-model="form.individual_care_information.insurance_type.value"
              :values="['medicaid', 'medicare', 'private-insurance', 'va-benefits', 'unknown', 'other']"
              :labels="insuranceTypeLabels"
              :label="$t('consultation-form.fields.insurance-type.label')"
              name="insurance-type"
              styling="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            />
            <BaseFormInput v-if="insuranceTypeOtherSelected" v-model="form.individual_care_information.insurance_type.other" type="text" name="insurance-type-other" :label="$t('consultation-form.fields.insurance-type.other')" required aria-required="true" />
          </div>
          <div class="space-y-2">
            <BaseFormRadios
              v-for="question in form.individual_care_information.questions"
              :key="question.name"
              v-model="question.value"
              :values="['yes', 'no', 'unsure']"
              :labels="[
                $t('consultation-form.fields.yes-no.yes'),
                $t('consultation-form.fields.yes-no.no'),
                $t('consultation-form.fields.yes-no.unsure')
              ]"
              :label="$t(question.label)"
              :name="question.name"
              styling="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            />
          </div>
        </div>

        <!-- Placement Information -->
         <div>
          <h3 class="border-b border-b-black/15 text-brand-primary font-bold">Placement Timeline</h3>
          <BaseFormRadios 
              v-model="form.individual_care_information.placement"
              :values="['immediate', '30-days', '1-3-months', 'exploring']"
              :labels="placementLabels"
              :label="$t('consultation-form.fields.placement.label')"
              name="placement"
              styling="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            />
         </div>

        <!-- Additonal information textarea -->
         <div>
           <BaseFormTextArea v-model="form.message" name="message" :label="$t('consultation-form.fields.message')" required aria-required="true" />
         </div>

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
          <div class="text-sm">
            {{ submitResult.message }}
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
import type { ConsultationForm } from '~/models/admin/ConsultationForm'

const form = reactive<ConsultationForm>({
  personal_information: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    contact_method: 'phone',
  },
  individual_care_information: {
    person_seeking_care: {
      value: 'self',
      other: ''
    },
    age_range: '18-40',
    insurance_type: {
      value: 'medicaid',
      other: ''
    },
    questions: [
      {
        name: 'income_assistance',
        label: 'consultation-form.fields.yes-no.questions.income-assistance',
        value: 'no'
      },

      {
        name: 'ada_accommodations',
        label: 'consultation-form.fields.yes-no.questions.ada-accommodations',
        value: 'no'
      },

      {
        name: 'daily_living_assistance',
        label: 'consultation-form.fields.yes-no.questions.daily-living-assistance',
        value: 'no'
      }
    ],
    placement: '30-days'
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

const prefersPhoneContact = computed(() => {
  return form.personal_information.contact_method === 'phone'
})

const prefersEmailContact = computed(() => {
  return form.personal_information.contact_method === 'email'
})

const isSubmitting = ref(false)
const submitResult = ref<{ success: boolean; message: string; score?: number } | null>(null)

const consultationContactMethodLabels = computed(() => {
  return [$t('consultation-form.fields.contact-method-options.labels.email'), $t('consultation-form.fields.contact-method-options.labels.phone')]
})

const consultationPersonSeekingCareLabels = computed(() => {
  return [
    $t('consultation-form.fields.person-seeking-care.labels.self'),
    $t('consultation-form.fields.person-seeking-care.labels.parent'),
    $t('consultation-form.fields.person-seeking-care.labels.family-member'),
    $t('consultation-form.fields.person-seeking-care.labels.friend'),
    $t('consultation-form.fields.person-seeking-care.labels.client-patient'),
    $t('consultation-form.fields.person-seeking-care.labels.other')
  ]
})

const insuranceTypeLabels = computed(() => {
  const labels = $tm('consultation-form.fields.insurance-type.labels') as string[]
  return labels.map(label => $rt(label))
})

const placementLabels = computed(() => {
  return [
    $t('consultation-form.fields.placement.labels.immediate'),
    $t('consultation-form.fields.placement.labels.thirty-days'),
    $t('consultation-form.fields.placement.labels.one-to-three-months'),
    $t('consultation-form.fields.placement.labels.exploring')
  ]
})

const personSeekingCareOtherSelected = computed(() => {
  return form.individual_care_information.person_seeking_care.value === 'other'
})

const insuranceTypeOtherSelected = computed(() => {
  return form.individual_care_information.insurance_type.value === 'other'
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

type ValidationRule = {
  condition: boolean
  message: string
}

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '')

  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
}

const validateConsultationForm = () => {
  const firstName = form.personal_information.first_name.trim()
  const lastName = form.personal_information.last_name.trim()
  const email = form.personal_information.email.trim()
  const phone = form.personal_information.phone.trim()
  const message = form.message.trim()
  const personSeekingCare = form.individual_care_information.person_seeking_care
  const insuranceType = form.individual_care_information.insurance_type

  const rules: ValidationRule[] = [
    {
      condition: !firstName,
      message: $t('consultation-form.feedback.first-name-required'),
    },
    {
      condition: !lastName,
      message: $t('consultation-form.feedback.last-name-required'),
    },
    {
      condition: !message,
      message: $t('consultation-form.feedback.message-required'),
    },
    {
      condition: prefersEmailContact.value && !email,
      message: $t('consultation-form.feedback.email-required'),
    },
    {
      condition: !!email && !isValidEmail(email),
      message: $t('consultation-form.feedback.email-invalid'),
    },
    {
      condition: prefersPhoneContact.value && !phone,
      message: $t('consultation-form.feedback.phone-required'),
    },
    {
      condition: !!phone && !isValidPhone(phone),
      message: $t('consultation-form.feedback.phone-invalid'),
    },
    {
      condition: personSeekingCare.value === 'other' && !personSeekingCare.other.trim(),
      message: $t('consultation-form.feedback.person-seeking-care-other-required'),
    },
    {
      condition: insuranceType.value === 'other' && !insuranceType.other.trim(),
      message: $t('consultation-form.feedback.insurance-type-other-required'),
    },
  ]

  return rules
    .filter(rule => rule.condition)
    .map(rule => rule.message)
}

const submitConsultationRequest = async () => {
  try {
    isSubmitting.value = true
    submitResult.value = null

    // Validate required fields
    const validationErrors = validateConsultationForm()

    if (validationErrors.length) {
      submitResult.value = {
        success: false,
        message: validationErrors.join(' ')
      }

      return
    }

    const token = await executeRecaptcha('consultation_form')

    const verification = await verifyWithServer(token)

    if (verification.success && verification.data?.valid) {
      await $fetch('/api/consultation-request/submit', {
        baseURL: useRuntimeConfig().public.useLocalApi
          ? 'http://127.0.0.1:4000'
          : 'https://api.goldengatemanor.com',

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(form)
      })

      submitResult.value = {
        success: true,
        message: $t('consultation-form.feedback.submit-success'),
        score: verification.data.score
      }

      triggerVirtualThankYou()

      // Reset form
      Object.assign(form, {
        personal_information: {
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          contact_method: 'phone',
        },

        individual_care_information: {
          person_seeking_care: {
            value: 'self',
            other: ''
          },

          age_range: '18-40',

          insurance_type: {
            value: 'unknown',
            other: ''
          },

          questions: [
            {
              name: 'income_assistance',
              label: 'consultation-form.fields.yes-no.questions.income-assistance',
              value: 'no'
            },

            {
              name: 'ada_accommodations',
              label: 'consultation-form.fields.yes-no.questions.ada-accommodations',
              value: 'no'
            },

            {
              name: 'daily_living_assistance',
              label: 'consultation-form.fields.yes-no.questions.daily-living-assistance',
              value: 'no'
            }
          ],

          placement: '30-days'
        },

        message: ''
      })

      setTimeout(() => {
        submitResult.value = null
      }, 5000)
    } else {
      submitResult.value = {
        success: false,
        message: verification.message || $t('consultation-form.feedback.recaptcha-failed')
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