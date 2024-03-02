<script setup>
import moment from 'moment'
import { computed, ref, watch } from 'vue'

const cardHeight = 200

const offset = ref(0)
const decreaseOffset = () => {
  window.plausible('Change Calendar Offset', {
    props: { value: offset.value, direction: 'back' },
  })
  offset.value--
}
const increaseOffset = () => {
  window.plausible('Change Calendar Offset', {
    props: { value: offset.value, direction: 'forward' },
  })
  offset.value++
}
const nowWithOffset = () => moment().add(offset.value, 'week')

const selectedEvent = ref()
const selectEvent = (event) => {
  if (selectedEvent.value?.id === event.id) {
    selectedEvent.value = undefined
  } else {
    window.plausible('View Event Details', {
      props: {
        title: event.title,
        titleWithDateAndTime: `${event.title} @ ${event.date} ${event.time}`,
      },
    })
    selectedEvent.value = event
  }
}

const loading = ref(false)

const dates = ref([])
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

const apiKey = 'AIzaSyAtYuIXVL2DiZUZBEYuQf0wvxoLAaaRpkA'
const basePath = 'https://www.googleapis.com/calendar/v3'
const calendarId =
  'c_61888c04d728d758a3ea3eca5e4b1210e82a4530a366e3e8d53d17423aed40c2@group.calendar.google.com'

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

      dates.value = Array.from({ length: 7 }, (_, i) =>
        nowWithOffset().startOf('isoWeek').add(i, 'day').format('YYYY-MM-DD'),
      )

      events.value = result.items.map((i) => ({
        id: i.id,
        title: i.summary,
        description: i.description,
        location: i.location,
        dayOfWeek: moment(i.start.dateTime).isoWeekday(),
        date: moment(i.start.dateTime).format('YYYY-MM-DD'),
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
      <h2>Misék és események</h2>
      <div
        class="d-flex justify-content-end align-items-center flex-shrink-0"
        :style="{ minWidth: '225px' }"
      >
        <div v-if="loading" class="spinner-border text-primary" />
        <button class="btn" @click="decreaseOffset">
          <i class="bi bi-chevron-left"></i>
        </button>
        <span class="text-center" :style="{ minWidth: '105px' }">
          {{ nowWithOffset().year() }} / {{ nowWithOffset().isoWeek() }}. hét
        </span>
        <button class="btn" @click="increaseOffset">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>

    <div
      class="d-grid user-select-none"
      :style="{
        gridTemplateColumns: `repeat(${dates.length}, 1fr)`,
        gridTemplateRows: `50px repeat(${times.length}, 35px)`,
      }"
    >
      <div
        v-for="(date, index) in dates"
        :class="[
          'text-center',
          'lh-sm',
          'border-bottom',

          'd-flex',
          'flex-column',
          'justify-content-center',

          ...(moment().format('YYYY-MM-DD') === date ? ['bg-primary'] : []),
        ]"
        :style="{
          gridRow: 1,
          gridColumn: index + 1,
        }"
      >
        <div class="fs-5 fw-medium">
          <span class="d-md-none">{{ weekdayNames[index].slice(0, 3) }}</span>
          <span class="d-none d-md-block">{{ weekdayNames[index] }}</span>
        </div>
        <div class="text-secondary fs-sm">
          {{ moment(date).format('MM/DD') }}
        </div>
      </div>

      <div
        v-for="{ date, column, time, row } in dates.flatMap((date, column) =>
          times.map((time, row) => ({ date, column, time, row })),
        )"
        class="border-bottom"
        :style="{
          gridRow: row + 2,
          gridColumn: column + 1,
          ...(moment().format('YYYY-MM-DD') === date && {
            background: 'rgba(var(--bs-primary-rgb), 0.1)', // '#fac42b20'
          }),
        }"
      />

      <div
        v-for="event in events"
        class="text-center"
        :style="{
          gridRow: times.indexOf(event.time) + 2,
          gridColumn: event.dayOfWeek,
          alignSelf: 'center',
          cursor: 'pointer',
        }"
        @click="selectEvent(event)"
      >
        <span
          :class="[
            event.title === 'Mise' &&
              event.description &&
              'text-decoration-underline',
            selectedEvent?.id === event.id && 'fw-semibold',
          ]"
          :style="{
            ...(event.title === 'Mise' && {
              background: 'rgba(var(--bs-primary-rgb), 0.66)',
            }),
            padding: '3px',
          }"
        >
          {{ event.time }}
        </span>
      </div>
    </div>

    <div :style="{ marginBottom: '8px' }">
      <i class="bi bi-square-fill text-primary"></i> : Mise,
      <i class="bi bi-square"></i> : Egyéb (részletek kattintásra)
    </div>

    <div
      :style="{
        height: selectedEvent ? `${cardHeight}px` : 0,
        overflow: 'hidden',
        transition: 'height 0.5s',
      }"
    >
      <Transition>
        <div v-if="selectedEvent" class="card">
          <div class="card-header d-flex justify-content-between">
            <h5 class="card-title m-0">{{ selectedEvent.title }}</h5>

            <i
              class="bi bi-x-circle"
              :style="{ cursor: 'pointer' }"
              @click="selectedEvent = undefined"
            />
          </div>
          <div
            class="card-body"
            :style="{ height: `${cardHeight - 50}px`, overflow: 'scroll' }"
          >
            <table class="table-sm">
              <tbody>
                <tr>
                  <td><i class="bi bi-calendar-event" /></td>
                  <td>
                    {{ moment(selectedEvent.date).format('YYYY. MM. DD.') }}
                    {{ selectedEvent.time }}
                  </td>
                </tr>
                <tr v-if="selectedEvent.location">
                  <td><i class="bi bi-geo-alt-fill" /></td>
                  <td>
                    <a
                      class="link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      :href="`https://www.google.com/maps/search/?api=1&query=${selectedEvent.location}`"
                      target="_blank"
                      >{{ selectedEvent.location }}</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="card-text">
              <MarkdownContent :source="selectedEvent.description ?? ''" />
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
