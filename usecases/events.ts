import { reactive } from '@nuxtjs/composition-api'
import { LabelCalendar, Label, Event } from '@/types/Event'
import { generateUuid } from '@/lib/uuid'

export const labelCalendars = reactive([] as LabelCalendar[])
export const labels = reactive([] as Label[])
export const days = reactive([] as Date[])

export const fetch = (): void => {
  fetchLabels()
  fetchDays()

  labelCalendars.splice(0, labelCalendars.length)

  const events: Event[] = new Array(3000).fill(0).map(() => {
    const id = generateUuid()
    const labels = getLabels()
    const day = days[Math.floor(Math.random() * 30)]
    return {
      id,
      labels,
      name: `Event ${id.slice(0, 8)}`,
      description: `full id is ${id}`,
      day,
      startTime: getTime(),
      endTime: getTime(),
    }
  })

  events.forEach((ev) => {
    ev.labels.forEach((label) => {
      const index = labelCalendars.findIndex((labelCalendar) => {
        return labelCalendar.label.id === label.id
      })
      if (index === -1) {
        labelCalendars.push({
          label,
          dayCalendars: days.map((day) => {
            return { day, events: [] }
          }),
        })
      }
      const labelCalendarIndex =
        index === -1 ? labelCalendars.length - 1 : index

      const dayCalendar = labelCalendars[labelCalendarIndex].dayCalendars.find(
        (dayCalendar) => dayCalendar.day === ev.day
      )
      if (dayCalendar === undefined) throw new Error(`NotFound Day: ${ev.day}`)
      dayCalendar.events.push(ev)
    })
  })
}

const fetchLabels = () => {
  if (labels.length !== 0) return

  const tmpLabels: Label[] = new Array(30).fill(0).map(() => {
    const id = generateUuid()
    return {
      id,
      name: `Label ${id.slice(0, 8)}`,
    }
  })
  labels.push(...tmpLabels)
}

const fetchDays = () => {
  if (days.length !== 0) return

  for (let i = 0; i < 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    days.push(date)
  }
}

const getLabels = () => {
  const count = 1
  return new Array(count).fill(0).map(() => {
    const index = Math.floor(Math.random() * labels.length)
    return labels[index]
  })
}

const getTime = () => {
  const hour = Math.floor(Math.random() * 24)
  const minute = Math.floor(Math.random() * 60)

  return [hour, minute].map((n) => `0${n.toString()}`.slice(-2)).join(':')
}

export const updateEvent = (ev: Event) => {
  console.log(ev)

  // delete
  ev.labels.forEach((label) => {
    const labelCalendar = labelCalendars.find((labelCalendar) => {
      return labelCalendar.label.id === label.id
    })

    const dayCalendar = labelCalendar!.dayCalendars.find((dayCalendar) => {
      return dayCalendar.day === ev.day
    })

    const targetEventIndex = dayCalendar!.events.findIndex((targetEvent) => {
      return targetEvent.id === ev.id
    })
    if (targetEventIndex === -1) throw new Error()

    console.log('targetEventIndex', targetEventIndex)
    dayCalendar!.events.splice(targetEventIndex, 1)
  })

  // add
  ev.labels.forEach((label) => {
    const labelCalendar = labelCalendars.find((labelCalendar) => {
      return labelCalendar.label.id === label.id
    })

    const dayCalendar = labelCalendar!.dayCalendars.find((dayCalendar) => {
      return dayCalendar.day === ev.day
    })

    const targetEventIndex = dayCalendar!.events.findIndex((targetEvent) => {
      return targetEvent.id === ev.id
    })
    if (targetEventIndex === -1) throw new Error()

    console.log('targetEventIndex', targetEventIndex)
    dayCalendar!.events.splice(targetEventIndex, 1)
  })
}
