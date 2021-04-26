<template>
  <div>
    <button @click="fetch">fetch</button>
    <dom-calendar
      :label-calendars="labelCalendars"
      :days="days"
      v-if="labelCalendars.length"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DomCalendar from '@/components/DomCalendar.vue'
import { labelCalendars, days, fetch } from '@/usecases/events'

export default defineComponent({
  components: {
    DomCalendar,
  },
  setup() {
    return {
      fetch,
      labelCalendars,
      days,
    }
  },
})
</script>
