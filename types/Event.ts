export type Event = {
  id: string
  labels: Label[]
  name: string
  description: string
  day: Date
  startTime: string
  endTime: string
}

export type Label = {
  id: string
  name: string
}

export type DayCalendar = {
  day: Date
  events: Event[]
}

export type LabelCalendar = {
  label: Label
  dayCalendars: DayCalendar[]
}
