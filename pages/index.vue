<template>
  <div>
    <button @click="fetch">fetch</button>
    <dom-calendar
      v-if="labelCalendars.length"
      :label-calendars="labelCalendars"
      :days="days"
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
