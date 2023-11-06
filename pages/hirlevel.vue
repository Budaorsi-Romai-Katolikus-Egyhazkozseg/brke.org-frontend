<script setup>
import { titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Hírlevél - ${titlePostfix}` })

const state = ref('entry')
const pending = ref(false)
const validated = ref(false)

const messages = ref([])

const email = ref('')
const emailError = computed(() => {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    return 'Érvényes email cím megadása kötelező.'
  }
})

const signUp = (email) =>
  fetch('https://newsletter.brke.donko.hu/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

const submit = async () => {
  validated.value = true

  if (Boolean(emailError.value)) {
    messages.value.push(emailError.value)
    return
  }

  pending.value = true
  const result = await signUp(email.value)
  pending.value = false

  if (result.status !== 200) {
    const { errors } = await result.json()
    errors.forEach(({ reason }) => {
      switch (reason) {
        case 'notFound':
          messages.value.push('Nem található fiók a megadott e-mail címmel.')
          break

        case 'duplicate':
          messages.value.push('A megadott e-mail cím már szerepel a listán.')
          break

        default:
          messages.value.push('Ismeretlen hiba történt.')
          break
      }
    })
    return
  }

  state.value = 'success'
}
</script>

<template>
  <div class="m-auto" style="max-width: 500px">
    <h1>Hírlevél</h1>

    <p>
      Ha szeretnél (legfeljebb napi egy) értesítést kapni az oldalon megjelenő
      új cikkekről, iratkozz fel bátran. Ígérjük, az email címedet nem
      használjuk másra, és nem adjuk tovább. Ha később meggondolod magad,
      bármikor leiratkozhatsz az érkező emailekben szereplő linken.
    </p>

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
      <div class="card" v-if="state === 'entry'">
        <div class="card-body">
          <h3 class="card-title">Jelentkezés</h3>

          <FormInput
            autocomplete="email"
            :error="emailError"
            :forceDirty="validated"
            icon="envelope"
            name="email"
            title="E-mail"
            type="text"
            v-model="email"
          />

          <button
            type="button"
            class="btn btn-primary mt-3"
            :disabled="pending"
            @click="submit"
          >
            Feliratkozás
            <span
              v-if="pending"
              class="spinner-border spinner-border-sm"
            ></span>
          </button>
        </div>
      </div>

      <div class="card" v-else-if="state === 'success'">
        <div class="card-body">
          <h3 class="card-title">
            <i class="bi bi-check-circle-fill text-success"></i>
            Sikeres Feliratkozás
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
