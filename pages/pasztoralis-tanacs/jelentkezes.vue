<script setup>
import moment from 'moment'
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { onBeforeRouteLeave } from 'vue-router'

import { titlePostfix } from '~/utils/constants.ts'

import { committees } from './data.json'

useHead({ title: `Jelentkezés - ${titlePostfix}` })

/* --- Data ---------------------------------------------------------------- */

const workgroups = committees.flatMap((c) =>
  c.workgroups.map((wg) => ({
    ...wg,
    committee: c.name,
  }))
)

const deadline = moment('2023-05-28')

/* --- State --------------------------------------------------------------- */

// fill, check, success
const state = ref('fill')
const interacted = ref(false)

const messages = ref([])

const validated = ref(false)
const isUploading = ref(false)
const isSubmitting = ref(false)

onBeforeRouteLeave(
  (to, from) =>
    !interacted.value ||
    state.value === 'success' ||
    window.confirm('Az oldal elhagyásakor a mezők tartalma elveszik!')
)

/* --- API calls ----------------------------------------------------------- */

const uploadImage = async (file) => {
  const formdata = new FormData()
  formdata.append('image', file)

  const response = await fetch(
    'https://api.imgbb.com/1/upload?key=d220a87ad22ee2c2b8276cab4982ac83',
    {
      method: 'post',
      body: formdata,
    }
  )

  return await response.json()
}

const submitData = (data) =>
  fetch(
    'https://eu-central-1.aws.data.mongodb-api.com/app/brke-wpsqn/endpoint/candidates',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

/* --- Fields and validation ----------------------------------------------- */

const name = ref('')
const nameError = computed(() => {
  if (!/\S+ \S+/.test(name.value)) {
    return 'Érvényes név megadása kötelező.'
  }
})

const address = ref('')
const addressError = computed(() => {
  if (!address.value) {
    return 'Cím megadása kötelező.'
  }
})

const occupation = ref('')
const occupationError = computed(() => {
  if (!occupation.value) {
    return 'Végzettség megadása kötelező.'
  }
})

const birth = ref('')
const birthError = computed(() => {
  if (!birth.value) {
    return 'Születési dátum megadása kötelező.'
  } else if (moment(birth.value) > deadline.clone().subtract(18, 'years')) {
    return 'A jelentkezés feltétele a betöltött 18. életév.'
    // return 'Érvénytelen születési dátum.'
  }
})

const email = ref('')
const emailError = computed(() => {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    return 'Érvényes email cím megadása kötelező.'
  }
})

const phone = ref('')
const phoneError = computed(() => {
  if (
    !/^[+0-9 ]+$/.test(phone.value) ||
    phone.value.replace(/\D/g, '').length < 8
  ) {
    return 'Érvényes telefonszám megadása kötelező.'
  }
})

const selectedWorkgroups = ref([])
const workgroupsError = computed(() => {
  if (selectedWorkgroups.value.length < 1) {
    return validated.value && 'Legalább egy munkacsoport megjelölése kötelező.'
  } else if (selectedWorkgroups.value.length > 3) {
    return 'Legfeljebb három munkacsoport jelölhető meg.'
  }
})

const selectedCommittees = ref([])
const committeePriorities = ref(
  Object.fromEntries(committees.map((c) => [c.name, 0]))
)
const filteredSortedSelectedCommittees = computed({
  get() {
    return [
      ...new Set(
        workgroups
          .filter(
            (wg) =>
              selectedWorkgroups.value.includes(wg.name) &&
              selectedCommittees.value.includes(wg.committee)
          )
          .map((wg) => wg.committee)
          .sort(
            (a, b) =>
              committeePriorities.value[a] - committeePriorities.value[b]
          )
      ),
    ]
  },

  set(newValue) {
    newValue.forEach((v, i) => {
      committeePriorities.value[v] = i
    })
  },
})

const hasSelectedCommittee = computed(
  () => filteredSortedSelectedCommittees.value.length > 0
)

const about = ref('')
const aboutError = computed(() => {
  if (about.value.length < 50) {
    return 'Kérjük, írj magadról egy rövid (minimum 50 karakter) bemutatkozást!'
  }
})

const photo = ref(undefined)
const photoSelected = (event) => {
  photo.value = event.target.files[0]
}
const photoError = computed(() => {
  if (!photo.value) {
    return 'Kérjük, tölts fel magadról egy fényképet!'
  }
})

const photoUrl = ref('')

const privacy = ref(false)
const privacyError = computed(() => {
  if (!privacy.value) {
    return 'A jelentkezéshez kötelező elfogadni az adatkezelési nyilatkozatot.'
  }
})

const errors = computed(() => [
  nameError,
  addressError,
  occupationError,
  birthError,
  emailError,
  phoneError,
  workgroupsError,
  hasSelectedCommittee.value && aboutError,
  hasSelectedCommittee.value && photoError,
  privacyError,
])

const validate = async (event) => {
  validated.value = true
  messages.value.splice(0, messages.value.length)

  if (errors.value.some((e) => Boolean(e.value))) {
    messages.value.push(
      errors.value
        .filter((e) => Boolean(e.value))
        .map((e) => `• ${e.value}`)
        .join('\n')
    )
    return
  }

  if (hasSelectedCommittee.value) {
    isUploading.value = true
    const [image] = await Promise.all([
      uploadImage(photo.value),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ])
    isUploading.value = false

    if (image.status !== 200) {
      messages.value.push('Hiba a kép feltöltése közben.')
      return
    }

    photoUrl.value = image?.data?.medium?.url ?? image.data.url
  }

  state.value = 'check'
}

const submit = async () => {
  const data = {
    name: name.value,
    address: address.value,
    occupation: occupation.value,
    birth: birth.value,
    email: email.value,
    phone: phone.value,
    workgroups: selectedWorkgroups.value,
    committees: filteredSortedSelectedCommittees.value,
    about: about.value,
    photo: photoUrl.value,
  }

  isSubmitting.value = true
  const [result] = await Promise.all([
    submitData(data),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ])
  isSubmitting.value = false

  if (result.status !== 200) {
    messages.value.push('Hiba az adatok beküldése közben.')
    return
  }

  state.value = 'success'
}
</script>

<template>
  <div>
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        v-for="message in messages"
        :key="message"
        class="toast fade show timeout"
      >
        <div class="toast-header">
          <i class="bi bi-x-circle-fill text-danger"></i>
          <strong class="ms-1 me-auto">Hiba</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body" style="white-space: pre-line">
          {{ message }}
        </div>
      </div>
    </div>

    <Transition>
      <div class="card" v-if="state === 'fill'">
        <div class="card-body">
          <h3 class="card-title">Jelentkezés</h3>

          <p class="my-1">
            Itt tudsz jelentkezni a budaörsi római katolikus egyházközség
            különböző munkacsoportjaiba, illetve ha vállalod a jelöltséget a
            választásra, akkor a hozzájuk kapcsolódó bizottságokba.
          </p>

          <p class="my-1">
            Legfeljebb 3 <b>munkacsoportban</b> vállalhatsz szerepet ezzel a
            jelentkezéssel. A munkacsoportba való jelentkezés készséget jelent
            részedről arra, hogy ha ezen a téren faladat jelentkezik a
            plébániaközösségben, akkor megszólítható vagy a segítségre. A
            munkacsoportoknak nincs külön vezetésük, üléseik, ezeket a
            feladatokat a hozzájuk rendelt bizottságok látják el.
          </p>

          <p class="my-1">
            <b>Bizottságba</b> a hívek szavazatai alapján kerülhetsz be, de
            legfeljebb csak egybe. Emiatt fontos a jelentkezéseden belüli
            sorrend. A bizottságok maguk választják majd vezetőjüket, aki
            képviseli őket a konzultatív jellegű Pasztorális Tanácsban.
          </p>

          <p class="my-1">
            Jelentkezési határidő: {{ deadline.format('YYYY. MM. DD.') }}
          </p>

          <form
            class="row g-3 needs-validation my-2"
            novalidate
            @input="interacted = true"
          >
            <FormInput
              autocomplete="name"
              :error="nameError"
              :forceDirty="validated"
              icon="person"
              name="name"
              title="Név"
              type="text"
              v-model="name"
              width="4"
            />

            <br />

            <FormInput
              autocomplete="street-address"
              :error="addressError"
              :forceDirty="validated"
              icon="geo-alt"
              name="address"
              title="Lakcím"
              type="text"
              v-model="address"
              width="8"
            />

            <FormInput
              :error="occupationError"
              :forceDirty="validated"
              icon="mortarboard"
              name="occupation"
              title="Végzettség / Szakmai jártasság"
              type="text"
              v-model="occupation"
              width="4"
            />

            <FormInput
              autocomplete="bday"
              :error="birthError"
              :forceDirty="validated"
              icon="calendar-date"
              name="birth"
              title="Születési dátum"
              type="date"
              v-model="birth"
              width="4"
            />

            <FormInput
              autocomplete="email"
              :error="emailError"
              :forceDirty="validated"
              icon="envelope"
              name="email"
              title="E-mail"
              type="text"
              v-model="email"
              width="4"
            />

            <FormInput
              autocomplete="tel"
              :error="phoneError"
              :forceDirty="validated"
              icon="telephone"
              name="phone"
              title="Telefon"
              type="text"
              v-model="phone"
              width="4"
            />

            <div :class="{ 'is-invalid': workgroupsError }">
              <div class="form-check" v-for="workgroup in workgroups">
                <input
                  class="form-check-input"
                  :class="{
                    'is-invalid':
                      workgroupsError &&
                      selectedWorkgroups.includes(workgroup.name),
                  }"
                  type="checkbox"
                  :id="workgroup.name"
                  :value="workgroup.name"
                  v-model="selectedWorkgroups"
                />
                <label class="form-check-label" :for="workgroup.name">
                  <b>{{ workgroup.name }}</b>
                </label>
                <div
                  class="form-check"
                  v-if="selectedWorkgroups.includes(workgroup.name)"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="workgroup.committee"
                    :id="`${workgroup.name}-${workgroup.committee}`"
                    v-model="selectedCommittees"
                  />
                  <label
                    class="form-check-label"
                    :for="`${workgroup.name}-${workgroup.committee}`"
                  >
                    <b>{{ workgroup.committee }}</b>
                  </label>
                </div>
                <p>{{ workgroup.description }}</p>
              </div>
            </div>
            <div class="invalid-feedback">{{ workgroupsError }}</div>

            <div v-if="filteredSortedSelectedCommittees.length > 1">
              A választott bizottságok sorrendje:
              <br />
              <i>(A lista elemei megfogva és húzva átrendezhetőek.)</i>
              <draggable
                tag="ul"
                class="list-group list-group-numbered"
                animation="200"
                ghostClass="active"
                v-model="filteredSortedSelectedCommittees"
                item-key="s => s"
              >
                <template #item="{ element }">
                  <li class="list-group-item" style="cursor: grab">
                    {{ element }}
                  </li>
                </template>
              </draggable>
            </div>

            <div v-if="hasSelectedCommittee">
              <label for="about" class="form-label">Bemutatkozás</label>
              <textarea
                class="form-control"
                :class="{
                  'is-valid': !aboutError,
                  'is-invalid': validated && aboutError,
                }"
                id="about"
                v-model="about"
                placeholder="Magamról..."
              ></textarea>
              <div class="invalid-feedback">{{ aboutError }}</div>
            </div>

            <div v-if="hasSelectedCommittee">
              <label for="photo" class="form-label">Fénykép</label>
              <input
                autocomplete="photo"
                type="file"
                class="form-control"
                :class="{
                  'is-valid': !photoError,
                  'is-invalid': validated && photoError,
                }"
                id="photo"
                accept="image/*"
                @change="photoSelected"
              />
              <div class="invalid-feedback">{{ photoError }}</div>
            </div>

            <div class="col-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  :class="{
                    'is-valid': !privacyError,
                    'is-invalid': validated && privacyError,
                  }"
                  type="checkbox"
                  id="privacy"
                  v-model="privacy"
                />
                <label class="form-check-label" for="privacy">
                  Hozzájárulok személyes adataimnak a pasztorális tanács
                  működéséhez szükséges nyilvántartásához és kezeléséhez.
                </label>
                <div class="invalid-feedback">{{ privacyError }}</div>
              </div>
            </div>

            <div class="col-12">
              <button
                type="button"
                class="btn btn-primary"
                :disabled="isUploading"
                @click="validate"
              >
                Ellenőrzés
                <span
                  v-if="isUploading"
                  class="spinner-border spinner-border-sm"
                ></span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="card" v-else-if="state === 'check'">
        <div class="card-body">
          <h3 class="card-title">Ellenőrzés</h3>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>Név</td>
                <td>{{ name }}</td>
              </tr>
              <tr>
                <td>Lakcím</td>
                <td>{{ address }}</td>
              </tr>
              <tr>
                <td>Végzettség</td>
                <td>{{ occupation }}</td>
              </tr>
              <tr>
                <td>Születési dátum</td>
                <td>{{ birth }}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>{{ email }}</td>
              </tr>
              <tr>
                <td>Telefon</td>
                <td>{{ phone }}</td>
              </tr>
              <tr>
                <td>Munkacsoportok</td>
                <td>{{ selectedWorkgroups.join(', ') }}</td>
              </tr>
              <tr v-if="hasSelectedCommittee">
                <td>Bizottságok</td>
                <td>{{ filteredSortedSelectedCommittees.join(', ') }}</td>
              </tr>
              <tr v-if="hasSelectedCommittee">
                <td>Bemutatkozás</td>
                <td>{{ about }}</td>
              </tr>
              <tr v-if="hasSelectedCommittee">
                <td>Fénykép</td>
                <td>
                  <img class="rounded" style="height: 10rem" :src="photoUrl" />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            class="btn btn-secondary"
            @click="state = 'fill'"
          >
            Szerkesztés
          </button>
          <button
            type="button"
            class="btn btn-primary mx-2"
            :disabled="isSubmitting"
            @click="submit"
          >
            Beküldés
            <span
              v-if="isSubmitting"
              class="spinner-border spinner-border-sm"
            ></span>
          </button>
        </div>
      </div>

      <div class="card" v-else-if="state === 'success'">
        <div class="card-body">
          <h3 class="card-title">
            <i class="bi bi-check-circle-fill text-success"></i>
            Sikeres jelentkezés
          </h3>
          <p>Köszönjük!</p>
          <NuxtLink to="/">
            <button type="button" class="btn btn-primary">
              Vissza a főoldalra
            </button>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.v-enter-active {
  transition: opacity 0.5s ease 0.5s;
}

.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
