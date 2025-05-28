<template>
  <form>
    <div class="w-[60%] p-8 mx-auto my-12 block bg-white border shadow-primary rounded-xl space-y-8">
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">Passenger Information</h2>
        <BaseFormInput v-model="form.name" autocomplete="name" name="Name" label="Name" placeholder="First and Last" />
        <BaseFormDatePicker id="dob" v-model="form.dob" autocomplete="bday" label="Date of Birth" placeholder="Select your birthdate"/>
        <BaseFormInput v-model="form.phone" type="tel" autocomplete="tel" label="Phone Number" name="phone" placeholder="(555) 555-5555" />
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
        <BaseFormDatePicker id="apt_date" v-model="form.apt_date" autocomplete="off" label="Appointment Date" placeholder="Select a Date" />
        <BaseFormTimePicker id="apt_time" v-model="form.apt_time" autocomplete="off" label="Appointment Time" placeholder="Select a Time" />
        <BaseFormInput v-model="form.pickup_address" type="text" autocomplete="street-address" name="pickup-address" label="Pickup Address" placeholder="e.g. 300 Colorado Ave., Pueblo, CO, 81004" />
        <BaseFormInput v-model="form.dropoff_address" type="text" autocomplete="street-address" name="dropoff-address" label="Drop-Off Address" placeholder="e.g. 300 Colorado Ave., Pueblo, CO, 81004" />
        <BaseFormTextArea v-model="form.notes" autocomplete="off" name="notes" label="Notes/Messages/Special Requirements" placeholder="If you need anything specific, such as a wheelchair accessible van, request it here."/>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection bg="transparent" class="space-y-2">
        <h2 class="font-extrabolds text-2xl pb-2 border-b border-gray-200">Agree to Terms</h2>
        <BaseFormCheckbox v-model="form.acknowledge" name="attestation">I certify the information provided is accurate to the best of my knowledge.</BaseFormCheckbox>
        <BaseUiAction type="submit" class="py-4 px-8 block !mt-8">Submit Request</BaseUiAction>
      </BaseLayoutPageSection>
    </div>
  </form>
  <!-- First and Last
  Pickup Address
  Pickup address
  Drop-Off Address
  Drop-Off address
  Notes/Messages/Special Requirements
  If you need anything specific, such as a wheelchair accessible van, request it here.
  Agree to Terms -->
</template>

<script lang="ts" setup>
const form = ref({
  name: '',
  dob: '',
  phone: '',
  med_id: '',
  apt_date: '',
  apt_time: '',
  pickup_address: '',
  dropoff_address: '',
  notes: '',
  acknowledge: false
})

watch(form, (newValue) => {
console.log(newValue)
}, {deep: true})

</script>

<style>

</style>