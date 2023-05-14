<script setup>
import { ref, computed } from 'vue'

import { titlePostfix } from '~/utils/constants.ts'

import { committees } from './data.json'

useHead({ title: `Jelentkezők - ${titlePostfix}` })

const key = ref('')
const error = ref(false)
const applicants = ref([])

const getApplicants = async () => {
  const result = await (
    await fetch(
      `https://eu-central-1.aws.data.mongodb-api.com/app/brke-wpsqn/endpoint/candidates?key=${key.value}`
    )
  ).json()

  if (result.success) {
    applicants.value = result.data
  } else {
    error.value = true
  }
}

const getCommittee = computed(
  () => (c) => applicants.value.filter((a) => a.committees.includes(c))
)

const getWorkgroup = computed(
  () => (wg) => applicants.value.filter((a) => a.workgroups.includes(wg.name))
)
</script>

<template>
  <div
    v-if="applicants.length > 0"
    class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-2"
  >
    <h2>Jelentkezők</h2>
    <table class="table table-sm table-striped mb-0">
      <tbody>
        <tr v-for="committee in committees">
          <td>
            <details>
              <summary>
                <span class="num">{{
                  getCommittee(committee.name).length
                }}</span>
                -
                {{ committee.name }}
              </summary>
              <ul>
                <li v-for="applicant in getCommittee(committee.name)">
                  {{ applicant.name }}
                </li>
              </ul>
            </details>
          </td>
          <td>
            <ul class="list-group list-group-flush">
              <li
                v-for="workgroup in committee.workgroups"
                class="list-group-item"
              >
                <details>
                  <summary>
                    <span class="num">{{
                      getWorkgroup(workgroup).length
                    }}</span>
                    -
                    {{ workgroup.name }}
                  </summary>
                  <ul>
                    <li v-for="applicant in getWorkgroup(workgroup)">
                      {{ applicant.name }}
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Σ:</td>
          <td>{{ applicants.length }}</td>
        </tr>
      </tbody>
    </table>
    <div v-for="applicant in applicants" class="col">
      <div class="card">
        <div class="card-body">
          <h3
            class="card-title"
            :class="{
              'text-decoration-underline': applicant.committees.length > 0,
            }"
          >
            {{ applicant.name }}
          </h3>
          <table class="table table-sm table-striped mb-0">
            <tbody>
              <tr>
                <td><i class="bi bi-geo-alt"></i></td>
                <td>{{ applicant.address }}</td>
              </tr>
              <tr>
                <td><i class="bi bi-mortarboard"></i></td>
                <td>{{ applicant.occupation }}</td>
              </tr>
              <tr>
                <td><i class="bi bi-calendar-date"></i></td>
                <td>{{ applicant.birth }}</td>
              </tr>
              <tr>
                <td><i class="bi bi-envelope"></i></td>
                <td>{{ applicant.email }}</td>
              </tr>
              <tr>
                <td><i class="bi bi-telephone"></i></td>
                <td>{{ applicant.phone }}</td>
              </tr>
              <tr>
                <td><i class="bi bi-people"></i></td>
                <td style="white-space: pre-line">
                  {{ applicant?.workgroups?.map((wg) => `• ${wg}`).join('\n') }}
                </td>
              </tr>
              <tr v-if="applicant.committees.length > 0">
                <td><i class="bi bi-person"></i></td>
                <td style="white-space: pre-line">
                  {{
                    applicant?.committees
                      ?.map((c, i) => `${i + 1}. ${c}`)
                      .join('\n')
                  }}
                </td>
              </tr>
              <tr v-if="applicant.about">
                <td><i class="bi bi-chat-dots"></i></td>
                <td>{{ applicant.about }}</td>
              </tr>
              <tr v-if="applicant.photo">
                <td><i class="bi bi-image"></i></td>
                <td>
                  <img
                    class="rounded"
                    style="height: 10rem"
                    :src="applicant.photo"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="input-group">
      <input
        v-model="key"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': error }"
        placeholder="Kulcs"
      />
      <button type="button" class="btn btn-primary" @click="getApplicants">
        Megtekintés
      </button>
      <div class="invalid-feedback">Hibás kulcs.</div>
    </div>
  </div>
</template>

<style>
.num {
  display: inline-block;
  width: 30px;
  text-align: right;
}

.list-group-item {
  background-color: inherit;
}
</style>
