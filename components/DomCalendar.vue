<template>
  <div class="dom-calendar">
    <div class="days">
      <div class="day">
        {{ days[0].getFullYear() }}/{{ days[0].getMonth() + 1 }}
      </div>
      <div v-for="day in days" :key="day.getTime()" class="day">
        {{ day.getDate() }}
      </div>
    </div>
    <div class="label-calendars">
      <div
        v-for="labelCalendar in labelCalendars"
        :key="labelCalendar.label.id"
        class="label-calendar"
      >
        <div class="label">{{ labelCalendar.label.name }}</div>
        <div class="day-calendars">
          <div
            v-for="dayCalendar in labelCalendar.dayCalendars"
            :key="dayCalendar.day.getTime()"
            class="day-calendar"
          >
            <div
              v-for="event in dayCalendar.events"
              :key="event.id"
              class="event"
              @click="show(event)"
            >
              <div>{{ event.name }}</div>
              <div class="event__time">
                {{ event.startTime }}-{{ event.endTime }}
              </div>
              <button @click="update(event)">update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Event, LabelCalendar } from '@/types/Event'
import { updateEvent } from '@/usecases/events'

export default defineComponent({
  props: {
    days: {
      type: Array as PropType<Date[]>,
      required: true,
    },
    labelCalendars: {
      type: Array as PropType<LabelCalendar[]>,
      required: true,
    },
  },
  setup() {
    return {
      show(event: Event) {
        window.confirm(
          [
            `id: ${event.id}`,
            `name: ${event.name}`,
            `description: ${event.description}`,
            `startTime: ${event.startTime}`,
            `endTime: ${event.endTime}`,
          ].join('\n')
        )
      },
      update(ev: Event) {
        window.event?.stopPropagation()

        const newDay = new Date(ev.day)
        newDay.setDate(ev.day.getDate() + 1)
        const newEvent = Object.assign({}, ev, {
          day: newDay,
        })
        updateEvent(newEvent)
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.dom-calendar {
  display: flex;
  flex-direction: column;
}

.days {
  display: flex;
  flex-direction: row;
  height: 40px;
}
.day {
  flex-shrink: 0;
  flex-grow: 0;
  width: 100px;
  padding: 8px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.label-calendar {
  display: flex;
  flex-direction: row;
}
.label {
  flex-shrink: 0;
  flex-grow: 0;
  width: 100px;
  padding: 8px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.day-calendars {
  display: flex;
  flex-direction: row;
}
.day-calendar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  flex-grow: 0;
  width: 100px;
  padding: 4px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.event {
  height: 80px;
  width: 90px;
  margin-bottom: 4px;
  padding: 8px;
  background: #eee;
  border-radius: 2px;
}
.event__time {
  margin-top: 4px;
  font-size: 10px;
}
</style>
