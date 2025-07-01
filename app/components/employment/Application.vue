<template>
  <form @submit.prevent="submitApplication">
    <div class="sm:mx-4 sm:mt-4 sm:my-8 px-2 py-8 bg-white sm:rounded-lg lg:shadow-primary lg:w-[75%] lg:mx-auto lg:p-8 xl:w-[60%] space-y-8">
      <BaseLayoutPageSection bg="transparent">
        <h2 class="text-2xl font-bold text-brand-primary pb-2 border-b border-b-brand-primary/20 mb-4">Personal Information</h2>
        <div class="space-y-4">
          <div class="md:w-1/2">
            <BaseFormSelect 
              v-model="application.personal.select as string"
              name="position"
              label="Position"
              :labels="['Transportation - General', 'Transportation Dispatcher', 'Taxi Driver', 'Administrative Assistant', 'Customer Service Representative', 'NEMT Driver', 'Assisted Living - General', 'QMAP', 'PCP', 'Medical Supply - General', 'DME Specialist', 'Delivery Technician', 'Inventory Technician', 'Gas Station - General', 'Gas Station Manager', 'Gas Station Assistant Manager', 'Gas Station Attendant', 'General Application']"
              :values="['transportation_general', 'city_cab-dispatch', 'city_cab-driver', 'city_cab-admin_assistant', 'ggmt-csr', 'ggmt-driver', 'al_general', 'assisted_living-qmap', 'assisted_living-pcp', 'ms_general', 'ggms-dme_specialist', 'ggms-deliver_tech', 'ggms-inventory_tech', 'gs_general', 'ggmc-manager', 'ggmc-assistant_manager', 'ggmc-attendant', 'general']"
            />
          </div>
          <div class="flex flex-col md:flex-row gap-4">
            <BaseFormInput v-model="application.personal.firstName" name="first_name" type="text" label="First Name"/>
            <BaseFormInput v-model="application.personal.lastName" name="last_name" type="text" label="Last Name"/>
          </div>
          <div>
            <BaseFormInput v-model="application.personal.address" name="address" type="text" label="Address" placeholder="123 Street, Pueblo CO, 81001"/>
          </div>
          <div class="md:w-1/2">
            <BaseFormInput v-model="application.personal.phoneNumber" name="phone" type="tel" label="Phone Number" placeholder="(555) 555-5555" />
          </div>
          <div class="space-y-4">
            <BaseFormRadios v-model="application.personal.over18" name="over-18" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Are you over the age of 18?" styling="flex gap-2"/>
            <BaseFormRadios v-model="application.personal.citizen" name="citizen" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Are you a citizen of the U.S. or Otherwise authorized to work in the U.S. on an unrestricted basis?" styling="flex gap-2"/>
            <BaseFormRadios v-if="showFelonyQuestion" v-model="application.personal.felony" name="felony" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Have you ever been charged with a Felony?" styling="flex gap-2"/>
          </div>
        </div>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection v-if="showDrivingSection" bg="transparent">
        <h2 class="text-2xl font-bold text-brand-primary pb-2 border-b border-b-brand-primary/20 mb-4">Driving Information</h2>
        <div class="space-y-4">
          <div class="md:w-1/2 space-y-2">
            <BaseFormRadios v-model="application.driving.hasEndorsements" name="has-endorsements" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Do you have any additional driving endorsements?" styling="flex gap-2" />
            <BaseFormTextArea v-if="application.driving.hasEndorsements === 'yes'" name="endorsements" label="Please list any additional driving endorsements:" />
          </div>
          <div class="md:w-1/2 space-y-2">
            <BaseFormRadios v-model="application.driving.hasAccidents" name="has-accidents" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Have you had a traffic accident in the past 3 years?" styling="flex gap-2"/>
            <BaseFormTextArea v-if="application.driving.hasAccidents === 'yes'" name="accidents" label="Please explain the traffic accident(s):" />
          </div>
          <div class="md:w-1/2 space-y-2">
            <BaseFormRadios v-model="application.driving.hasTrafficConvictions" name="has-traffic-convications" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Have you had any traffic convictions in the past 3 years (besides parking violations)?" styling="flex gap-2"/>
            <BaseFormTextArea v-if="application.driving.hasTrafficConvictions === 'yes'" name="traffic-convictions" label="Please explain the traffic conviction(s):" />
          </div>
          <div class="space-y-2">
            <BaseFormRadios v-model="application.driving.hasMVR" name="has-mvr" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Do you have a recent Motor Vehicle Record (MVR) from within the last 30 days?" styling="flex gap-2"/>
            <PleaseNote v-if="application.driving.hasMVR == 'no'">A Motor Vehicle Record (MVR) from the last 30 days is required for this position. A non-certified MVR showing a 7-year driving history can be obtained from the DMV at 827 W 4th St, Pueblo, CO 81003, or online using the <a href="https://mydmv.colorado.gov/_/" target="_blank" rel="noopener nofollow noreferral" class="link">DMV - MVR Online Form</a> and request a driving record. Submit the MVR with your application or bring it to our office at 612 S. Union Ave., Pueblo, CO 81004 to proceed with the application process.</PleaseNote>
            <BaseFormFileUpload v-if="application.driving.hasMVR === 'yes'" v-model="application.driving.MVR" name="MVR" label="Attach your MVR:"/>
          </div>
          <div>
            <BaseFormFileUpload v-model="application.driving.driversLicense" name="dl" label="Attach Your Driver's License:"/>
          </div>
        </div>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection bg="transparent">
        <h2 class="text-2xl font-bold text-brand-primary pb-2 border-b border-b-brand-primary/20 mb-4">Work Information</h2>
        <div class="space-y-4">
          <div class="md:w-1/2 space-y-2">
            <BaseFormSelect v-model="application.work.learnedAboutUs" name="how-you-learned" label="How did you learn about us?" :labels="['Indeed', 'Social Media', 'Word of Mouth', 'Golden Gate Manor Website', 'Email', 'Other']" :values="['indeed', 'social', 'word-of-mouth', 'website', 'email', 'other']"/>
            <BaseFormTextArea v-if="application.work.learnedAboutUs === 'other'" v-model="application.work.otherExplain" name="other-explain" label="Please explain where you heard about us:"/>
          </div>
          <div>
            <BaseFormRadios v-model="application.work.hasWorkedAtGoldenGate" name="has-worked-ggm" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Have you ever worked for Golden Gate Manor Inc. before?" styling="flex gap-2"/>
          </div>
          <div class="md:w-1/2 space-y-2">
            <BaseFormRadios v-model="application.work.employmentType" name="employment-type" :labels="['Full-Time', 'Part-Time']" :values="['full-time', 'part-time']" label="What kind of employment are you looking for?" styling="flex gap-2" />
            <BaseFormTextArea v-if="application.work.employmentType === 'part-time'" v-model="application.work.availability" name="availability" label="Specify Availability:" />
          </div>
          <div>
            <BaseFormRadios v-model="application.work.willingToWorkOvertime" name="willing-to-work-overtime" :labels="['Yes', 'No']" :values="['yes', 'no']" label="Are you willing to work overtime as required?" styling="flex gap-2"/>
          </div>
          <div class="md:w-1/2">
            <BaseFormInput v-model="application.work.preferablePayRate" name="pay_rate" type="number" label="What is your preferable pay rate? (Hourly)"/>
          </div>
          <div class="md:w-1/2">
            <BaseFormDatePicker id="start-date" min-date label="What date would you be available to start work?" name="start-date" placeholder="mm/dd/yyyy"/>
          </div>
          <div>
            <BaseFormFileUpload v-model="application.work.resume" name="resume" label="Attach Your Resume:"/>
          </div>
        </div>
      </BaseLayoutPageSection>
      <div class="flex w-full justify-center">
        <BaseUiAction type="submit" class="p-2">Submit Application</BaseUiAction>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useRecaptcha } from '../../composables/messages/recaptcha';

const { executeRecaptcha, verifyWithServer, loadRecaptcha, unloadRecaptcha } = useRecaptcha()
const route = useRoute()

const notAllowedToAskFelony = ['gs_general', 'ggmc-manager', 'ggmc-assistant_manager', 'ggmc-attendant', 'general']
const drivingPositions = ['transportation_general', 'city_cab-driver', 'ggmt-driver', 'ggms-inventory_tech', 'ggms-deliver_tech']

const application = reactive({
  personal: {
    select: route.query.select || '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    over18: 'no',
    citizen: 'no',
    felony: 'no',
  },
  driving: {
    hasEndorsements: 'no',
    endorsements: '',
    hasAccidents: 'no',
    accidents: '',
    hasTrafficConvictions: 'no',
    trafficConvictions: '',
    hasMVR: 'no',
    MVR: [],
    driversLicense: []
  },
  work: {
    learnedAboutUs: '',
    otherExplain: '',
    hasWorkedAtGoldenGate: 'no',
    employmentType: 'full-time',
    availability: '',
    willingToWorkOvertime: 'no',
    preferablePayRate: '',
    dateAvailableToStart: '',
    resume: []
  }
})

onMounted(() => {
  loadRecaptcha()
})

// Clean up ReCAPTCHA when component unmounts
onUnmounted(() => {
  unloadRecaptcha()
})

const showFelonyQuestion = computed(() => {
  return !notAllowedToAskFelony.includes(application.personal.select as string)
})

const showDrivingSection = computed(() => {
  return drivingPositions.includes(application.personal.select as string)
})

const isSubmitting = ref(false)
const submitResult = ref<{ success: boolean; message: string; score?: number } | null>(null)

const validateApplicationForm = () => {
  const position = application.personal.select as string;
  const isDrivingPosition = drivingPositions.includes(position)
  const canAskFelony = !notAllowedToAskFelony.includes(position)

  // Always required fields
  if (!application.personal.firstName || 
      !application.personal.lastName || 
      !application.personal.address || 
      !application.personal.phoneNumber ||
      !application.personal.over18 ||
      !application.personal.citizen ||
      !application.work.learnedAboutUs ||
      !application.work.employmentType ||
      !application.work.availability ||
      !application.work.dateAvailableToStart) {
    return {
      success: false,
      message: 'Please fill in all required personal and work information fields'
    }
  }

  // Position selection validation
  if (!position) {
    return {
      success: false,
      message: 'Please select a position to apply for'
    }
  }

  // Age validation
  if (application.personal.over18 !== 'yes') {
    return {
      success: false,
      message: 'You must be over 18 to apply'
    }
  }

  // Citizenship validation
  if (application.personal.citizen !== 'yes') {
    return {
      success: false,
      message: 'You must be a US citizen or authorized to work in the US'
    }
  }

  // Felony validation (only for positions where we can ask)
  if (canAskFelony && !application.personal.felony) {
    return {
      success: false,
      message: 'Please answer the felony conviction question'
    }
  }

  // Driving position specific validations
  if (isDrivingPosition) {
    // Required driving fields
    if (!application.driving.hasEndorsements ||
        !application.driving.hasAccidents ||
        !application.driving.hasTrafficConvictions ||
        !application.driving.hasMVR) {
      return {
        success: false,
        message: 'Please complete all driving-related questions for this position'
      }
    }

    // Driver's license file requirement
    if (!application.driving.driversLicense || application.driving.driversLicense.length === 0) {
      return {
        success: false,
        message: 'Driver\'s license copy is required for driving positions'
      }
    }

    // MVR requirement
    if (application.driving.hasMVR === 'yes' && 
        (!application.driving.MVR || application.driving.MVR.length === 0)) {
      return {
        success: false,
        message: 'Please upload your MVR document'
      }
    }

    // Endorsements details
    if (application.driving.hasEndorsements === 'yes' && !application.driving.endorsements.trim()) {
      return {
        success: false,
        message: 'Please provide details about your endorsements'
      }
    }

    // Accidents details
    if (application.driving.hasAccidents === 'yes' && !application.driving.accidents.trim()) {
      return {
        success: false,
        message: 'Please provide details about your accidents'
      }
    }

    // Traffic convictions details
    if (application.driving.hasTrafficConvictions === 'yes' && !application.driving.trafficConvictions.trim()) {
      return {
        success: false,
        message: 'Please provide details about your traffic convictions'
      }
    }
  }

  // "Other" explanation validation
  if (application.work.learnedAboutUs === 'other' && !application.work.otherExplain.trim()) {
    return {
      success: false,
      message: 'Please explain how you learned about us'
    }
  }

  // Date validation
  const startDate = new Date(application.work.dateAvailableToStart)
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to compare just dates
  
  if (startDate < today) {
    return {
      success: false,
      message: 'Available start date cannot be in the past'
    }
  }

  // All validations passed
  return {
    success: true,
    message: 'Application is valid'
  }
}

const submitApplication = async () => {
  try {
    isSubmitting.value = true
    submitResult.value = null
    
    // Validate required fields
    const validation = validateApplicationForm()
    if(!validation.success) {
      submitResult.value = {
        success: false,
        message: validation.message
      }
      return
    }
  
    const token = await executeRecaptcha('application_form')
    
    const verification = await verifyWithServer(token)
    
    if (verification.success && verification.data?.valid) {
      // TODO: Submit actual form data to your contact endpoint
      // const contactResponse = await $fetch('/api/contact', {
      //   method: 'POST',
      //   body: form
      // })
      
      submitResult.value = {
        success: true,
        message: 'Application submitted successfully!',
        score: verification.data.score
      }
      
      // Reset form
      Object.assign(application, {
        personal: {
          select: route.query.select || '',
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          over18: 'no',
          citizen: 'no',
          felony: 'no',
        },
        driving: {
          hasEndorsements: 'no',
          endorsements: '',
          hasAccidents: 'no',
          accidents: '',
          hasTrafficConvictions: 'no',
          trafficConvictions: '',
          hasMVR: 'no',
          MVR: [],
          driversLicense: []
        },
        work: {
          learnedAboutUs: '',
          otherExplain: '',
          hasWorkedAtGoldenGate: 'no',
          employmentType: 'full-time',
          availability: '',
          willingToWorkOvertime: 'no',
          preferablePayRate: '',
          dateAvailableToStart: '',
          resume: []
        }
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