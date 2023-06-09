<script setup>
import { ref, computed } from 'vue'

import { titlePostfix } from '~/utils/constants.ts'

import committees from './committees.json'
import candidates from './candidates.json'

// definePageMeta({
//   layout: 'empty',
// })

useHead({ title: `Jelöltek - ${titlePostfix}` })

const getCommittee = computed(
  () => (committee) =>
    candidates.filter((candidate) => candidate.committees.includes(committee))
)
</script>

<template>
  <div>
    <h1>Bizottsági jelöltek</h1>

    <!-- <ul> -->
    <!--   <li v-for="candidate in candidates"> -->
    <!--     <a :href="`#${candidate.name}`"> -->
    <!--       {{ candidate.name }} -->
    <!--     </a> -->
    <!--   </li> -->
    <!-- </ul> -->

    <div>
      <div
        v-for="candidate in candidates"
        class="candidate card"
        :id="candidate.name"
      >
        <div class="card-body">
          <div>
            <div class="name-photo-committees float-sm-start mx-auto me-sm-2">
              <h3 class="card-title" :style="{ fontWeight: 'bold' }">
                {{ candidate.name }}
              </h3>
              <div
                class="rounded"
                :style="{
                  height: '300px',
                  width: '100%',

                  backgroundImage: `url(${candidate.photo.url})`,
                  backgroundSize: candidate.photo.size,
                  backgroundPosition: candidate.photo.position,
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <ul class="list-group" :style="{ fontStyle: 'italic' }">
                <li
                  v-for="committee in candidate.committees"
                  class="list-group-item"
                  :style="{ padding: '0.25rem 1rem' }"
                >
                  {{ committee }}
                </li>
              </ul>
            </div>
            <div :style="{ whiteSpace: 'pre-line' }">{{ candidate.about }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  .candidate {
    width: 725px;
    break-inside: avoid;
  }
}

.candidate {
  margin: 8px 0px;
  /* scroll-margin-top: 100px; */
}

.name-photo-committees {
  width: 245px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
