<script setup>
import moment from 'moment'
import { computed, ref, watch } from 'vue'

const offset = ref(0)
const nowWithOffset = () => moment().add(offset.value, 'week')

const loading = ref(false)

const days = ref([])
const events = ref([])
const times = ref([])

const weekdayNames = [
  'Hétfő',
  'Kedd',
  'Szerda',
  'Csütörtök',
  'Péntek',
  'Szombat',
  'Vasárnap',
]

const basePath = 'https://www.googleapis.com/calendar/v3'
const calendarId =
  'c_61888c04d728d758a3ea3eca5e4b1210e82a4530a366e3e8d53d17423aed40c2@group.calendar.google.com'
const apiKey = 'AIzaSyAtYuIXVL2DiZUZBEYuQf0wvxoLAaaRpkA'

const getEvents = async (calendarId, parameters) =>
  await (
    await fetch(
      `${basePath}/calendars/${calendarId}/events?${Object.entries(parameters)
        .map(
          ([name, value]) =>
            `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        )
        .join('&')}`,
    )
  ).json()

watch(
  offset,
  async () => {
    try {
      loading.value = true
      const result = await getEvents(calendarId, {
        key: apiKey,
        singleEvents: true,
        timeMin: nowWithOffset().startOf('isoWeek').toISOString(),
        timeMax: nowWithOffset().endOf('isoWeek').toISOString(),
      })

      days.value = Array.from({ length: 7 }, (_, i) =>
        nowWithOffset().startOf('isoWeek').add(i, 'day').format('MM/DD'),
      )

      events.value = result.items
        .filter((i) => i.summary == 'Mise')
        .map((i) => ({
          date: moment(i.start.dateTime).format('YYYY-MM-DD'),
          dayOfWeek: moment(i.start.dateTime).isoWeekday(),
          time: moment(i.start.dateTime).format('HH:mm'),
        }))

      times.value = [
        ...new Set(events.value.map((e) => e.time)).values(),
      ].sort()
    } catch (error) {
      console.error('error while fetching events:', error)
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 500)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>Miserend</h2>
      <div class="d-flex align-items-center">
        <div v-if="loading" class="spinner-border text-primary" />
        <button class="btn" @click="offset--">
          <i class="bi bi-chevron-left"></i>
        </button>
        {{ nowWithOffset().year() }} / {{ nowWithOffset().isoWeek() }}. hét
        <button class="btn" @click="offset++">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>

    <div
      class="d-grid"
      :style="{
        gridTemplateColumns: `repeat(${days.length}, 1fr)`,
        gridTemplateRows: `50px repeat(${times.length}, 35px)`,
      }"
    >
      <div
        v-for="(day, index) in days"
        class="title text-center lh-sm border-bottom"
        :style="{
          gridRow: 1,
          gridColumn: index + 1,
        }"
      >
        <div class="fs-5 fw-bold">
          <span class="d-md-none">{{ weekdayNames[index].slice(0, 3) }}</span>
          <span class="d-none d-md-block">{{ weekdayNames[index] }}</span>
        </div>
        <div class="text-secondary fs-sm">{{ day }}</div>
      </div>

      <div
        v-for="event in events"
        class="text-center"
        :style="{
          gridRow: times.indexOf(event.time) + 2,
          gridColumn: event.dayOfWeek,
          alignSelf: 'center',
        }"
      >
        {{ event.time }}
      </div>

      <div
        v-for="dt in days.flatMap((_, d) => times.map((_, t) => [d, t]))"
        class="border-bottom"
        :style="{
          gridRow: dt[1] + 2,
          gridColumn: dt[0] + 1,
        }"
      />
    </div>
  </div>
</template>