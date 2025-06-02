<template>
  <form>
    <div>
      <BaseLayoutPageSection :padding="false" class="space-y-1" bg="transparent">
        <BaseFormSelect 
          v-model="form.reason"
          :values="['general', 'complaint', 'question', 'transportation', 'assisted_living', 'medical_supply', 'accessibility']" 
          :labels="['General Contact', 'File a Complaint', 'Question or Inquiry', 'Transportation Services', 'Assisted Living', 'Medical Supplies', 'Accessibility']" 
          label="Reason for Contact"
          />

        <div class="lg:flex lg:gap-2">
          <BaseFormInput v-model="form.firstName" autocomplete="given-name" name="first-name" label="First Name*" />
          <BaseFormInput v-model="form.lastName" autocomplete="family-name" name="last-name" label="Last Name"/>
        </div>

        <BaseFormInput v-model="form.email" type="email" autocomplete="email" name="email" label="Email*" />
        <BaseFormInput v-model="form.phone" type="tel" autocomplete="tel" name="phone" label="Phone" />

        <BaseFormSelect 
          v-model="form.contactMethod"
          :values="['email', 'phone']"
          :labels="['Email', 'Phone']"
          label="Preferred Contact Method"
        />

        <BaseFormTextArea v-model="form.message" name="message" label="Comment/Inquiry/Message*"/>

        <BaseUiAction type="submit" class="w-full p-2">Send Message</BaseUiAction>
      </BaseLayoutPageSection>
    </div>
  </form>
</template>

<script lang="ts" setup>
const form = {
  reason: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  contactMethod: '',
  message: ''
}
</script>

<style>

</style>